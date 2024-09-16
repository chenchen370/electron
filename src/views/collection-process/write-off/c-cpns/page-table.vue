<template>
  <div>
    <el-table style="width: 100%" v-loading="queryOpt.loading" :data="queryOpt.dataList"
      @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55" align="center" />
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
          <CommHandleBtnTable icon-name="EditPen" @handle-table-btn="handleRowUpdate(row)" v-if="types == '0'" />
          <CommHandleBtnTable icon-name="Delete" @handle-table-btn="handleRowDelete(row)" v-if="types == '0'" />
          <CommHandleBtnTable icon-name="DocumentCopy" @handle-table-btn="handleRowApprove(row)" v-if="types == '1'"
            v-show="row.approvalStat == '0'" />
          <CommHandleBtnTable icon-name="View" @handle-table-btn="handleRowDetail(row)" v-if="types == '1'"
            v-show="row.approvalStat != '0'" />
          <CommHandleBtnTable icon-name="Download" @handle-table-btn="handleRowDetail(row)" v-if="types == '1'"
            v-show="row.approvalStat != '0'" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { formatDate } from '@/utils'

import CommHandleBtnTable from '@/components/comm-cpns/comm-handle-btn-table/comm-handle-btn-table.vue'

const props = defineProps({
  types: {
    type: String,
    default: ''
  },
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

const emits = defineEmits(['edit', 'view', 'remove', 'approve'])

// 多选框选中数据
const ids = ref([])
const single = ref(true)
const multiple = ref(true)

function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.id)
  single.value = selection.length != 1
  multiple.value = !selection.length
}

// 显示导出弹窗
const isShowDialogExport = ref(false)
function handleOpenDialogExport() {
  if (ids.value.length === 0) return props.proxy?.$modal.msgError('请先选择藏品')
  isShowDialogExport.value = true
}
function handleCloseDialogExport() {
  isShowDialogExport.value = false
}

function handleRowUpdate(item) {
  emits('edit', item)
}

function handleRowDelete(item) {
  emits('remove', item)
}

function handleRowApprove(item) {
  emits('approve', item)
}

function handleRowDetail() {
  emits('view', item)
}

defineExpose({ handleOpenDialogExport })
</script>
