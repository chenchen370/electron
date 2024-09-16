<template>
  <el-form class="coder-wang-form" :model="queryParams" ref="queryRef" size="large" :inline="true" label-width="auto">
    <el-row :span="24" :gutter="18">
      <el-col :span="6">
        <el-form-item label="藏品编号" prop="relicId" style="width: 100%">
          <el-input style="width: 100%" v-model="queryParams.relicId" placeholder="请输入藏品编号" clearable
            @keyup.enter="handleSearch" />
        </el-form-item>
      </el-col>

      <el-col :span="6">
        <el-form-item label="藏品名称" prop="relicName" style="width: 100%">
          <el-input style="width: 100%" v-model="queryParams.relicName" placeholder="请输入藏品名称" clearable
            @keyup.enter="handleSearch" />
        </el-form-item>
      </el-col>

      <el-col :span="6">
        <el-form-item label="文物级别" prop="relicLevel" style="width: 100%">
          <el-select v-model="queryParams.relicLevel" placeholder="请选择文物级别" clearable style="width: 100%">
            <el-option v-for="item in optionsInfo.options_artifact_level" :key="item.value" :label="item.label"
              :value="item.label" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="6">
        <el-form-item label="文物类别" prop="relicCategory" style="width: 100%">
          <el-select v-model="queryParams.relicCategory" placeholder="请选择文物类别" clearable style="width: 100%">
            <el-option v-for="item in optionsInfo.options_artifact_type" :key="item.value" :label="item.label"
              :value="item.label" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="6">
        <el-form-item label="年代" prop="relicYears" style="width: 100%">
          <el-tree-select node-key="dictCode" v-model="queryParams.relicYears" clearable placeholder="请选择年代"
            :data="optionsInfo.options_years" style="width: 100%" :props="{
              children: 'children',
              label: 'dictLabel',
              value: 'dictLabel'
            }" check-strictly />
        </el-form-item>
      </el-col>

      <el-col :span="12">
        <el-form-item label="关键字" prop="searchValue" style="width: 100%">
          <el-input style="width: 100%" v-model="queryParams.searchValue" placeholder="请输关键字" clearable
            @keyup.enter="handleSearch" />
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
  deptId: undefined,
  relicId: undefined,
  relicName: undefined,
  relicLevel: undefined,
  relicCategory: undefined,
  relicYears: undefined,
  searchValue: undefined
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
