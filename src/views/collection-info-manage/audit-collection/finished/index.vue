<template>
  <div>
    <page-search ref="pageSearchRef" :query-opt="queryOpt" @handle-search="handleSearch" @handle-reset="handleRefresh" />

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
import { getCollectionAuditList } from '@/api/collection-info-manage'

const emits = defineEmits(['handleOpenMediaKindsList', 'handleOpenCollectionAll'])
const props = defineProps({
  proxy: {
    type: Object,
    default: () => ({})
  }
})

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
  const res = await getCollectionAuditList(params)
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

// 查看 藏品 all信息
function handleOpenCollectionAll(row) {
  emits('handleOpenCollectionAll', row, 'check')
}

// 查看 藏品 多媒体
function handleOpenMediaKindsList(row) {
  emits('handleOpenMediaKindsList', row, 'check')
}

function handleCloseDialogAddOrEdit() {
  isShowDialogAddOrEdit.value = false
}

function handleRemove() {}

function handleExport() {}
</script>

<style lang="scss" scoped></style>
