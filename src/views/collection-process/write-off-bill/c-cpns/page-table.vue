<template>
  <div>
    <el-table style="width: 100%" v-loading="queryOpt.loading" :data="queryOpt.dataList" border>
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <!-- <el-table-column label="序号" type="index" width="60" /> -->
      <el-table-column label="注销登记号" align="center" prop="flowNo" sortable />
      <el-table-column label="藏品数量" align="center" prop="relicsNum" />
      <!-- <el-table-column label="提交人" align="center" prop="" /> -->
      <el-table-column label="提交时间" align="center" prop="createTime" sortable>
        <template #default="{ row }">
          {{ formatDate(row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="审批状态" align="center" prop="approvalStat">
        <template #default="{ row }">
          <el-tag type="warning" v-if="row.approvalStat == '0'"> 核查中 </el-tag>
          <el-tag type="warning" v-else-if="row.approvalStat == '1'"> 待审核 </el-tag>
          <el-tag type="info" v-else-if="row.approvalStat == '2'"> 已注销 </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="当前状态" align="center" prop="flowStatus">
        <template #default="{ row }">
          <el-tag type="warning" v-if="row.flowStatus == '0'"> 核查中 </el-tag>
          <el-tag type="warning" v-else-if="row.flowStatus == '1'"> 待审核 </el-tag>
          <el-tag type="info" v-else-if="row.flowStatus == '2'"> 已注销 </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" fixed="right" align="center" width="110" class-name="small-padding fixed-width">
        <template #default="{ row }">
          <CommHandleBtnTable icon-name="View" @handle-table-btn="handleRowDetail(row)" />
          <CommHandleBtnTable icon-name="Download" @handle-table-btn="handleRowDetail(row)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { formatDate } from '@/utils'

import CommHandleBtnTable from '@/components/comm-cpns/comm-handle-btn-table/comm-handle-btn-table.vue'

const props = defineProps({
  queryOpt: {
    type: Object,
    default: () => ({})
  }
})

watch(
  () => props.types,
  val => {
    console.log(val)
  },
  {
    deep: true,
    immediate: true
  }
)

const emits = defineEmits(['view'])

// 显示导出弹窗
const isShowDialogExport = ref(false)
function handleOpenDialogExport() {
  if (ids.value.length === 0) return props.proxy?.$modal.msgError('请先选择藏品')
  isShowDialogExport.value = true
}
function handleCloseDialogExport() {
  isShowDialogExport.value = false
}

function handleRowDetail(item) {
  emits('view', item)
}

defineExpose({ handleOpenDialogExport })
</script>
