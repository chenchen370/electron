<template>
  <!-- 添加或修改活动对话框 -->
  <el-dialog class="coder-wang-dialog" :title="title" v-model="open" width="1280px" append-to-body
    :before-close="handleCancel" align-center :show-close="false">
    <el-form class="coder-wang-form" ref="formRef" :model="form" :rules="rules" label-width="auto" size="large"
      label-position="top">
      <el-row :span="24" :gutter="49">
        <el-col :span="8">
          <el-form-item label="主要功能" prop="majorFunction">
            <el-input v-model="form.majorFunction" placeholder="请输入主要功能" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="生产厂家" prop="manufacturer">
            <el-input v-model="form.manufacturer" placeholder="请输入生产厂家" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="产品名" prop="productName">
            <el-input v-model="form.productName" placeholder="请输入产品名" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="质地" prop="texture">
            <el-input v-model="form.texture" placeholder="请输入质地" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="form.remark" placeholder="请输入备注" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button class="button-c-sure" type="primary" @click="handleSubmit">确 定</el-button>
        <!-- <el-button class="button-p-cancel" @click="handleCancel">取 消</el-button> -->
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormInstance } from 'element-plus'
import type { IPropsFrom } from '../type.ts'

import { addRepairTool, updateRepairTool } from '@/api/collection/repairTool.ts'

interface IProps {
  title: string
  rowObj: IPropsFrom
  proxy?: any
}
const props = withDefaults(defineProps<IProps>(), {
  title: '标题',
  rowObj: () => ({})
})

const emits = defineEmits(['handleCancel', 'handleSubmit'])

const open = ref<boolean>(true)
const formRef = ref<FormInstance>()

const form = reactive<IPropsFrom>({
  id: undefined,
  majorFunction: '', // 主要功能
  manufacturer: '', // 生产厂家
  productName: '', // 产品名
  texture: '', // 质地
  remark: '' // 备注
})
const rules = reactive({})

// 回填数据
watch(
  props.rowObj,
  val => {
    console.log('rowObj ===> ', val)
    if (Object.keys(val).length > 0) {
      initForm(val)
    }
  },
  {
    immediate: true,
    deep: true
  }
)

// 回填数据
function initForm(rowObj: IPropsFrom) {
  Object.keys(form).forEach(key => {
    form[key] = rowObj[key]
  })
}

/** 提交按钮 */
function handleSubmit() {
  formRef.value!.validate(async valid => {
    try {
      if (valid) {
        if (form?.id != null) {
          await updateRepairTool(form)
          props?.proxy?.$modal.msgSuccess('修改成功')
          emits('handleSubmit')
        } else {
          await addRepairTool(form)
          props?.proxy?.$modal.msgSuccess('新增成功')
          emits('handleSubmit')
        }
      }
    } catch (e) { }
  })
}

// 取消按钮
function handleCancel() {
  emits('handleCancel')
}
</script>

<style scoped lang="scss"></style>
