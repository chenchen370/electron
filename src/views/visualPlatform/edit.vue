<template>
  <el-dialog :title="`${proFormProps.title}`" v-model="proFormVisible" width="1128px" @close="close"
    class="bigView-dialog" align-center :show-close="false">
    <div>
      <el-form ref="formRef" :model="form" :disabled="proFormProps.isView" label-width="95px" label-position="left">
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item prop="areaName" label="监测位置">
              <el-input v-model="form.areaName" placeholder="" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <div class="td-flex full-width">
              <el-form-item label="" prop="cabinetName" label-width="0">
                <el-radio-group v-model="form.type" class="cus-radio" @change="getTimeRange">
                  <el-radio :label="0" border>当日</el-radio>
                  <el-radio :label="7" border>最近7天</el-radio>
                  <el-radio :label="30" border>最近1个月</el-radio>
                  <el-radio :label="60" border>最近2个月</el-radio>
                  <el-radio :label="90" border>最近3个月</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="自定义时间" prop="monitingStatus">
                <el-date-picker v-model="form.cusTime" type="daterange" range-separator="至" start-placeholder=""
                  end-placeholder="" value-format="YYYY-MM-DD" @change="handleDateChange" style="width: 384px;" />
                <!-- <el-button type="primary" @click="handleSubmit" class="td-ml10">
                      查询
                    </el-button> -->
              </el-form-item>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div class="td-pos_relative">
        <div class="cus-position">
          <el-button type="primary" @click="handleClick('first')" plain class="i-btn-line">
            <img :src="echartLine" class="i-icon-line i-icon-line1">
            <img :src="echartLineVol" class="i-icon-line i-icon-line2">
            折线图
          </el-button>
          <div class="td-mb10"></div>
          <el-button type="primary" @click="handleClick('two')" plain icon="Coin">数据图</el-button>
        </div>
        <div class="td-mt100 echart-container">
          <div v-if="activeName == 'first'">
            <div ref="usedmemory" style="height: 350px" />
            <!-- <div class="td-ml20 td-mt20">
                  <el-button :type="btnType == 'temperature' ? 'primary' : ''" @click="btnType = 'temperature'"
                    size="small">
                    温度/湿度
                  </el-button>
                  <el-button :type="btnType == 'co2' ? 'primary' : ''" @click="btnType = 'co2'" size="small">
                    co2/voc
                  </el-button>
                  <el-button :type="btnType == 'illumination' ? 'primary' : ''" @click="btnType = 'illumination'"
                    size="small">
                    光照/紫外线
                  </el-button>
                </div> -->
          </div>
          <div v-if="activeName == 'two'" class="td-pt20">
            <el-table class="td-mt20" :data="additionalList" stripe>
              <el-table-column label="采集时间" prop="addDate" width="120" />
              <el-table-column label="温度" prop="temperatureAssess" show-overflow-tooltip />
              <el-table-column label="湿度" prop="humidityAssess" show-overflow-tooltip />
              <el-table-column label="co2" prop="co2Assess" show-overflow-tooltip />
              <el-table-column label="voc" prop="vocAssess" show-overflow-tooltip />
              <el-table-column label="光照" prop="illuminationAssess" show-overflow-tooltip />
              <el-table-column label="紫外线" prop="ultravioletAssess" show-overflow-tooltip />
            </el-table>
          </div>
        </div>
        <!-- <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane label="曲线图" name="first">
                </el-tab-pane>
                <el-tab-pane label="数据表" name="second">
                </el-tab-pane>
              </el-tabs> -->
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { parseTime } from '@/utils/zhebo';
import { getAssessPointList } from '@/api/warning/virsualPlatform';
import echartLine from '@/assets/images/icon/icon-line.png';
import echartLineVol from '@/assets/images/icon/icon-line_vol.png';
const { proxy } = getCurrentInstance();
const { moniting_status } = proxy.useDict('moniting_status');
import * as echarts from 'echarts';

const proFormVisible = ref(false);
const formRef = ref(null);
const additionalList = ref([]);
const form = ref({
  areaName: '',
  type: 0,
  cusTime: '',
  startDate: '',
  endDate: ''
});

