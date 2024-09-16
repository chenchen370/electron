<template>
  <!-- 添加或修改活动对话框 -->
  <el-dialog class="coder-wang-dialog" :title="title" v-model="open" width="1280px" append-to-body
    :before-close="handleCancel" align-center :show-close="false">
    <el-scrollbar :height="`calc(100vh - 280px)`">
      <el-form class="coder-wang-form" ref="formRef" :model="form" :rules="rules" label-width="auto" size="large"
        label-position="top">
        <el-row :span="24" :gutter="49">
          <el-col :span="16">
            <el-row :span="24" :gutter="49">
              <el-col :span="12">
                <el-form-item label="修复档案路径" prop="documentUrl">
                  <el-input v-model="form.documentUrl" placeholder="请输入修复档案路径" />
                </el-form-item>

                <el-form-item label="修复人员" prop="repairUser">
                  <el-select v-model="form.repairUser" clearable filterable remote reserve-keyword allow-create
                    placeholder="请选择修复人员" remote-show-suffix :remote-method="getListUser"
                    :loading="options_info.loading" style="width: 100%">
                    <el-option v-for="item in options_info.options_user" :key="item.userName" :label="item.userName"
                      :value="item.userName" />
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="修复分类" prop="repairId">
                  <el-select v-model="form.repairId" clearable placeholder="请选择修复分类" style="width: 100%">
                    <el-option v-for="item in props?.optionsInfo?.options_repair" :key="item.id" :label="item.relicName"
                      :value="item.id" />
                  </el-select>
                </el-form-item>

                <el-form-item label="修复日期" prop="repairTime">
                  <el-date-picker style="width: 100%" v-model="form.repairTime" type="datetime"
                    format="YYYY-MM-DD HH:mm:ss" placeholder="请选择修复日期" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :span="24">
              <el-form-item label="影像资料" prop="imageData">
                <template #default>
                  <ImageUpload :limit="1" :model-value="form.imageData" upload-url="/heritage/file/upload/repair"
                    @update:modelValue="handleUploadRelicImg" />
                </template>
              </el-form-item>
            </el-row>

            <el-row :span="24" :gutter="49">
              <el-col :span="12">
                <el-form-item label="实施条件" prop="implementationConditions">
                  <el-input v-model="form.implementationConditions" placeholder="请输入实施条件" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="技术手段" prop="technicalMeans">
                  <el-input v-model="form.technicalMeans" placeholder="请输入技术手段" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="8">
            <el-form-item label="修复材料" prop="repairMaterial">
              <el-select v-model="form.repairMaterial" clearable placeholder="请选择修复材料" style="width: 100%">
                <el-option v-for="item in props.optionsInfo.options_repair_material" :key="item.id"
                  :label="item.materialName" :value="String(item.id)" />
              </el-select>
            </el-form-item>

            <el-form-item label="修复地点" prop="repairPlace">
              <el-input v-model="form.repairPlace" placeholder="请输入修复地点" />
            </el-form-item>

            <el-form-item label="修复工具" prop="repairTool">
              <el-input v-model="form.repairTool" placeholder="请输入修复工具" />
            </el-form-item>

            <el-form-item label="工作内容描述" prop="repairContentDesc">
              <el-input v-model="form.repairContentDesc" placeholder="请输入工作内容描述" />
            </el-form-item>

            <el-form-item label="技术环节" prop="technicalAspects">
              <el-input v-model="form.technicalAspects" placeholder="请输入技术环节" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="24">
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" placeholder="请输入备注" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-scrollbar>
    <template #footer>
      <div class="dialog-footer">
        <el-button class="button-c-sure" type="primary" @click="handleSubmit">确 定</el-button>
        <!-- <el-button class="button-p-cancel" @click="handleCancel">取 消</el-button> -->
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'

import type { FormInstance } from 'element-plus'
import type { IPropsFrom } from '../type.ts'

import { listUser } from '@/api/system/user'
import { addRepairProcess, updateRepairProcess } from '@/api/collection/repairProcess.ts'

interface IProps {
  title: string
  rowObj: IPropsFrom
  proxy?: any
  optionsInfo?: any
}

const props = withDefaults(defineProps<IProps>(), {
  title: '标题',
  rowObj: () => ({})
})

const emits = defineEmits(['handleCancel', 'handleSubmit'])

const open = ref<boolean>(true)
const formRef = ref<FormInstance>()

const form = reactive<IPropsFrom>({
  id: undefined,
  documentUrl: '', // 修复档案路径
  imageData: '', // 影像资料
  implementationConditions: '', // 实施条件
  repairContentDesc: '', // 工作内容描述

  repairId: '', // 修复分类ID
  repairMaterial: '', // 修复材料
  repairPlace: '', // 修复地点
  repairTime: '', // 修复日期
  repairTool: '', // 修复工具
  repairUser: '', // 修复人员

  technicalAspects: '', // 技术环节
  technicalMeans: '', // 技术手段
  remark: '' // 备注
})
const rules = reactive({})

// options
const options_info = reactive<any>({
  loading: false,
  options_user: []
})

// 用户
async function getListUser(userName?: string) {
  options_info.loading = true
  try {
    const res = (await listUser({ pageNum: 1, pageSize: 999, userName })) as any
    options_info.options_user = res.rows
    options_info.loading = false
  } catch (e) {
    options_info.loading = false
    options_info.options_user = []
  }
}
getListUser()

// 设置图片
function handleUploadRelicImg(res: string) {
  form.imageData = res ?? ''
}

// 回填数据
watch(
  props.rowObj,
  val => {
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
function initForm(rowObj: IPropsFrom) {
  Object.keys(form).forEach(key => {
    form[key] = rowObj[key]
  })
}

/** 提交按钮 */
function handleSubmit() {
  formRef.value!.validate(async valid => {
    try {
      if (valid) {
        if (form?.id != null) {
          await updateRepairProcess(form)
          props?.proxy?.$modal.msgSuccess('修改成功')
          emits('handleSubmit')
        } else {
          await addRepairProcess(form)
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
