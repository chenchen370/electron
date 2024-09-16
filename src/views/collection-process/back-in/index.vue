<template>
  <div class="app-container">
    <el-card shadow="never" class="mb-10px">
      <PageSearch ref="searchFormRef" :options="options_info" @search="onSearch" @reset="onSearch"
        :loading="searchLoading" />
      <PageTable :loading="listLoading" :list="list" :options="options_info"
        @detail="dialogAddOrEditRef.show($event, false)" @download="onDownload"
        @back="dialogAddOrEditRef.show($event, true)" />
      <div class="el-pagination-wrap pt-4" v-if="page.total > 0">
        <pagination :total="page.total" v-model:page="page.currentPage" v-model:limit="page.pageSize"
          @pagination="onPageChange" />
      </div>
    </el-card>
    <DialogAddOrEdit ref="dialogAddOrEditRef" @ok="queryList" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PageSearch from './c-cpns/page-search.vue'
import PageTable from './c-cpns/page-table.vue'
import CommHandleBtn from '@/components/comm-cpns/comm-handle-btn/comm-handle-btn.vue'
import DialogAddOrEdit from './c-cpns/dialog-add-or-edit.vue'
import { useTable } from '@/hooks/useTable'
import request from '@/utils/request'

import { useOptionInfo } from './options'
const options_info = useOptionInfo()

const searchFormRef = ref()
const dialogAddOrEditRef = ref()

function queryAction(page) {
  const searchParams = searchFormRef.value.getQueryParams()
  const data = {
    ...searchParams,
    pageNum: page.currentPage,
    pageSize: page.pageSize,
    // queryType: 'mine'
  }
  return request({
    url: '/heritage/warehouse/out/manage/backInfoPage',
    method: 'post',
    data
  }).then(res => {
    return {
      list: res.data.records,
      total: res.data.total
    }
  })
}

const { page, list, listLoading, onPageChange, searchLoading, onSearch, queryList } = useTable({
  queryAction
})
onMounted(() => {
  queryList()
})


function onDetail() { }
function onDownload() { }
function onBack() { }


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
  z-index: 2;
  //border: 2px solid red;
}
</style>
