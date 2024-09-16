<template>
  <add-or-edit v-if="handleStatus !== 'check'" ref="addOrEditRef" :handle-status="handleStatus" :relics-id="relicsId" :proxy="proxy" />
  <check v-else :handle-status="handleStatus" :relics-id="relicsId" :proxy="proxy" />
</template>

<script setup>
import AddOrEdit from './add-or-edit.vue'
import Check from './check.vue'
import { addBackOut, editBackOut } from '@/api/collection-all/manage-work/backout'

const props = defineProps({
  handleStatus: {
    type: String,
    default: 'check' // submit （新增 + 修改 + 提交审核）check（查看）
  },
  relicsId: {
    type: [String, Number],
    default: null
  },
  proxy: {
    type: Object,
    default: () => ({})
  }
})

const addOrEditRef = ref()

async function submit() {
  addOrEditRef.value.submit?.()
}

defineExpose({ submit })
</script>

<style lang="scss" scoped></style>
