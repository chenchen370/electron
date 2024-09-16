<template>
  <el-form class="coder-wang-form" :model="form" size="large" ref="queryRef" :inline="true" v-show="showSearch" label-width="auto">
    <el-row :span="24" :gutter="18">
      <el-col :span="6">
        <el-form-item label="文物类别" prop="relicCategory" style="width: 100%">
          <el-select v-model="form.relicCategory" clearable placeholder="请选择文物类别" style="width: 100%">
            <el-option v-for="item in props.optionsInfo.options_artifact_type" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="6">
        <el-form-item label="文物级别" prop="relicLevel" style="width: 100%">
          <el-select v-model="form.relicLevel" clearable placeholder="请选择文物级别" style="width: 100%">
            <el-option v-for="item in props.optionsInfo.options_artifact_level" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="6">
        <el-form-item label="文物来源" prop="relicFrom" style="width: 100%">
          <el-input v-model="form.relicFrom" placeholder="请输入文物来源" />
        </el-form-item>
      </el-col>

      <el-col :span="6">
        <el-form-item label="文物登记号" prop="relicId" style="width: 100%">
          <el-input v-model="form.relicId" placeholder="请输入文物登记号" />
        </el-form-item>
      </el-col>

      <el-col :span="6">
        <el-form-item label="藏品材质" prop="relicMaterial" style="width: 100%">
          <el-input v-model="form.relicMaterial" placeholder="请输入藏品材质" />
        </el-form-item>
      </el-col>

      <el-col :span="6">
        <el-form-item label="藏品名称" prop="relicName" style="width: 100%">
          <el-input v-model="form.relicName" placeholder="请输入藏品名称" />
        </el-form-item>
      </el-col>

      <el-col :span="6">
        <el-form-item label="文物存在问题" prop="relicProblem" style="width: 100%">
          <el-input v-model="form.relicProblem" placeholder="请输入文物存在问题" />
        </el-form-item>
      </el-col>

      <el-col :span="6">
        <el-form-item label="文物修复状态" prop="relicState" style="width: 100%">
          <el-select v-model="form.relicState" clearable placeholder="请选择文物修复状态" style="width: 100%">
            <el-option v-for="item in props.optionsInfo.options_relic_state" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="具体年代" prop="relicYearsDetail" style="width: 100%">
          <el-date-picker style="width: 100%" v-model="form.relicYearsDetail" type="year" format="YYYY" value-format="YYYY" placeholder="请选择具体年代" />
        </el-form-item>
      </el-col>
      <el-col :span="18">
        <div class="td-flex td-mb10 justify-end">
          <el-button class="button-c-primary" type="primary" icon="Search" @click="handleSearch"> 搜索 </el-button>
          <el-button class="button-p-black" icon="Refresh" @click="handleReset"> 重置 </el-button>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

import type { FormInstance } from 'element-plus'
import type { IPropsFrom } from '../type.ts'

interface IProps {
  proxy: object
  showSearch: boolean
  optionsInfo?: any
}

const props = withDefaults(defineProps<IProps>(), {
  proxy: () => ({}),
  showSearch: true
})

const emits = defineEmits(['handleSearch', 'handleReset'])

const queryRef = ref<FormInstance>()
const form = reactive<IPropsFrom>({
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
  remark: '' // 备注
})

function handleSearch() {
  emits('handleSearch', form)
}
function handleReset() {
  queryRef.value!.resetFields()
  emits('handleSearch', form)
}
</script>

<style scoped lang="scss"></style>
