<template>
  <!-- 添加或修改活动对话框 -->
  <el-dialog class="coder-wang-dialog" :title="title" v-model="open" width="1280px" append-to-body
    :before-close="handleCancel" align-center :show-close="false">
    <el-form class="coder-wang-form-wrap" ref="formRef" :model="form" :rules="rules" label-width="auto" size="large"
      label-position="top">
      <el-row :span="24" :gutter="49">
        <el-col :span="24">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" placeholder="请输入标题" />
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="备注" prop="remarks">
            <el-input v-model="form.remarks" placeholder="请输入备注" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button class="button-p-cancel" @click="handleCancel">返回</el-button>
        <el-button class="button-c-sure" type="primary" @click="handleSubmit">保存</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref } from 'vue'

import { addOtherInfo, editOtherInfo } from '@/api/collection-all/other/other-info'

const props = defineProps({
  title: {
    type: String,
    default: '标题'
  },
  relicsId: {
    type: [String, Number],
    default: null
  },
  rowObj: {
    type: Object,
    default: () => ({})
  },
  proxy: {
    type: Object,
    default: () => ({})
  }
})

const emits = defineEmits(['handleCancel', 'handleSubmit'])

const open = ref(true)
const formRef = ref()

const form = reactive({
  id: undefined,
  title: '', // 标题
  remarks: '' // 备注
})
const rules = {}

// 回填数据
watch(
  () => props.rowObj,
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
function initForm(rowObj) {
  Object.keys(form).forEach(key => {
    form[key] = rowObj[key]
  })
}

/** 提交按钮 */
function handleSubmit() {
  formRef.value.validate(async valid => {
    try {
      if (valid) {
        form.relicsId = props.relicsId
        if (form?.id != null) {
          await editOtherInfo(form)
          props?.proxy?.$modal.msgSuccess('修改成功')
          emits('handleSubmit')
        } else {
          console.log('form ===> ', form)
          await addOtherInfo(form)
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
