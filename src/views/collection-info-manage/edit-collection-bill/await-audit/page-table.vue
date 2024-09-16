<template>
  <div>
    <el-table style="width: 100%" v-loading="queryOpt.loading" :data="queryOpt.thingList" @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55" align="center" />

      <el-table-column label="藏品编号" align="center" prop="relicsId" />

      <el-table-column label="藏品名称" align="center" prop="relicName" />

      <el-table-column label="提交人" align="center" prop="submitBy" />

      <el-table-column label="提交时间" align="center" prop="submitTime">
        <template #default="scope">
          {{ parseTime(scope.row.createTime) }}
        </template>
      </el-table-column>

      <el-table-column label="审核类型" align="center" prop="approvalType">
        <template #default="scope">
          {{ getLabel(options_approval_type, scope.row.approvalType) }}
        </template>
      </el-table-column>

      <el-table-column label="审核状态" align="center" prop="approvalStat">
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

      <el-table-column label="操作" fixed="right" align="center" width="110" class-name="small-padding fixed-width">
        <template #default="scope">
          <comm-handle-btn-table icon-name="View" @handle-table-btn="handleOpenCollectionAll(scope.row)" />
          <comm-handle-btn-table img-name="goChild" @handle-table-btn="handleOpenMediaKindsList(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import CommHandleBtnTable from '@/components/comm-cpns/comm-handle-btn-table/comm-handle-btn-table.vue'
import { getLabel } from '@/utils/comm-util/getLabel'
import { options_approval_status, options_approval_type } from '@/views/collection-info-manage/dict'
import { parseTime } from '@/utils/zhebo'

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

const emits = defineEmits(['handleOpenMediaKindsList', 'handleOpenCollectionAll'])

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

// 查看 藏品 all信息
function handleOpenCollectionAll(row) {
  emits('handleOpenCollectionAll', row)
}

// 查看 藏品 媒体
function handleOpenMediaKindsList(row) {
  emits('handleOpenMediaKindsList', row)
}
defineExpose({ handleOpenDialogExport })
</script>

<style lang="scss" scoped></style>
