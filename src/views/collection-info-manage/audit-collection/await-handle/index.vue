<template>
  <div>
    <page-search
      ref="pageSearchRef"
      :query-opt="queryOpt"
      @handle-search="handleSearch"
      @handle-reset="handleRefresh"
      @handle-open-audit-all-success="handleOpenAuditAllSuccess"
      @handle-open-audit-all-fail="handleOpenAuditAllFail"
    />

    <page-table
      ref="pageTableRef"
      :query-opt="queryOpt"
      @handle-open-media-kinds-list="handleOpenMediaKindsList"
      @handle-open-collection-all="handleOpenCollectionAll"
    />

    <div class="el-pagination-wrap" v-if="queryOpt.total > 0">
      <pagination :total="queryOpt.total" v-model:page="paginationParams.pageNum" v-model:limit="paginationParams.pageSize" @pagination="handleGetList" />
    </div>

    <DialogAuditAll v-if="isShowAuditAll" :approval-result="approvalResult" @handle-close-audit-all="handleCloseAuditAll" />
  </div>
</template>

<script setup>
import PageSearch from './page-search.vue'
import PageTable from './page-table.vue'
import DialogAuditAll from './dialog-audit-all.vue'

import { auditBatchCollection, getCollectionAuditList } from '@/api/collection-info-manage'

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
const pageTableRef = ref()
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
  const params = Object.assign({ approvalStat: 1 }, pageSearchParams.value, paginationParams)

  const res = await getCollectionAuditList(params)
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

// 查看 藏品 all信息
function handleOpenCollectionAll(row) {
  emits('handleOpenCollectionAll', row, 'check')
}

// 查看 藏品 多媒体
function handleOpenMediaKindsList(row) {
  emits('handleOpenMediaKindsList', row, 'audit')
}

// 审核全部 - 打开
const isShowAuditAll = ref(false)
const approvalResult = ref('')
function handleOpenAuditAllSuccess() {
  const info = pageTableRef.value.handleGetIds?.()
  if (info.ids.length === 0) return props.proxy?.$modal.msgError('请先选择藏品')
  isShowAuditAll.value = true
  approvalResult.value = 'agree'
}

function handleOpenAuditAllFail() {
  const info = pageTableRef.value.handleGetIds?.()
  if (info.ids.length === 0) return props.proxy?.$modal.msgError('请先选择藏品')
  isShowAuditAll.value = true
  approvalResult.value = 'refuse'
}

// 审核全部 - 确定 / 取消 status 1 通过
async function handleCloseAuditAll(status, formData) {
  if (status) {
    const ids = pageTableRef.value.handleGetIds?.()?.ids
    const params = {
      ids,
      ...formData
    }
    await auditBatchCollection(params)
    const { approvalResult } = formData
    props.proxy?.$modal.msgSuccess(`审核${approvalResult == 'agree' ? '通过' : '拒绝'}成功~`)
    isShowAuditAll.value = false
  } else {
    isShowAuditAll.value = false
  }
}
</script>

<style lang="scss" scoped></style>
