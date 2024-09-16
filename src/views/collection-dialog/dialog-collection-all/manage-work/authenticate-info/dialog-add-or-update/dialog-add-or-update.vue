<template>
  <!-- 添加或修改活动对话框 -->
  <el-dialog class="coder-wang-dialog" :title="title" v-model="open" width="1280px" append-to-body
    :before-close="handleCancel" align-center :show-close="false">
    <el-form class="coder-wang-form-wrap" ref="formRef" :model="form" :rules="rules" label-width="auto" size="large"
      label-position="top">
      <el-row :span="24" :gutter="49">
        <el-col :span="8">
          <el-form-item label="鉴定时间" prop="appraisalTime">
            <el-date-picker style="width: 100%" v-model="form.appraisalTime" type="date" format="YYYY-MM-DD" clearable
              placeholder="请选择鉴定时间" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="鉴定机构" prop="appraisalAgency">
            <el-input v-model="form.appraisalAgency" clearable placeholder="请输入鉴定机构" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="鉴定人" prop="appraiser">
            <el-select v-model="form.appraiser" clearable placeholder="请输入鉴定人" filterable remote reserve-keyword
              allow-create remote-show-suffix :remote-method="getListUser" :loading="api_options.loading"
              style="width: 100%">
              <el-option v-for="item in api_options.options_user" :key="item.userName" :label="item.userName"
                :value="item.userName" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="组织机构" prop="organizationalStructure">
            <el-input v-model="form.organizationalStructure" clearable placeholder="请输入组织机构" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="批准机构" prop="approvalAuthority">
            <el-input v-model="form.approvalAuthority" clearable placeholder="请输入批准机构" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="鉴定意见及结论" prop="appraisalOpinionsConclusions">
            <el-input v-model="form.appraisalOpinionsConclusions" clearable placeholder="请输入鉴定意见及结论" />
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="备注" prop="remarks">
            <el-input v-model="form.remarks" clearable placeholder="请输入备注" />
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

import { addAuthenticate, editAuthenticate } from '@/api/collection-all/manage-work/authenticate-info'
import { listUser } from '@/api/system/user'

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
  appraisalTime: '', // 鉴定时间
  appraisalAgency: '', // 鉴定机构
  appraiser: '', // 鉴定人
  organizationalStructure: '', // 组织机构
  approvalAuthority: '', // 批准机构
  appraisalOpinionsConclusions: '', // 鉴定意见及结论
  remarks: '' // 备注
})
const rules = {}

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
          await editAuthenticate(form)
          props?.proxy?.$modal.msgSuccess('修改成功')
          emits('handleSubmit')
        } else {
          console.log('form ===> ', form)
          await addAuthenticate(form)
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