const proFormProps = ref({
  isView: false,
  title: '',
  row: {}
});
const activeName = ref('first');
const btnType = ref('temperature');
const usedmemory = ref(null);
watch(btnType, () => {
  handleSubmit();
});

const handleDateChange = value => {
  form.value.type = '';
  if (value && value.length === 2) {
    const start = new Date(value[0]);
    const end = new Date(value[1]);
    const maxMonths = 3; // 最多选择3个月
    const maxDate = new Date(start);
    maxDate.setMonth(maxDate.getMonth() + maxMonths);
    if (end > maxDate) {
      ElMessage.error('选择的时间跨度不能超过3个月！');
      form.value.cusTime = [start, maxDate]; // 重置时间范围
    }
  }
};
const initChart = list => {
  let xData = [];
  let seriesData = [];
  let temperature = [];
  let humidity = [];
  let co2 = [];
  let voc = [];
  let illumination = [];
  let ultraviolet = [];
  list.map(v => {
    xData.push(v.addDate);
    temperature.push(v.temperatureAssess);
    humidity.push(v.humidityAssess);
    co2.push(v.co2Assess);
    voc.push(v.vocAssess);
    illumination.push(v.illuminationAssess);
    ultraviolet.push(v.ultravioletAssess);
  });
  if (btnType.value == 'temperature') {
    seriesData.push({
      name: '温度',
      type: 'line',
      smooth: true,
      symbolSize: 8,
      data: temperature
    });
    seriesData.push({
      name: '湿度',
      type: 'line',
      smooth: true,
      symbolSize: 8,
      data: humidity
    });
  } else if (btnType.value == 'co2') {
    seriesData.push({
      name: 'co2',
      type: 'line',
      smooth: true,
      symbolSize: 8,
      data: co2
    });
    // voc
    seriesData.push({
      name: 'VOC',
      type: 'line',
      smooth: true,
      symbolSize: 8,
      data: voc
    });
  } else if (btnType.value == 'ultraviolet') {
  } else if (btnType.value == 'illumination') {
    // 光照
    seriesData.push({
      name: '光照',
      type: 'line',
      smooth: true,
      symbolSize: 8,
      data: illumination
    });
    // 紫外线
    seriesData.push({
      name: '紫外线',
      type: 'line',
      smooth: true,
      symbolSize: 8,
      data: ultraviolet
    });
  } else if (btnType.value == 'voc') {
  }
  const usedmemoryInstance =
    echarts.getInstanceByDom(usedmemory.value, 'macarons') ||
    echarts.init(usedmemory.value, 'macarons');
  usedmemoryInstance.clear();
  usedmemoryInstance.setOption({
    legend: {
      x: '70%',
      top: '1%',
      itemGap: 40,
    },
    grid: {
      left: '3%',
      right: '10px',
      bottom: '2%',
      top: '15%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: xData,
      axisTick: {
        //去除刻度线
        show: false
      },
      axisLine: {
        //轴线样式
        lineStyle: {
          color: '#86909C'
        }
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: '#E5E8EF'
        }
      },
      axisLabel: {
        formatter: function (params) {
          if (params.length > 10) {
            return params.slice(0, 10) + "\n" + params.slice(-8)
          } else {
            return params
          }
        }
      }
    },
    yAxis: {
      type: 'value',
      name: '温度',
      nameTextStyle: {
        color: '#222C3B',
        fontSize: 14,
        padding: [0, 0, 0, -25],
        lineHeight: 40
      },
      axisTick: {
        //去除刻度线
        show: false
      },
      axisLine: {
        show: false,
        //轴线样式
        lineStyle: {
          color: '#86909C'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed'
        }
      }
    },

    // series: seriesData,
    series: [
      {
        name: '湿度',
        data: list.map(v => v.humidityAssess),
        type: 'line',
        smooth: true,
        showSymbol: false, // 初始化不显示标记
        symbolSize: 8,
        // markLine: {
        //   symbol: "none",
        //   silent: true,
        //   lineStyle: {
        //     normal: {
        //       type: "dashed",
        //     },
        //   },
        //   label: {
        //     position: "start",
        //   },
        //   data: [
        //     {
        //       yAxis: 25,
        //       lineStyle: {
        //         width: 1,
        //         color: "#A9C9D4",
        //       },
        //       label: {
        //         show: false,
        //         position: "",
        //       },
        //     },
        //   ],
        // },
        lineStyle: {
          width: 2,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#BBE9F0' },
              { offset: 1, color: '#66CDDD' }
            ],
            global: false // 缺省为 false
          }
        }
      },
      {
        name: '温度',
        data: list.map(v => v.temperatureAssess),
        type: 'line',
        smooth: true,
        // yAxisIndex: 1,
        showSymbol: false, // 初始化不显示标记
        symbolSize: 8,
        lineStyle: {
          width: 2,
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [
              { offset: 0, color: '#D0DDEB' },
              { offset: 1, color: '#2A5DA2' }
            ],
            global: false // 缺省为 false
          }
        }
      }
    ],
    dataZoom: {
      // show: dataZoomShow?dataZoomShow:false, // 为true 滚动条出现
      realtime: true,
      type: 'slider', // 有type这个属性，滚动条在最下面，也可以不行，写y：36，这表示距离顶端36px，一般就是在图上面。
      height: 20, // 表示滚动条的高度，也就是粗细
      start: 0, // 表示默认展示20%～80%这一段。
      end: 100
    }
  });
};
const handleClick = (v) => {
  activeName.value = v

  if (activeName.value == 'first') {
    nextTick(() => {
      initChart(additionalList.value);
    })
  }
};
const close = () => {
  btnType.value = 'temperature';
  activeName.value = 'first'
  form.value.type = 0;
  proFormVisible.value = false;
};

