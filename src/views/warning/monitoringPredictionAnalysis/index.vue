<template>
  <el-tabs v-model="deviceType" class="demo-tabs" @tabChange="typeChange">
    <el-tab-pane label="展厅" name="1">1</el-tab-pane>
    <el-tab-pane label="库房" name="2">2</el-tab-pane>
  </el-tabs>
  <el-form :model="form" ref="queryRef" :inline="true" label-width="auto">
    <el-form-item label="展厅" prop="houseName">
      <el-input size="large" v-model="form.houseName" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="展柜" prop="cabinetName">
      <el-input size="large" v-model="form.cabinetName" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="设备" prop="name">
      <el-input size="large" v-model="form.name" placeholder="请输入" />
    </el-form-item>
    <el-form-item>
      <el-button class="button-c-primary" type="primary" icon="Search" @click="handleSearch">
        搜索
      </el-button>
      <!-- <el-button class="button-p-black" icon="Refresh" @click="handleReset"> 重置 </el-button> -->
    </el-form-item>
  </el-form>
  <div>
    <div class="td-mb10">
      <div ref="usedmemory" style="height: 300px" />
    </div>
    <el-row :gutter="10">
      <el-col :span="8">
        <EchartsBase h="300px" :data="option_info_4" />
      </el-col>
      <el-col :span="16">
        <!-- <el-card header="天气对环境温湿度的影响" shadow="never" class="mb-10px">
          <EchartsBar h="400px" :x-data="options.option_info_3.xData" :series="options.option_info_3.series" />
        </el-card> -->
        <EchartsBase h="300px" :data="option_info_5" />
      </el-col>
    </el-row>

    <!-- <el-row :gutter="10">
      <el-col :span="12">
        <el-card header="藏品修复 周期、工时的 工作量 统计" shadow="never" class="mb-10px">
          <EchartsBar h="400px" :x-data="options.option_info_1.xData" :series="options.option_info_1.series" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card header="文物类别修复 周期 或 工时 统计" shadow="never" class="mb-10px">
          <EchartsBar h="400px" :x-data="options.option_info_2.xData" :series="options.option_info_2.series" />
        </el-card>
      </el-col>
    </el-row> -->
  </div>
</template>

<script setup>
import { reactive } from "vue"
import {
  getRelicCycleWorkHoursCount,
  getRepairCategoryCycleWorkHoursCount,
  getRepairCollectionCategory,
  getRepairCollectionCompletionStatus
} from '@/api/collection/statistics.ts';
import useInitOptions from '@/hooks/use_init_options.ts';
import EchartsBar from '@/components/comm-cpns/echarts/echarts-bar.vue';
import EchartsBase from '@/views/warning/monitoringPredictionAnalysis/echarts.vue';
import * as echarts from 'echarts';

const options_info = useInitOptions([
  {
    key: "options_artifact_type",
    isDict: true,
    dictCode: "artifact_type"
  },
  {
    key: "options_relic_state",
    isDict: true,
    dictCode: "relic_state"
  },
])

const options = reactive({
  option_info_1: {
    xData: [],
    series: []
  },
  option_info_2: {
    xData: [],
    series: []
  },
  option_info_3: {
    xData: [],
    series: []
  },
})
const option_info_4 = ref({});
const option_info_5 = ref({});
let deviceType = ref('1');
const usedmemory = ref(null);

const typeChange = v => {
  deviceType.value = v;
  // proTable.value?.getTableList();
};
const form = ref({
  houseName: "",
  cabinetName: "",
  name: "",
})
const handleSearch = params => {
  console.log(params)
};
const initChart = (rows = []) => {
  const usedmemoryInstance = echarts.init(usedmemory.value, 'macarons');
  usedmemoryInstance.setOption({
    title: {
      text: '天气变化趋势图',
      textStyle: {
        color: "#064235",
        fontSize: 18,
        fontWeight: "600",
      },
      x: '2%',
      y: '5%'
    },
    backgroundColor: '#fff',
    legend: {
      right: '3%',
      y: '5%'
      // orient: 'vertical',
      // left: 'left',
      // data: [
      //   '日均气温',
      //   '环境温湿度'
      // ]
    },
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
      axisTick: {
        show: false
      },
      axisLine: {
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
      },
      data: rows.map(v => v.updateTime)
    },
    yAxis: [
      {
        type: 'value',
        name: '气温',
        nameTextStyle: {
          color: '#222c3b',
          fontSize: 12,
          lineHeight: 40
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#86909C'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            // type: 'dashed'
          }
        }
      },
      {
        type: 'value',
        name: '温湿度',
        position: 'right',
        nameTextStyle: {
          color: '#222c3b',
          fontSize: 12,
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
          show: false,
          lineStyle: {
            type: 'dashed'
          }
        }
      }
    ],
    grid: {
      left: '4%',
      right: '3%',
      bottom: '5%',
      top: '35%',
      containLabel: true
    },
    series: [
      {
        name: '气温',
        data: rows.map(v => v.humidity),
        type: 'line',
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
              { offset: 0, color: '#f6bd42' },
              { offset: 1, color: '#f6bd42' }
            ],
            global: false // 缺省为 false
          }
        }
      },
      {
        name: '温湿度',
        data: rows.map(v => v.temperature),
        type: 'line',
        yAxisIndex: 1,
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
              { offset: 0, color: '#cc83ff' },
              { offset: 1, color: '#cc83ff' }
            ],
            global: false // 缺省为 false
          }
        }
      }
    ]
  });
};
async function initOptions1() {
  const data = {}
  const res = await getRelicCycleWorkHoursCount(data)
  options.option_info_1.xData = [];
  options.option_info_1.series = [];
  const listCycle = []
  const listWork = []
  res.data.forEach((item) => {
    options.option_info_1.xData.push(item.relicName);
    listCycle.push(item.cycleCountNun);
    listWork.push(item.workingHoursCountNun)
  })
  options.option_info_1.series = [
    {
      name: "周期",
      type: 'bar',
      data: listCycle
    },
    {
      name: "工时",
      type: 'bar',
      data: listWork
    }
  ];
}
initOptions1();

