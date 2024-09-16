<template>
  <el-row :gutter="10" class="mb8">
    <el-col :span="1.5">
      <comm-handle-btn :per="['collection-repair:device:add']" title="新增" img-name="add" @handle-click="handleAdd" />
    </el-col>
    <el-col :span="1.5">
      <comm-handle-btn :per="['collection-repair:device:update']" title="修改" img-name="edit" :disabled="single" @handle-click="handleUpdate" />
    </el-col>
    <el-col :span="1.5">
      <comm-handle-btn :per="['collection-repair:device:delete']" title="删除" img-name="remove" :disabled="multiple" @handle-click="handleDelete" />
    </el-col>
    <right-toolbar v-model:showSearch="newShowSearch" @queryTable="handleRefresh"></right-toolbar>
  </el-row>
</template>

<script setup lang="ts">
import CommHandleBtn from '@/components/comm-cpns/comm-handle-btn/comm-handle-btn.vue'

export interface IPropsHeaderBtnInfo {
  single: boolean
  multiple: boolean
  showSearch: boolean
}

const props = withDefaults(defineProps<IPropsHeaderBtnInfo>(), {
  single: true,
  multiple: true,
  showSearch: true
})

const emits = defineEmits(['update:showSearch', 'handleAdd', 'handleUpdate', 'handleDelete', 'handleRefresh'])

const newShowSearch = computed({
  get: () => props.showSearch,
  set: value => {
    emits('update:showSearch', value)
  }
})

function handleAdd() {
  emits('handleAdd')
}

function handleUpdate() {
  emits('handleUpdate')
}

function handleDelete() {
  emits('handleDelete')
}

function handleRefresh() {
  emits('handleRefresh')
}
</script>

<style scoped lang="scss"></style>
