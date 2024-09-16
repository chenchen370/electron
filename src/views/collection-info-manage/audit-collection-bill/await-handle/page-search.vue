<template>
  <el-form class="coder-wang-form" :model="queryParams" ref="queryRef" size="large" :inline="true" label-width="auto">
    <el-row :span="24" :gutter="18">
      <el-col :span="6">
        <el-form-item label="藏品编号" prop="relicsId" style="width: 100%">
          <el-input style="width: 100%" v-model="queryParams.relicsId" placeholder="请输入藏品编号" clearable @keyup.enter="handleSearch" />
        </el-form-item>
      </el-col>

      <el-col :span="6">
        <el-form-item label="藏品名称" prop="relicName" style="width: 100%">
          <el-input style="width: 100%" v-model="queryParams.relicName" placeholder="请输入藏品名称" clearable @keyup.enter="handleSearch" />
        </el-form-item>
      </el-col>

      <el-col :span="6">
        <el-form-item label="审核类型" prop="approvalType" style="width: 100%">
          <el-select v-model="queryParams.approvalType" placeholder="请选择审核类型" clearable style="width: 100%">
            <el-option v-for="dict in options_approval_type" :key="dict.value" :label="dict.label" :value="dict.value" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="6" justify="end">
        <div class="td-flex justify-end" style="width: 100%">
          <el-button class="button-c-primary" type="primary" icon="Search" @click="handleSearch">搜索</el-button>
          <el-button class="button-p-black" icon="Refresh" @click="handleReset">重置</el-button>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup>
import { options_approval_type } from '@/views/collection-info-manage/dict'

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

const queryRef = ref()
const queryParams = reactive({
  relicsId: undefined,
  relicName: undefined,
  approvalType: undefined
})

const emits = defineEmits(['handleSearch', 'handleReset'])

function handleSearch() {
  emits('handleSearch', queryParams)
}

function handleReset() {
  queryRef.value?.resetFields?.()
  emits('handleSearch', queryParams)
}
defineExpose({ handleReset })
</script>

<style lang="scss" scoped>
.handle-button {
  justify-content: flex-end;
}
</style>
