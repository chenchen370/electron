<template>
  <el-tabs class="el-tabs-wrap">
    <el-tab-pane label="其他信息" class="info_lv_2">
      <el-scrollbar :height="`calc(100vh - 440px)`">
        <other-info ref="currentTabRef" :relics-id="relicsId" :handle-status="handleStatus" :proxy="proxy"
          :optionsInfo="optionsInfo" />
      </el-scrollbar>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import OtherInfo from './other-info/index.vue'

defineProps({
  handleStatus: {
    type: String,
    default: 'check' // submit （新增 + 修改 + 提交审核）check（查看）
  },
  relicsId: {
    type: [String, Number],
    default: null
  },
  proxy: {
    type: Object,
    default: () => ({})
  },
  optionsInfo: {
    type: Object,
    default: () => ({})
  }
})

const currentTabRef = ref()

function handleTabSubmit() {
  nextTick(() => {
    currentTabRef.value?.submit?.()
  })
}
function audit() {
  nextTick(() => {
    currentTabRef.value?.audit?.()
  })
}
defineExpose({ handleTabSubmit, audit })
</script>

<style lang="scss" scoped>
.el-scrollbar {

  //box-sizing: border-box;
  :deep(.el-scrollbar__bar.is-horizontal) {
    height: 0;
    width: 0;
  }
}
</style>
