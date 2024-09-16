<template>
  <div class="app-container">
    <el-card shadow="never" class="mb-10px">
      <PageSearch ref="searchFormRef" @search="onSearch" @reset="onSearch" :loading="searchLoading" />

      <div style="margin-top: 20px">
        <PageTable :list="list" :loading="listLoading" @detail="detailRef.show($event)" />
      </div>

      <div class="el-pagination-wrap mt-4" v-if="page.total > 0">
        <pagination :total="page.total" v-model:page="page.currentPage" @change="onPageChange" />
      </div>
    </el-card>
    <DrawerDetail ref="detailRef" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

import PageSearch from './c-cpns/page-search.vue'
import PageTable from './c-cpns/page-table.vue'
import { useTable } from '@/hooks/useTable'
import { inManagePageAll } from '@/api/warehouse/index'

import DrawerDetail from '@/views/collection-process/in-library-in-storage/c-cpns/drawer-detail.vue'
const searchFormRef = ref()
const detailRef = ref();

const queryAction = page => {
  const searchParams = searchFormRef.value.getQueryParams()
  const data = {
    ...searchParams,
    pageNum: page.currentPage,
    pageSize: page.pageSize
  }
  return inManagePageAll(data).then(data => {
    return {
      list: data.records,
      total: data.total
    }
  })
}

const { list, page, queryList, listLoading, searchLoading, onPageChange, onSearch } = useTable({ queryAction })

onMounted(() => {
  queryList()
})
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