const getTimeRange = v => {
  const end = new Date();
  const start = new Date();
  start.setTime(start.getTime() - 3600 * 1000 * 24 * v);
  form.value.startDate = parseTime(start, '{y}-{m}-{d}');
  form.value.endDate = parseTime(end, '{y}-{m}-{d}');
  form.value.cusTime = [
    parseTime(start, '{y}-{m}-{d}'),
    parseTime(end, '{y}-{m}-{d}')
  ];
  return [start, end];
};
watch(form, (v) => {
  if (v.cusTime?.[0] && v.cusTime?.[1]) {
    form.value.startDate = v.cusTime?.[0] || '';
    form.value.endDate = v.cusTime?.[1] || '';
  } else {
    form.value.type = 0
    getTimeRange(0)
  }

  handleSubmit();
}, {
  deep: true
})

const handleSubmit = async () => {
  if (!form.value.cusTime) {
    ElMessage.error('请选择时间范围！');
    return;
  }
  const params = {
    houseId: form.value.areaId,
    startDate: form.value.startDate,
    endDate: form.value.endDate
  };
  const { rows } = await getAssessPointList(params);
  additionalList.value = rows;
  if (activeName.value == 'first') {
    initChart(additionalList.value);
  }
};

const acceptParams = params => {
  proFormProps.value = params;
  form.value['areaId'] = params.row['houseId'];
  form.value['areaName'] = params.row['pointDesc'];
  getTimeRange(0);
  proFormVisible.value = true;
  nextTick(() => {
    handleSubmit();
  });
};

defineExpose({
  acceptParams
});
</script>
<style lang="scss" scoped>
.i-link {
  color: #29d;
  text-decoration: underline;
}

.pro-form {
  :deep(.el-form-item) {
    margin: 0;
  }
}

.cus-radio {
  :deep(.el-radio) {
    margin-right: 18px;
    background: #E6ECEB;
    border-radius: 6px 6px 6px 6px;
    font-size: 20px;
    color: #39685D;
  }

  :deep(.el-radio__input) {
    display: none;
  }
}

.cus-position {
  position: absolute;
  top: -90px;
  right: 0;
  z-index: 999;
}

.i-icon-line {
  width: 12px;
  height: 12px;
  margin-right: 10px;
}

.i-btn-line {
  .i-icon-line1 {
    display: block;
  }

  .i-icon-line2 {
    display: none;
  }

  &:hover {
    .i-icon-line1 {
      display: none;
    }

    .i-icon-line2 {
      display: block;
    }
  }
}

.echart-container {
  position: relative;
  top: -44px;
}
</style>
