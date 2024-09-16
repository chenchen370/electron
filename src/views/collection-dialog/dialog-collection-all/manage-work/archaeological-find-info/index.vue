<template>
  <el-form class="coder-wang-form" ref="formRef" :model="form" label-width="auto" size="large" label-position="top">
    <el-row :gutter="75">
      <el-col :span="8">
        <el-form-item label="出土（水）时间" prop="excavationTime">
          <el-date-picker
            style="width: 100%"
            v-model="form.excavationTime"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            clearable
            :disabled="isDisabled"
            :placeholder="isDisabled ? ' ' : '请选择出土（水）时间'"
          />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="出土（水）地点" prop="excavatedLocation">
          <el-input v-model="form.excavatedLocation" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入出土（水）地点'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="领队" prop="teamLeader">
          <el-input v-model="form.teamLeader" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输领队'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="考古机构" prop="archaeologicalOrganization">
          <el-input v-model="form.archaeologicalOrganization" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入考古机构'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="考古批准机构" prop="archaeologicalApprovalAuthority">
          <el-input v-model="form.archaeologicalApprovalAuthority" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入考古批准机构'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="考古报告名称" prop="archaeologicalReportName">
          <el-input v-model="form.archaeologicalReportName" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入考古报告名称'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="考古报告出版社" prop="archaeologicalReportPublishingHouse">
          <el-input
            v-model="form.archaeologicalReportPublishingHouse"
            clearable
            :disabled="isDisabled"
            :placeholder="isDisabled ? '' : '请输入考古报告出版社'"
          />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="考古报告日期" prop="archaeologicalReportDate">
          <el-date-picker
            style="width: 100%"
            v-model="form.archaeologicalReportDate"
            type="date"
            format="YYYY-MM-DD"
            clearable
            :disabled="isDisabled"
            :placeholder="isDisabled ? ' ' : '请选择考古报告日期'"
          />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="文物出土（水）状态" prop="statusUnearthedCulturalRelics">
          <el-input v-model="form.statusUnearthedCulturalRelics" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入文物出土（水）状态'" />
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
import {
  addArchaeologicalFindInfo,
  auditArchaeologicalFindInfo,
  editArchaeologicalFindInfo,
  getArchaeologicalFindInfo
} from '@/api/collection-all/manage-work/archaeological-find-info'
import { auditBaseInfo } from '@/api/collection-all/index-group/base-info'

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

  excavationTime: undefined, // 出土（水）时间
  excavatedLocation: undefined, // 出土（水）地点
  teamLeader: undefined, // 领队
  archaeologicalOrganization: undefined, // 考古机构
  archaeologicalApprovalAuthority: undefined, // 考古批准机构
  archaeologicalReportName: undefined, // 考古报告名称
  archaeologicalReportPublishingHouse: undefined, // 考古报告出版社
  archaeologicalReportDate: undefined, // 考古报告日期
  statusUnearthedCulturalRelics: undefined, // 文物出土（水）状态

  remarks: undefined // 备注
})

async function init() {
  form.relicsId = props.relicsId

  const res = await getArchaeologicalFindInfo(props.relicsId)
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
        await addArchaeologicalFindInfo(form)
        props?.proxy?.$modal?.msgSuccess('考古发掘信息保存成功')
        await init()
      } else {
        await editArchaeologicalFindInfo(form)
        props?.proxy?.$modal?.msgSuccess('考古发掘信息保存成功')
        await init()
      }
    }
  })
}

async function audit() {
  if (!form.id) {
    return props?.proxy?.$modal?.msgSuccess('请先保存考古发掘信息')
  }
  await auditArchaeologicalFindInfo(form)
  props?.proxy?.$modal?.msgSuccess('考古发掘信息提交审核成功')
}

defineExpose({ submit, audit })
</script>

<style lang="scss" scoped></style>
