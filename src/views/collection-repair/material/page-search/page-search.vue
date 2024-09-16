<template>
  <el-form class="coder-wang-form" :model="form" size="large" ref="queryRef" :inline="true" v-show="showSearch" label-width="auto">
    <el-row :span="24" :gutter="35">
      <el-col :span="6">
        <el-form-item label="商品名" prop="commodityName" style="width: 100%">
          <el-input v-model="form.commodityName" placeholder="请输入商品名" style="width: 100%" />
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
import { reactive, ref } from 'vue'

import type { FormInstance } from 'element-plus'
import type { IPropsFrom } from '../type.ts'

interface IProps {
  proxy: any
  showSearch: boolean
}

withDefaults(defineProps<IProps>(), {
  proxy: () => ({}),
  showSearch: true
})

const emits = defineEmits(['handleSearch', 'handleReset'])

const queryRef = ref<FormInstance>()
const form = reactive<IPropsFrom>({
  commodityName: '' // 商品名
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
