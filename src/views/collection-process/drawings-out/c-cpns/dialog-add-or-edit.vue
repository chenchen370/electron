<template>
  <!-- 添加或修改对话框 -->
  <el-dialog :title="title" v-model="visible" width="1200px" append-to-body @close="hide" align-center
    :show-close="false">
    <el-tabs v-model="activeName" @tab-change="onTabChange">
      <el-tab-pane label="基本提用信息" name="basicInfo"></el-tab-pane>
      <el-tab-pane label="提用详细信息" name="outDetail"></el-tab-pane>
      <el-tab-pane label="提用藏品" name="outRelics"></el-tab-pane>
    </el-tabs>
    <el-scrollbar height="600px" ref="scrollbarRef" always>
      <div ref="formContainerRef">
        <el-form ref="formRef" :model="form" :rules="rules" label-width="auto" label-position="top" size="large">
          <div id="basicInfo" class="mb-4 fw-500 text-lg">基本提用信息</div>
          <el-row :gutter="40">
            <el-col :span="8">
              <el-form-item label="提用去向" prop="outType">
                <el-select size="large" v-model="form.outType" placeholder="请选择" clearable style="width: 100%">
                  <el-option v-for="dict in options.out_type" :key="dict.value" :label="dict.label"
                    :value="dict.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="提用类型" prop="applicationType">
                <el-select size="large" v-model="form.applicationType" placeholder="请选择" clearable style="width: 100%">
                  <el-option v-for="dict in options.application_type" :key="dict.value" :label="dict.label"
                    :value="dict.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="提用登记号" prop="flowNo">
                <el-input v-model="form.flowNo" disabled />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="提用日期" prop="carryTime">
                <el-date-picker v-model="form.carryTime" type="date" style="width: 100%" />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="提用人" prop="carryPerson">
                <el-input v-model="form.carryPerson" placeholder="请输入" />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="提用负责人" prop="carryRespon">
                <el-select v-model="form.carryRespon" filterable clearable remote reserve-keyword allow-create
                  suffix-icon="User" placeholder="请输入" remote-show-suffix :remote-method="getListUser"
                  :loading="options_info.loading" class="userSelect">
                  <el-option v-for="item in options_info.options_user" :key="item.userId" :label="item.userName"
                    :value="item.userName" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="证明人" prop="witness">
                <el-select v-model="form.witness" clearable filterable remote reserve-keyword allow-create
                  placeholder="请选择" suffix-icon="User" remote-show-suffix :remote-method="getListUser"
                  :loading="options_info.loading" class="userSelect">
                  <el-option v-for="item in options_info.options_user" :key="item.userId" :label="item.userName"
                    :value="item.userName" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审批单位" prop="approvalUnit">
                <el-input placeholder="请输入" v-model="form.approvalUnit" />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="审批人" prop="approvalName">
                <el-select v-model="form.approvalName" clearable filterable remote reserve-keyword allow-create
                  placeholder="请选择" suffix-icon="User" remote-show-suffix :remote-method="getListUser"
                  :loading="options_info.loading" class="userSelect">
                  <el-option v-for="item in options_info.options_user" :key="item.userId" :label="item.userName"
                    :value="item.userName" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="批准文号" prop="approvalNumber">
                <el-input placeholder="请输入" v-model="form.approvalNumber" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="合同号" prop="contractNumber">
                <el-input placeholder="请输入" v-model="form.contractNumber" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="上传附件" prop="attachment">
            <template #label>
              <div>
                上传附件
                <span class="text-gray-4">馆外提用请上传藏品借用函、借用单位简介、安保方案、借用协议、省局批复文件等附件用以审批备查。</span>
              </div>
            </template>
            <div flex="~ col">
              <pro-file-upload :is-show-tip="false" v-model="form.attachment" />
            </div>
          </el-form-item>
          <div id="outDetail" class="mb-4 fw-500 text-lg">提用详细信息</div>

          <!-- 展览 S -->
          <el-row :gutter="40" v-if="form.applicationType === '1'">
            <el-col :span="8">
              <el-form-item label="展览类型" prop="exhibitionType">
                <el-select size="large" v-model="form.exhibitionType" placeholder="请选择" clearable style="width: 100%">
                  <el-option v-for="dict in options.exhibition_type" :key="dict.value" :label="dict.label"
                    :value="dict.value" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="选择展览名称" prop="exhibitionName">
                <el-input v-model="form.exhibitionName" placeholder="请输入">
                  <template #suffix>
                    <el-button type="primary" @click="dialogExhibitionTableRef.show()" link>选择展览</el-button>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="展览时间" prop="endDate">
                <el-date-picker v-model="form.dateRange" type="daterange" range-separator="至" start-placeholder="开始时间"
                  end-placeholder="结束时间" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="展览组织机构" prop="exhibitionOrg">
                <el-input v-model="form.exhibitionOrg" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="展览举办地点" prop="location">
                <el-input v-model="form.location" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="借展单位" prop="borrowDep">
                <el-input v-model="form.borrowDep" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="批准机构" prop="approvalUnit">
                <el-input v-model="form.approvalUnit" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="批文号" prop="approvalNumber">
                <el-input v-model="form.approvalNumber" placeholder="请输入" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 展览 E -->

          <!-- 修复 S -->
          <el-row :gutter="40" v-if="form.applicationType === '2'">
            <el-col :span="8">
              <el-form-item label="修复时间" prop="endDate">
                <el-date-picker v-model="form.dateRange" type="daterange" range-separator="至" start-placeholder="开始时间"
                  end-placeholder="结束时间" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="承担机构" prop="fixDep">
                <el-input v-model="form.fixDep" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="修复人" prop="fixer">
                <el-input v-model="form.fixer" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="修复地点" prop="location">
                <el-input v-model="form.location" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="修复原因" prop="fixReason">
                <el-input v-model="form.fixReason" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="修复情况及结果" prop="fixResult">
                <el-input v-model="form.fixResult" placeholder="请输入" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 修复  E -->

          <!-- 移动 S -->
          <el-row :gutter="40" v-if="isNormalType">
            <el-col :span="8">
              <el-form-item label="移动原因" prop="moveReason">
                <el-input v-model="form.moveReason" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="16">
              <el-form-item label="移动时间" prop="endDate">
                <el-date-picker v-model="form.dateRange" type="daterange" range-separator="至" start-placeholder="开始时间"
                  end-placeholder="结束时间" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="移动目的地" prop="location">
                <el-input v-model="form.location" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="区域详细地址" prop="areaAddress">
                <el-input v-model="form.areaAddress" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="执行单位" prop="executeDep">
                <el-input v-model="form.executeDep" placeholder="请输入" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="具体事由" prop="specificReasons">
                <el-input v-model="form.specificReasons" placeholder="请输入" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 移动 E -->
          <el-row :gutter="40">
            <el-col :span="24">
              <el-form-item label="备注" prop="comment">
                <el-input type="textarea" v-model="form.comment" :rows="6" placeholder="请输入" />
              </el-form-item>
            </el-col>
          </el-row>
          <!-- 提用藏品 -->
          <div id="outRelics" class="mb-4 fw-500 text-lg flex justify-between">
            <div>
              提用藏品<span class="font-500 p-l-2">({{ form.tbFlowRelics.length }})</span>
            </div>
            <CommHandleBtn title="选择藏品" img-name="add" @handle-click="dialogRelicsRef.show(form.tbFlowRelics)" />
          </div>
          <SelectedRelics :list="form.tbFlowRelics" @delete="onDeleteRelic" />
          <DialogRelics :options="options" ref="dialogRelicsRef" @ok="onConfirmSelect" />
          <div class="h-10"></div>
        </el-form>
      </div>
    </el-scrollbar>
    <template #footer>
      <div class="dialog-footer">
        <el-button class="button-p-cancel" @click="hide">取消</el-button>
        <el-button class="button-c-sure" type="primary" :loading="submitLoading" @click="onSubmit">确定</el-button>
        <el-button class="button-c-sure" type="primary" :loading="submitLoading" @click="onApprove">提交审核</el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 选择展览 -->
  <DialogExhibitionTable ref="dialogExhibitionTableRef" :options="options" @ok="onConfirmExhibition" />
