<template>
  <div class="app-container">
    <el-card shadow="never" class="mb-10px">
      <PageSearch ref="searchFormRef" :options="options_info" @search="onSearch" @reset="onSearch"
        :loading="searchLoading" />
      <div class="tabs-wrap">
        <div class="tab-handle">
          <CommHandleBtn title="发起提用出库流程" img-name="add" @handle-click="dialogAddOrUpdateRef.show()" />
        </div>
        <el-tabs v-model="activeTabName" @tab-change="onSearch">
          <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.label" :name="item.name">
          </el-tab-pane>
        </el-tabs>
      </div>
      <PageTable ref="tableListRef" :list="list" :options="options_info" :loading="listLoading"
        @edit="dialogAddOrUpdateRef.show($event, true)" @remove="onRemove" :type="activeTabName"
        @detail="drawerConfirmOutRef.show($event)" @review="drawerConfirmOutRef.show($event, true)" />
      <div class="el-pagination-wrap mt-4" v-if="page.total > 0">
        <pagination :total="page.total" v-model:page="page.currentPage" v-model:limit="page.pageSize"
          @pagination="onPageChange" />
      </div>
    </el-card>
    <!-- 新增或编辑 -->
    <DialogAddOrUpdate :options="options_info" ref="dialogAddOrUpdateRef" @ok="queryList" />
    <!-- 详情 -->
    <DrawerConfirmOut ref="drawerConfirmOutRef" @ok="queryList" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

import PageSearch from './c-cpns/page-search.vue'
import PageTable from './c-cpns/page-table.vue'
import DialogAddOrUpdate from './c-cpns/dialog-add-or-edit.vue'
import CommHandleBtn from '@/components/comm-cpns/comm-handle-btn/comm-handle-btn.vue'
import DrawerConfirmOut from './c-cpns/drawer-confirm-out.vue'

import { useTable } from '@/hooks/useTable'
import { outManagePage, outManageRelicsPage, outManageDel } from '@/api/warehouse/index'

import { useOptionInfo, flowStatus } from './options'
const options_info = useOptionInfo()
options_info.flowStatus = flowStatus


const { proxy } = getCurrentInstance();
const dialogAddOrUpdateRef = ref()
const drawerConfirmOutRef = ref();
const searchFormRef = ref()
const activeTabName = ref('mine')
const tabList = [
  { label: '我发起的流程', name: 'mine' },
  { label: '我审批的流程', name: 'approval' }
]


const queryAction = page => {
  const searchParams = searchFormRef.value.getQueryParams()
  const data = {
    ...searchParams,
    pageNum: page.currentPage,
    pageSize: page.pageSize,
    queryType: activeTabName.value,
  }
  return outManagePage(data).then(res => {
    return {
      list: res.records,
      total: res.total
    }
  })
}

const { list, page, queryList, listLoading, searchLoading, onPageChange, onSearch } = useTable({ queryAction })


onMounted(() => {
  queryList()
})

// 删除
function onRemove(row) {
  outManageDel(row.id).then(() => {
    proxy.$modal.msgSuccess('操作成功');
    queryList()
  })
}
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
}
</style>
