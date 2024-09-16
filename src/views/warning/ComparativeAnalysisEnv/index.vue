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
    <el-row :gutter="10">
      <el-col :span="12">
        <EchartsBase h="300px" :data="option_info_1" />
      </el-col>
      <el-col :span="12">
        <EchartsBase h="300px" :data="option_info_2" />
      </el-col>
      <el-col :span="24" class="td-mt10">
        <EchartsBase h="300px" :data="option_info_3" />
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { reactive } from "vue"
import {
  getRepairCollectionCompletionStatus
} from '@/api/collection/statistics.ts';
import useInitOptions from '@/hooks/use_init_options.ts';
import EchartsBase from '@/views/warning/monitoringPredictionAnalysis/echarts.vue';

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

const form = ref({
  houseName: "",
  cabinetName: "",
  name: "",
})
const option_info_1 = ref({});
const option_info_2 = ref({});
const option_info_3 = ref({});
let deviceType = ref('1');
const usedmemory = ref(null);
const typeChange = v => {
  deviceType.value = v;
};

const handleSearch = params => {
  console.log(params)
};
async function initOptions4() {
  try {
    const data = {
      repairStatisticalAnalysisRep: {
      }
    }
    const res = await getRepairCollectionCompletionStatus(data)
    const rows = [{ updateTime: '2024-07-22', temperature: '11', humidity: '21' }, { updateTime: '2024-07-24', temperature: '31', humidity: '15' }]
    const arr = []
    res.data.forEach((item) => {
      const name = options_info.options_relic_state.find((type) => type.value == item.relicState)?.label;
      console.log(name);
      arr.push({
        name,
        value: item.relicStateCountNun
      })
    })
    option_info_1.value = {
      title: {
        text: '区域日环境数据对比-同步/环比',
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
          name: '温湿度均值',
          data: rows.map(v => v.temperature),
          type: 'bar',
          barWidth: 30,
          itemStyle: {
            color: {
              x: 0,
              y: 0,
              x2: 1,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#f3c750' },
                { offset: 1, color: '#f3c750' }
              ],
              global: false // 缺省为 false
            }
          }

        }
      ]
    }
    option_info_2.value = {
      title: {
        text: '历年今日区域环境数据对比',
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
          name: '温湿度均值',
          data: rows.map(v => v.temperature),
          type: 'line',

        }
      ]
    }
    option_info_3.value = {
      title: {
        text: '区域日环境数据峰值',
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
          name: '日环境峰值',
          data: rows.map(v => v.humidity),
          type: 'bar',
          barWidth: 30,
          itemStyle: {
            color: {
              x: 0,
              y: 0,
              x2: 1,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#90ada6' },
                { offset: 1, color: '#90ada6' }
              ],
              global: false
            }
          }
        },
        {
          name: '温湿度',
          data: rows.map(v => v.temperature),
          type: 'line',
          showSymbol: false,
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
                { offset: 0, color: '#c18d9f' },
                { offset: 1, color: '#c18d9f' }
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