<template>
  <div :id="id"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'
import axios from 'axios';
interface IProps {
  title: string
  xData: string[]
  series: {
    name: string
    type: 'bar'
    data: any[]
  }[]
  rotate?: number
  showLen?: number
}
const props = defineProps<IProps>()
const id = ref<string>(`$${new Date().getTime().toString()}${Math.floor(Math.random() * 10000)}`)
let chart: any = null

onMounted(() => {
  init()
  window.addEventListener('resize', resize)
})
onUnmounted(() => {
  chart?.dispose(document.getElementById(id.value) as HTMLElement)
  window.removeEventListener('resize', resize)
})

function resize() {
  chart?.resize() // 监听宽度 重新绘制
}

function init() {
  if (!document.getElementById(id.value)) {
    return
  }
  echarts.dispose(document.getElementById(id.value) as HTMLElement)
  chart = echarts.init(document.getElementById(id.value) as HTMLElement)
  chart.setOption(getOptions())
}
console.log(props)
function getOptions() {
  return {
    title: {
      text: props.title,
      textStyle:{
        color:"#000",
        fontFamily:'宋体',
      },
      left:30
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      textStyle:{
        color:"#3d3d3d",
        fontSize:14,
      },
      itemGap:40,
      right:30
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '8%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: props.xData,
      axisLabel: {
        rotate: props?.rotate ?? 0,
        fontSize:14,
        color:'#999',
      },
      axisLine:{
        show:false
      },
      axisTick:{
        show:false
      },
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0,1],
      axisLabel: {
        fontSize:14,
        color:'#999',
      },
    },
    series: props.series,
    dataZoom: [
      {
        realtime: true, //拖动滚动条时是否动态的更新图表数据
        type: 'inside', // 设置为滑动条型式
        show: true, // 显示dataZoom组件
        startValue: 0, // 默认显示的起始位置为0
        endValue: props.showLen??6, // 默认显示的结束位置为100
        filterMode: 'filter' // 设置为filter模式，即数据超过范围时会被过滤掉
      }
    ]
  }
}

watch(
  props.xData,
  () => {
    init()
  },
  {
    deep: true
  }
)

watch(
  () => props.series,
  () => {
    init()
  },
  {
    immediate: true,
    deep: true
  }
)
</script>
