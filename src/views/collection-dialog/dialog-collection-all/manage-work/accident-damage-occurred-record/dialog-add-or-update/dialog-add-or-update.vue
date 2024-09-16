<template>
  <!-- 添加或修改活动对话框 -->
  <el-dialog class="coder-wang-dialog" :title="title" v-model="open" width="1280px" append-to-body
    :before-close="handleCancel" align-center :show-close="false">
    <el-form class="coder-wang-form-wrap" ref="formRef" :model="form" :rules="rules" label-width="auto" size="large"
      label-position="top">
      <el-row :span="24" :gutter="49">
        <el-col :span="8">
          <el-form-item label="事故发生时间" prop="accidentOccurrenceTime">
            <el-date-picker style="width: 100%" v-model="form.accidentOccurrenceTime" type="datetime"
              format="YYYY-MM-DD HH:mm:ss" clearable placeholder="请选择事故发生时间" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="事故发生地点" prop="accidentLocation">
            <el-input v-model="form.accidentLocation" placeholder="请输入事故发生地点" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="事故责任人" prop="personResponsibleAccident">
            <el-select v-model="form.personResponsibleAccident" clearable placeholder="请选择/输入事故责任人" filterable remote
              reserve-keyword allow-create remote-show-suffix :remote-method="getListUser"
              :loading="api_options.loading" style="width: 100%">
              <el-option v-for="item in api_options.options_user" :key="item.userName" :label="item.userName"
                :value="item.userName" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="事故经过" prop="accidentProcess">
            <el-input v-model="form.accidentProcess" placeholder="请输入事故经过" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="藏品损失情况" prop="lossCollectibles">
            <el-input v-model="form.lossCollectibles" placeholder="请输入藏品损失情况" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="事故处理结果" prop="accidentHandlingResults">
            <el-input v-model="form.accidentHandlingResults" placeholder="请输入事故处理结果" />
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

import { addAccDamOccRecord, editAccDamOccRecord } from '@/api/collection-all/manage-work/accident-damage-occurred-record'
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
  accidentOccurrenceTime: '', // 事故发生时间
  accidentLocation: '', // 事故发生地点
  personResponsibleAccident: '', // 事故责任人
  accidentProcess: '', // 事故经过
  lossCollectibles: '', // 藏品损失情况
  accidentHandlingResults: '', // 事故处理结果
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
          await editAccDamOccRecord(form)
          props?.proxy?.$modal.msgSuccess('修改成功')
          emits('handleSubmit')
        } else {
          console.log('form ===> ', form)
          await addAccDamOccRecord(form)
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
