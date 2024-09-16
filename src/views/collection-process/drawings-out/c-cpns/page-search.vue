<template>
  <el-form :model="queryParams" ref="queryRef" size="large" :inline="true" label-width="auto">
    <el-row :span="24" :gutter="18">
      <el-col :span="6">
        <el-form-item label="提准字" prop="flowYear" style="width: 100%">
          <el-input v-model="queryParams.flowYear" placeholder="请输入" clearable @keyup.enter="onSearch" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="号" prop="flowNo" style="width: 100%">
          <el-input v-model="queryParams.flowNo" placeholder="请输入" clearable @keyup.enter="onSearch" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="提用人" prop="carryPerson" style="width: 100%">
          <el-input v-model="queryParams.carryPerson" placeholder="请输入" clearable @keyup.enter="onSearch" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="提交时间" prop="dateRange" style="width: 100%">
          <el-date-picker v-model="queryParams.dateRange" type="daterange" value-format="YYYY-MM-DD" clearable
            range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="提用去向" prop="outType" style="width: 100%">
          <el-select size="large" v-model="queryParams.outType" placeholder="请选择" clearable style="width: 100%">
            <el-option v-for="dict in options.out_type" :key="dict.value" :label="dict.label" :value="dict.value" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="提用类型" prop="applicationType" style="width: 100%">
          <el-select size="large" v-model="queryParams.applicationType" placeholder="请选择" clearable style="width: 100%">
            <el-option v-for="dict in options.application_type" :key="dict.value" :label="dict.label"
              :value="dict.value" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="6">
        <el-form-item label="审批状态" prop="flowStatus" style="width: 100%">
          <el-select size="large" v-model="queryParams.flowStatus" placeholder="请选择" clearable style="width: 100%">
            <el-option v-for="dict in options.flowStatus" :key="dict.value" :label="dict.label" :value="dict.value" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="6">
        <div class="td-flex justify-end">
          <el-button class="button-c-primary" type="primary" :loading="loading" @click="onSearch">搜索</el-button>
          <el-button class="button-p-black" @click="onReset">重置</el-button>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  options: {
    type: Object,
    default: () => { }
  }
})

const queryRef = ref()
const queryParams = reactive({
  flowYear: undefined,//字
  flowNo: undefined,//号
  carryPerson: undefined,//提用人
  dateRange: undefined,//起止时间
  outType: undefined,//提用去想
  applicationType: undefined,//提用类型
  flowStatus: undefined,//审核状态
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
