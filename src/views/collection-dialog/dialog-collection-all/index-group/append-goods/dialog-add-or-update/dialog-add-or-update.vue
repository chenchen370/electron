<template>
  <!-- 添加或修改活动对话框 -->
  <el-dialog class="coder-wang-dialog" :title="title" v-model="open" width="1280px" append-to-body
    :before-close="handleCancel" align-center :show-close="false">
    <el-form class="coder-wang-form" ref="formRef" :model="form" :rules="rules" label-width="auto" size="large"
      label-position="top">
      <el-row :span="24" :gutter="49">
        <el-col :span="8">
          <el-form-item label="附属物名称" prop="accessoriesName">
            <el-input v-model="form.accessoriesName" placeholder="请输入附属物名称" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="附属物现状" prop="accessoriesCurrentStatus">
            <el-input v-model="form.accessoriesCurrentStatus" placeholder="请输入附属物现状" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="附属物数量" prop="accessoriesNumber">
            <el-input v-model="form.accessoriesNumber" placeholder="请输入附属物数量" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="附属物数量单位" prop="accessoriesUnitQuantity">
            <el-input v-model="form.accessoriesUnitQuantity" placeholder="请输入附属物数量单位" />
          </el-form-item>
        </el-col>

        <el-col :span="16">
          <el-form-item label="附属物描述" prop="accessoriesDesc">
            <el-input v-model="form.accessoriesDesc" placeholder="请输入附属物描述" />
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

import { addAppendGoods, editAppendGoods } from '@/api/collection-all/index-group/append-goods'

const props = defineProps({
  relicsId: {
    type: [String, Number],
    default: null
  },
  title: {
    type: String,
    default: '标题'
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
  accessoriesName: '', // 附属物名称
  accessoriesCurrentStatus: '', // 附属物现状
  accessoriesNumber: '', // 附属物数量
  accessoriesUnitQuantity: '', // 附属物数量单位
  accessoriesDesc: '' // 附属物描述
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
          await editAppendGoods(form)
          props?.proxy?.$modal.msgSuccess('修改成功')
          emits('handleSubmit')
        } else {
          console.log('form ===> ', form)
          await addAppendGoods(form)
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
