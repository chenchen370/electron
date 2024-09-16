<template>
  <el-form :model="queryParams" ref="queryRef" size="large" :inline="true">
    <el-row :span="24" :gutter="22">
      <el-col :span="5">
        <el-form-item label="展览名称" prop="exhibitionName" style="width: 100%" label-width="auto">
          <el-input v-model="queryParams.exhibitionName" placeholder="请输入" clearable @keyup.enter="handleSearch" />
        </el-form-item>
      </el-col>

      <el-col :span="5">
        <el-form-item label="展览类型" prop="exhibitionType" style="width: 100%">
          <el-select placeholder="请选择" v-model="queryParams.exhibitionType" clearable style="width: 100%">
            <el-option v-for="dict in options.exhibition_type" :key="dict.value" :label="dict.label"
              :value="dict.value" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="9">
        <el-form-item label="展览时间" prop="dateRange" style="width: 100%">
          <el-date-picker v-model="queryParams.dateRange" value-format="YYYY-MM-DD" type="daterange" range-separator="-"
            start-placeholder="开始时间" end-placeholder="结束时间" />
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
  },
  options: {
    type: Object,
    default: () => ({})
  }
})

const queryRef = ref();
const queryParams = reactive({})

function getParams() {
  let params = Object.assign({}, queryParams)
  if (params.dateRange) {
    params.startTime = params.dateRange[0]
    params.endTime = params.dateRange[1]
  }
  delete params.dateRange
  return params
}

const emits = defineEmits(['handleSearch', 'handleReset'])

function handleSearch() {
  emits('handleSearch', getParams())
}

function handleReset() {
  queryRef.value?.resetFields();
  emits('handleSearch', {})
}
defineExpose({ handleReset })
</script>
