<template>
  <div>
    <el-table v-loading="loading" :data="tableList" @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" type="index" width="60" />
      <el-table-column label="事故发生时间" align="center" prop="accidentOccurrenceTime" width="180">
        <template #default="scope">
          {{ parseTime(scope.row.accidentOccurrenceTime) }}
        </template>
      </el-table-column>

      <el-table-column label="事故地点" align="center" prop="accidentLocation" />

      <el-table-column label="事故责任人" align="center" prop="personResponsibleAccident" />

      <el-table-column label="损失情况" align="center" prop="lossCollectibles" />

      <el-table-column label="处理结果" align="center" prop="accidentHandlingResults" />

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
  emits('handleRowDelete', [row.id], row.accidentLocation)
}

function handleRowDetail(row) {
  const list = [
    { type: 'text', name: '事故发生时间', value: `${parseTime(row['accidentOccurrenceTime'])}` },
    { type: 'text', name: '事故地点', value: row['accidentLocation'] },
    { type: 'text', name: '事故责任人', value: row['personResponsibleAccident'] },
    { type: 'text', name: '损失情况', value: row['lossCollectibles'] },
    { type: 'text', name: '处理结果', value: row['accidentHandlingResults'] },
    { type: 'text', name: '事故经过', value: row['accidentProcess'] },
    { type: 'text', name: '备注', value: row['remarks'] },
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
