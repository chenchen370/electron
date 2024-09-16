<template>
  <!-- 添加或修改活动对话框 -->
  <el-dialog class="coder-wang-dialog" :title="title" v-model="open" width="1280px" append-to-body
    :before-close="handleCancel" align-center :show-close="false">
    <el-form class="coder-wang-form" ref="formRef" :model="form" :rules="rules" label-width="auto" size="large"
      label-position="top">
      <el-row :span="24" :gutter="49">
        <el-col :span="8">
          <el-form-item label="商品名" prop="commodityName">
            <el-input v-model="form.commodityName" placeholder="请输入商品名" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="材料名称" prop="materialName">
            <el-input v-model="form.materialName" placeholder="请输入材料名称" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="药剂级别" prop="drugLevel">
            <el-input v-model="form.drugLevel" placeholder="请输入药剂级别" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="主要成分" prop="mainComponents">
            <el-input v-model="form.mainComponents" placeholder="请输入主要成分" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="性能" prop="mainPerformance">
            <el-input v-model="form.mainPerformance" placeholder="请输入性能" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="配比" prop="mainProportion">
            <el-input v-model="form.mainProportion" placeholder="请输入配比" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="生产厂家" prop="manufacturer">
            <el-input v-model="form.manufacturer" placeholder="请输入生产厂家" />
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
        <el-button class="button-p-cancel" @click="handleCancel">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

import type { FormInstance } from 'element-plus'
import type { IPropsFrom } from '../type.ts'

import { addMaterial, updateMaterial } from '@/api/collection/material.ts'

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
  commodityName: '', // 商品名
  drugLevel: '', // 药剂级别
  mainComponents: '', // 主要成分
  mainPerformance: '', // 性能
  mainProportion: '', // 配比
  manufacturer: '', // 生产厂家
  materialName: '', // 材料名称
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
          await updateMaterial(form)
          props?.proxy?.$modal.msgSuccess('修改成功')
          emits('handleSubmit')
        } else {
          console.log('form ===> ', form)
          await addMaterial(form)
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
