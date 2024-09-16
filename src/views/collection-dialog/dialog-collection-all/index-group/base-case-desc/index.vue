<template>
  <el-form class="coder-wang-form" ref="formRef" :model="form" label-width="auto" size="large" label-position="top">
    <el-card class="mb_21 coder-wang-card" header="生产制造信息" shadow="never">
      <el-row :gutter="45">
        <el-col :span="8">
          <el-form-item label="生产制造（出版）时间" prop="publicationTime">
            <el-date-picker
              style="width: 100%"
              v-model="form.publicationTime"
              type="datetime"
              format="YYYY-MM-DD HH:mm:ss"
              clearable
              :disabled="isDisabled"
              :placeholder="isDisabled ? '' : '请选择生产制造（出版）时间'"
            />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="生产制造（出版）地点" prop="publishingLocation">
            <el-input v-model="form.publishingLocation" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入生产制造（出版）地点'" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="生产制造（出版）机构" prop="publishingInstitutions">
            <el-input v-model="form.publishingInstitutions" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入生产制造（出版）机构'" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="工艺" prop="workmanship">
            <el-input v-model="form.workmanship" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入工艺'" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="制造人" prop="manufacturer">
            <el-select
              v-model="form.manufacturer"
              clearable
              :disabled="isDisabled"
              :placeholder="isDisabled ? ' ' : '请选择/输入制档人'"
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
      </el-row>
    </el-card>

    <el-card class="mb_21 coder-wang-card" header="文字信息" shadow="never">
      <el-row :gutter="30">
        <el-col :span="12">
          <el-form-item prop="textInformationSituation">
            <template #label>
              主体文字信息情况
              <span class="label-tip">（字体、内容、印章、位置等）</span>
            </template>
            <el-input v-model="form.textInformationSituation" clearable :disabled="isDisabled" :placeholder="isDisabled ? ' ' : '请输入主体文字信息情况'" />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item prop="attachmentTextInformationSituation">
            <template #label>
              附件文字信息情况
              <span class="label-tip">（字体、内容、作者、印章、位置等）</span>
            </template>
            <el-input
              v-model="form.attachmentTextInformationSituation"
              clearable
              :disabled="isDisabled"
              :placeholder="isDisabled ? ' ' : '请输入附件文字信息情况'"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="mb_21 coder-wang-card" header="造型及图案信息" shadow="never">
      <el-row :gutter="30">
        <el-col :span="12">
          <el-form-item prop="stylingSituation">
            <template #label>
              造型情况
              <span class="label-tip">（风格、样式、颜色、材质等）</span>
            </template>
            <el-input v-model="form.stylingSituation" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入造型情况'" />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item prop="patternSituation">
            <template #label>
              图案情况
              <span class="label-tip">（样式、位置等）</span>
            </template>
            <el-input v-model="form.patternSituation" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入图案情况'" />
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="" prop="remark">
            <template #label>
              备注
              <span class="label-tip">（包括历史名称等）</span>
            </template>
            <el-input v-model="form.remark" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入备注'" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>
  </el-form>
</template>

<script setup>
import { addBaseCaseDesc, auditBaseCaseDesc, editBaseCaseDesc, getBaseCaseDesc } from '@/api/collection-all/index-group/base-case-desc'
import { addBaseInfo, editBaseInfo } from '@/api/collection-all/index-group/base-info'
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
  id: '', // id
  relicsId: '', // 文物藏品基本信息id

  // 生产制造信息
  publicationTime: undefined, // 生产制造（出版）时间
  publishingLocation: undefined, // 生产制造（出版）地点
  publishingInstitutions: undefined, // 生产制造（出版）机构
  workmanship: undefined, // 工艺
  manufacturer: undefined, // 制造人

  // 文字信息
  textInformationSituation: undefined, // 主体文字信息情况
  attachmentTextInformationSituation: undefined, // 附件文字信息情况

  // 造型及图案信息
  stylingSituation: undefined, // 造型情况
  patternSituation: undefined, // 图案情况
  remark: undefined // 备注
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

async function init() {
  form.relicsId = props.relicsId

  const res = await getBaseCaseDesc(props.relicsId)

  if (res?.data) {
    Object?.keys(form).forEach(key => {
      form[key] = res?.data?.[key]
    })
  }
}

init()
console.log('base-case 渲染')
const formRef = ref()
async function submit() {
  console.log('props?.proxy ===>', props?.proxy)
  if (!formRef.value) return
  await formRef.value.validate(async (valid, fields) => {
    if (valid) {
      form.relicsId = props.relicsId
      if (!form.id) {
        await addBaseCaseDesc(form)
        props?.proxy?.$modal?.msgSuccess('基本情况描述保存成功')
        await init()
      } else {
        await editBaseCaseDesc(form)
        props?.proxy?.$modal?.msgSuccess('基本情况描述保存成功')
        await init()
      }
    }
  })
}

async function audit() {
  if (!form.id) {
    return props?.proxy?.$modal?.msgSuccess('请先保存基本情况描述')
  }
  await auditBaseCaseDesc(form)
  props?.proxy?.$modal?.msgSuccess('基本情况描述提交审核成功')
}
defineExpose({ submit, audit })
</script>

<style lang="scss" scoped>
.mb_21 {
  margin-bottom: 21px;
}
</style>
