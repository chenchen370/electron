<template>
  <!-- 添加或修改活动对话框 -->
  <el-dialog class="coder-wang-dialog" :title="title" v-model="open" width="1280px" append-to-body
    :before-close="handleCancel" align-center :show-close="false">
    <el-form class="coder-wang-form" ref="formRef" :model="form" :rules="rules" label-width="auto" size="large"
      label-position="top">
      <el-row :span="24" :gutter="49">
        <el-col :span="8">
          <el-form-item label="收藏机构" prop="collectionOrganization">
            <el-input v-model="form.collectionOrganization" placeholder="请输入收藏机构" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="收藏人" prop="collectors">
            <el-select v-model="form.collectors" clearable :readonly="isReadonly" placeholder="请选择/输入收藏人" filterable
              remote reserve-keyword allow-create remote-show-suffix :remote-method="getListUser"
              :loading="api_options.loading" style="width: 100%">
              <el-option v-for="item in api_options.options_user" :key="item.userName" :label="item.userName"
                :value="item.userName" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="开始时间-结束时间" prop="time">
            <el-date-picker v-model="form.time" format="YYYY-MM-DD HH:mm:ss" type="datetimerange" range-separator="-"
              :start-placeholder="'请选择开始时间'" :end-placeholder="'请选择结束时间'" clearable />
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input v-model="form.remark" placeholder="请输入备注" />
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

import { listUser } from '@/api/system/user'
import { addPassOnExperience, editPassOnExperience } from '@/api/collection-all/manage-work/pass-on-experience'

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
  collectionOrganization: '', // 收藏机构
  collectors: '', // 收藏人
  time: [], // 假的时间
  startTime: '', // 起始时间
  endTime: '', // 结束时间
  remark: '' // 备注
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
  if (form.startTime && form.endTime) {
    form.time = [form.startTime, form.endTime]
  }
}

/** 提交按钮 */
function handleSubmit() {
  formRef.value.validate(async valid => {
    try {
      if (valid) {
        const params = JSON.parse(JSON.stringify(form))
        delete params.time
        if (form?.time?.length > 0) {
          params.startTime = form.time[0]
          params.endTime = form.time[1]
        }
        params.relicsId = props.relicsId

        if (params?.id != null) {
          await editPassOnExperience(params)
          props?.proxy?.$modal.msgSuccess('修改成功')
          emits('handleSubmit')
        } else {
          console.log('form ===> ', params)
          await addPassOnExperience(params)
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
