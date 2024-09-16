<template>
  <!-- 添加或修改活动对话框 -->
  <el-dialog :title="title" v-model="open" width="650px" append-to-body :before-close="handleCancel" align-center
    :show-close="false">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="auto" size="large">
      <el-form-item label="博物馆名称" prop="museumName">
        <el-input v-model="form.museumName" placeholder="请输入博物馆名称" />
      </el-form-item>

      <el-form-item label="国家" prop="country">
        <el-input v-model="form.country" placeholder="请输入国家" />
      </el-form-item>

      <el-form-item label="省份" prop="provinces">
        <el-input v-model="form.provinces" placeholder="请输入省份" />
      </el-form-item>

      <el-form-item label="市" prop="cities">
        <el-input v-model="form.cities" placeholder="请输入市" />
      </el-form-item>

      <el-form-item label="区" prop="districts">
        <el-input v-model="form.districts" placeholder="请输入区" />
      </el-form-item>
      <el-form-item label="街道" prop="street">
        <el-input v-model="form.street" placeholder="请输入街道" />
      </el-form-item>
      <el-form-item label="经度" prop="latitude">
        <el-input v-model="form.latitude" placeholder="请输入经度" />
      </el-form-item>
      <el-form-item label="维度" prop="longitude">
        <el-input v-model="form.longitude" placeholder="请输入维度" />
      </el-form-item>
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

import { addMuseum, updateMuseum } from '@/api/collection/infomain.ts'

interface IProps {
  title: string;
  rowObj: IPropsFrom;
  proxy?: any,
  length: number
}

const props = withDefaults(defineProps<IProps>(), {
  title: '标题',
  rowObj: () => ({}),
  length: 0
})

const emits = defineEmits(['handleCancel', 'handleSubmit'])

const open = ref<boolean>(true)
const formRef = ref<FormInstance>()

const form = reactive<IPropsFrom>({
  id: undefined,
  museumName: '',
  country: '',
  provinces: '',
  districts: '',
  street: '',
  latitude: '',
  longitude: '',
  museumId: props.length + 1
})
const rules = reactive({})

// 回填数据
watch(props.rowObj, (val) => {
  console.log('rowObj ===> ', val)
  if (Object.keys(val).length > 0) {
    initForm(val)
  }
}, {
  immediate: true,
  deep: true
})

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
          await updateMuseum(form)
          props?.proxy?.$modal.msgSuccess('修改成功')
          emits('handleSubmit')
        } else {
          await addMuseum(form)
          props?.proxy?.$modal.msgSuccess('新增成功')
          emits('handleSubmit')
        }
      }
    } catch (e) {

    }
  })
}

// 取消按钮
function handleCancel() {
  emits('handleCancel')
}

</script>


<style scoped lang="scss"></style>
