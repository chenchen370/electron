<template>
  <el-form class="coder-wang-form" ref="formRef" :model="form" label-width="auto" size="large" label-position="top">
    <el-row :gutter="75">
      <el-col :span="8">
        <el-form-item label="核销日期" prop="verificationDate">
          <el-date-picker
            style="width: 100%"
            v-model="form.verificationDate"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            clearable
            :disabled="isDisabled"
            :placeholder="isDisabled ? ' ' : '请选择核销日期'"
          />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="核销批文" prop="verificationApprovalNumber">
          <el-input v-model="form.verificationApprovalNumber" clearable :disabled="isDisabled" placeholder="请输入核销批文" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="核销审批人" prop="verificationApprover">
          <el-select
            v-model="form.verificationApprover"
            clearable
            placeholder="请选择/输入核销审批人"
            filterable
            remote
            reserve-keyword
            allow-create
            remote-show-suffix
            :remote-method="getListUser"
            :loading="api_options.loading"
            style="width: 100%"
          >
            <el-option v-for="item in api_options.options_user" :key="item.userName" :label="item.userName" :value="item.userName" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="核销原因" prop="reasonVerification">
          <el-input v-model="form.reasonVerification" clearable :disabled="isDisabled" placeholder="请输入核销原因" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="核销后去向" prop="destinationAfterVerification">
          <el-input v-model="form.destinationAfterVerification" clearable :disabled="isDisabled" placeholder="请输入核销后去向" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup>
import {
  addArchaeologicalFindInfo,
  auditArchaeologicalFindInfo,
  editArchaeologicalFindInfo,
  getArchaeologicalFindInfo
} from '@/api/collection-all/manage-work/archaeological-find-info'
import { addSourceInfo, editSourceInfo } from '@/api/collection-all/manage-work/source-info'
import { addBackOut, auditBackOut, editBackOut, getBackOut } from '@/api/collection-all/manage-work/backout'
import { reactive } from 'vue'
import { listUser } from '@/api/system/user'

const props = defineProps({
  handleStatus: {
    type: String,
    default: 'check' // submit （新增 + 修改 + 提交审核）check（查看）
  },
  relicsId: {
    type: [String, Number],
    default: null
  },
  proxy: {
    type: Object,
    default: () => ({})
  }
})

const isDisabled = computed(() => {
  return props.handleStatus === 'check'
})

const form = reactive({
  id: undefined, // id
  relicsId: undefined, // 文物藏品基本信息id

  verificationDate: undefined, // 核销日期
  verificationApprovalNumber: undefined, // 核销批文
  verificationApprover: undefined, // 核销审批人
  reasonVerification: undefined, // 核销原因
  destinationAfterVerification: undefined // 核销后去向
})

async function init() {
  form.relicsId = props.relicsId

  const res = await getBackOut(props.relicsId)

  if (res?.data) {
    Object?.keys(form).forEach(key => {
      form[key] = res?.data?.[key]
    })
  }
}
init()

// options
const api_options = reactive({
  loading: false,
  options_user: []
})

// 用户
async function getListUser(userName) {
  api_options.loading = true
  try {
    const res = await listUser({ pageNum: 1, pageSize: 999, userName })
    api_options.options_user = res?.rows ?? []
    api_options.loading = false
  } catch (e) {
    api_options.loading = false
    api_options.options_user = []
  }
}
getListUser()

const formRef = ref()
async function submit() {
  console.log('props?.proxy ===>', props?.proxy)
  if (!formRef.value) return
  await formRef.value.validate(async (valid, fields) => {
    if (valid) {
      form.relicsId = props.relicsId
      if (!form.id) {
        await addBackOut(form)
        props?.proxy?.$modal?.msgSuccess('核销信息保存成功')
        await init()
      } else {
        await editBackOut(form)
        props?.proxy?.$modal?.msgSuccess('核销信息保存成功')
        await init()
      }
    }
  })
}

async function audit() {
  if (!form.id) {
    return props?.proxy?.$modal?.msgSuccess('请先保存核销信息')
  }
  await auditBackOut(form)
  props?.proxy?.$modal?.msgSuccess('核销信息提交审核成功')
}

defineExpose({ submit, audit })
</script>

<style lang="scss" scoped></style>
