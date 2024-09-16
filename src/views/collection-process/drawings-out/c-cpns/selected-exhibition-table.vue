<template>
  <el-table :data="list" height="500" border size="small" rowKey="relicsId">
    <el-table-column type="selection" width="55" align="center" />
    <el-table-column label="序号" align="center" prop="" />
    <el-table-column label="展览名称" align="center" prop="" />
    <el-table-column label="展览类型" align="center" prop="" />
    <el-table-column label="所在展厅" align="center" prop="" />
    <el-table-column label="监测数据" align="center" prop="" />
    <el-table-column label="展览起止时间" align="center" prop="" />
    <el-table-column label="展览主题" align="center" prop="" />
    <el-table-column label="操作" fixed="right" align="center" width="110" class-name="small-padding fixed-width">
      <template #default="{ row, index }">
        <el-button link type="primary" icon="Delete" title="删除" @click="emits('delete', index)" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import CommHandleBtn from '@/components/comm-cpns/comm-handle-btn/comm-handle-btn.vue'
import { useTable } from '@/hooks/useTable'
import { getFlowRelics, delRelics } from '@/api/flow'

const { proxy } = getCurrentInstance()
const { artifact_level } = proxy.useDict('artifact_level')



defineProps({
  list: {
    type: Array,
    default: () => []
  }
})
const emits = defineEmits('delete')
</script>

<style></style>
