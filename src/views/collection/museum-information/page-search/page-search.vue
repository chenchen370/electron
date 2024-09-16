<template>
    <el-form
      :model="form"
      ref="queryRef"
      :inline="true"
      v-show="showSearch"
      label-width="auto"
    >
      <el-form-item label="博物馆名称" prop="museumName">
        <el-input size="large" v-model="form.museumName" placeholder="请输入博物馆名称" />
      </el-form-item>
      <el-form-item label="国家" prop="country">
        <el-input size="large" v-model="form.country" placeholder="请输入国家" />
      </el-form-item>
      <el-form-item label="省份" prop="provinces">
        <el-input size="large" v-model="form.provinces" placeholder="请输入省份" />
      </el-form-item>
      <el-form-item label="市" prop="cities">
        <el-input size="large" v-model="form.cities" placeholder="请输入市" />
      </el-form-item>
      <el-form-item label="区" prop="districts">
        <el-input size="large" v-model="form.districts" placeholder="请输入区" />
      </el-form-item>
      <el-form-item label="街道" prop="street">
        <el-input size="large" v-model="form.street" placeholder="请输入街道" />
      </el-form-item>
      <el-form-item label="经度" prop="latitude">
        <el-input size="large" v-model="form.latitude" placeholder="请输入经度" />
      </el-form-item>
      <el-form-item label="维度" prop="longitude">
        <el-input size="large" v-model="form.longitude" placeholder="请输入维度" />
      </el-form-item>
      <el-form-item>
        <el-button class="button-c-primary" type="primary" icon="Search" @click="handleSearch">
          搜索
        </el-button>
        <el-button class="button-p-black" icon="Refresh" @click="handleReset"> 重置 </el-button>
      </el-form-item>

    </el-form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { ComponentInternalInstance } from "vue"
import type { FormInstance } from 'element-plus'
import type { IPropsFrom } from '../type.ts';

interface IProps {
  proxy?: ComponentInternalInstance | null;
  showSearch: boolean;
}

withDefaults(defineProps<IProps>(), {
  showSearch: true,
})

const emits = defineEmits(["handleSearch", "handleReset"])

const queryRef = ref<FormInstance>();
const form = reactive<IPropsFrom>({
  majorFunction: "", // 商品名
})

function handleSearch() {
  emits("handleSearch", form)
}
function handleReset() {
  queryRef.value!.resetFields();
  emits("handleSearch", form)
}

</script>



<style scoped lang="scss">

</style>
