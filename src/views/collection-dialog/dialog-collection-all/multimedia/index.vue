<template>
  <el-tabs class="el-tabs-wrap" @tabChange="handleTableChange">
    <el-tab-pane v-for="(item, index) in list" :label="item.label" class="info_lv_2">
      <template v-if="currentTabIndex == index">
        <el-scrollbar :height="`calc(100vh - 440px)`">
          <component :is="item.component" :ref="el => handleSetRefMap(el, index)" :relics-Id="relicsId" :proxy="proxy"
            :media-type="item?.mediaType" :handle-status="handleStatus" />
        </el-scrollbar>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import ImageInfo from './image-info/index.vue'

import VideoInfo from './video-info/index.vue'

import StudyInfo from './study-info/index.vue'

import AudioInfo from './audio-info/index.vue'

import AnimationInfo from './animation-info/index.vue'

import ThreeDInfo from './three-d-info/index.vue'

import EJournal from './e-journal/index.vue'

import OtherInfo from './other-info/index.vue'

defineProps({
  handleStatus: {
    type: String,
    default: 'check' // add 普通（提交审核 + 保存） edit(编辑) check（查看）
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
const list = [
  { label: '图片资料', component: ImageInfo, mediaType: 0 },
  { label: '视频资料', component: VideoInfo, mediaType: 1 },
  { label: '研究论著信息', component: StudyInfo },
  { label: '音频资料', component: AudioInfo, mediaType: 2 },
  { label: '动画资料', component: AnimationInfo, mediaType: 3 },
  { label: '3D文件', component: ThreeDInfo, mediaType: 4 },
  { label: '电子出版物', component: EJournal, mediaType: 5 },
  { label: '其他', component: OtherInfo, mediaType: 6 }
]
const currentTabIndex = ref(0)
function handleTableChange(e) {
  currentTabIndex.value = e
}

const currentTabRef = ref({})
function handleSetRefMap(el, index) {
  console.log(el)
  currentTabRef.value[`ref_${index}`] = el
}

function handleTabSubmit() {
  nextTick(() => {
    currentTabRef.value[`ref_${currentTabIndex.value}`]?.submit?.()
  })
}
defineExpose({ handleTabSubmit })
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
