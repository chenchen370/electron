<template>
  <el-form class="coder-wang-form" :model="queryParams" ref="queryRef" size="large" :inline="true"
    v-show="queryOpt.showSearch" label-width="auto">
    <el-row :span="24" :gutter="18">
      <el-col :span="6">
        <el-form-item label="部门" prop="deptId" style="width: 100%">
          <el-cascader style="width: 100%" placeholder="请选择部门" v-model="queryParams.deptId"
            :options="optionsInfo.options_dept_tree" :props="{
              label: 'label',
              value: 'id',
              children: 'children',
              checkStrictly: true
            }" clearable />
        </el-form-item>
      </el-col>

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
            <el-option v-for="dict in optionsInfo.options_artifact_level" :key="dict.value" :label="dict.label"
              :value="dict.value" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="6">
        <el-form-item label="文物类别" prop="relicCategory" style="width: 100%">
          <el-select v-model="queryParams.relicCategory" placeholder="请选择文物类别" clearable style="width: 100%">
            <el-option v-for="dict in optionsInfo.options_artifact_type" :key="dict.value" :label="dict.label"
              :value="dict.value" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="6">
        <el-form-item label="年代" prop="relicYears" style="width: 100%">
          <el-tree-select node-key="dictCode" v-model="queryParams.relicYears" placeholder="请选择年代"
            :data="optionsInfo.options_years_tree" style="width: 100%" :props="{
              children: 'children',
              label: 'dictLabel',
              value: 'dictCode'
            }" clearable check-strictly />
        </el-form-item>
      </el-col>

      <el-col :span="6">
        <el-form-item label="关键字" prop="searchValue" style="width: 100%">
          <el-input v-model="queryParams.searchValue" placeholder="请输入关键字，多个用空格隔开" clearable style="width: 100%"
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
