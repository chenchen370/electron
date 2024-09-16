<template>
  <div class="app-container">
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

<script setup>
import { ref, reactive, getCurrentInstance } from 'vue'

import PageTable from './page-table/page-table.vue'
import DialogDetail from '@/components/comm-cpns/dialog-detail/dialog-detail.vue'

import { getStudy, delStudy } from '@/api/collection-all/multimedia/study'

const props = defineProps({
  relicsId: {
    type: [String, Number],
    default: null
  },
  proxy: {
    type: Object,
    default: () => ({})
  }
})

const searchParams = ref({})

const paginationParams = reactive({
  pageNum: 1,
  pageSize: 10
})

const pageInfo = reactive({
  tableList: [],
  total: 0,
  loading: false
})

const headerBtnInfo = reactive({
  single: true,
  multiple: true,
  showSearch: true
})

// 修改
const rowObj = ref({})
// 批量删除
const ids = ref([])

// 获取列表
async function handleGetList() {
  try {
    const params = Object.assign({ relicsId: props.relicsId }, searchParams.value, paginationParams)
    const res = await getStudy(params)
    pageInfo.tableList = res?.data?.records ?? []
    pageInfo.total = res?.data?.total ?? 0
    pageInfo.loading = false
  } catch (e) {
    pageInfo.loading = false
  }
}
handleGetList()

// page-search 搜索
function handleSearch(params) {
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
const dialogInfo = reactive({
  isShowDialogAddOrUpdate: false,
  isShowDialogDetail: false,
  title: ''
})

// header 新增
function handleAdd() {
  console.log('dd')
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
  console.log('ids.value.length', ids.value.length)
  if (ids.value.length === 0) return props.proxy.$modal.msgError('请选择数据！')
  handleRowDelete(ids.value)
}

// table 修改
function handleRowUpdate(row) {
  rowObj.value = row
  dialogInfo.title = '修改'
  dialogInfo.isShowDialogAddOrUpdate = true
}

// table 删除
function handleRowDelete(idList) {
  props.proxy.$modal
    .confirm(`是否确认删除编号为${idList.join(', ')}的数据项？`)
    .then(() => delStudy(idList))
    .then(() => {
      handleGetList()
      props.proxy.$modal.msgSuccess('删除成功')
    })
    .catch(() => {})
}

// table 详情
const detailList = ref([])
function handleRowDetail(list) {
  detailList.value = list
  dialogInfo.isShowDialogDetail = true
}

// table 多选
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.id)
  headerBtnInfo.single = selection.length !== 1
  headerBtnInfo.multiple = !selection.length
  rowObj.value = selection[0]
}
</script>
