<template>
  <div>
    <el-table style="width: 100%" v-loading="queryOpt.loading" :data="queryOpt.thingList" @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55" align="center" />

      <el-table-column label="藏品编号" align="center" prop="relicId" width="110" />

      <el-table-column label="藏品名称" align="center" prop="relicName" width="200" />

      <el-table-column label="藏品编号名称" align="center" prop="relicIdType" width="110" />

      <el-table-column label="文物级别" align="center" prop="relicLevel" width="90" />

      <el-table-column label="文物类别" align="center" prop="relicCategory" width="90" />

      <el-table-column label="库房（库区）名称" align="center" prop="relicWarehouse" width="140" />

      <el-table-column label="质地子类别" align="center" prop="relicMaterial" width="110" />

      <el-table-column label="完残程度" align="center" prop="relicCompleteness" width="90" />

      <el-table-column label="文物来源" align="center" prop="relicCompleteness" width="90" />

      <el-table-column label="入库时间" align="center" prop="relicTime" width="110" />

      <el-table-column label="年代" align="center" prop="relicYears" width="130" />

      <el-table-column label="优先保护等级" align="center" prop="protectionPriorityLevel" width="110" />

      <el-table-column label="财务审核状态" align="center" prop="" width="110" />

      <el-table-column label="当前状态" align="center" prop="" width="90" />

      <el-table-column label="审核状态" align="center" prop="approvalStat" width="90">
        <template #default="scope">
          <el-tag
            v-if="scope.row.approvalStat"
            :type="getLabel(options_approval_status, scope.row.approvalStat, 'value', 'tagType')"
            effect="plain"
            color="transparent"
          >
            {{ getLabel(options_approval_status, scope.row.approvalStat) }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" fixed="right" align="center" width="160" class-name="small-padding fixed-width">
        <template #default="scope">
          <comm-handle-btn-table icon-name="EditPen" @handle-table-btn="handleOpenCollectionCoreIndex(scope.row)" />
          <comm-handle-btn-table icon-name="Edit" @handle-table-btn="handleOpenCollectionAll(scope.row)" />
          <comm-handle-btn-table img-name="editChild" @handle-table-btn="handleOpenMediaKindsList(scope.row)" />
          <comm-handle-btn-table icon-name="Switch" @handle-table-btn="handleOpenChangeStatus(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { loadAssets } from '@/utils/load-assets'
import CommHandleBtnTable from '@/components/comm-cpns/comm-handle-btn-table/comm-handle-btn-table.vue'
import { getLabel } from '@/utils/comm-util/getLabel'
import { options_approval_status } from '@/views/collection-info-manage/dict'

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

const emits = defineEmits(['handleOpenCollectionCoreIndex', 'handleOpenCollectionAll', 'handleOpenMediaKindsList', 'handleOpenChangeStatus'])

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

// 编辑 藏品 核心指标
function handleOpenCollectionCoreIndex(row) {
  emits('handleOpenCollectionCoreIndex', row)
}

// 编辑 藏品 all信息
function handleOpenCollectionAll(row) {
  emits('handleOpenCollectionAll', row)
}

// 编辑 藏品 媒体信息
function handleOpenMediaKindsList(row) {
  emits('handleOpenMediaKindsList', row)
}

// 更改状态
function handleOpenChangeStatus(row) {
  emits('handleOpenChangeStatus', row)
}

defineExpose({ handleOpenDialogExport })
</script>

<style lang="scss" scoped></style>
