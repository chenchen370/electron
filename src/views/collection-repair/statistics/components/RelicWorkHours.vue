<template>
  <div :id="id"></div>
</template>

<script setup>
import * as echarts from 'echarts'

const props = defineProps({
  data: {
    type: Object,
    default: () => ({ xData: [], series: {} })
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
      text: '藏品修复周期、工时的工作量统计',
      textStyle: {
        color: "#000",
        fontFamily: '宋体',
      },
      left: 30,
      top: 20,
    },
    color: ['#FFC174', '#75BBAA'],
    legend: {
      textStyle: {
        color: "#3d3d3d",
        fontSize: 14,
      },
      itemGap: 40,
      right: 30,
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
        interval: 0,
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
        name: '周期',
        type: 'bar',
        data: props.data.series.cycle,
        barWidth: 16,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#FFC174' },
            { offset: 1, color: 'rgba(252, 226, 194, 0.5)' }
          ])
        }
      }, {
        name: '工时',
        type: 'bar',
        data: props.data.series.work,
        barWidth: 16,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#75BBAA' },
            { offset: 1, color: 'rgba(185, 237, 224, 0.5)' }
          ])
        }
      }
    ],
    dataZoom: [
      {
        realtime: true, //拖动滚动条时是否动态的更新图表数据
        type: 'inside', // 设置为滑动条型式
        show: true, // 显示dataZoom组件
        startValue: 0, // 默认显示的起始位置为0
        endValue: 6, // 默认显示的结束位置为100
        filterMode: 'filter' // 设置为filter模式，即数据超过范围时会被过滤掉
      }
    ]
  }
}
</script>
