<template>
  <div>
    <page-search ref="pageSearchRef" :query-opt="queryOpt" @handle-search="handleSearch" @handle-reset="handleRefresh" />

    <el-row style="margin-bottom: 22px">
      <div class="left-toolbar">
        <el-space :size="24">
          <!--          <comm-handle-btn title="新增" img-name="add" @handle-click="handleOpenCollectionCoreIndex" />-->
          <!--          <comm-handle-btn title="删除" img-name="remove" @handle-click="handleRemove" />-->

          <comm-handle-btn title="导出" img-name="exp" @handle-click="handleExport" />
        </el-space>
      </div>
    </el-row>

    <page-table
      ref="tableListRef"
      :query-opt="queryOpt"
      @handle-open-media-kinds-list="handleOpenMediaKindsList"
      @handle-open-collection-all="handleOpenCollectionAll"
    />

    <div class="el-pagination-wrap" v-if="queryOpt.total > 0">
      <pagination :total="queryOpt.total" v-model:page="paginationParams.pageNum" v-model:limit="paginationParams.pageSize" @pagination="handleGetList" />
    </div>
  </div>
</template>

<script setup>
import PageSearch from './page-search.vue'
import PageTable from './page-table.vue'
import CommHandleBtn from '@/components/comm-cpns/comm-handle-btn/comm-handle-btn.vue'
import { getCollectionEditList } from '@/api/collection-info-manage'
const props = defineProps({
  proxy: {
    type: Object,
    default: () => ({})
  }
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

  const params = Object.assign({ approvalStat: 2 }, pageSearchParams.value, paginationParams)
  //
  const res = await getCollectionEditList(params)
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

// 新增 / 修改
const isShowDialogAddOrEdit = ref(false)
const rowObj = ref({})

function handleAdd() {
  rowObj.value = {}
  isShowDialogAddOrEdit.value = true
}

//  新增 藏品指标
function handleOpenCollectionCoreIndex(row) {
  emits('handleOpenCollectionCoreIndex', row, 'submit')
}

// 编辑 藏品 all信息
function handleOpenCollectionAll(row) {
  emits('handleOpenCollectionAll', row, 'check')
}

// 编辑 藏品 媒体信息
function handleOpenMediaKindsList(row) {
  emits('handleOpenMediaKindsList', row, 'check')
}

function handleCloseDialogAddOrEdit() {
  isShowDialogAddOrEdit.value = false
}

function handleRemove() {}

function handleExport() {}

defineExpose({ handleRefresh })
</script>

<style lang="scss" scoped></style>
