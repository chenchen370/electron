<template>
  <div>
    <el-table v-loading="loading" :data="tableList" @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" type="index" width="60" />
      <el-table-column label="附件名称" align="center" prop="attachmentName" />
      <el-table-column label="附件现状" align="center" prop="attachmentsCurrentStatus" />
      <el-table-column label="附件数量" align="center" prop="attachmentsNumber" width="160" />
      <el-table-column label="附件数量单位" align="center" prop="attachmentQuantityUnit" />
      <el-table-column label="审核状态" align="center" prop="" />
      <el-table-column label="操作" align="center" width="150" fixed="right" class-name="small-padding fixed-width">
        <template #default="scope">
          <comm-handle-btn-table icon-name="EditPen" @handle-table-btn="handleRowUpdate(scope.row)" v-if="handleStatus !== 'check'" />
          <comm-handle-btn-table icon-name="Delete" @handle-table-btn="handleRowDelete(scope.row)" v-if="handleStatus !== 'check'" />
          <comm-handle-btn-table icon-name="View" @handle-table-btn="handleRowDetail(scope.row)" v-if="handleStatus === 'check'" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import CommHandleBtnTable from '@/components/comm-cpns/comm-handle-btn-table/comm-handle-btn-table.vue'

defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  tableList: {
    type: Array,
    default: () => []
  },
  handleStatus: {
    type: String,
    default: 'check' // add 普通（提交审核 + 保存） edit(编辑) check（查看）
  }
})

const emits = defineEmits(['handleSelectionChange', 'handleRowUpdate', 'handleRowDelete', 'handleRowDetail'])

function handleSelectionChange(selection) {
  emits('handleSelectionChange', selection)
}

function handleRowUpdate(row) {
  emits('handleRowUpdate', row)
}

function handleRowDelete(row) {
  emits('handleRowDelete', [row.id], row?.attachmentName)
}

function handleRowDetail(row) {
  const list = [
    { type: 'text', name: '附件名称', value: row['attachmentName'] },
    { type: 'text', name: '附件现状', value: row['attachmentsCurrentStatus'] },
    { type: 'text', name: '附件数量', value: row['attachmentsNumber'] },
    { type: 'text', name: '附件数量单位', value: row['attachmentQuantityUnit'] },
    { type: 'text', name: '附件描述', value: row['attachmentDescription'] },
    { type: 'text', name: '审核状态', value: row[''] }
  ]
  emits('handleRowDetail', list)
}
</script>

<style scoped lang="scss">
.demo-image__error .image-slot {
  font-size: 30px;
}

.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}

.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
</style>
