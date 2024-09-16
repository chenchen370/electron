<template>
  <el-dialog v-model="visible" :title="isEdit ? '编辑藏品' : '新增藏品'" width="1280px" append-to-body align-center
    :show-close="false">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="auto" size="large" label-position="top">
      <el-row :gutter="40">
        <el-col :span="8">
          <el-form-item label="藏品名称" prop="relicName">
            <el-input v-model="form.relicName" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="数量" prop="relicNum">
            <el-input v-model="form.relicNum" clearable placeholder="请输入">
              <template #append>
                <el-select v-model="form.numUnit" clearable placeholder="请选择单位" style="width: 100%">
                  <el-option v-for="item in options.options_actual_quantity_unit" :key="item.value" :label="item.label"
                    :value="item.value" />
                </el-select>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="质地类别" prop="relicMaterial">
            <el-select v-model="form.relicMaterial" clearable placeholder="请选择质地类别" style="width: 100%">
              <el-option v-for="item in options.options_cp_texture_1" :key="item.dictValue" :label="item.dictLabel"
                :value="item.dictValue" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="8">
          <el-form-item label="年代" prop="relicYear">
            <el-tree-select node-key="dictCode" v-model="form.relicYear" clearable placeholder="请选择"
              :data="options.options_years" style="width: 100%" :props="{
                children: 'children',
                label: 'dictLabel',
                value: 'dictCode'
              }" check-strictly />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="具体年代" prop="relicYearsDetail">
            <el-input v-model="form.relicYearsDetail" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="备注" prop="relicDesc">
        <el-input type="textarea" v-model="form.relicDesc" :rows="4" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="上传图片" prop="relicPath">
        <ImageUpload v-model="form.relicPath" uploadUrl="/heritage/file/upload/common" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button class="button-c-sure" type="primary" @click="onSubmit" :loading="submitLoading">确 定</el-button>
        <el-button class="button-p-cancel" @click="hide">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
/**
 * 新增或编辑藏品信息
 */
import { useFormDialog } from '@/hooks/useFormDialog'
import { cloneDeep, isEmpty } from 'lodash-es'
import { useOptions } from './options'
import { addRelic, updateRelic } from '@/api/flow/index'

const options = useOptions()

const { visible, formRef, isEdit, submitLoading, validate, onSubmit, show, hide } = useFormDialog({
  onShow,
  onSuccess,
  onAdd,
  onEdit
})
const form = reactive({
  relicName: undefined,
  relicNum: undefined,
  relicYear: undefined,
  relicYearsDetail: undefined,
  relicMaterial: undefined,
  relicDesc: undefined,
  relicPath: undefined,
  flowType: 1
})
const rules = {
  relicName: [{ required: true, message: '请输入藏品名称' }],
  relicNum: [{ required: true, message: '请输入数量' }],
  numUnit: [{ required: true, message: '请选择单位' }],
  relicYear: [{ required: true, message: '请选择年代' }],
  relicYearsDetail: [{ required: true, message: '请输入具体年代' }],
  relicMaterial: [{ required: true, message: '请选择质地类别' }],
  relicDesc: [{ required: true, message: '请输入备注' }]
}
const { proxy } = getCurrentInstance()
const emits = defineEmits(['ok'])

let editData = {}
function onShow(data = {}) {
  editData = cloneDeep(data)
  initForm(data)
}
function onSuccess(res) {
  proxy.$modal.msgSuccess('操作成功')
  emits('ok', res)
  hide()
}
function onFail() {
  proxy.$modal.msgSuccess('操作失败，请重试')
}
async function onAdd() {
  console.log(form)
  const data = toRaw(form)
  data.flowId = editData.flowNo
  return addRelic(data)
}
async function onEdit() {
  const data = toRaw(form)
  data.flowId = editData.flowNo
  data.id = editData.id
  return updateRelic(data)
}

const { cp_texture_1, years } = proxy.useDict('cp_texture_1', 'years')

function initForm(editData) {
  if (isEdit.value) {
    form.relicName = editData.relicName
    form.relicNum = editData.relicNum
    form.relicYear = Number(editData.relicYear)
    form.relicYearsDetail = editData.relicYearsDetail
    form.relicMaterial = editData.relicMaterial
    form.relicDesc = editData.relicDesc
    form.relicPath = editData.relicPath
  } else {
    resetForm()
  }
}

function resetForm() {
  form.relicName = undefined
  form.relicNum = undefined
  form.relicYear = undefined
  form.relicYearsDetail = undefined
  form.relicMaterial = undefined
  form.relicDesc = undefined
  form.relicPath = undefined
}

defineExpose({
  show,
  hide
})
</script>
