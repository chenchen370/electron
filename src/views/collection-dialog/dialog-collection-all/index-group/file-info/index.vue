<template>
  <div class="app-container">
    <page-header
      v-if="handleStatus !== 'check'"
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
      :handle-status="handleStatus"
      @handle-row-update="handleRowUpdate"
      @handle-row-delete="handleRowDelete"
      @handle-row-detail="handleRowDetail"
      @handle-selection-change="handleSelectionChange"
    />

    <div class="el-pagination-wrap" v-show="pageInfo.total > 0">
      <pagination :total="pageInfo.total" v-model:page="paginationParams.pageNum" v-model:limit="paginationParams.pageSize" @pagination="handleGetList" />
    </div>

    <!-- 弹窗 添加 / 修改 -->
    <dialog-add-or-update
      v-if="dialogInfo.isShowDialogAddOrUpdate"
      :proxy="proxy"
      :title="dialogInfo.title"
      :row-obj="rowObj"
      :relics-id="relicsId"
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

<script setup>
import { ref, reactive, getCurrentInstance } from 'vue'

import PageHeader from './page-header/page-header.vue'
import PageTable from './page-table/page-table.vue'
import DialogAddOrUpdate from './dialog-add-or-update/dialog-add-or-update.vue'
import DialogDetail from '@/components/comm-cpns/dialog-detail/dialog-detail.vue'

import { auditFileInfo, delFileInfo, getFileInfo } from '@/api/collection-all/index-group/file-info'
import { auditBaseInfo } from '@/api/collection-all/index-group/base-info'
import { auditAppendGoods } from '@/api/collection-all/index-group/append-goods'

const props = defineProps({
  handleStatus: {
    type: String,
    default: 'check' // submit （新增 + 修改 + 提交审核）check（查看）
  },
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

// 获取列表
async function handleGetList() {
  try {
    const params = Object.assign({ relicsId: props.relicsId }, searchParams.value, paginationParams)
    const res = await getFileInfo(params)
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

// table 修改
function handleRowUpdate(row) {
  rowObj.value = row
  dialogInfo.title = '修改'
  dialogInfo.isShowDialogAddOrUpdate = true
}

// 批量删除
const ids = ref([])
const selectionArr = ref([])
// table 多选
function handleSelectionChange(selection) {
  selectionArr.value = selection
  ids.value = selection.map(item => item.id)
  headerBtnInfo.single = selection.length !== 1
  headerBtnInfo.multiple = !selection.length
  rowObj.value = selection[0]
}

// header 删除
function handleDelete() {
  if (ids.value.length === 0) return props.proxy.$modal.msgError('请选择数据！')
  const msg = selectionArr.value?.map(row => {
    return `${row?.attachmentName}`
  })

  handleRowDelete(ids.value, msg.join('、'))
}

// table 删除
function handleRowDelete(idList, msg) {
  props.proxy.$modal
    .confirm(`是否删除 名称: ${msg} 数据项？`)
    .then(() => delFileInfo({ id: idList.join(','), relicsId: props.relicsId }))
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

async function audit() {
  if (ids.value.length === 0) return props.proxy.$modal.msgError('请选择数据！')
  const msg = selectionArr.value
    ?.map(row => {
      return `${row?.attachmentName}`
    })
    .join('、')
  props.proxy.$modal
    .confirm(`是否提交审核 名称: ${msg} 数据项？`)
    .then(async () => {
      for (let valueElement of selectionArr.value) {
        await auditFileInfo(valueElement)
      }
    })
    .then(() => {
      handleGetList()
      props.proxy.$modal.msgSuccess('提交成功')
    })
    .catch(() => {})
}
defineExpose({ audit })
</script>
