<template>
  <el-dialog v-model="visible" width="1280px" :close-on-press-escape="false" append-to-body :before-close="onClose"
    align-center :show-close="false">
    <el-tabs v-model="activeName" class="el-tabs-wrap" :before-leave="onTabBeforeLeave">
      <el-tab-pane label="基本入藏信息" :name="1">
        <InstorageBasicForm ref="instorageBasicFormRef" :is-edit="isEdit" />
      </el-tab-pane>
      <el-tab-pane label="入藏藏品" :name="2">
        <RelicsTable ref="relicsTableRef" :is-edit="isEdit" />
      </el-tab-pane>
    </el-tabs>
    <template #footer>
      <div class="dialog-footer">
        <el-button v-if="activeName === 2" type="primary" @click="onPrev" class="button-c-sure">上一步</el-button>
        <el-button v-if="activeName === 1" type="primary" @click="onNext" class="button-c-sure">下一步</el-button>
        <el-button v-if="activeName === 2" type="primary" @click="submitForm" :loading="submitLoading"
          class="button-c-sure">确 定</el-button>
        <el-button class="button-p-cancel" @click="hide">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { useDialog } from '@/hooks/useDialog'
import InstorageBasicForm from './instorage-basic-form.vue'
import { generateFlowNo, addInWarehouse, updateInWarehouse } from '@/api/warehouse/index'
import RelicsTable from './relics-table.vue'
import { cloneDeep, flatMap } from 'lodash-es'

const list = ref([])
const activeName = ref(1)
const instorageBasicFormRef = ref()
const relicsTableRef = ref()
const { visible, hide, isEdit, submitLoading } = useDialog()
const isStep1 = computed(() => activeName.value === 1)
const { proxy } = getCurrentInstance()

const emits = defineEmits(['ok'])

let editData = {}
async function show(data = {}, isEditModal = false) {
  editData = cloneDeep(data)
  isEdit.value = isEditModal
  visible.value = true
  activeName.value = 1
  submitLoading.value = false
  await init()
}

function onClose() {
  proxy.$modal
    .confirm('当前有更改还未保存，是否确认关闭')
    .then(hide)
    .catch(() => void 0)
}

async function onTabBeforeLeave() {
  if (activeName.value === 1) {
    const valid = await instorageBasicFormRef.value.validate()
    return valid ? Promise.resolve() : Promise.reject()
  }
  return Promise.resolve()
}

async function init() {
  if (!isEdit.value) {
    const flowNo = await generateFlowNo()
    editData.flowNo = flowNo
  }

  await nextTick()
  instorageBasicFormRef.value.init({ data: editData })
  relicsTableRef.value.init({ data: editData })
}

async function onNext() {
  const valid = await instorageBasicFormRef.value.validate()
  if (valid) activeName.value++
}
function onPrev() {
  activeName.value--
}

defineExpose({
  show,
  hide
})

/** 提交按钮 */
function submitForm() {
  const basicInfo = instorageBasicFormRef.value.getValues()
  const total = relicsTableRef.value.getTotal()
  if (total === 0) {
    return proxy.$modal.msgWarning('请至少添加1个藏品')
  }
  basicInfo.flowNo = editData.flowNo
  basicInfo.relicsNum = total
  if (isEdit.value) {
    basicInfo.id = editData.id
  }
  console.log(basicInfo)
  // return
  submitLoading.value = true
  const res = isEdit.value ? updateInWarehouse(basicInfo) : addInWarehouse(basicInfo)
  res
    .then(() => {
      proxy.$modal.msgSuccess('操作成功')
      emits('ok')
      hide()
    })
    .catch(err => {
      proxy.$modal.msgSuccess('操作失败')
    })
    .finally(() => {
      submitLoading.value = false
    })
}

// 表单重置
function reset() { }
</script>

<style lang="scss" scoped>
.el-scrollbar {

  //box-sizing: border-box;
  :deep(.el-scrollbar__bar.is-horizontal) {
    height: 0;
    width: 0;
  }
}

.detail-title {
  font-family: Source Han Serif CN;
  font-weight: 600;
  font-size: 20px;
  color: #064235;
  line-height: 29px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}
</style>
