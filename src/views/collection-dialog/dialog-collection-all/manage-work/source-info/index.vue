<template>
  <el-form class="coder-wang-form" ref="formRef" :model="form" label-width="auto" size="large" :rules="rules"
    label-position="top">
    <el-row :gutter="75">
      <el-col :span="8">
        <el-form-item label="文物来源" prop="sourceCulturalRelics">
          <el-select v-model="form.sourceCulturalRelics" clearable :disabled="isDisabled"
            :placeholder="isDisabled ? ' ' : '请选择文物来源'" style="width: 100%">
            <el-option v-for="item in optionsInfo.options_source_cultural_relics" :key="item.value" :label="item.label"
              :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="具体来源" prop="specificSources">
          <el-input v-model="form.specificSources" clearable :disabled="isDisabled"
            :placeholder="isDisabled ? '' : '请输入具体来源'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="授权单位" prop="authorizedUnit">
          <el-input v-model="form.authorizedUnit" clearable :disabled="isDisabled"
            :placeholder="isDisabled ? '' : '请输入授权单位'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="申请搜集经费" prop="applyCollectionFunds">
          <el-input v-model="form.applyCollectionFunds" clearable :disabled="isDisabled"
            :placeholder="isDisabled ? '' : '请输入申请搜集经费'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="实际搜集经费" prop="actualCollectionFunds">
          <el-input v-model="form.actualCollectionFunds" clearable :disabled="isDisabled"
            :placeholder="isDisabled ? '' : '请输入实际搜集经费'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="原编号" prop="originalNumber">
          <el-input v-model="form.originalNumber" clearable :disabled="isDisabled"
            :placeholder="isDisabled ? '' : '请输入原编号'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="搜集时间" prop="collectTime">
          <el-date-picker style="width: 100%" v-model="form.collectTime" type="datetime" format="YYYY-MM-DD HH:mm:ss"
            clearable :disabled="isDisabled" :placeholder="isDisabled ? ' ' : '请选择搜集时间'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="搜集经过" prop="collectionProcess">
          <el-input v-model="form.collectionProcess" clearable :disabled="isDisabled"
            :placeholder="isDisabled ? '' : '请输入搜集经过'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="来源号" prop="sourceNumber">
          <el-input v-model="form.sourceNumber" clearable :disabled="isDisabled"
            :placeholder="isDisabled ? '' : '请输入来源号'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="征集时间" prop="collectionTime">
          <el-date-picker v-model="form.collectionTime" style="width: 100%" type="datetime" format="YYYY-MM-DD HH:mm:ss"
            clearable :disabled="isDisabled" :placeholder="isDisabled ? ' ' : '请选择征集时间'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="征集地点" prop="solicitationLocation">
          <el-input v-model="form.solicitationLocation" clearable :disabled="isDisabled"
            :placeholder="isDisabled ? '' : '请输入征集地点'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="出让人员" prop="transferPersonnel">
          <el-select v-model="form.transferPersonnel" clearable :disabled="isDisabled"
            :placeholder="isDisabled ? ' ' : '请选择/输入出让人员'" filterable remote reserve-keyword allow-create
            remote-show-suffix :remote-method="getListUser" :loading="api_options.loading" style="width: 100%">
            <el-option v-for="item in api_options.options_user" :key="item.userName" :label="item.userName"
              :value="item.userName" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="出让机构" prop="transferInstitution">
          <el-input v-model="form.transferInstitution" clearable :disabled="isDisabled"
            :placeholder="isDisabled ? '' : '请输入出让机构'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="接受人" prop="recipient">
          <el-select v-model="form.recipient" clearable :disabled="isDisabled"
            :placeholder="isDisabled ? ' ' : '请选择/输入接受人'" filterable remote reserve-keyword allow-create
            remote-show-suffix :remote-method="getListUser" :loading="api_options.loading" style="width: 100%">
            <el-option v-for="item in api_options.options_user" :key="item.userName" :label="item.userName"
              :value="item.userName" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="接受单位" prop="acceptingUnit">
          <el-input clearable v-model="form.acceptingUnit" :disabled="isDisabled"
            :placeholder="isDisabled ? '' : '请输入接受单位'" />
        </el-form-item>
      </el-col>

      <el-col :span="24">
        <el-form-item label="备注" prop="remarks">
          <el-input v-model="form.remarks" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入备注'" />
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup>
import { addSourceInfo, auditSourceInfo, editSourceInfo, getSourceInfo } from '@/api/collection-all/manage-work/source-info'
import { listUser } from '@/api/system/user'
import { addBaseInfo, editBaseInfo } from '@/api/collection-all/index-group/base-info'
import { auditInTheLibraryStoreInfo } from '@/api/collection-all/manage-work/in-the-library-store-info'

