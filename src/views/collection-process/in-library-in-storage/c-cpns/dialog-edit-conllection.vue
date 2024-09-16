<template>
  <el-dialog v-model="visible" width="1280px" append-to-body align-center :show-close="false">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="auto" size="large" label-position="top">
      <el-row :gutter="40">
        <el-col :span="8">
          <el-form-item label="藏品名称" prop="flowPerson">
            <el-input v-model="form.flowPerson" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="数量" prop="flowTime">
            <el-date-picker v-model="form.flowTime" type="date" style="width: 100%" placeholder="请选择" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="质地类别" prop="receipt">
            <el-input v-model="form.receipt" placeholder="请输入" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="40">
        <el-col :span="8">
          <el-form-item label="年代" prop="delivery">
            <el-input v-model="form.delivery" placeholder="请输入" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="具体年代" prop="collectPerson">
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
    <template #footer>
      <div class="dialog-footer">
        <el-button class="button-c-sure" type="primary" @click="onSubmit" :loading="submitLoading">确 定</el-button>
        <el-button class="button-p-cancel" @click="hide">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { useFormDialog } from '@/hooks/useFormDialog'
const { visible, formRef, isEdit, submitLoading, validate } = useFormDialog()

const form = reactive({})
const rules = {}
function onSubmit() { }

function show() {
  // cloneDeep()
  visible.value = true
}

function hide() {
  visible.value = false
}

defineExpose({
  show,
  hide
})
</script>
