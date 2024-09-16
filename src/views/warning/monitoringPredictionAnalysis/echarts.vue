<template>
  <div :id="id"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as echarts from 'echarts';

const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  }
});
const id = ref(`$${new Date().getTime().toString() }${Math.floor(Math.random() * 10000)}`)
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
function init () {
  if (!document.getElementById(id.value)) {
    return;
  }
  echarts.dispose(document.getElementById(id.value));
  chart = echarts.init(document.getElementById(id.value));
  getOptions()&&chart.setOption(getOptions());
}

function getOptions() {
  return props.data
}

watch(() => props.data, () => {
  init()
},{
  immediate: true,
  deep: true
})
</script>
