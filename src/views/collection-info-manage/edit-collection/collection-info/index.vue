<template>
  <div>
    <page-search ref="pageSearchRef" :query-opt="queryOpt" :options-info="optionsInfo" @handle-search="handleSearch"
      @handle-reset="handleRefresh" />

    <el-row style="margin-bottom: 22px">
      <div class="left-toolbar">
        <el-space :size="24">
          <!--          <comm-handle-btn title="新增" img-name="add" @handle-click="handleOpenCollectionCoreIndex({})" />-->
          <!--          <comm-handle-btn title="删除" img-name="remove" @handle-click="handleRemove" />-->
          <comm-handle-btn title="导出" img-name="exp" @handle-click="handleExport" />
        </el-space>
      </div>
    </el-row>

    <page-table ref="tableListRef" :query-opt="queryOpt"
      @handle-open-collection-core-index="handleOpenCollectionCoreIndex"
      @handle-open-collection-all="handleOpenCollectionAll" @handle-open-media-kinds-list="handleOpenMediaKindsList"
      @handle-open-change-status="handleOpenChangeStatus" />

    <div class="el-pagination-wrap" v-if="queryOpt.total > 0">
      <pagination :total="queryOpt.total" v-model:page="paginationParams.pageNum"
        v-model:limit="paginationParams.pageSize" @pagination="handleGetList" />
    </div>

    <dialog-change-status v-if="isShowDialogChangeStatus"
      @handle-close-dialog-change-status="handleCloseChangeStatus" />
  </div>
</template>

<script setup>
import PageSearch from './page-search.vue'
import PageTable from './page-table.vue'
import CommHandleBtn from '@/components/comm-cpns/comm-handle-btn/comm-handle-btn.vue'
import DialogChangeStatus from '@/views/collection-info-manage/edit-collection/collection-info/dialog-change-status.vue'
import { editRelicsInfo, getCollectionList } from '@/api/collection-info-manage'
const props = defineProps({
  proxy: {
    type: Object,
    default: () => ({})
  },
  optionsInfo: {
    type: Object,
    default: () => ({})
  },
})
const emits = defineEmits(['handleOpenCollectionCoreIndex', 'handleOpenCollectionAll', 'handleOpenMediaKindsList'])
/** 查询列表 */
const pageSearchRef = ref()
const pageSearchParams = ref({})

const paginationParams = reactive({
  pageNum: 1,
  pageSize: 10
})
const queryOpt = reactive({
  thingList: [],
  total: 0,
  loading: false,
  showSearch: true
})

async function handleGetList() {
  queryOpt.loading = true
  const params = Object.assign({}, pageSearchParams.value, paginationParams)
  const res = await getCollectionList(params)
  // const res = { data: { records: [1, 2, 3, 4, 5, 6, 7, 8, 9], total: 8 } }
  queryOpt.thingList = res.data.records
  queryOpt.total = res.data.total
  queryOpt.loading = false
}

handleGetList()

// page-search 搜索 / 重置
function handleSearch(params) {
  queryOpt.loading = true
  pageSearchParams.value = params
  handleGetList()
}

// 刷新
function handleRefresh() {
  paginationParams.pageNum = 1
  pageSearchRef.value.handleReset?.()
}

// 删除
function handleRemove() { }

// 导出
function handleExport() { }

// 显示导出弹窗
const isShowDialogExport = ref(false)
function handleOpenDialogExport() {
  if (ids.value.length === 0) return props.proxy?.$modal.msgError('请先选择藏品')
  isShowDialogExport.value = true
}
function handleCloseDialogExport() {
  isShowDialogExport.value = false
}

// 新增 藏品指标
function handleOpenCollectionCoreIndex(row) {
  emits('handleOpenCollectionCoreIndex', row, 'submit')
}

// 编辑 藏品 all信息
function handleOpenCollectionAll(row) {
  emits('handleOpenCollectionAll', row, 'submit')
}

// 编辑 藏品 媒体信息
function handleOpenMediaKindsList(row) {
  emits('handleOpenMediaKindsList', row, 'submit')
}

// 更改状态
const isShowDialogChangeStatus = ref(false)
const currentRow = ref()
function handleOpenChangeStatus(row) {
  currentRow.value = row
  isShowDialogChangeStatus.value = true
}
async function handleCloseChangeStatus() {
  isShowDialogChangeStatus.value = false
  const res = await editRelicsInfo({ id: currentRow.value.id, isWarehouse: 0 })
  props.proxy?.$modal.msgSuccess('变更状态成功~')
  handleRefresh()
}

defineExpose({ handleRefresh })
</script>

<style lang="scss" scoped></style>
