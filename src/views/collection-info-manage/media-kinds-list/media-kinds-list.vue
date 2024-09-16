<template>
  <div>
    <div class="type-wrap">
      <div class="left">
        <el-space :size="17">
          <span
            class="type-item"
            :class="curtMediaIndex === index && 'type-item-active'"
            v-for="(item, index) in mediaList"
            :key="index"
            @click="handleMediaItemClick(item, index)"
          >
            {{ item.name }}
          </span>
        </el-space>
      </div>
      <div class="right" v-if="handleStatus === 'submit'">
        <comm-handle-btn title="新增多媒体" img-name="add" @handle-click="handleOpenMediaAddOrEdit" />
      </div>
    </div>

    <div>
      <component
        :is="mediaList[curtMediaIndex].component"
        @handle-row-edit="handleRowEdit"
        @handle-row-check="handleRowCheck"
        @handle-row-audit="handleRowAudit"
        :handle-status="handleStatus"
        :relics-id="curtCollectionRow.relicsNo"
        :media-type="mediaList[curtMediaIndex].mediaType"
        ref="currentTabRef"
      />
    </div>

    <div class="handle-wrap">
      <el-space :size="39">
        <el-button :class="handleStatus !== 'submit' ? 'coder-wang-button-primary' : 'coder-wang-button-black'" @click="handleCloseMediaKindsList">
          返回
        </el-button>
        <el-button v-if="handleStatus === 'submit'" class="coder-wang-button-primary" type="primary" @click="handleSubmitAudit">提交审核</el-button>
      </el-space>
    </div>

    <dialog-media-select v-if="isShowMediaSelect" @handle-close-media-select="handleCloseMediaSelect" />
    <dialog-media-add-or-edit
      v-if="isShowMediaAddOrEdit"
      :curt-collection-row="curtCollectionRow"
      :current-row="currentRow"
      :title="currentTitle"
      :proxy="proxy"
      :media-select-type="mediaSelectType"
      :handle-status="handleStatus"
      @handle-close-media-add-or-edit="handleCloseMediaAddOrEdit"
    />

    <dialog-study-add-or-edit
      v-if="isShowStudyAddOrEdit"
      :curt-collection-row="curtCollectionRow"
      :current-row="currentRow"
      :title="currentTitle"
      :proxy="proxy"
      :handle-status="handleStatus"
      @handle-close-study-add-or-edit="handleCloseStudyAddOrEdit"
    />

    <!-- 提交审核 -->
    <dialog-media-audit v-if="isShowDialogMediaAudit" :current-row="currentRow" :proxy="proxy" @handle-close-dialog-media-audit="handleCloseDialogMediaAudit" />
  </div>
</template>

<script setup>
import CommHandleBtn from '@/components/comm-cpns/comm-handle-btn/comm-handle-btn.vue'
import listImage from './list-image/list-image.vue'
import listVideo from './list-video/list-video.vue'
import listStudy from './list-study/list-study.vue'
import listAudio from './list-audio/list-audio.vue'
import listAnimation from './list-animation/list-animation.vue'
import listThreeD from './list-three-d/list-three-d.vue'
import listEJournal from './list-e-journal/list-e-journal.vue'
import listOther from './list-other/list-other.vue'

import DialogMediaSelect from './dialog/dialog-media-select.vue'
import DialogMediaAddOrEdit from './dialog/dialog-media-add-or-edit.vue'
import DialogMediaAudit from './dialog/dialog-media-audit.vue'
import DialogStudyAddOrEdit from '@/views/collection-info-manage/media-kinds-list/dialog/dialog-study-add-or-edit.vue'
import { auditBatchCollection, auditCollection } from '@/api/collection-info-manage'
const { proxy } = getCurrentInstance()

const props = defineProps({
  curtCollectionRow: {
    type: Object,
    default: () => ({})
  },
  handleStatus: {
    type: String,
    default: 'check' // submit （增删改 + 提交审核） check（查看）audit（触发表单审核）
  }
})
const emits = defineEmits(['handleCloseMediaKindsList'])

const mediaList = [
  { name: '图片资料', mediaType: '0', component: listImage },
  { name: '视频资料', mediaType: '1', component: listVideo },
  { name: '研究论著资料', mediaType: '999', component: listStudy },
  { name: '音频资料', mediaType: '2', component: listAudio },
  { name: '动画资料', mediaType: '3', component: listAnimation },
  { name: '3D文件', mediaType: '4', component: listThreeD },
  { name: '电子出版', mediaType: '5', component: listEJournal },
  { name: '其他', mediaType: '6', component: listOther }
]

const currentTabRef = ref()
function handleSetRefMap(el, index) {
  currentTabRef.value[`ref_${index}`] = el
}

// 当前 索引值
const curtMediaIndex = ref(0)
function handleMediaItemClick(item, index) {
  curtMediaIndex.value = index
  nextTick(() => {
    console.log(currentTabRef.value)
  })
}

