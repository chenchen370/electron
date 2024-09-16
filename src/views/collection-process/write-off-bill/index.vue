<template>
  <div class="app-container">
    <el-card shadow="never" class="mb-10px">
      <page-search ref="pageSearchRef" :query-opt="queryOpt" @handle-search="handleSearch" />

      <page-table ref="tableListRef" :query-opt="queryOpt" @view="onView" />

      <div class="el-pagination-wrap" v-if="queryOpt.total > 0">
        <pagination :total="queryOpt.total" :page="paginationParams.pageNum" :limit="paginationParams.pageSize"
          @pagination="paginationChange" />
      </div>
    </el-card>

    <!-- 查看注销审批 -->
    <DialogViewOrApprove v-if="approveDialogShow" :row-obj="rowObj" @closeDialogConfirm="handleCloseDialogConfirm" />
  </div>
</template>

<script setup>
import PageSearch from './c-cpns/page-search.vue'
import PageTable from './c-cpns/page-table.vue'
import DialogViewOrApprove from './c-cpns/dialog-view-or-approve.vue'

import { listWirteOffAll } from '@/api/workManage/writeOff'

/** 查询列表 */
const pageSearchRef = ref()
const pageSearchParams = ref({})

const paginationParams = reactive({
  pageNum: 1,
  pageSize: 10
})
function paginationChange(val) {
  paginationParams.pageNum = val.page
  paginationParams.pageSize = val.limit
  handleGetList()
}

const queryOpt = reactive({
  thingList: [],
  total: 0,
  loading: false,
  showSearch: true
})

async function handleGetList() {
  queryOpt.loading = true

  const params = Object.assign({}, pageSearchParams.value, paginationParams)
  const res = await listWirteOffAll(params)

  queryOpt.dataList = res?.records ?? []
  queryOpt.total = res?.total ?? 0
  queryOpt.loading = false
}

handleGetList()

// page-search 搜索 / 重置
function handleSearch(params) {
  pageSearchParams.value = params
  handleRefresh()
}

// 刷新
function handleRefresh() {
  paginationParams.pageNum = 1
  handleGetList()
}

// 查看审批
const approveDialogShow = ref(false)
const rowObj = ref({})

function onView(row) {
  rowObj.value = row ?? {}
  approveDialogShow.value = true
}
function handleCloseDialogConfirm() {
  approveDialogShow.value = false
  handleGetList()
}

function handleRemove() { }

function handleExport() { }
</script>

<style scoped lang="scss">
.active {
  color: var(--el-button-hover-text-color);
  border-color: var(--el-button-hover-border-color);
  background-color: var(--el-button-hover-bg-color);
  outline: 0;
}

.tabs-wrap {
  margin-top: 15px;
  position: relative;
}

.tab-handle {
  position: absolute;
  right: 0;
  top: 8px;
  z-index: 9999;
  //border: 2px solid red;
}
</style>
