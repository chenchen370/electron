<template>
  <div :id="id"></div>
</template>

<script setup>
import * as echarts from 'echarts'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({ xData: [], series: [] })
  }
})

watch(
  props.data,
  () => {
    init()
  },
  {
    immediate: false,
    deep: true
  }
)
const id = ref(`$${new Date().getTime().toString()}${Math.floor(Math.random() * 10000)}`)
let chart = null

onMounted(() => {
  init()
  window.addEventListener('resize', resize)
})
onUnmounted(() => {
  chart?.dispose(document.getElementById(id.value))
  window.removeEventListener('resize', resize)
})

function resize() {
  chart?.resize() // 监听宽度 重新绘制
}

function init() {
  if (!document.getElementById(id.value)) {
    return
  }
  echarts.dispose(document.getElementById(id.value))
  chart = echarts.init(document.getElementById(id.value))
  chart.setOption(getOptions())
}

function getOptions() {
  return {
    title: {
      text: '修复项目完成情况统计',
      textStyle: {
        color: "#000",
        fontFamily: '宋体',
      },
      left: 30,
      top: 20,
    },
    grid: {
      left: '30',
      right: '30',
      top: '80',
      bottom: '20',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
      type: 'category',
      data: props.data.xData,
      axisLabel: {
        fontSize: 14,
        color: '#999',
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, 1],
      axisLabel: {
        fontSize: 14,
        color: '#999',
      },
    },
    series: [
      {
        name: '个数',
        type: 'line',
        smooth: true,
        data: props.data.series,
        symbol: 'circle',
        symbolSize: 10,
        label: {
          show: true,
          position: 'top',
          color: '#064235',
          fontSize: 14
        },
        lineStyle: {
          color: '#FFDBAE'
        },
        itemStyle: {
          borderWidth: 5,
          borderColor: 'rgba(255, 189, 107, 0.4)',
          color: '#fff'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(255, 242, 225, 1)'
            },
            {
              offset: 1,
              color: 'rgba(255, 242, 225, 0)'
            }
          ])
        }
      }
    ],
  }
}
</script>
