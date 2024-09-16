<template>
  <div>
    <el-select v-model="values" placeholder="请选择" :disabled="readOnly" @change="onUpdate">
      <el-option v-for="item in data" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </div>
</template>

<script setup>
const emits = defineEmits(['update:showSearch', 'queryTable']);
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  readOnly: {
    type: Boolean,
    default: false
  },
  searchCol: {
    type: [Object, Number],
    default: 1
  },

  data: {
    type: Array,
    default: () => []
  }
});
const values = ref('');
watch(
  () => props.modelValue,
  (newVal, oldVal) => {
    values.value = newVal;
  }
);

const onUpdate = (k, j) => {
  emits('update:modelValue', k);
};
</script>

<style scoped></style>
