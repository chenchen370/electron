<template>
  <div class="app-container">
    <el-card shadow="never" class="mb-10px">
      <PageSearch ref="searchFormRef" @search="onSearch" @reset="onSearch" :loading="searchLoading" />

      <div class="tabs-wrap">
        <div class="tab-handle">
          <comm-handle-btn :per="['collection:repairTool:list']" title="发起入藏流程" img-name="add"
            @handleClick="dialogAddOrUpdatRef.show()" />
        </div>
        <el-tabs @tab-change="onSearch" v-model="activeTabName">
          <el-tab-pane v-for="(item, index) in tabList" :key="index" :name="item.name"
            :label="item.label"></el-tab-pane>
        </el-tabs>
      </div>

      <PageTable :list="list" :loading="listLoading" :type="activeTabName" @review="drawerDetailRef.show($event, true)"
        @detail="drawerDetailRef.show($event)" @remove="onRemove" @edit="onEdit" />

      <div class="el-pagination-wrap mt-4" v-if="page.total > 0">
        <pagination :total="page.total" v-model:page="page.currentPage" @change="onPageChange" />
      </div>
    </el-card>

    <DialogAddOrUpdate ref="dialogAddOrUpdatRef" @ok="queryList" />
    <DrawerDetail ref="drawerDetailRef" @ok="queryList" />

    <!-- 删除提示 -->
    <!-- <DialogWrap ref="dialogWrapRef" width="764px" title="" @handleSureClick="doDelete()" @handleCancelClick="del_id = ''" v-if="del_id">
      <template #dialogContent>
        <div class="tips">确认删除该流程吗？</div>
      </template>
</DialogWrap> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PageSearch from './c-cpns/page-search.vue'
import PageTable from './c-cpns/page-table.vue'
import DialogAddOrUpdate from './c-cpns/dialog-add-or-edit.vue'
import CommHandleBtn from '@/components/comm-cpns/comm-handle-btn/comm-handle-btn.vue'
import DialogWrap from '@/components/comm-cpns/dialog-wrap/dialog-wrap.vue'
import { useTable } from '@/hooks/useTable'
import { deleteInWarehouse } from '@/api/warehouse'
import { inManageList, inManageApprovalList, inManageDetail, inManageDel } from '@/api/warehouse/inManage'
import { useHandleData } from '@/components/ProTable/hooks'
import DrawerDetail from './c-cpns/drawer-detail.vue'

const dialogAddOrUpdatRef = ref()
const drawerDetailRef = ref();
const searchFormRef = ref()
const activeTabName = ref('mine')
const tabList = [
  { label: '我发起的流程', name: 'mine' },
  { label: '我审批的流程', name: 'approval' }
]

const { list, page, queryList, listLoading, searchLoading, onPageChange, onSearch } = useTable({
  queryAction: page => {
    const searchParams = searchFormRef.value.getQueryParams()
    console.log(searchParams)
    const data = {
      ...searchParams,
      pageNum: page.currentPage,
      pageSize: page.pageSize,
    }
    const api = activeTabName.value == 'mine' ? inManageList : inManageApprovalList;
    return api(data).then(res => {
      return {
        list: res.records,
        total: res.total
      }
    })
  }
})

onMounted(() => {
  queryList()
})

// 删除
async function onRemove(row) {
  await useHandleData(deleteInWarehouse, row.id, `删除入库流程【${row.flowNo}】`)
  queryList()
}

// 新增
function onAdd() { }

function onEdit(row) {
  dialogAddOrUpdatRef.value.show(row, true)
}
function onViewDetail() { }
</script>

<style lang="scss">
.tabs-wrap {
  margin-top: 15px;
  position: relative;
}

.tab-handle {
  position: absolute;
  right: 0;
  top: 6px;
  z-index: 2;
}

.add-tab-handle {
  position: absolute;
  right: 58px;
  top: 100px;
  z-index: 1;
}

.tips {
  height: 255px;
  margin-bottom: 54px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  color: #3d3d3d;
}
</style>
