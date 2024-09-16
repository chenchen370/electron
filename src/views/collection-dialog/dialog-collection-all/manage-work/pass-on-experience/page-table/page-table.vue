<template>
  <div>
    <el-table v-loading="loading" :data="tableList" @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" type="index" width="60" />
      <el-table-column label="收藏机构" align="center" prop="collectionOrganization" />
      <el-table-column label="收藏人" align="center" prop="collectors" />
      <el-table-column label="起始时间" align="center" prop="startTime">
        <template #default="scope">
          {{ parseTime(scope.row.startTime) }}
        </template>
      </el-table-column>

      <el-table-column label="结束时间" align="center" prop="endTime">
        <template #default="scope">
          {{ parseTime(scope.row.endTime) }}
        </template>
      </el-table-column>
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
  emits('handleRowDelete', [row.id], row.collectionOrganization)
}

function handleRowDetail(row) {
  const list = [
    { type: 'text', name: '收藏机构', value: row['collectionOrganization'] },
    { type: 'text', name: '收藏人', value: row['collectors'] },
    { type: 'text', name: '起始时间 - 结束时间', value: `${parseTime(row['startTime'])} - ${parseTime(row['endTime'])}` },
    { type: 'text', name: '审核状态', value: row[''] },
    { type: 'text', name: '备注', value: row['remark'] }
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
