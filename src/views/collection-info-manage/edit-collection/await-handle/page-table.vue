<template>
  <div>
    <el-table style="width: 100%" v-loading="queryOpt.loading" :data="queryOpt.thingList" @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55" align="center" />

      <el-table-column label="藏品编号" align="center" prop="relicsId" />

      <el-table-column label="藏品名称" align="center" prop="relicName" />

      <el-table-column label="编辑人" align="center" prop="createBy" />

      <el-table-column label="最近保存时间" align="center" prop="createTime">
        <template #default="scope">
          {{ parseTime(scope.row.createTime) }}
        </template>
      </el-table-column>

      <el-table-column label="审核类型" align="center" prop="approvalType">
        <template #default="scope">
          {{ getLabel(options_approval_type, scope.row.approvalType) }}
        </template>
      </el-table-column>

      <el-table-column label="操作" fixed="right" align="center" width="160" class-name="small-padding fixed-width">
        <template #default="scope">
          <!-- 视频上 （编辑 - 删除） -->

          <comm-handle-btn-table icon-name="EditPen" @handle-table-btn="handleEditCollectionCoreIndex(scope.row)" />
          <comm-handle-btn-table icon-name="Edit" @handle-table-btn="handleOpenCollectionAll(scope.row)" />
          <comm-handle-btn-table img-name="editChild" @handle-table-btn="handleOpenMediaKindsList(scope.row)" />
          <comm-handle-btn-table icon-name="Delete" @handle-table-btn="handleRowDelete(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { loadAssets } from '@/utils/load-assets'
import CommHandleBtnTable from '@/components/comm-cpns/comm-handle-btn-table/comm-handle-btn-table.vue'
import { parseTime } from '@/utils/zhebo'
import { options_approval_type } from '../../dict'
import { getLabel } from '@/utils/comm-util/getLabel'
const props = defineProps({
  queryOpt: {
    type: Object,
    default: () => ({})
  },
  columns: {
    type: Array,
    default: () => []
  },
  proxy: {
    type: Object,
    default: () => ({})
  }
})

const emits = defineEmits(['handleEditCollectionCoreIndex', 'handleOpenCollectionAll', 'handleOpenMediaKindsList', 'handleRowDelete'])

// 多选框选中数据
const ids = ref([])
const selectionArr = ref([])
const single = ref(true)
const multiple = ref(true)

function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.id)
  selectionArr.value = selection
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

// 编辑 藏品 核心指标
function handleEditCollectionCoreIndex(row) {
  emits('handleEditCollectionCoreIndex', row)
}

// 编辑 藏品 all信息
function handleOpenCollectionAll(row) {
  emits('handleOpenCollectionAll', row)
}

// 编辑 藏品 媒体信息
function handleOpenMediaKindsList(row) {
  emits('handleOpenMediaKindsList', row)
}

// 批量审批 / 批量删除
function handleGetIds() {
  return {
    ids: ids.value,
    msg: selectionArr.value
      ?.map(row => {
        return `${row?.relicsId}`
      })
      .join('、')
  }
}

// 删除
function handleRowDelete(row) {
  emits('handleRowDelete', [row.id], row?.relicsId)
}

defineExpose({ handleOpenDialogExport, handleGetIds })
</script>

<style lang="scss" scoped></style>
