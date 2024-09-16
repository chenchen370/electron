<template>
  <div class="app-container">
    <el-card shadow="never" class="mb-10px">
      <el-tabs v-if="tabList.length > 0" class="el-tabs-wrap" @tabChange="handleTableChange">
        <el-tab-pane v-for="(item, index) in tabList" :label="item.label">
          <template v-if="currentTabIndex == index">
            <component :is="item.component" :ref="el => handleSetRefMap(el, index)" :media-type="item.mediaType" />
          </template>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import kindImage from './c-cpns/kind-image/kind-image.vue'
import kindVideo from './c-cpns/kind-video/kind-video.vue'
import kindStudy from './c-cpns/kind-study/kind-study.vue'
import kindAudio from './c-cpns/kind-audio/kind-audio.vue'
import kindAnimation from './c-cpns/kind-animation/kind-animation.vue'
import kindThreeD from './c-cpns/kind-three-d/kind-three-d.vue'
import kindEJournal from './c-cpns/kind-e-journal/kind-e-journal.vue'
import kindTravel from './c-cpns/kind-travel/kind-travel.vue'
import kindOther from './c-cpns/kind-ohter/kind-other.vue'

const { proxy } = getCurrentInstance()
const tabList = [
  { label: '图片库', component: kindImage, mediaType: '0' }, // 完
  { label: '视频库', component: kindVideo, mediaType: '1' },
  { label: '研究论著', component: kindStudy }, // 完
  { label: '音频库', component: kindAudio, mediaType: '2' },
  { label: '动画库', component: kindAnimation, mediaType: '3' }, // 完
  { label: '3D文件库', component: kindThreeD, mediaType: '4' }, // 完
  { label: '电子出版物库', component: kindEJournal, mediaType: '5' }, // 完

  { label: '其他', component: kindOther, mediaType: '6' } // 完
]

const currentTabIndex = ref(0)
function handleTableChange(e) {
  currentTabIndex.value = e
}

const currentTabRef = ref({})
function handleSetRefMap(el, index) {
  currentTabRef.value[`ref_${index}`] = el
}
</script>

<style scoped lang="scss">
.tab-el-form {
  margin-top: 30px;
}
</style>