async function initOptions2() {
  try {
    const data = {
      repairStatisticalAnalysisRep: {
        // artifactType: '0', endDate: "2024-04-27", startDate: "1700-01-01", relicState: "0"
      }
    }
    const res = await getRepairCategoryCycleWorkHoursCount(data)
    options.option_info_2.xData = [];
    options.option_info_2.series = [];
    const listCycle = []
    const listWork = []

    res.data.forEach((item) => {
      const name = options_info.options_artifact_type.find((type) => type.value === item.artifactType)?.label;
      options.option_info_2.xData.push(name);
      listCycle.push(item.cycleCountNun);
      listWork.push(item.workingHoursCountNun)
    })

    options.option_info_2.series = [
      {
        name: "周期",
        type: 'bar',
        data: listCycle
      },
      {
        name: "工时",
        type: 'bar',
        data: listWork
      }
    ];
  } catch (e) {
    console.error(e);
  }
}
initOptions2();

async function initOptions3() {
  try {
    const data = {
      repairStatisticalAnalysisRep: {
        // artifactType: '0', endDate: "2024-04-27", startDate: "1700-01-01", relicState: "0"
      }
    }
    const res = await getRepairCollectionCategory(data)
    options.option_info_3.xData = [];
    options.option_info_3.series = [];
    const listType = []
    res.data.forEach((item) => {
      const name = options_info.options_artifact_type.find((type) => type.value === item.artifactType)?.label;
      options.option_info_3.xData.push(name);
      listType.push(item.artifactTypeCountNun);
    })
    options.option_info_3.series = [
      {
        name: "个数",
        type: 'bar',
        data: listType
      },
    ];
  } catch (e) {
    console.error(e);
  }
}
initOptions3();

async function initOptions4() {
  try {
    const data = {
      repairStatisticalAnalysisRep: {
        // artifactType: '0', endDate: "2024-04-27", startDate: "1700-01-01", relicState: "0"
      }
    }
    const res = await getRepairCollectionCompletionStatus(data)
    const rows = [{ updateTime: '2024-07-22', temperature: '11', humidity: '21' }]
    initChart(rows)
    const arr = []
    res.data.forEach((item) => {
      const name = options_info.options_relic_state.find((type) => type.value == item.relicState)?.label;
      console.log(name);
      arr.push({
        name,
        value: item.relicStateCountNun
      })
    })
    option_info_4.value = {
      title: {
        text: '天气占比图',
        textStyle: {
          color: "#064235",
          fontSize: 18,
          fontWeight: "600",
        },
        x: '2%',
        y: '5%'
      },
      backgroundColor: '#fff',
      legend: {
        x: '5%',
        y: '25%',
        orient: 'vertical',
        // left: 'left',
        // data: [
        //   '日均气温',
        //   '环境温湿度'
        // ]
      },
      // grid: {
      //   left: '45%',
      //   right: '3%',
      //   bottom: '5%',
      //   top: '25%',
      //   containLabel: true
      // },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          type: 'pie',
          radius: ['35%', '55%'],
          center: ['60%', '50%'],
          label: {
            show: true,
            formatter: '{b} : {c}'
          },
          data: arr
        }
      ]
    }

    option_info_5.value = {
      title: {
        text: '天气对环境温湿度的影响',
        textStyle: {
          color: "#064235",
          fontSize: 18,
          fontWeight: "600",
        },
        x: '2%',
        y: '5%'
      },
      backgroundColor: '#fff',
      legend: {
        right: '3%',
        y: '8%'
      },
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        axisTick: {
          show: false
        },
        axisLine: {
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
        },
        data: rows.map(v => v.updateTime)
      },
      yAxis: [
        {
          type: 'value',
          name: '温湿度',
          nameTextStyle: {
            color: '#222c3b',
            fontSize: 12,
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
            show: false,
            lineStyle: {
              type: 'dashed'
            }
          }
        }
      ],
      grid: {
        left: '4%',
        right: '3%',
        bottom: '5%',
        top: '35%',
        containLabel: true
      },
      series: [
        {
          name: '气温',
          data: rows.map(v => v.humidity),
          type: 'line',
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
                { offset: 0, color: '#f6bd42' },
                { offset: 1, color: '#f6bd42' }
              ],
              global: false // 缺省为 false
            }
          }
        },
        {
          name: '温湿度',
          data: rows.map(v => v.temperature),
          type: 'line',
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
                { offset: 0, color: '#cc83ff' },
                { offset: 1, color: '#cc83ff' }
              ],
              global: false // 缺省为 false
            }
          }
        }
      ]
    }
  } catch (e) {
    console.error(e);
  }
}
initOptions4();
</script>
<style scoped lang="scss">
:deep(.el-tabs__content) {
  display: none;
}
</style>