<template>
  <el-form class="coder-wang-form" :model="form" size="large" ref="queryRef" :inline="true" v-show="showSearch" label-width="auto">
    <el-row :gutter="0">
      <el-col :span="6">
        <el-form-item label="博物馆名称" prop="museumName" style="width: 100%">
          <el-input v-model="form.museumName" placeholder="请输入博物馆名称" style="width: 100%" />
        </el-form-item>
      </el-col>

      <el-col :span="6">
        <el-form-item label="国家" prop="country" style="width: 100%">
          <el-input v-model="form.country" placeholder="请输入国家" style="width: 100%" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="省份" prop="provinces" style="width: 100%">
          <el-input v-model="form.provinces" placeholder="请输入省份" style="width: 100%" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="市" prop="cities" style="width: 100%">
          <el-input v-model="form.cities" placeholder="请输入市" style="width: 100%" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="区" prop="districts" style="width: 100%">
          <el-input v-model="form.districts" placeholder="请输入区" style="width: 100%" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="街道" prop="street" style="width: 100%">
          <el-input v-model="form.street" placeholder="请输入街道" style="width: 100%" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="经度" prop="latitude" style="width: 100%">
          <el-input v-model="form.latitude" placeholder="请输入经度" style="width: 100%" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="经度" prop="longitude" style="width: 100%">
          <el-input v-model="form.longitude" placeholder="请输入经度" style="width: 100%" />
        </el-form-item>
      </el-col>
      <el-col :span="24">
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
}

withDefaults(defineProps<IProps>(), {
  proxy: () => ({}),
  showSearch: true
})

const emits = defineEmits(['handleSearch', 'handleReset'])

const queryRef = ref<FormInstance>()
const form = reactive<IPropsFrom>({
  implementationConditions: '' // 实施条件
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
