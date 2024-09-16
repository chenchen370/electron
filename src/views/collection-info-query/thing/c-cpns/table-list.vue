<template>
  <div>
    <el-table style="width: 100%" v-loading="queryOpt.loading" :data="queryOpt.thingList" @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55" align="center" />

      <el-table-column label="序号" type="index" width="60" />
      <!--      <el-table-column label="图片" align="center" width="120" v-if="columns[0].visible">-->
      <!--        <template #default="scope">-->
      <!--          <image-preview :width="94" :height="81" :src="scope.row.relicPath" />-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column label="名称" align="center" prop="relicName" width="200" v-if="columns[0].visible" />
      <el-table-column label="藏品编号名称" align="center" prop="relicIdType" width="130" v-if="columns[1].visible" />
      <el-table-column label="编号" align="center" prop="relicId" width="130" v-if="columns[2].visible" />
      <el-table-column label="文物级别" align="center" width="100" prop="relicLevel" v-if="columns[3].visible" />
      <el-table-column label="文物类别" align="center" prop="relicCategory" width="100" v-if="columns[4].visible" />
      <el-table-column label="库房（库区）名称" align="center" prop="relicWarehouse" width="160" v-if="columns[5].visible" />
      <el-table-column label="质地子类别" align="center" prop="relicMaterial" width="160" v-if="columns[6].visible" />
      <el-table-column label="完残程度" width="100" align="center" prop="relicCompleteness" v-if="columns[7].visible">
        <template #default="scope">
          <span class="table-text-main">{{ scope.row.relicCompleteness }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文物来源方式" align="center" prop="relicFrom" width="140" v-if="columns[8].visible">
        <template #default="scope">
          <span class="table-text-main">{{ scope.row.relicCompleteness }}</span>
        </template>
      </el-table-column>
      <el-table-column label="入库时间" align="center" prop="relicTime" width="100" v-if="columns[9].visible" />
      <el-table-column label="年代" align="center" prop="relicYears" width="140" v-if="columns[10].visible" />
      <el-table-column label="保护优先等级" align="center" prop="protectionPriorityLevel" width="180" v-if="columns[11].visible" />
      <el-table-column label="财务审核状态" align="center" prop="" width="180" v-if="columns[12].visible" />
      <el-table-column label="当前状态" align="center" prop="" width="180" v-if="columns[13].visible" />
      <el-table-column label="操作" fixed="right" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <comm-handle-btn-table icon-name="View" @handle-table-btn="handleCheckRow(scope.row)" v-hasPermi="['collection-info-query:thing:query']" />
        </template>
      </el-table-column>
    </el-table>

    <dialog-export v-if="isShowDialogExport" @handle-close-dialog-export="handleCloseDialogExport" :ids="ids" />
  </div>
</template>

<script setup>
import DialogExport from '@/views/collection-info-query/dialog/dialog-export.vue'
import CommHandleBtnTable from '@/components/comm-cpns/comm-handle-btn-table/comm-handle-btn-table.vue'

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

const emits = defineEmits(['handleCheckRow'])

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

function handleCheckRow(item) {
  emits('handleCheckRow', item)
}

defineExpose({ handleOpenDialogExport })
</script>

<style lang="scss" scoped></style>