// 当前信息
const currentRow = ref({})
// 当前标题
const currentTitle = ref('')

// 弹窗 显示 / 隐藏
const isShowMediaAddOrEdit = ref(false)
const isShowStudyAddOrEdit = ref(false)

const isShowMediaSelect = ref(false)
// 当前选择的 媒体类型
const mediaSelectType = ref()

// 新增 --- 第一步 ===> 打开类型
function handleOpenMediaAddOrEdit() {
  isShowMediaSelect.value = true
}
// 新增 --- 第二步 ===> 选择类型 / 关闭类型
function handleCloseMediaSelect(e) {
  if (e) {
    currentTitle.value = `${mediaList.find(media => media.mediaType == e)?.name} - 新增`
    mediaSelectType.value = e
    currentRow.value = {}
    if (mediaSelectType.value != '999') {
      isShowMediaAddOrEdit.value = true
    } else {
      isShowStudyAddOrEdit.value = true
    }
  } else {
    isShowMediaSelect.value = false
  }
}

// 新增 --- 第三步 ===> 关闭表单弹窗
function handleCloseMediaAddOrEdit(status) {
  isShowMediaAddOrEdit.value = false
  if (status) handleClose()
}
function handleCloseStudyAddOrEdit(status) {
  isShowStudyAddOrEdit.value = false
  if (status) handleClose()
}
function handleClose() {
  const ind = mediaList.findIndex(media => media.mediaType === mediaSelectType.value)
  console.log('ind ===>', ind)
  if (curtMediaIndex.value == ind) {
    console.log('currentTabRef.value? ===>', currentTabRef.value)
    currentTabRef.value?.handleRefresh?.()
  }

  mediaSelectType.value = -1
}

// 查看 ===》 直接弹窗
function handleRowCheck(row) {
  currentRow.value = row
  mediaSelectType.value = mediaList[curtMediaIndex.value].mediaType
  currentTitle.value = `${mediaList.find(media => media.mediaType == mediaSelectType.value)?.name} - 详情`
  if (mediaSelectType.value != '999') {
    isShowMediaAddOrEdit.value = true
  } else {
    isShowStudyAddOrEdit.value = true
  }
}

// 编辑 ===》直接弹窗
function handleRowEdit(row) {
  currentRow.value = row
  mediaSelectType.value = mediaList[curtMediaIndex.value].mediaType
  currentTitle.value = `${mediaList.find(media => media.mediaType == mediaSelectType.value)?.name} - 修改`
  if (mediaSelectType.value != '999') {
    isShowMediaAddOrEdit.value = true
  } else {
    isShowStudyAddOrEdit.value = true
  }
}

// 返回
function handleCloseMediaKindsList() {
  emits('handleCloseMediaKindsList')
}

// 审核媒体
const isShowDialogMediaAudit = ref(false)
function handleRowAudit(row) {
  currentRow.value = row
  mediaSelectType.value = mediaList[curtMediaIndex.value].mediaType
  isShowDialogMediaAudit.value = true
}
function handleCloseDialogMediaAudit() {
  currentRow.value = {}
  isShowDialogMediaAudit.value = false
}

// 提交审核
function handleSubmitAudit() {
  console.log('currentTabRef.value ==>', currentTabRef.value)
  const info = currentTabRef.value.handleGetIds?.()
  mediaSelectType.value = mediaList[curtMediaIndex.value].mediaType
  let msgError, msgConfirm
  if (mediaSelectType.value != '999') {
    msgError = '请先选择媒体'
    msgConfirm = `是否提交审核 媒体名称: ${info.msg} 数据项？`
  } else {
    msgError = '请先选择研究论著'
    msgConfirm = `是否提交审核 研究论著题名: ${info.msg} 数据项？`
  }

  if (info.ids.length === 0) return proxy?.$modal.msgError(msgError)
  proxy.$modal
    .confirm(msgConfirm)
    .then(() => auditCollection(info.ids.join(',')))
    .then(() => {
      currentTabRef.value?.handleRefresh?.()
      proxy.$modal.msgSuccess('提交审核成功')
    })
    .catch(() => {})
}
</script>

<style lang="scss" scoped>
.type-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  margin-top: 21px;
  .left {
    flex: 1;
    .type-item {
      cursor: pointer;
      padding: 0 18px;
      height: 36px;
      background: #f8f9f4;
      border-radius: 2px;
      border: 1px solid #aec2bd;
      display: flex;
      justify-content: center;
      align-items: center;
      font-family:
        Source Han Serif CN,
        Source Han Serif CN;
      font-weight: 400;
      font-size: 16px;
      color: #064235;
      line-height: 16px;
      text-align: center;
      font-style: normal;
      text-transform: none;

      &-active {
        border: none;
        background-color: #116652;
        color: #fff;
      }
    }
  }

  .right {
  }
}

.handle-wrap {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
