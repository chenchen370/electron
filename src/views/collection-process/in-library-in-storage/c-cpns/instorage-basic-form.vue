<template>
  <el-form ref="formRef" :model="form" :rules="rules" label-width="auto" size="large" label-position="top">
    <el-row :gutter="40">
      <el-col :span="8">
        <el-form-item label="登记人" prop="flowPerson">
          <el-input v-model="form.flowPerson" placeholder="请输入" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="登记日期" prop="flowTime">
          <el-date-picker v-model="form.flowTime" type="date" style="width: 100%" placeholder="请选择" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="收件人" prop="receipt">
          <el-input v-model="form.receipt" placeholder="请输入" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="40">
      <el-col :span="8">
        <el-form-item label="交件人" prop="delivery">
          <el-input v-model="form.delivery" placeholder="请输入" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="征集人" prop="collectPerson">
          <el-input v-model="form.collectPerson" placeholder="请输入" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item label="备注" prop="flowDesc">
      <el-input type="textarea" v-model="form.flowDesc" :rows="4" placeholder="请输入" />
    </el-form-item>
    <el-form-item label="上传附件" prop="flowAttachment">
      <ProFileUpload v-model="form.flowAttachment" uploadUrl="/heritage/file/upload/common" />
    </el-form-item>
  </el-form>
</template>

<script setup>
import request from '@/utils/request'

defineProps({
  isEdit: {
    type: Boolean,
    default: false
  }
})

const formRef = ref()
const form = reactive({
  flowPerson: undefined,
  flowTime: undefined,
  receipt: undefined,
  delivery: undefined,
  collectPerson: undefined,
  flowDesc: undefined,
  flowAttachment: undefined
})
const rules = {
  flowPerson: [{ required: true, message: '请选择登记人' }],
  flowTime: [{ required: true, message: '请选择登记日期' }]
  // receipt: [{ required: true, message: '请选择征集人'}],
  // flowPerson: [{ required: true, message: '请选择登记人'}],
}

//

async function reset() {
  form.flowPerson = undefined
  form.flowTime = undefined
  form.receipt = undefined
  form.delivery = undefined
  form.collectPerson = undefined
  form.flowDesc = undefined
  form.flowAttachment = undefined
  await nextTick()
  formRef.value.resetFields()
}
function setValues(data) {
  form.flowPerson = data.flowPerson
  form.flowTime = data.flowTime
  form.receipt = data.receipt
  form.delivery = data.delivery
  form.collectPerson = data.collectPerson
  form.flowDesc = data.flowDesc
  form.flowAttachment = data.flowAttachment
}

function getValues() {
  return toRaw(form)
}

async function validate() {
  return await formRef.value.validate()
}

async function init({ data }) {
  await reset()
  setValues(data)
}

defineExpose({
  setValues,
  getValues,
  validate,
  reset,
  init
})
</script>

<style></style>
