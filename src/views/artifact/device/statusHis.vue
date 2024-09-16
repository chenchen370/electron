<template>
  <el-dialog :title="`${proFormProps.title}`" v-model="proFormVisible" width="1028px" @close="close" align-center
    :show-close="false">
    <div class="td-flex full-width">
      <div class="full-width td-flex-item">
        <el-form ref="formRef" :model="form" :disabled="proFormProps.isView">
          <el-row :gutter="10">
            <el-col :span="24">
              <el-form-item prop="monitingStatus">
                <div class="td-flex">
                  <div class="demo-date-picker">
                    <div class="block">
                      <el-date-picker v-model="cusTime" type="daterange" range-separator="至" start-placeholder=""
                        end-placeholder="" value-format="YYYY-MM-DD" @change="handleDateChange" />
                    </div>
                  </div>
                  <div class="td-flex center">
                    <el-button type="primary" @click="handleSubmit" class="td-ml10">
                      查询
                    </el-button>
                  </div>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              {{ proFormProps.row.deviceRunStatus == 1 ? '异常:' : '正常' }}
              {{
                proFormProps.row.deviceRunStatus == 1
                  ? proFormProps.row.updateTime
                  : ''
              }}
            </el-col>
          </el-row>
          <el-table class="td-mt20" :data="additionalList" border>
            <el-table-column label="开始时间" prop="startTime" show-overflow-tooltip>
              <template #default="scope">
                {{ scope.row.startTime?.replace('T', ' ') }}
              </template>
            </el-table-column>
            <el-table-column label="结束时间" prop="endTime" show-overflow-tooltip>
              <template #default="scope">
                {{ scope.row.endTime?.replace('T', ' ') }}
              </template>
            </el-table-column>
            <el-table-column label="运行状态" prop="deviceRunStatus" show-overflow-tooltip width="90">
              <template #default="scope">
                <div :class="[scope.row.deviceRunStatus == 1 ? 'monitor-theme_2' : '']">
                  {{ scope.row.deviceRunStatus == 1 ? '异常' : '正常' }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="持续时长" prop="holdDuration" show-overflow-tooltip>
              <template #default="scope">
                {{ formatterDuration(scope.row.holdDuration) }}
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </div>
      <div class="m-echart_box">
        <div ref="commandstats" style="height: 350px" />
        <div ref="usedmemory" style="height: 350px" />
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { getDeviceStatusAnalyzeList } from '@/api/warning/device';
import { reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { parseTime } from '@/utils/zhebo';
const { proxy } = getCurrentInstance();
const { moniting_status } = proxy.useDict('moniting_status');
import * as echarts from 'echarts';
import { addAssess } from '@/api/warning/assess';

const proFormVisible = ref(false);
const formRef = ref(null);
const form = ref({
  deviceId: ''
});
const cusTime = ref([]);
const additionalList = ref([]);
const proFormProps = ref({
  isView: false,
  title: '',
  row: {}
});
const commandstats = ref(null);
const usedmemory = ref(null);
const echartsData = ref({ dataX: [], dataY: [] });

const handleDateChange = value => {
  if (value && value.length === 2) {
    const start = new Date(value[0]);
    const end = new Date(value[1]);
    const maxMonths = 3; // 最多选择3个月
    const maxDate = new Date(start);
    maxDate.setMonth(maxDate.getMonth() + maxMonths);
    if (end > maxDate) {
      ElMessage.error('选择的时间跨度不能超过3个月！');
      cusTime.value = [start, maxDate]; // 重置时间范围
    }
  }
};

const getTimeRange = v => {
  const end = new Date();
  const start = new Date();
  start.setTime(start.getTime() - 3600 * 1000 * 24 * v);
  cusTime.value = [
    parseTime(start, '{y}-{m}-{d}'),
    parseTime(end, '{y}-{m}-{d}')
  ];
  // return [start, end];
  // cusTime.value = [start, end]
  handleSubmit();
};
const initChart = res => {
  let arr = [];
  res.rows.map(v => {
    // arr.push([new Date(v.startTime).getTime(), v.deviceRunStatus]);
    arr.push({
      data: [
        [new Date(v.startTime).getTime(), v.deviceRunStatus],
        [new Date(v.endTime).getTime(), v.deviceRunStatus]
      ],
      type: 'line',
      barWidth: 10,
      showBackground: true,
      // itemStyle: {
      //   normal: {
      //     areaStyle: {
      //       type: 'linear',
      //       color: {
      //         type: 'linear',
      //         x: 0,
      //         y: 0,
      //         x2: 1,
      //         y2: 1,
      //         colorStops: [
      //           { offset: 0, color: 'rgba(30, 231, 255, 0.1)' },
      //           { offset: 1, color: 'rgba(111, 66, 251, 0.1)' }
      //         ],
      //         global: false // 缺省为 false
      //       }
      //     },
      //     borderColor: '#4080FF', // 圆点边框颜色
      //     borderWidth: 4, // 圆点边框宽度
      //     color: '#fff'
      //   }
      // },
      // backgroundStyle: {
      //   color: 'rgba(180, 180, 180, 0.2)'
      // },
      smooth: true, //圆滑曲线
      symbol: 'circle',
      showSymbol: false, // 初始化不显示标记
      symbolSize: 8,
      lineStyle: {
        width: 1,
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: v.deviceRunStatus == 1 ? '#F56C6C' : '#5c71c8'
            },
            { offset: 1, color: v.deviceRunStatus == 1 ? '#F56C6C' : '#5c71c8' }
          ],
          global: false // 缺省为 false
        }
      }
    });
  });
  const commandstatsIntance = echarts.init(commandstats.value, 'macarons');
  commandstatsIntance.setOption({
    tooltip: {
      trigger: 'item',
      formatter: params =>
        params.name +
        '：' +
        formatterDuration(params.value) +
        '(' +
        (params.percent || 0) +
        '%)'
    },
    series: [
      {
        name: '状态',
        type: 'pie',
        roseType: 'radius',
        radius: [15, 95],
        center: ['50%', '38%'],
        animationEasing: 'cubicInOut',
        animationDuration: 1000,
        data: [
          { value: res.normalDuration || 0, name: '正常' },
          { value: res.exceptionDuration || 0, name: '异常' }
        ]
      }
    ]
  });

  const usedmemoryInstance =
    echarts.getInstanceByDom(usedmemory.value, 'macarons') ||
    echarts.init(usedmemory.value, 'macarons');
  usedmemoryInstance.clear();

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
    },
    xAxis: {
      type: 'time',
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
        show: true,
        lineStyle: {
          color: '#E5E8EF'
        }
      },
      axisLabel: {
        interval: 0,
        rotate: 45 //倾斜度 -90 至 90 默认为0
        // margin:8,
        // textStyle:{
        //   color:"#000000"
        // }
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
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    grid: {
      left: '10px',
      right: '10px',
      bottom: '2%',
      top: '4%',
      containLabel: true
    },
    series: arr
  });
};

const close = () => {
  proFormVisible.value = false;
};

const handleSubmit = async () => {
  const params = {
    deviceId: form.value.deviceId,
    startDate: cusTime.value?.[0] || '',
    endDate: cusTime.value?.[1] || ''
  };
  const res = await getDeviceStatusAnalyzeList(params);
  additionalList.value = res.rows;
  res.rows?.map(v => { });
  initChart(res);
};

const acceptParams = async params => {
  proFormProps.value = params;
  form.value['deviceId'] = params.row['deviceId'];
  proFormVisible.value = true;
  getTimeRange(90)
};

defineExpose({
  acceptParams
});

const formatterDuration = value => {
  let days = Math.floor(value / (1000 * 60 * 60 * 24));
  let hours = Math.floor((value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((value % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.round((value % (1000 * 60)) / 1000);
  return (
    (0 === days ? '' : days + '天') +
    (0 === hours ? '' : hours + '小时') +
    (0 === minutes ? '' : minutes + '分钟') +
    (0 === seconds ? '' : seconds + '秒')
  );
};
</script>
<style lang="scss" scoped>
.m-echart_box {
  width: 450px;
}
</style>
