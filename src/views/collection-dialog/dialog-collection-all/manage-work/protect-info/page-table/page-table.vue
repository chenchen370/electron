<template>
  <div>
    <el-table v-loading="loading" :data="tableList" @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" type="index" width="60" />
      <el-table-column label="保护优先等级" align="center" prop="protectionPriorityLevel">
        <template #default="scope">
          {{ getLabel(optionsInfo?.options_protection_priority_level, scope.row.protectionPriorityLevel) }}
        </template>
      </el-table-column>
      <el-table-column label="保护措施" align="center" prop="protectiveMeasures" />
      <el-table-column label="保护技术类别" align="center" prop="protectionTechnologyCategories" />
      <el-table-column label="保护经费预算" align="center" prop="protectionBudget" />
      <el-table-column label="保护经费结算" align="center" prop="settlementProtectionFunds" />
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
import { getLabel } from '@/utils/comm-util/getLabel'

const props = defineProps({
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
  },
  optionsInfo: {
    type: Object,
    default: () => ({})
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
  emits('handleRowDelete', [row.id], row.protectionTechnologyCategories)
}

function handleRowDetail(row) {
  const list = [
    { type: 'text', name: '保护优先等级', value: getLabel(props.optionsInfo?.options_protection_priority_level, row['protectionPriorityLevel']) },
    { type: 'text', name: '保护技术类别', value: row['protectionTechnologyCategories'] },
    { type: 'text', name: '保护措施', value: row['protectiveMeasures'] },
    { type: 'text', name: '保护经费预算', value: row['protectionBudget'] },
    { type: 'text', name: '保护经费结算', value: row['settlementProtectionFunds'] },
    { type: 'text', name: '保护记录', value: row['protectingRecords'] },
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
