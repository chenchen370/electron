<template>
  <div>
    <el-table v-loading="loading" :data="tableList" @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" type="index" width="60" />
      <el-table-column label="鉴定时间" align="center" prop="appraisalTime" width="180">
        <template #default="scope">
          {{ parseTime(scope.row.appraisalTime) }}
        </template>
      </el-table-column>
      <el-table-column label="鉴定机构" align="center" prop="appraisalAgency" />
      <el-table-column label="鉴定人" align="center" prop="appraiser" width="160" />
      <el-table-column label="组织机构" align="center" prop="organizationalStructure" />
      <el-table-column label="批准机构" align="center" prop="approvalAuthority" />
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
  emits('handleRowDelete', [row.id], row.appraisalAgency)
}

function handleRowDetail(row) {
  const list = [
    { type: 'text', name: '鉴定时间', value: parseTime(row['appraisalTime']) },
    { type: 'text', name: '鉴定机构', value: row['appraisalAgency'] },
    { type: 'text', name: '鉴定人', value: row['appraiser'] },
    { type: 'text', name: '组织机构', value: row['organizationalStructure'] },
    { type: 'text', name: '批准机构', value: row['approvalAuthority'] },
    { type: 'text', name: '鉴定意见及结论', value: row['appraisalOpinionsConclusions'] },
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
