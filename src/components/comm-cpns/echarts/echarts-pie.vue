<template>
  <div :id="id"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as echarts from 'echarts';
interface IProps {
  title: string,
  data: {
    name: string,
    value: number
  }[]
}
const props = defineProps<IProps>()
const id = ref<string>(`$${new Date().getTime().toString() }${Math.floor(Math.random() * 10000)}`)
let chart: any = null

onMounted(() => {
  init()
  window.addEventListener('resize', resize)
})

onUnmounted(() => {
  chart?.dispose(document.getElementById(id.value) as HTMLElement);
  window.removeEventListener('resize', resize)
});

function resize() {
  chart?.resize(); // 监听宽度 重新绘制
}
function init () {
  if (!document.getElementById(id.value)) {
    return;
  }
  echarts.dispose(document.getElementById(id.value) as HTMLElement);
  chart = echarts.init(document.getElementById(id.value) as HTMLElement);
  chart.setOption(getOptions());
}

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
      trigger: 'item'
    },
    series: [
      {
        type: 'pie',
        radius: ['46', '120'],
        roseType:true,
        label: {
          show: true,
          formatter: '{b} : {c}',
          alignTo: 'edge',
          color:'#064235',
          fontSize:14,
        },
        data: props.data
      }
    ]
  }
}

watch(() => props.data, () => {
  init()
},{
  immediate: true,
  deep: true
})
</script>
