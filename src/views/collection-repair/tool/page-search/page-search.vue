<template>
  <el-form class="coder-wang-form" size="large" :model="form" ref="queryRef" :inline="true" v-show="showSearch" label-width="auto">
    <el-row :span="24" :gutter="35">
      <el-col :span="6">
        <el-form-item label="主要功能" prop="majorFunction" style="width: 100%">
          <el-input size="large" v-model="form.majorFunction" placeholder="请输入主要功能" style="width: 100%" />
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
import type { ComponentInternalInstance } from 'vue'
import type { FormInstance } from 'element-plus'
import type { IPropsFrom } from '../type.ts'

interface IProps {
  proxy?: ComponentInternalInstance | null
  showSearch: boolean
}

withDefaults(defineProps<IProps>(), {
  showSearch: true
})

const emits = defineEmits(['handleSearch', 'handleReset'])

const queryRef = ref<FormInstance>()
const form = reactive<IPropsFrom>({
  majorFunction: '' // 商品名
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
