<template>
  <div class="app-container">
    <el-card shadow="never" class="mb-10px">
      <PageSearch ref="pageSearchRef" @handle-search="handleSearch" />

      <div class="tabs-wrap">
        <div class="tab-handle">
          <CommHandleBtn :per="['collection:repairTool:list']" title="发起注销流程" img-name="add"
            @handle-click="handleAdd" />
        </div>

        <el-tabs @tab-change="handleRefresh" v-model="activeTabName">
          <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.label" :value="item.value">
          </el-tab-pane>
        </el-tabs>
      </div>

      <PageTable ref="tableListRef" :query-opt="queryOpt" :types="activeTabName" @remove="onRemove" @view="onView"
        @edit="onEdit" @approve="onApprove" />

      <div class="el-pagination-wrap" v-if="queryOpt.total > 0">
        <pagination :total="queryOpt.total" :page="paginationParams.pageNum" :limit="paginationParams.pageSize"
          @pagination="paginationChange" />
      </div>
    </el-card>

    <!-- 添加、修改、查看 -->
    <DialogAddOrUpdate v-if="isShowDialogAddOrEdit" :row-obj="rowObj"
      @handleCloseDialogAddOrEdit="handleCloseDialogAddOrEdit" />

    <!-- 确认注销审批 -->
    <DialogViewOrApprove v-if="approveDialogShow" :row-obj="rowObj" :types="dialogType"
      @closeDialogConfirm="handleCloseDialogConfirm" />

    <!-- 删除提示 -->
    <DialogWrap ref="dialogWrapRef" width="764px" title="" @handleSureClick="doDelete()"
      @handleCancelClick="del_id = ''" v-if="del_id">
      <template #dialogContent>
        <div class="del_dialog_tips">确认删除该流程吗？</div>
      </template>
    </DialogWrap>
  </div>
</template>

<script setup>

import PageSearch from './c-cpns/page-search.vue'
import PageTable from './c-cpns/page-table.vue'
import DialogAddOrUpdate from './c-cpns/dialog-add-or-edit.vue'
import DialogViewOrApprove from './c-cpns/dialog-view-or-approve.vue'

import DialogWrap from '@/components/comm-cpns/dialog-wrap/dialog-wrap.vue'
import CommHandleBtn from '@/components/comm-cpns/comm-handle-btn/comm-handle-btn.vue'

import { ElMessage } from 'element-plus';

import { listWirteOffMine, listWirteOffApproval, delWirteOff } from '@/api/workManage/writeOff'

const activeTabName = ref('0')
const tabList = [{ label: '我发起的流程', value: '0' }, { label: '我审批的流程', value: '1' }]



/** 查询列表 */
const pageSearchRef = ref()
const pageSearchParams = ref({})

const paginationParams = reactive({
  pageNum: 1,
  pageSize: 10
})
function paginationChange(val) {
  paginationParams.pageNum = val.page
  paginationParams.pageSize = val.limit
  handleGetList()
}

const queryOpt = reactive({
  dataList: [],
  total: 0,
  loading: false,
  showSearch: true
})

async function handleGetList() {
  queryOpt.loading = true

  const params = Object.assign({}, pageSearchParams.value, paginationParams)
  const res = await (activeTabName.value == '0' ? listWirteOffMine(params) : listWirteOffApproval(params))

  queryOpt.dataList = res?.records ?? []
  queryOpt.total = res?.total ?? 0
  queryOpt.loading = false
}
handleGetList()

// page-search 搜索 / 重置
function handleSearch(params) {
  pageSearchParams.value = params
  handleRefresh()
}

// 刷新
function handleRefresh() {
  paginationParams.pageNum = 1
  handleGetList()
}

// 新增 / 修改
const isShowDialogAddOrEdit = ref(false)
const rowObj = ref({})

function handleAdd() {
  rowObj.value = {}
  isShowDialogAddOrEdit.value = true
}

function handleCloseDialogAddOrEdit() {
  isShowDialogAddOrEdit.value = false
  handleGetList()
}
// 编辑我发起的流程
function onEdit(row) {
  rowObj.value = row ?? {}
  isShowDialogAddOrEdit.value = true
}

const dialogType = ref('')
const approveDialogShow = ref(false)
// 确认审批
function onApprove(row) {
  rowObj.value = row ?? {}
  dialogType.value = 'confirm'
  approveDialogShow.value = true
}
function handleCloseDialogConfirm() {
  dialogType.value = ''
  approveDialogShow.value = false
  handleGetList()
}

// 查看我审批的流程
function onView(row) {
  rowObj.value = row ?? {}
  dialogType.value = 'view'
  approveDialogShow.value = true
}

let del_id = ref('')
// 删除我发起的流程
function onRemove(row) {
  del_id.value = row.flowNo
}
// 确认删除
function doDelete() {
  delWirteOff(del_id.value).then(res => {
    ElMessage.success('删除成功');
    del_id.value = ''
    handleGetList()
  })
}

function handleExport() { }
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
  top: 6px;
  z-index: 9;
  //border: 2px solid red;
}
</style>
