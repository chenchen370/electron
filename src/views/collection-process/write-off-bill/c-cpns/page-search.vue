<template>
  <el-form :model="queryParams" ref="queryRef" size="large" :inline="true" v-show="queryOpt.showSearch">
    <el-row :span="24" :gutter="60">
      <el-col :span="5">
        <el-form-item label="销字" prop="flowYear" style="width: 100%" label-width="auto">
          <el-input v-model="queryParams.flowYear" placeholder="请输入" clearable @keyup.enter="handleSearch" />
        </el-form-item>
      </el-col>

      <el-col :span="5">
        <el-form-item label="号" prop="flowNo" style="width: 100%">
          <el-input v-model="queryParams.flowNo" placeholder="请输入" clearable @keyup.enter="handleSearch" />
        </el-form-item>
      </el-col>

      <el-col :span="7">
        <el-form-item label="提交时间" prop="dateRange" style="width: 100%">
          <el-date-picker v-model="queryParams.dateRange" type="daterange" value-format="YYYY-MM-DD" clearable
            range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" style="width: 100%;" />
        </el-form-item>
      </el-col>

      <el-col :span="7">
        <el-form-item label="审核状态" prop="approvalStat" style="width: 100%">
          <el-select v-model="queryParams.approvalStat" size="large" placeholder="请选择" clearable style="width: 100%">
            <el-option v-for="dict in status" :key="dict.value" :label="dict.label" :value="dict.value" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="5">
        <el-form-item label="提交人" prop="createBy" style="width: 100%;">
          <el-select v-model="queryParams.createBy" filterable clearable remote reserve-keyword allow-create
            suffix-icon="User" placeholder="请输入" remote-show-suffix :remote-method="getListUser"
            :loading="options_info.loading" class="userSelect">
            <el-option v-for="item in options_info.options_user" :key="item.userId" :label="item.userName"
              :value="item.userName" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="19">
        <div class="td-flex justify-end">
          <el-button class="button-c-primary" type="primary" @click="handleSearch">查询</el-button>
          <el-button class="button-p-black" @click="handleReset">重置</el-button>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup>
import { listUser } from '@/api/system/user'

defineProps({
  optionsInfo: {
    type: Object,
    default: () => ({})
  },
  queryOpt: {
    type: Object,
    default: () => ({})
  }
})
const status = [{ value: 0, label: '核查中' }, { value: 1, label: '待审核' }, { value: 2, label: '已注销' }]

const queryRef = ref();
const queryParams = reactive({
  flowYear: '',//销字
  flowNo: '',//销号
  dateRange: '',//提交时间
  approvalStat: '',//审批状态
  createBy: '',//提交人
})
function getParams() {
  let params = Object.assign({}, queryParams)
  if (params.dateRange) {
    params.startTime = params.dateRange[0]
    params.endTime = params.dateRange[1]
  }
  delete params.dateRange
  return params
}

const emits = defineEmits(['handleSearch'])

// options
const options_info = reactive({
  loading: false,
  options_user: []
})
async function getListUser(userName = '') {
  options_info.loading = true
  const res = await listUser({ pageNum: 1, pageSize: 999, userName })
  options_info.options_user = res.rows ?? []
  options_info.loading = false
}
getListUser()

function handleSearch() {
  emits('handleSearch', getParams())
}

function handleReset() {
  queryRef.value?.resetFields();
  emits('handleSearch', {})
}
defineExpose({ handleReset })
</script>
