<template>
  <div>
    <div v-if="modelValue.monitorType?.split(',').indexOf('1') > -1">
      温度：{{ modelValue?.temperature }} ℃
    </div>
    <div v-if="modelValue.monitorType?.split(',').indexOf('2') > -1">
      湿度：{{ modelValue?.humidity }} %
    </div>
    <div v-if="modelValue.monitorType?.split(',').indexOf('3') > -1">
      co2：{{ modelValue?.co2 }} ppm
    </div>
    <div v-if="modelValue.monitorType?.split(',').indexOf('4') > -1">
      VOC：{{ modelValue?.voc }} g/L
    </div>
    <div v-if="modelValue.monitorType?.split(',').indexOf('5') > -1">
      光照：{{ modelValue?.illumination }} lux
    </div>
    <div v-if="modelValue.monitorType?.split(',').indexOf('6') > -1">
      紫外线：{{ modelValue?.ultraviolet }} μW/cm2
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(['update:showSearch', 'queryTable']);
const props = defineProps({
  modelValue: {
    type: Object,
    default: {}
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

const onUpdate = (k, j) => {
  emits('update:modelValue', k);
};
</script>
