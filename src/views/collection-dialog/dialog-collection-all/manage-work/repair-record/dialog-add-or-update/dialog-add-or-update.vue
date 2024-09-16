<template>
  <!-- 添加或修改活动对话框 -->
  <el-dialog class="coder-wang-dialog" :title="title" v-model="open" width="1280px" append-to-body
    :before-close="handleCancel" align-center :show-close="false">
    <el-form class="coder-wang-form-wrap" ref="formRef" :model="form" :rules="rules" label-width="auto" size="large"
      label-position="top">
      <el-row :span="24" :gutter="49">
        <el-col :span="8">
          <el-form-item label="修复前照片" prop="preRepairPhotos">
            <ImageUpload :limit="1" :model-value="form.preRepairPhotos" upload-url="/heritage/file/upload/repair"
              @update:modelValue="e => handleUploadRelicImg(e, 'preRepairPhotos')" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="修复后照片" prop="photosAfterRepair">
            <ImageUpload :limit="1" :model-value="form.photosAfterRepair" upload-url="/heritage/file/upload/repair"
              @update:modelValue="e => handleUploadRelicImg(e, 'photosAfterRepair')" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="修复开始时间" prop="repairStartTime">
            <el-date-picker style="width: 100%" v-model="form.repairStartTime" type="datetime"
              format="YYYY-MM-DD HH:mm:ss" clearable placeholder="请选择修复开始时间" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="修复结束时间" prop="repairEndTime">
            <el-date-picker style="width: 100%" v-model="form.repairEndTime" type="datetime"
              format="YYYY-MM-DD HH:mm:ss" clearable placeholder="请选择修复结束时间" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="修复人" prop="repairer">
            <el-select v-model="form.repairer" clearable placeholder="请选择/输入修复人" filterable remote reserve-keyword
              allow-create remote-show-suffix :remote-method="getListUser" :loading="api_options.loading"
              style="width: 100%">
              <el-option v-for="item in api_options.options_user" :key="item.userName" :label="item.userName"
                :value="item.userName" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="修复原因" prop="reasonRepair">
            <el-input v-model="form.reasonRepair" placeholder="请输入修复原因" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="修复地点" prop="repairLocation">
            <el-input v-model="form.repairLocation" placeholder="请输入修复地点" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="修复情况及结果" prop="repairSituationResults">
            <el-input v-model="form.repairSituationResults" placeholder="请输入修复情况及结果" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="承担机构" prop="undertakingOrganization">
            <el-input v-model="form.undertakingOrganization" placeholder="请输入承担机构" />
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

import { addRepairRecord, editRepairRecord } from '@/api/collection-all/manage-work/repair-record'
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
  preRepairPhotos: '', // 修复前照片
  photosAfterRepair: '', // 修复后照片
  repairStartTime: '', // 修复开始时间
  repairEndTime: '', // 修复结束时间
  repairer: '', // 修复人
  reasonRepair: '', // 修复原因
  repairLocation: '', // 修复地点
  repairSituationResults: '', // 修复情况及结果
  undertakingOrganization: '' // 承担机构
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

// 设置图片
function handleUploadRelicImg(res, key) {
  form[key] = res ?? ''
}

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
          await editRepairRecord(form)
          props?.proxy?.$modal.msgSuccess('修改成功')
          emits('handleSubmit')
        } else {
          console.log('form ===> ', form)
          await addRepairRecord(form)
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
