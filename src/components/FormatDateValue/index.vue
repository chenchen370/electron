<template>
  <span>{{ displayValue }}</span>
</template>

<script setup lang='ts'>
import { dayjs } from 'element-plus'
interface Props {
  type?: 'date' | 'time',
  format?: string;
  value: string;
}
const props = withDefaults(defineProps<Props>(), {
  type: 'date',
})

const displayValue = computed(() => {
  if (!props.value) return '-'
  const format = props.type === 'date' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss'
  return dayjs(props.value).format(props.format || format)
})
</script>

<style></style>