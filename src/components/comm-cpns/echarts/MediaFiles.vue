<template>
  <div :id="id"></div>
</template>

<script setup>
import * as echarts from 'echarts';

const props = defineProps({
  data: {
    type: Array,
    default: () => ([])
  }
})

watch(() => props.data, () => {
  init()
}, {
  immediate: false,
  deep: true
})

const id = ref(`$${new Date().getTime().toString()}${Math.floor(Math.random() * 10000)}`)
let chart = null

onMounted(() => {
  init()
  window.addEventListener('resize', resize)
})

onUnmounted(() => {
  chart?.dispose(document.getElementById(id.value));
  window.removeEventListener('resize', resize)
});

function resize() {
  chart?.resize(); // 监听宽度 重新绘制
}
function init() {
  if (!document.getElementById(id.value)) {
    return;
  }
  echarts.dispose(document.getElementById(id.value));
  chart = echarts.init(document.getElementById(id.value));
  chart.setOption(getOptions());
}

function getOptions() {
  return {
    title: {
      text: '藏品多媒体文件统计',
      textStyle: {
        color: "#000",
        fontFamily: '宋体',
      },
      left: 30,
      top: 20,
    },
    color: ['rgba(57, 104, 93, 0.7)', 'rgba(244, 160, 160, 0.7)', 'rgba(67, 75, 248, 0.7)', 'rgba(97, 212, 159, 0.7)', 'rgba(197, 112, 207, 0.7)', 'rgba(160, 217, 244, 0.7)', 'rgba(255, 227, 75, 0.7)'],
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        type: 'pie',
        radius: ['0', '120'],
        label: {
          show: true,
          formatter: '{b} : {c}',
          // alignTo: 'edge',
          color: '#064235',
          fontSize: 14,
        },
        data: props.data
      }
    ]
  }
}
</script>
