<template>
  <el-table style="width: 100%" v-loading="queryOpt.loading" :data="queryOpt.dataList"
    @selection-change="handleSelectionChange" border>
    <el-table-column type="selection" width="55" align="center" />
    <!-- <el-table-column label="序号" type="index" width="60" /> -->
    <el-table-column label="展览名称" align="center" prop="exhibitionName" />
    <el-table-column label="展览类型" align="center" prop="exhibitionType">
      <template #default="{ row }">
        {{ getLabel(options.exhibition_type, row.exhibitionType) }}
      </template>
    </el-table-column>
    <el-table-column label="所在展厅" align="center" prop="houseName" />
    <el-table-column label="监测数据" align="center" prop="">
      <template #default="{ row }">
        <el-link @click="exhibitionName = row.exhibitionName">查看数据</el-link>
      </template>
    </el-table-column>
    <el-table-column label="展览起止时间" align="center" prop="">
      <template #default="{ row }">
        {{ parseTime(row.exhibitionStartTime, '{y}.{m}.{d}') }} <span v-if="row.exhibitionStartTime">~</span> {{
          parseTime(row.exhibitionEndTime, '{y}.{m}.{d}')
        }}
      </template>
    </el-table-column>
    <el-table-column label="展览主题" align="center" prop="exhibitionTheme" />
    <el-table-column label="操作" fixed="right" align="center" width="180" class-name="small-padding fixed-width">
      <template #default="{ row }">
        <CommHandleBtnTable icon-name="EditPen" @handle-table-btn="handleRowUpdate(row)" />
        <CommHandleBtnTable icon-name="Delete" @handle-table-btn="handleRowDelete(row)" />
        <CommHandleBtnTable icon-name="View" @handle-table-btn="handleRowDetail(row)" />
      </template>
    </el-table-column>
  </el-table>
  <!-- 检测数据 -->
  <DialogDataCharts v-if="exhibitionName" :search-name="exhibitionName" @onClose="exhibitionName = ''">
  </DialogDataCharts>
</template>

<script setup>
import { parseTime } from '@/utils/zhebo'

import CommHandleBtnTable from '@/components/comm-cpns/comm-handle-btn-table/comm-handle-btn-table.vue'
import { getLabel } from '@/utils/comm-util/getLabel';

import DialogDataCharts from './dialog-data-charts.vue'

const props = defineProps({
  queryOpt: {
    type: Object,
    default: () => ({})
  },
  options: {
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

const emits = defineEmits(['edit', 'view', 'remove', 'approve', 'select', 'seeCharts'])

// 多选框选中数据
const ids = ref([])

function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.id)
  emits('select', ids)
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

function handleRowDetail(item) {
  emits('view', item)
}


const exhibitionName = ref('')

defineExpose({ handleOpenDialogExport })
</script>
