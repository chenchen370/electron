<template>
  <div class="app-container">
    <nav-info :mediaList="queryOpt.tableData" v-if="queryParams.media.mediaType === '7'"
      :relicId="queryOpt.tableData[0].relicId" />
  </div>
</template>

<script setup>
import { listMedia } from '@/api/collection-info-query/media'
import NavInfo from '@/views/collection-info-query/media/component/navInfo.vue'

/** 查询列表 */
const queryRef = ref()

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  searchValue: undefined,
  media: {
    mediaType: '7'
  }
})
const queryOpt = reactive({
  tableData: [],
  total: 0,
  loading: false,
  showSearch: true
})

async function handleGetList() {
  queryOpt.loading = true

  const res = await listMedia(queryParams)
  queryOpt.tableData = res.data.records
  queryOpt.total = res.data.total
  queryOpt.loading = false
}

handleGetList()

// page-search 搜索 / 重置
function handleSearch() {
  queryOpt.loading = true
  queryParams.pageNum = 1
  handleGetList()
}

// 刷新
function handleRefresh() {
  queryParams.pageNum = 1
  queryRef.value?.resetFields?.()
  handleSearch()
}

// 多选框选中数据
const ids = ref([])
const single = ref(true)
const multiple = ref(true)

function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.id)
  single.value = selection.length != 1
  multiple.value = !selection.length
}
</script>

<style scoped lang="scss">
.tab-el-form {
  margin-top: 30px;
}
</style>
