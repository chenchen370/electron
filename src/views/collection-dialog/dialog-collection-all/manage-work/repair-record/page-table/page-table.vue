<template>
  <div>
    <el-table v-loading="loading" :data="tableList" @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" type="index" width="60" />

      <el-table-column label="修复时间" align="center" width="320">
        <template #default="scope"> {{ parseTime(scope.row.repairStartTime) }} - {{ parseTime(scope.row.repairEndTime) }} </template>
      </el-table-column>

      <el-table-column label="承担机构" align="center" prop="undertakingOrganization" />

      <el-table-column label="修复人" align="center" prop="repairer" />

      <el-table-column label="修复原因" align="center" prop="reasonRepair" />

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
  loading: {
    type: Boolean,
    default: false
  },
  handleStatus: {
    type: String,
    default: 'check' // add 普通（提交审核 + 保存） edit(编辑) check（查看）
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
  emits('handleRowDelete', [row.id], row.undertakingOrganization)
}

function handleRowDetail(row) {
  const list = [
    { type: 'image', name: '修复前照片', value: row['preRepairPhotos'] },
    { type: 'image', name: '修复后照片', value: row['photosAfterRepair'] },
    { type: 'text', name: '修复时间', value: `${parseTime(row['repairStartTime'])} - ${parseTime(row['repairEndTime'])}` },
    { type: 'text', name: '修复人', value: row['repairer'] },
    { type: 'text', name: '修复原因', value: row['reasonRepair'] },
    { type: 'text', name: '修复地点', value: row['repairLocation'] },
    { type: 'text', name: '修复情况及结果', value: row['repairSituationResults'] },
    { type: 'text', name: '承担机构', value: row['undertakingOrganization'] }
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