</template>

<script setup>
import { useFormDialog } from '@/hooks/useFormDialog'
import DialogRelics from './dialog-relics-table.vue'
import SelectedRelics from './selected-relics-table.vue'
import DialogExhibitionTable from './dialog-exhibition-table.vue'
import CommHandleBtn from '@/components/comm-cpns/comm-handle-btn/comm-handle-btn.vue'

import { getoutManageCode, outManageUpdate, outManageCreate, outManageDetail, outManageSubmit } from '@/api/warehouse/index'
import { listUser } from '@/api/system/user'

import { dayjs, ElMessage } from 'element-plus';
import { da } from 'element-plus/es/locales.mjs'

defineProps({
  options: {
    type: Object,
    default: () => { }
  }
})

const dialogExhibitionTableRef = ref()
const { visible, hide, show, onSubmit, submitLoading, isEdit, formRef, onApprove } = useFormDialog({
  onShow,
  onSuccess,
  onAdd,
  onEdit,
  onFail,
  onOutManageSubmit
})

const dialogRelicsRef = ref()

const title = computed(() => {
  return (isEdit.value ? '发起' : '编辑') + '提用出库流程'
})

const form = reactive({
  id: undefined,
  specificReasons: undefined,
  applicationType: undefined,
  approvalDep: undefined,
  approvalName: undefined,
  approvalNo: undefined,
  approvalNumber: undefined,
  approvalUnit: undefined,
  areaAddress: undefined,
  attachment: undefined,
  borrowDep: undefined,
  carryPerson: undefined,
  carryRespon: undefined,
  carryTime: undefined,
  comment: undefined,
  contractNumber: undefined,
  endDate: undefined,
  executeDep: undefined,
  exhibitionName: undefined,
  exhibitionId: undefined,
  exhibitionOrg: undefined,
  exhibitionType: undefined,
  fileSerialNumber: undefined,
  fixDep: undefined,
  fixReason: undefined,
  fixResult: undefined,
  fixer: undefined,
  flowNo: undefined,
  flowStatus: undefined,
  flowTime: undefined,
  location: undefined,
  moveReason: undefined,
  outNum: 0,
  outStatus: 0,
  outType: undefined,
  relicsNum: 0,
  startDate: undefined,
  tbFlowRelics: [],
  witness: undefined,
  dateRange: [],
})
const rules = {
  carryPerson: [{ required: true, message: '请输入提用人' }],
  outType: [{ required: true, message: '请选择提用去向' }],
  applicationType: [{ required: true, message: '请选择提用类型' }],
  flowNo: [{ required: true, message: '请输入提用登记号' }],
  carryTime: [{ required: true, message: '请选择提用日期' }]
  // carryRespon: [{ required: true, message: '请选择' }]
}
const emits = defineEmits(['ok'])

