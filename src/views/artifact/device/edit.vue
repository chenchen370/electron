<template>
  <el-dialog :title="`${proFormProps.title}`" v-model="proFormVisible" width="1028px" @close="close" align-center
    :show-close="false">
    <div>
      <div class="mn-container">
        <div class="m-box">
          <el-form ref="formRef" :model="form" :disabled="proFormProps.isView" label-width="120px">
            <el-row :gutter="10">
              <el-col :span="12">
                <el-form-item prop="cabinetAddr" label="监测位置">
                  <el-input v-model="form.cabinetAddr" placeholder="" disabled />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="cabinetAddrDetail" label-width="0">
                  <el-input v-model="form.cabinetAddrDetail" placeholder="具体位置描述" disabled />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="数据时间" prop="cabinetName">
                  <el-radio-group v-model="form.type" class="td-mb10" @change="getTimeRange">
                    <el-radio :label="0">当日</el-radio>
                    <el-radio :label="7">最近7天</el-radio>
                    <el-radio :label="30">最近1个月</el-radio>
                    <el-radio :label="60">最近2个月</el-radio>
                    <el-radio :label="90">最近3个月</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="自定义时间" prop="monitingStatus">
                  <div class="td-flex">
                    <div class="demo-date-picker">
                      <div class="block">
                        <el-date-picker v-model="form.cusTime" type="daterange" range-separator="至" start-placeholder=""
                          end-placeholder="" value-format="YYYY-MM-DD" @change="handleDateChange" />
                      </div>
                    </div>
                    <div class="td-flex center">
                      <el-button type="primary" @click="handleSubmit" class="td-ml10 td-px20">
                        查询
                      </el-button>
                      <el-button class="common td-px20" @click="doDownload"> 下载 </el-button>
                      <div class="td-ml20 color-theme_064235">时间跨度3个月以内</div>
                    </div>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="td-pos_relative">
              <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane label="曲线图" name="first">
                  <div ref="usedmemory" style="height: 350px" />
                  <div class="td-ml20 td-mt20">
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
                  </div>
                </el-tab-pane>
                <el-tab-pane label="数据表" name="second">
                  <el-table class="td-mt20" :data="additionalList" border>
                    <el-table-column label="采集时间" prop="collectTime" width="120" />
                    <el-table-column label="温度" prop="temperature" show-overflow-tooltip />
                    <el-table-column label="湿度" prop="humidity" show-overflow-tooltip />
                    <el-table-column label="co2" prop="co2" show-overflow-tooltip />
                    <el-table-column label="voc" prop="voc" show-overflow-tooltip />
                    <el-table-column label="光照" prop="illumination" show-overflow-tooltip />
                    <el-table-column label="紫外线" prop="ultraviolet" show-overflow-tooltip />
                  </el-table>
                </el-tab-pane>
              </el-tabs>
              <el-button type="primary" style="position: absolute; right: 0; top: 10px" size="small"
                @click="doDownload">
                数据下载
              </el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { getDeviceHisList } from '@/api/warning/device';
import { reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { parseTime } from '@/utils/zhebo';
import { getDeviceHisMonitorData } from '@/api/warning/excel';
const { proxy } = getCurrentInstance();
const { moniting_status } = proxy.useDict('moniting_status');
import * as echarts from 'echarts';

const proFormVisible = ref(false);
const formRef = ref(null);
const additionalList = ref([]);
const form = ref({
  cabinetAddr: '',
  cabinetAddrDetail: '',
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
    xData.push(v.collectTime);
    temperature.push(v.temperature);
    humidity.push(v.humidity);
    co2.push(v.co2);
    voc.push(v.voc);
    illumination.push(v.illumination);
    ultraviolet.push(v.ultraviolet);
  });
  if (btnType.value == 'temperature') {
    seriesData.push({
      name: '温度',
      type: 'line',
      smooth: true,
      symbolSize: 2,
      data: temperature,
      showSymbol: false,
      itemStyle: {
        normal: {
          color: 'rgba(255, 219, 174, 1)',
          lineStyle: {
            color: 'rgba(255, 219, 174, 1)',
            width: 2,
          }
        }
      },
      emphasis: {
        disabled: true,
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(255, 242, 225, 1)" },
            { offset: 0.8, color: "rgba(255, 242, 225, 0)" },
          ])
        }
      },
    });
    seriesData.push({
      name: '湿度',
      type: 'line',
      smooth: true,
      symbolSize: 2,
      data: humidity,
      showSymbol: false,
      itemStyle: {
        normal: {
          color: 'rgba(131, 208, 222, 1)',
          lineStyle: {
            color: 'rgba(131, 208, 222, 1)',
            width: 2,
          }
        }
      },
      emphasis: {
        disabled: true,
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(131, 208, 222, 1)" },
            { offset: 0.8, color: "rgba(131, 208, 222, 0)" },
          ])
        }
      },
    });
  } else if (btnType.value == 'co2') {
    seriesData.push({
      name: 'co2',
      type: 'line',
      smooth: true,
      symbolSize: 2,
      data: co2,
      showSymbol: false,
      itemStyle: {
        normal: {
          color: 'rgba(255, 219, 174, 1)',
          lineStyle: {
            color: 'rgba(255, 219, 174, 1)',
            width: 2,
          }
        }
      },
      emphasis: {
        disabled: true,
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(255, 242, 225, 1)" },
            { offset: 0.8, color: "rgba(255, 242, 225, 0)" },
          ])
        }
      },
    });
    // voc
    seriesData.push({
      name: 'VOC',
      type: 'line',
      smooth: true,
      symbolSize: 2,
      data: voc,
      showSymbol: false,
      itemStyle: {
        normal: {
          color: 'rgba(131, 208, 222, 1)',
          lineStyle: {
            color: 'rgba(131, 208, 222, 1)',
            width: 2,
          }
        }
      },
      emphasis: {
        disabled: true,
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(131, 208, 222, 1)" },
            { offset: 0.8, color: "rgba(131, 208, 222, 0)" },
          ])
        }
      },
    });
  } else if (btnType.value == 'ultraviolet') {

  } else if (btnType.value == 'illumination') {
    // 光照
    seriesData.push({
      name: '光照',
      type: 'line',
      smooth: true,
      symbolSize: 2,
      data: illumination,
      showSymbol: false,
      itemStyle: {
        normal: {
          color: 'rgba(255, 219, 174, 1)',
          lineStyle: {
            color: 'rgba(255, 219, 174, 1)',
            width: 2,
          }
        }
      },
      emphasis: {
        disabled: true,
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(255, 242, 225, 1)" },
            { offset: 0.8, color: "rgba(255, 242, 225, 0)" },
          ])
        }
      },
    });
    // 紫外线
    seriesData.push({
      name: '紫外线',
      type: 'line',
      smooth: true,
      symbolSize: 2,
      data: ultraviolet,
      showSymbol: false,
      itemStyle: {
        normal: {
          color: 'rgba(131, 208, 222, 1)',
          lineStyle: {
            color: 'rgba(131, 208, 222, 1)',
            width: 2,
          }
        }
      },
      emphasis: {
        disabled: true,
      },
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(131, 208, 222, 1)" },
            { offset: 0.8, color: "rgba(131, 208, 222, 0)" },
          ])
        }
      },
    });
  } else if (btnType.value == 'voc') {

  }
  const usedmemoryInstance =
    echarts.getInstanceByDom(usedmemory.value, 'macarons') ||
    echarts.init(usedmemory.value, 'macarons');
  usedmemoryInstance.clear()
  usedmemoryInstance.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: '#4080FF', // 设置指示线的颜色
          width: 2, // 设置指示线的宽度
          type: 'dashed',
          shadowColor: '#482ff7'
        }
      },
      backgroundColor: '#FFFFFF'
      // formatter: function (params) {
      //   return `<div class="tooltip_box">
      //         <p class="title">${params[0].name}</p>
      //         <p class="bottom_value"> <span>Number of cases</span>${params[0].value}</p>
      //       </div>`
      // }
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
      }
    },
    grid: {
      left: '10px',
      right: '10px',
      bottom: '2%',
      top: '4%',
      containLabel: true
    },
    series: seriesData,
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
const handleClick = (tab, event) => {
  console.log(tab, event);
};
const close = () => {
  btnType.value = 'temperature';
  activeName.value = 'first';
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
  form.value.startDate = v.cusTime?.[0] || '';
  form.value.endDate = v.cusTime?.[1] || '';
}, {
  deep: true
})
const handleSubmit = async () => {
  if (!form.value.cusTime) {
    ElMessage.error('请选择时间范围！');
    return;
  }
  const params = {
    deviceId: form.value.deviceId,
    startDate: form.value.startDate,
    endDate: form.value.endDate
  };
  const { rows } = await getDeviceHisList(params);
  additionalList.value = rows;
  initChart(rows);
};
const doDownload = async () => {
  if (!form.value.cusTime) {
    ElMessage.error('请选择时间范围！');
    return;
  }
  const params = 'deviceId=' + form.value.deviceId + '&startDate=' + form.value.startDate + '&endDate=' + form.value.endDate
  getDeviceHisMonitorData(params);
};
const acceptParams = params => {
  proFormProps.value = params;
  form.value['deviceId'] = params.row['deviceId'];
  form.value['cabinetAddr'] = params.row?.houseName
  if (params.row?.cabinetName) {
    form.value['cabinetAddr'] = params.row?.houseName + ' ' + params.row?.cabinetName
  }
  form.value['cabinetAddrDetail'] = params.row['devicePosition'];
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
