<template>
  <div class="app-container">
    <el-card shadow="never" class="mb-10px">
      <page-search :proxy="proxy" :show-search="headerBtnInfo.showSearch" @handle-search="handleSearch" />

      <page-header
        :single="headerBtnInfo.single"
        @update:show-search="val => (headerBtnInfo.showSearch = val)"
        :multiple="headerBtnInfo.multiple"
        :show-search="headerBtnInfo.showSearch"
        @handle-refresh="handleRefresh"
        @handle-add="handleAdd"
        @handle-update="handleUpdate"
        @handle-delete="handleDelete"
      />

      <page-table
        :loading="pageInfo.loading"
        :table-list="pageInfo.tableList"
        @handle-row-update="handleRowUpdate"
        @handle-row-delete="handleRowDelete"
        @handle-row-detail="handleRowDetail"
        @handle-selection-change="handleSelectionChange"
      />

      <div class="el-pagination-wrap" v-show="pageInfo.total > 0">
        <pagination :total="pageInfo.total" v-model:page="paginationParams.pageNum" v-model:limit="paginationParams.pageSize" @pagination="handleGetList" />
      </div>
    </el-card>

    <!-- 弹窗 添加 / 修改 -->
    <dialog-add-or-update
      v-if="dialogInfo.isShowDialogAddOrUpdate"
      :proxy="proxy"
      :title="dialogInfo.title"
      :row-obj="rowObj"
      @handle-cancel="() => (dialogInfo.isShowDialogAddOrUpdate = false)"
      @handle-submit="
        () => {
          dialogInfo.isShowDialogAddOrUpdate = false
          handleRefresh()
        }
      "
    />

    <!-- 弹窗 详情 -->
    <dialog-detail
      v-if="dialogInfo.isShowDialogDetail"
      :list="detailList"
      @handle-close-detail="
        () => {
          dialogInfo.isShowDialogDetail = false
          detailList = []
        }
      "
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, getCurrentInstance } from 'vue'
import PageSearch from './page-search/page-search.vue'
import PageHeader from './page-header/page-header.vue'
import PageTable from './page-table/page-table.vue'
import DialogAddOrUpdate from './dialog-add-or-update/dialog-add-or-update.vue'
import DialogDetail from '@/components/comm-cpns/dialog-detail/dialog-detail.vue'

import type { IPropsHeaderBtnInfo } from './page-header/page-header.vue'
import type { IPropsFrom } from './type.ts'
import type { IPropsDialogInfo, IPropsPageInfo, IPropsPaginationParams, TIdList } from '@/type/page-type.ts'
import type { TDetailList } from '@/components/comm-cpns/dialog-detail/type.ts'

import { delInstrument, listInstrument } from '@/api/collection/instrument.ts'

const proxy = getCurrentInstance()?.proxy as any

const searchParams = ref<IPropsFrom>({})

const paginationParams = reactive<IPropsPaginationParams>({
  pageNum: 1,
  pageSize: 10
})

const pageInfo = reactive<IPropsPageInfo>({
  tableList: [],
  total: 0,
  loading: false
})

const headerBtnInfo = reactive<IPropsHeaderBtnInfo>({
  single: true,
  multiple: true,
  showSearch: true
})

// 修改
const rowObj = ref<IPropsFrom>({})

// 批量删除
const ids = ref<TIdList>([])

// 获取列表
async function handleGetList() {
  try {
    const params = Object.assign({}, searchParams.value, paginationParams)
    const res = (await listInstrument(params)) as any
    pageInfo.tableList = res?.rows ?? []
    pageInfo.total = res?.total ?? 0
    pageInfo.loading = false
  } catch (e) {
    pageInfo.loading = false
  }
}
handleGetList()

// page-search 搜索
function handleSearch(params: IPropsFrom) {
  pageInfo.loading = true
  searchParams.value = params
  handleGetList()
}

// 刷新
function handleRefresh() {
  pageInfo.loading = true
  handleGetList()
}

// dialog 新增 / 删除
const dialogInfo = reactive<IPropsDialogInfo>({
  isShowDialogAddOrUpdate: false,
  isShowDialogDetail: false,
  title: ''
})

// header 新增
function handleAdd() {
  rowObj.value = {}
  dialogInfo.title = '新增'
  dialogInfo.isShowDialogAddOrUpdate = true
}

// header 修改
function handleUpdate() {
  dialogInfo.title = '修改'
  dialogInfo.isShowDialogAddOrUpdate = true
}

// header 删除
function handleDelete() {
  handleRowDelete(ids.value)
}

// table 修改
function handleRowUpdate(row: IPropsFrom) {
  rowObj.value = row
  dialogInfo.title = '修改'
  dialogInfo.isShowDialogAddOrUpdate = true
}

// table 删除
function handleRowDelete(idList: TIdList) {
  proxy.$modal
    .confirm(`是否确认删除编号为${idList.join(', ')}的数据项？`)
    .then(() => delInstrument(idList))
    .then(() => {
      handleGetList()
      proxy.$modal.msgSuccess('删除成功')
    })
    .catch(() => {})
}

// table 详情
const detailList = ref<TDetailList>([])
function handleRowDetail(list: TDetailList) {
  detailList.value = list
  dialogInfo.isShowDialogDetail = true
}

// table 多选
function handleSelectionChange(selection: IPropsFrom[]) {
  ids.value = selection.map(item => item.id)
  headerBtnInfo.single = selection.length !== 1
  headerBtnInfo.multiple = !selection.length
  rowObj.value = selection[0]
}
</script>