const isNormalType = computed(() => {
  return !['1', '2'].includes(form.applicationType)
})

const activeName = ref('basicInfo')
const scrollbarRef = ref()
const formContainerRef = ref()

function onTabChange(name) {
  const el = document.querySelector(`#${name}`)
  const top = el.offsetTop - formContainerRef.value.offsetTop
  scrollbarRef.value.setScrollTop(top)
}

function onConfirmSelect(v) {
  form.tbFlowRelics = v
}

function onDeleteRelic(index) {
  form.tbFlowRelics.splice(index, 1)
}

function onSuccess() {
  ElMessage.success('操作成功')
  emits('ok')
  hide()
}

function onConfirmExhibition(v) {
  console.log(v)
  form.exhibitionName = v.exhibitionName
  // form.exhibitionOrg = v.exhibitionOrganization
  // form.exhibitionType = v.exhibitionType
  form.exhibitionId = v.id
}

function reset() {
  Object.keys(form).forEach(k => {
    form[k] = undefined
  })
  form.outNum = 0
  form.outStatus = 0
  form.relicsNum = 0
  form.tbFlowRelics = []
  form.dateRange = [];
}

function onFail(err) {
  console.log(err)
}

function validateForm(data) {
  if (data.tbFlowRelics.length === 0) {
    ElMessage.warning('请添加藏品')
    return false;
  }
  return true;
}

function getSubmitData() {
  const data = toRaw(form)
  if (data.dateRange?.length) {
    const [start, end] = data.dateRange;
    data.startDate = start;
    data.endDate = end;
  }
  if (data.carryTime) data.carryTime = dayjs(data.carryTime).format('YYYY-MM-DD HH:mm:ss');
  if (data.startDate) data.startDate = dayjs(data.startDate).format('YYYY-MM-DD HH:mm:ss');
  if (data.endDate) data.endDate = dayjs(data.endDate).format('YYYY-MM-DD HH:mm:ss');
  return data;
}

function onAdd() {
  const data = getSubmitData();
  if (!validateForm(data)) return;
  return outManageCreate(data)
}

function onEdit() {
  const data = getSubmitData();
  if (!validateForm(data)) return;
  return outManageUpdate(data)
}

async function onShow(data = {}) {
  reset()
  if (!data.id) {
    // 获取提用登记号    
    getoutManageCode().then(res => {
      form.flowNo = res.data.flowNo
    })
  } else {
    getDetail(data.id)
  }
  await nextTick()
  activeName.value = 'basicInfo';
  scrollbarRef.value?.setScrollTop(0)
}

function getDetail(id) {
  outManageDetail(id).then(res => {
    const data = res.data || {}
    Object.keys(form).forEach(k => {
      form[k] = data[k]
    })
    if (data.startDate) {
      form.dateRange = [data.startDate, data.endDate]
    }
  })
}

function onOutManageSubmit() {
  const data = getSubmitData();
  console.log("------", data.id);
  if (!validateForm(data)) return;
  return outManageSubmit(data)
}


// options
const options_info = reactive({
  loading: false,
  options_user: []
})

async function getListUser(userName) {
  options_info.loading = true
  try {
    const res = await listUser({ pageNum: 1, pageSize: 999, userName })
    options_info.options_user = res.rows
    options_info.loading = false
  } catch (e) {
    options_info.loading = false
    options_info.options_user = []
  }
}
getListUser()

defineExpose({
  show,
  hide
})
</script>

<style lang="scss" scoped>
.el-scrollbar {

  //box-sizing: border-box;
  :deep(.el-scrollbar__bar.is-horizontal) {
    height: 0;
    width: 0;
  }
}

.detail-title {
  font-family: Source Han Serif CN;
  font-weight: 600;
  font-size: 20px;
  color: #064235;
  line-height: 29px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}
</style>
