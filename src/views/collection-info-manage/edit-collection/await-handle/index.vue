<template>
  <div>
    <page-search ref="pageSearchRef" :query-opt="queryOpt" @handle-search="handleSearch" @handle-reset="handleRefresh" />

    <el-row style="margin-bottom: 22px">
      <div class="left-toolbar">
        <el-space :size="24">
          <comm-handle-btn title="新增" img-name="add" @handle-click="handleOpenCollectionCoreIndex({})" />
          <comm-handle-btn title="删除" img-name="remove" @handle-click="handleDelete" />
          <comm-handle-btn
            title="提交审核"
            @handle-click="handleAudit"
            warp-padding="5px 34px"
            wrap-is-border="none"
            warp-background-color="#FF6000"
            cont-font-color="#fff"
          />
        </el-space>
      </div>
    </el-row>

    <page-table
      ref="pageTableRef"
      :query-opt="queryOpt"
      @handle-edit-collection-core-index="handleOpenCollectionCoreIndex"
      @handle-open-collection-all="handleOpenCollectionAll"
      @handle-open-media-kinds-list="handleOpenMediaKindsList"
      @handle-row-delete="handleRowDelete"
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
import { auditBatchCollection, auditCollection, delCollectionEditList, getCollectionEditList } from '@/api/collection-info-manage'

const props = defineProps({
  proxy: {
    type: Object,
    default: () => ({})
  }
})
const emits = defineEmits(['handleOpenCollectionCoreIndex', 'handleOpenCollectionAll'])
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

  const params = Object.assign({ approvalStat: 0 }, pageSearchParams.value, paginationParams)
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

// 删除 藏品 核心指标（批量）
function handleDelete() {
  const info = pageTableRef.value.handleGetIds?.()
  if (info.ids.length === 0) return props.proxy?.$modal.msgError('请先选择藏品')
  handleRowDelete(info.ids, info.msg)
  console.log('删除啊')
}

// 删除 藏品 核心指标
function handleRowDelete(idList, msg) {
  props.proxy.$modal
    .confirm(`是否删除 藏品编号: ${msg} 数据项？`)
    .then(() => delCollectionEditList(idList.join(',')))
    .then(() => {
      handleGetList()
      props.proxy.$modal.msgSuccess('删除成功')
    })
    .catch(() => {})
}

// 编辑 / 新增 藏品指标
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

async function handleAudit() {
  const info = pageTableRef.value.handleGetIds?.()
  if (info.ids.length === 0) return props.proxy?.$modal.msgError('请先选择藏品')
  props.proxy.$modal
    .confirm(`是否提交审核 藏品编号: ${info.msg} 数据项？`)
    .then(() => auditCollection(info.ids.join(',')))
    .then(() => {
      handleGetList()
      props.proxy.$modal.msgSuccess('提交审核成功')
    })
    .catch(() => {})
}

defineExpose({ handleRefresh })
</script>

<style lang="scss" scoped></style>
