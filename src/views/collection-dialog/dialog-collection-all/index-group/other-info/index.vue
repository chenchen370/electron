<template>
  <el-form class="coder-wang-form" ref="formRef" :model="form" label-width="auto" size="large" label-position="top">
    <el-row :gutter="75">
      <el-col :span="8">
        <el-form-item label="文档名称" prop="documentName">
          <el-input v-model="form.documentName" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入文档名称'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="文档编号" prop="documentNumber">
          <el-input v-model="form.documentNumber" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入文档编号'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="文档类型" prop="documentType">
          <el-select v-model="form.documentType" clearable :disabled="isDisabled" :placeholder="isDisabled ? ' ' : '请选择文档类型'" style="width: 100%">
            <el-option v-for="item in optionsInfo.options_document_type" :key="item.value" :label="item.label" :value="item.label" />
          </el-select>
          <!--          <el-input v-model="form.documentType" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入文档类型'" />-->
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="制档日期" prop="filingDate">
          <el-date-picker
            style="width: 100%"
            v-model="form.filingDate"
            type="date"
            format="YYYY-MM-DD"
            clearable
            :disabled="isDisabled"
            :placeholder="isDisabled ? ' ' : '请选择制档日期'"
          />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="制档人" prop="documentMaker">
          <el-select
            v-model="form.documentMaker"
            clearable
            :disabled="isDisabled"
            :placeholder="isDisabled ? ' ' : '请选择制档人'"
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
        <el-form-item label="著者" prop="author">
          <el-input v-model="form.author" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入著者'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="存卷" prop="keepFile">
          <el-input v-model="form.keepFile" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入存卷'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="版本" prop="version">
          <el-input v-model="form.version" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入版本'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入备注'" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup>
import { addOtherInfo, editOtherInfo, getOtherInfo } from '@/api/collection-all/index-group/other-info'
import optionsInfo from './options'
import { listUser } from '@/api/system/user'
import { addBaseInfo, auditBaseInfo, editBaseInfo } from '@/api/collection-all/index-group/base-info'

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

const form = reactive({
  id: undefined, // id
  relicsId: undefined, // 文物藏品基本信息id
  documentName: undefined, // 文档名称
  documentNumber: undefined, // 文档编号
  documentType: undefined, // 文档类型
  filingDate: undefined, // 制档日期
  documentMaker: undefined, // 制档人
  author: undefined, // 著者
  keepFile: undefined, // 存卷
  version: undefined, // 版本
  remark: undefined // 备注
})
async function init() {
  form.relicsId = props.relicsId

  const res = await getOtherInfo(props.relicsId)
  console.log('other info res ===> ', res)

  if (res?.data) {
    Object?.keys(form).forEach(key => {
      form[key] = res?.data?.[key]
    })
  }
  console.log('other info form ===> ', form)
}

init()
console.log('other info relicsId ===> ', props.relicsId)
const formRef = ref()
async function submit() {
  console.log('props?.proxy ===>', props?.proxy)
  if (!formRef.value) return
  await formRef.value.validate(async (valid, fields) => {
    if (valid) {
      form.relicsId = props.relicsId
      if (!form.id) {
        await addOtherInfo(form)
        props?.proxy?.$modal?.msgSuccess('其他信息保存成功')
        await init()
      } else {
        await editOtherInfo(form)
        props?.proxy?.$modal?.msgSuccess('其他信息保存成功')
        await init()
      }
    }
  })
}

async function audit() {
  if (!form.id) {
    return props?.proxy?.$modal?.msgSuccess('请先保存其他信息')
  }
  await auditBaseInfo(form)
  props?.proxy?.$modal?.msgSuccess('其他信息提交审核成功')
}

defineExpose({ submit, audit })
</script>

<style lang="scss" scoped></style>
