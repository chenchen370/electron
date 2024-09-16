<template>
  <div>
    <el-table v-loading="loading" :data="tableList" @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" type="index" width="60" />
      <el-table-column label="移动时间" align="center" prop="exhibitStartTime" width="320">
        <template #default="scope"> {{ parseTime(scope.row.exhibitStartTime) }} - {{ parseTime(scope.row.exhibitEndTime) }} </template>
      </el-table-column>
      <el-table-column label="执行单位" align="center" prop="approvalUnit" />
      <el-table-column label="移动原因" align="center" prop="exhibitName" />
      <el-table-column label="移动目的地" align="center" prop="exhibitInstitutions" />
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
import { parseTime } from '@/utils/zhebo'

defineProps({
  handleStatus: {
    type: String,
    default: 'check' // add 普通（提交审核 + 保存） edit(编辑) check（查看）
  },
  loading: {
    type: Boolean,
    default: false
  },
  tableList: {
    type: Array,
    default: () => []
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
  emits('handleRowDelete', [row.id], row.approvalUnit)
}

function handleRowDetail(row) {
  const list = [
    { type: 'text', name: '移动原因', value: row['mobileReason'] },
    { type: 'text', name: '移动时间', value: `${parseTime(row['exhibitStartTime'])}-${parseTime(row['exhibitEndTime'])}` },

    { type: 'text', name: '移动目的地', value: row['exhibitInstitutions'] },
    { type: 'text', name: '区域详细地址', value: row['exhibitLocation'] },
    { type: 'text', name: '执行单位', value: row['approvalUnit'] },
    { type: 'text', name: '具体事由', value: row['exhibitName'] },
    { type: 'text', name: '备注', value: row['remarks'] },
    { type: 'text', name: '审核状态', value: '' }
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
