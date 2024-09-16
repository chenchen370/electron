<template>
  <div class="page-header">
    <!--    <comm-handle-btn title="删除" img-name="remove" @handle-click="handleDelete" />-->
    <comm-handle-btn title="新增" img-name="add" @handle-click="handleAdd" />
  </div>
</template>

<script setup>
import CommHandleBtn from '@/components/comm-cpns/comm-handle-btn/comm-handle-btn.vue'

defineProps({
  single: {
    type: Boolean,
    default: true
  },
  showSearch: {
    type: Boolean,
    default: true
  }
})

const emits = defineEmits(['update:showSearch', 'handleAdd', 'handleUpdate', 'handleDelete', 'handleRefresh'])

function handleAdd() {
  emits('handleAdd')
}

function handleUpdate() {
  emits('handleUpdate')
}

function handleDelete() {
  console.log('0---o-')
  emits('handleDelete')
}
</script>

<style scoped lang="scss">
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}
</style>
