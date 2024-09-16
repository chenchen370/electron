<template>
  <el-form :model="queryParams" ref="queryRef" size="large" :inline="true">
    <el-row :span="24" :gutter="22">
      <el-col :span="4">
        <el-form-item label="销字" prop="flowYear" style="width: 100%" label-width="auto">
          <el-input v-model="queryParams.flowYear" placeholder="请输入" clearable @keyup.enter="handleSearch" />
        </el-form-item>
      </el-col>

      <el-col :span="4">
        <el-form-item label="号" prop="flowNo" style="width: 100%">
          <el-input v-model="queryParams.flowNo" placeholder="请输入" clearable @keyup.enter="handleSearch" />
        </el-form-item>
      </el-col>

      <el-col :span="6">
        <el-form-item label="提交时间" prop="dateRange" style="width: 100%">
          <el-date-picker v-model="queryParams.dateRange" type="daterange" value-format="YYYY-MM-DD" clearable
            range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" style="width: 100%;" />
        </el-form-item>
      </el-col>

      <el-col :span="5">
        <el-form-item label="审核状态" prop="approvalStat" style="width: 100%">
          <el-select v-model="queryParams.approvalStat" size="large" placeholder="请选择" clearable>
            <el-option v-for="dict in status" :key="dict.value" :label="dict.label" :value="dict.value" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="5">
        <div class="td-flex justify-end">
          <el-button class="button-c-primary" type="primary" @click="handleSearch">查询</el-button>
          <el-button class="button-p-black" @click="handleReset">重置</el-button>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup>

defineProps({
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
  dateRange: '',//起止时间
  approvalStat: '',//审批状态
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

function handleSearch() {
  emits('handleSearch', getParams())
}

function handleReset() {
  queryRef.value?.resetFields();
  emits('handleSearch', {})
}
defineExpose({ handleReset })
</script>
