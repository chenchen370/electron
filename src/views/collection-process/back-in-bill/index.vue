<template>
  <div class="app-container">
    <el-card shadow="never" class="mb-10px">
      <PageSearch ref="searchFormRef" :options="options_info" @search="onSearch" @reset="onSearch" />
      <PageTable @detail="detailInfoRef($event, false)" @download="onDowload" />
      <div class="el-pagination-wrap mt-4" v-if="page.total > 0">
        <el-pagination :total="page.total" v-model:page="page.currentPage" v-model:limit="page.pageSize"
          @change="onPageChange" />
      </div>
    </el-card>
    <DetailInfo ref="detailInfoRef" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PageSearch from './c-cpns/page-search.vue'
import PageTable from './c-cpns/page-table.vue'
import { useTable } from '@/hooks/useTable'
import request from '@/utils/request'
import DetailInfo from '@/views/collection-process/back-in/c-cpns/dialog-add-or-edit.vue'

import { useOptionInfo } from './options'
const options_info = useOptionInfo()

const searchFormRef = ref()
const detailInfoRef = ref();

const { page, list, listLoading, onPageChange, searchLoading, onSearch, queryList } = useTable({
  queryAction: page => {
    const searchParams = searchFormRef.value.getQueryParams()
    const data = {
      ...searchParams,
      pageNum: page.currentPage,
      pageSize: page.pageSize,
      queryType: 'all'
    }
    return request({
      url: '/heritage/warehouse/back/manage/page',
      method: 'post',
      data
    }).then(res => {
      return {
        list: res.data.records,
        total: res.data.total
      }
    })
  }
})

onMounted(() => {
  queryList()
})

function onDowload() { }
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