const props = defineProps({
  handleStatus: {
    type: String,
    default: 'check' // submit （新增 + 修改 + 提交审核）check（查看）
  },
  relicsId: {
    type: [String, Number],
    default: 0
  },
  proxy: {
    type: Object,
    default: () => ({})
  },
  optionsInfo: {
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

  sourceCulturalRelics: undefined, // 文物来源
  specificSources: undefined, // 具体来源
  authorizedUnit: undefined, // 授权单位

  applyCollectionFunds: undefined, // 申请搜集经费
  actualCollectionFunds: undefined, // 实际搜集经费
  originalNumber: undefined, // 原编号

  collectTime: undefined, // 搜集时间
  collectionProcess: undefined, // 搜集经过
  sourceNumber: undefined, // 来源号

  collectionTime: undefined, // 征集时间
  solicitationLocation: undefined, // 征集地点
  transferPersonnel: undefined, // 出让人员

  transferInstitution: undefined, // 出让机构
  recipient: undefined, // 接受人
  acceptingUnit: undefined, // 接受单位

  remarks: undefined, // 备注

  collectors: undefined, // 搜集人
  describes: undefined, // 描述

  collectionUsr: undefined, // 采集人
  collectionLocation: undefined, // 采集地点

  excavator: undefined, // 发掘人
  excavationSite: undefined, // 发掘地点

  picker: undefined, // 拣选人
  pickingLocation: undefined, // 拣选地点

  producer: undefined, // 制作人
  productionLocation: undefined, // 制作地点

  approvalUnitDisbursement: undefined, // 拨交批准单位
  exchangeApprovalUnit: undefined, // 交换批准单位

  transferApprovalUnit: undefined // 移交批准单位
})

const rules = {
  sourceCulturalRelics: [
    {
      required: true,
      message: '文物来源必填'
    }
  ]
}

async function init() {
  form.relicsId = props.relicsId

  const res = await getSourceInfo(props.relicsId)

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
        await addSourceInfo(form)
        props?.proxy?.$modal?.msgSuccess('来源信息保存成功')
        await init()
      } else {
        await editSourceInfo(form)
        props?.proxy?.$modal?.msgSuccess('来源信息保存成功')
        await init()
      }
    }
  })
}

async function audit() {
  if (!form.id) {
    return props?.proxy?.$modal?.msgSuccess('请先保存来源信息')
  }
  await auditSourceInfo(form)
  props?.proxy?.$modal?.msgSuccess('来源信息提交审核成功')
}

defineExpose({ submit, audit })

const options_other_info = reactive({
  options_jtly: []
})
// watch(
//   () => form.sourceCulturalRelics,
//   val => {
//     if (val) {
//       form.specificSources = undefined
//       options_other_info.options_jtly = findDict(
//         options_info?.options_source_cultural_relics,
//         val
//       )
//       console.log(options_other_info.options_jtly)
//     }
//   },
//   {
//     deep: true,
//     immediate: true
//   }
// )
</script>

<style lang="scss" scoped></style>
