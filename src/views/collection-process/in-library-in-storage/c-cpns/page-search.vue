<template>
  <el-form :model="queryParams" ref="queryRef" size="large" :inline="true">
    <el-row :span="24" :gutter="18">
      <el-col :span="4">
        <el-form-item label="入馆凭证号" prop="flowNo" style="width: 100%">
          <el-input placeholder="请输入" v-model="queryParams.flowNo" clearable @keyup.enter="onSearch" />
        </el-form-item>
      </el-col>

      <el-col :span="4">
        <el-form-item label="交件人" prop="delivery" style="width: 100%">
          <el-input placeholder="请输入" v-model="queryParams.delivery" clearable @keyup.enter="onSearch" />
        </el-form-item>
      </el-col>

      <el-col :span="7">
        <el-form-item label="提交时间" prop="dateRange" style="width: 100%">
          <el-date-picker v-model="queryParams.dateRange" type="daterange" value-format="YYYY-MM-DD" clearable
            range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" style="width: 100%;" />
        </el-form-item>
      </el-col>

      <el-col :span="4">
        <el-form-item label="审批状态" prop="approveStatus" style="width: 100%">
          <el-select size="large" placeholder="请选择" v-model="queryParams.approveStatus" clearable style="width: 100%">
            <el-option v-for="dict in approveStatusList" :key="dict.value" :label="dict.label" :value="dict.value" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="5">
        <div class="td-flex justify-end">
          <el-button class="button-c-primary" type="primary" @click="onSearch">查询</el-button>
          <el-button class="button-p-black" @click="onReset">重置</el-button>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup>
const approveStatusList = [
  { label: '已提交', value: '0' },
  { label: '审批中', value: '1' },
  { label: '审批结束', value: '2' },
  { label: '驳回', value: '3' }
]

const queryRef = ref();
const queryParams = reactive({
  flowNo: '',//凭证号
  delivery: '',//交件人
  dateRange: '',//起止时间
  approveStatus: '',//审核状态
})
defineProps({
  loading: {
    type: Boolean,
    default: false
  }
})
function getParams() {
  let { flowNo, delivery, dateRange, approveStatus } = { ...queryParams }
  let params = { flowNo, delivery, approveStatus }
  if (dateRange) {
    params.startTime = dateRange[0]
    params.endTime = dateRange[1]
  }
  return params
}
const emits = defineEmits(['search', 'reset'])

function onSearch() {
  emits('search', getParams())
}

function onReset() {
  queryRef.value?.resetFields();
  emits('search', {})
}

defineExpose({
  getQueryParams: () => {
    return getParams()
  }
})
</script>

<style lang="scss" scoped>
.handle-button {
  justify-content: flex-end;
}
</style>
