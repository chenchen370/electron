<template>
  <!-- 添加或修改活动对话框 -->
  <el-dialog class="coder-wang-dialog" :title="title" v-model="open" width="1200px" append-to-body
    :before-close="handleCancel" align-center :show-close="false">
    <el-scrollbar :height="`calc(100vh - 280px)`">
      <el-form class="coder-wang-form" ref="formRef" :model="form" :rules="rules" label-width="auto" size="large"
        label-position="top">
        <el-row :span="24" :gutter="20">
          <el-col :span="6">
            <el-form-item label="文物类别" prop="relicCategory">
              <el-select v-model="form.relicCategory" clearable placeholder="请选择文物类别" style="width: 100%">
                <el-option v-for="item in props.optionsInfo.options_artifact_type" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="文物来源" prop="relicFrom">
              <el-input v-model="form.relicFrom" placeholder="请输入文物来源" />
            </el-form-item>

            <el-form-item label="文物图片" prop="relicImg">
              <template #default>
                <ImageUpload :limit="1" :model-value="form.relicImg" upload-url="/heritage/file/upload/repair"
                  @update:modelValue="handleUploadRelicImg" />
              </template>
            </el-form-item>
            <el-form-item label="藏品材质" prop="relicMaterial">
              <el-input v-model="form.relicMaterial" placeholder="请输入藏品材质" />
            </el-form-item>

            <el-form-item label="文物存在问题" prop="relicProblem">
              <el-input v-model="form.relicProblem" placeholder="请输入文物存在问题" />
            </el-form-item>
            <el-form-item label="工时" prop="workingHours">
              <el-input-number style="width: 100%" v-model="form.workingHours" placeholder="请输入工时"
                controls-position="right" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="收藏单位" prop="collectionUnit">
              <el-input v-model="form.collectionUnit" placeholder="请输入收藏单位" />
            </el-form-item>
            <el-form-item label="批准单位名称" prop="ratifyUnitName">
              <el-input v-model="form.ratifyUnitName" placeholder="请输入批准单位名称" />
            </el-form-item>
            <el-form-item style="height: 172px"></el-form-item>
            <el-form-item label="藏品名称" prop="relicName">
              <el-input v-model="form.relicName" placeholder="请输入藏品名称" />
            </el-form-item>

            <el-form-item label="文物修复状态" prop="relicState">
              <el-select v-model="form.relicState" clearable placeholder="请选择文物修复状态" style="width: 100%">
                <el-option v-for="item in props.optionsInfo.options_relic_state" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="周期" prop="cycle">
              <el-input-number style="width: 100%" v-model="form.cycle" placeholder="请输入周期" controls-position="right" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="文物级别" prop="relicLevel">
              <el-select v-model="form.relicLevel" clearable placeholder="请选择文物级别" style="width: 100%">
                <el-option v-for="item in props.optionsInfo.options_artifact_level" :key="item.value"
                  :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item label="文物登记号" prop="relicId">
              <el-input v-model="form.relicId" placeholder="请输入文物登记号" />
            </el-form-item>
            <el-form-item label="方案设计单位" prop="schemeDesignUnit">
              <el-input v-model="form.schemeDesignUnit" placeholder="请输入方案设计单位" />
            </el-form-item>
            <el-form-item label="方案编号" prop="schemeCode">
              <el-input v-model="form.schemeCode" placeholder="请输入方案编号" />
            </el-form-item>
            <el-form-item label="提取日期" prop="extractTime">
              <el-date-picker style="width: 100%" v-model="form.extractTime" type="datetime"
                format="YYYY-MM-DD HH:mm:ss" placeholder="请选择提取日期" />
            </el-form-item>
            <el-form-item label="具体年代" prop="relicYearsDetail">
              <el-date-picker style="width: 100%" v-model="form.relicYearsDetail" type="year" format="YYYY"
                value-format="YYYY" placeholder="请选择具体年代" />
            </el-form-item>
            <el-form-item label="备注" prop="remark">
              <el-input v-model="form.remark" placeholder="请输入备注" />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="保护修复单位" prop="protectionRepairUnit">
              <el-input v-model="form.protectionRepairUnit" placeholder="请输入保护修复单位" />
            </el-form-item>
            <el-form-item label="批准文号" prop="ratifyNum">
              <el-input v-model="form.ratifyNum" placeholder="请输入批准文号" />
            </el-form-item>

            <el-form-item label="方案名称" prop="schemeName">
              <el-input v-model="form.schemeName" placeholder="请输入方案名称" />
            </el-form-item>

            <el-form-item label="提取经办人" prop="extractUserName">
              <el-select v-model="form.extractUserName" clearable filterable remote reserve-keyword allow-create
                placeholder="请选择提取经办人" remote-show-suffix :remote-method="getListUser" :loading="options_info.loading"
                style="width: 100%">
                <el-option v-for="item in options_info.options_user" :key="item.userId" :label="item.userName"
                  :value="item.userName" />
              </el-select>
            </el-form-item>

            <el-form-item label="返还经办人" prop="returnUserName">
              <el-select v-model="form.returnUserName" clearable filterable remote reserve-keyword allow-create
                placeholder="请选择返还经办人" remote-show-suffix :remote-method="getListUser" :loading="options_info.loading"
                style="width: 100%">
                <el-option v-for="item in options_info.options_user" :key="item.id" :label="item.userName"
                  :value="item.userName" />
              </el-select>
            </el-form-item>

            <el-form-item label="返还日期" prop="returnTime">
              <el-date-picker style="width: 100%" v-model="form.returnTime" type="datetime" format="YYYY-MM-DD HH:mm:ss"
                placeholder="请选择提取日期" />
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
import { ref, reactive, computed, watch } from 'vue'

import type { FormInstance } from 'element-plus'
import type { IPropsFrom } from '../type.ts'

import { listUser } from '@/api/system/user'
import { addRepair, updateRepair } from '@/api/collection/repair.ts'

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
  collectionUnit: '', // 收藏单位
  extractUserName: '', // 提取经办人
  extractTime: '', // 提取日期

  protectionRepairUnit: '', // 保护修复单位
  ratifyNum: '', // 批准文号
  ratifyUnitName: '', // 批准单位名称

  relicCategory: '', // 文物类别
  relicFrom: '', // 文物来源
  relicId: '', // 文物登记号
  relicImg: '', // 文物图片
  relicLevel: '', // 文物级别

  relicMaterial: '', // 藏品材质
  relicName: '', // 藏品名称

  relicProblem: '', // 文物存在问题
  relicState: '', // 文物修复状态
  relicYearsDetail: '', // 具体年代

  returnUserName: '', // 返还经办人
  returnTime: '', // 返还日期

  schemeCode: '', // 方案编号
  schemeDesignUnit: '', // 方案设计单位
  schemeName: '', // 方案名称
  remark: '', // 备注

  workingHours: 0, // 工时
  cycle: 0 // 周期
})
const rules = reactive({})

// options
const options_info = reactive<any>({
  loading: false,
  options_user: []
})

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
  form.relicImg = res ?? ''
}

// 回填数据
watch(
  props.rowObj,
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
          await updateRepair(form)
          props?.proxy?.$modal.msgSuccess('修改成功')
          emits('handleSubmit')
        } else {
          await addRepair(form)
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
