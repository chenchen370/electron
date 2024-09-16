<template>
  <el-dialog class="by-el-dialog" v-model="open" width="1280px" append-to-body :before-close="handleCancel" align-center
    :show-close="false">
    <template #header="{ titleId, titleClass }">
      <span class="detail-title">多媒体文档信息</span>
    </template>
    <div>
      <el-tabs @tab-change="handleChangeTab" v-model="curtTypeIndex">
        <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.label"> </el-tab-pane>
      </el-tabs>

      <component :is="tabList[curtTypeIndex].component" />
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-space :size="29">
          <el-button class="button-p-cancel" @click="handleCancel">关闭</el-button>
          <el-button class="button-c-sure" type="primary" @click="handleSure">确定</el-button>
        </el-space>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import formImage from './form-image/form-image.vue'
import formVideo from './form-video/form-video.vue'
import formAudio from './form-audio/form-audio.vue'
import formAnimation from './form-animation/form-animation.vue'
import formThreeD from './form-three-d/form-three-d.vue'
import formEJournal from './form-e-journal/form-e-journal.vue'
import formOther from './form-other/form-other.vue'
import formStudy from './form-study/form-study.vue'

const props = defineProps({
  rowObj: {
    type: Object,
    default: () => ({})
  },
  curtTypeValue: {
    type: String,
    default: '0'
  }
})

const open = true

const tabList = [
  { label: '图片资料', value: '1', component: formImage },
  { label: '视频资料', value: '2', component: formVideo },
  { label: '研究论著信息', value: '3', component: formStudy },
  { label: '音频资料', value: '4', component: formAudio },
  { label: '动画资料', value: '5', component: formAnimation },
  { label: '3D文件', value: '6', component: formThreeD },
  { label: '电子出版物', value: '7', component: formEJournal },
  { label: '其他', value: '8', component: formOther }
]

const emits = defineEmits(['handleCloseDialogMedia'])

const curtTypeIndex = ref('0')
watch(
  () => props.curtTypeValue,
  val => {
    console.log('val ===>', props.curtTypeValue)
    console.log(
      'val ===>',
      tabList.findIndex(v => v.value === val)
    )
    curtTypeIndex.value = tabList.findIndex(v => v.value === val).toString()
  },
  {
    immediate: true,
    deep: true
  }
)
function handleTypeClick(item, index) { }

function handleChangeTab(index) {
  curtTypeIndex.value = index
}
function handleSure() {
  emits('handleCloseDialogMedia')
}

function handleCancel() {
  emits('handleCloseDialogMedia')
}
</script>

<style lang="scss" scoped>
.detail-title {
  font-family: Source Han Serif CN;
  font-size: 20px;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0em;

  font-variation-settings: 'opsz';
  font-feature-settings: 'kern';
  color: #064235;
}
</style>
