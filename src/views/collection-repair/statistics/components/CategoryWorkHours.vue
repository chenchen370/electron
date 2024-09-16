<template>
  <div :id="id"></div>
</template>

<script setup>
import * as echarts from 'echarts'
import { render } from 'nprogress';

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
      text: '文物类别修复周期或工时统计',
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
        type: 'custom',
        data: props.data.series.cycle,
        renderItem(params, api) {
          const basicsCoord = api.coord([api.value(0), api.value(1)])

          const topBasicsYAxis = basicsCoord[1]
          const basicsXAxis = basicsCoord[0] - 12
          const bottomYAxis = api.coord([api.value(0), 0])[1]
          return {
            type: 'group',
            children: [
              {
                type: 'leftShape',
                shape: { topBasicsYAxis, basicsXAxis, bottomYAxis },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#FFC174' },
                    { offset: 1, color: '#FCE2C2' }
                  ])
                }
              },
              {
                type: 'rightShape',
                shape: { topBasicsYAxis, basicsXAxis, bottomYAxis },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#FCE2C2' },
                    { offset: 1, color: '#FFC174' }
                  ])
                }
              },
              {
                type: 'bottomShape',
                shape: { topBasicsYAxis, basicsXAxis, bottomYAxis },
                style: {
                  fill: 'rgba(200, 154, 98, 0.5)'
                }
              },
              {
                type: 'topShape',
                shape: { topBasicsYAxis, basicsXAxis, bottomYAxis },
                style: {
                  fill: '#FFD7A6'
                }
              }
            ]
          }
        },
      }, {
        name: '工时',
        type: 'custom',
        data: props.data.series.work,
        renderItem(params, api) {
          const basicsCoord = api.coord([api.value(0), api.value(1)])

          const topBasicsYAxis = basicsCoord[1]
          const basicsXAxis = basicsCoord[0] + 12
          const bottomYAxis = api.coord([api.value(0), 0])[1]
          return {
            type: 'group',
            children: [
              {
                type: 'leftShape',
                shape: { topBasicsYAxis, basicsXAxis, bottomYAxis },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#75BBAA' },
                    { offset: 1, color: '#B9EDE0' }
                  ])
                }
              },
              {
                type: 'rightShape',
                shape: { topBasicsYAxis, basicsXAxis, bottomYAxis },
                style: {
                  fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#B9EDE0' },
                    { offset: 1, color: '#75BBAA' }
                  ])
                }
              },
              {
                type: 'bottomShape',
                shape: { topBasicsYAxis, basicsXAxis, bottomYAxis },
                style: {
                  fill: 'rgba(89, 172, 151, 0.5)'
                }
              },
              {
                type: 'topShape',
                shape: { topBasicsYAxis, basicsXAxis, bottomYAxis },
                style: {
                  fill: '#ACE8D9'
                }
              },

            ]
          }
        },
      }
    ],
    dataZoom: [
      {
        realtime: true, //拖动滚动条时是否动态的更新图表数据
        type: 'inside', // 设置为滑动条型式
        show: true, // 显示dataZoom组件
        startValue: 0, // 默认显示的起始位置为0
        endValue: 5, // 默认显示的结束位置为100
        filterMode: 'filter' // 设置为filter模式，即数据超过范围时会被过滤掉
      }
    ]
  }
}

function drawShape() {
  const WIDTH = 8;
  const OBLIQUE_HEIGHT = 5;

  const leftShape = echarts.graphic.extendShape({
    buildPath(ctx, shape) {
      const { topBasicsYAxis, bottomYAxis, basicsXAxis } = shape

      const p1 = [basicsXAxis - WIDTH, topBasicsYAxis - OBLIQUE_HEIGHT]
      const p2 = [basicsXAxis - WIDTH, bottomYAxis]
      const p3 = [basicsXAxis, bottomYAxis + OBLIQUE_HEIGHT]
      const p4 = [basicsXAxis, topBasicsYAxis]
      ctx.moveTo(p1[0], p1[1])
      ctx.lineTo(p2[0], p2[1])
      ctx.lineTo(p3[0], p3[1])
      ctx.lineTo(p4[0], p4[1])
    }
  })

  const rightShape = echarts.graphic.extendShape({
    buildPath(ctx, shape) {
      const { topBasicsYAxis, bottomYAxis, basicsXAxis } = shape
      const p1 = [basicsXAxis, topBasicsYAxis]
      const p2 = [basicsXAxis, bottomYAxis + OBLIQUE_HEIGHT]
      const p3 = [basicsXAxis + WIDTH, bottomYAxis]
      const p4 = [basicsXAxis + WIDTH, topBasicsYAxis - OBLIQUE_HEIGHT]
      ctx.moveTo(p1[0], p1[1])
      ctx.lineTo(p2[0], p2[1])
      ctx.lineTo(p3[0], p3[1])
      ctx.lineTo(p4[0], p4[1])
    }
  })

  const topShape = echarts.graphic.extendShape({
    buildPath(ctx, shape) {
      const { topBasicsYAxis, bottomYAxis, basicsXAxis } = shape
      const p1 = [basicsXAxis, topBasicsYAxis + OBLIQUE_HEIGHT - 5]
      const p2 = [basicsXAxis + WIDTH, topBasicsYAxis - 5]
      const p3 = [basicsXAxis, topBasicsYAxis - OBLIQUE_HEIGHT - 5]
      const p4 = [basicsXAxis - WIDTH, topBasicsYAxis - 5]
      ctx.moveTo(p1[0], p1[1])
      ctx.lineTo(p2[0], p2[1])
      ctx.lineTo(p3[0], p3[1])
      ctx.lineTo(p4[0], p4[1])
    }
  })
  const bottomShape = echarts.graphic.extendShape({
    buildPath(ctx, shape) {
      const { topBasicsYAxis, bottomYAxis, basicsXAxis } = shape
      const p1 = [basicsXAxis, bottomYAxis + OBLIQUE_HEIGHT - 2]
      const p2 = [basicsXAxis + WIDTH, bottomYAxis - 2]
      const p3 = [basicsXAxis, bottomYAxis - OBLIQUE_HEIGHT - 2]
      const p4 = [basicsXAxis - WIDTH, bottomYAxis - 2]
      ctx.moveTo(p1[0], p1[1])
      ctx.lineTo(p2[0], p2[1])
      ctx.lineTo(p3[0], p3[1])
      ctx.lineTo(p4[0], p4[1])
    }
  })

  echarts.graphic.registerShape('leftShape', leftShape)
  echarts.graphic.registerShape('rightShape', rightShape)
  echarts.graphic.registerShape('topShape', topShape)
  echarts.graphic.registerShape('bottomShape', bottomShape)
}
drawShape()
</script>
