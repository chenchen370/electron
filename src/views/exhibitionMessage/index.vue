<template>
  <div class="app-container">
    <el-card shadow="never" class="mb-10px">
      <PageSearch ref="pageSearchRef" :options="options" @handle-search="handleSearch" @handle-reset="handleRefresh" />
      <div class="mb-20px">
        <CommHandleBtn title="新增" img-name="add" @handle-click="handleAdd" :per="['exhibitionMessage:add']" />
        <CommHandleBtn title="删除" img-name="remove" @handle-click="handleDelete" :per="['exhibitionMessage:remove']"
          :disabled="!ids.length" />
      </div>

      <PageTable ref="tableListRef" :query-opt="queryOpt" :options="options" @remove="handleDelete" @view="onView"
        @edit="onEdit" @select="onSelect" />

      <pagination v-show="paginationParams.total > 0" :total="queryOpt.total" :page="paginationParams.pageNum"
        :limit="paginationParams.pageSize" @pagination="paginationChange" />
    </el-card>

    <!-- 添加、修改、查看 -->
    <DialogAddOrUpdate v-if="isShowDialogAddOrEdit" :options="options" :types="dialogTypes" :row-obj="rowObj"
      @handleCloseDialogAddOrEdit="handleCloseDialogAddOrEdit" />

    <!-- 删除提示 -->
    <DialogWrap ref="dialogWrapRef" width="764px" title="" @handleSureClick="doDelete()"
      @handleCancelClick="del_id = ''" v-if="del_id">
      <template #dialogContent>
        <div class="del_dialog_tips">确认删除该展览吗？</div>
      </template>
    </DialogWrap>
  </div>
</template>

<script setup name="ExhibitionMessage">
import PageSearch from './c-cpns/page-search.vue'
import PageTable from './c-cpns/page-table.vue'
import DialogAddOrUpdate from './c-cpns/dialog-add-or-edit.vue'

import DialogWrap from '@/components/comm-cpns/dialog-wrap/dialog-wrap.vue'
import CommHandleBtn from '@/components/comm-cpns/comm-handle-btn/comm-handle-btn.vue'

import { ElMessage } from 'element-plus';

import { getExhibitionList, removeExhibition, detailExhibition } from '@/api/exhibition-manage/exhibition'

import useInitOptions from '@/hooks/use_init_options'
const options = useInitOptions([{
  key: 'exhibition_type',
  isDict: true,
  dictCode: 'exhibition_type'
}])


//搜索栏
const pageSearchRef = ref()
const pageSearchParams = ref({})

// page-search 搜索 / 重置
function handleSearch(params) {
  pageSearchParams.value = params
  handleGetList()
}

//分页器
const paginationParams = reactive({
  pageNum: 1,
  pageSize: 10
})

function paginationChange(val) {
  paginationParams.pageNum = val.page
  paginationParams.pageSize = val.limit
  handleGetList()
}

//刷新
function handleRefresh() {
  paginationParams.pageNum = 1
  handleGetList()
}

/** 查询列表 */
const queryOpt = reactive({
  dataList: [],
  total: 0,
  loading: false,
  showSearch: true
})

async function handleGetList() {
  queryOpt.loading = true

  const params = Object.assign({}, pageSearchParams.value, paginationParams)
  const res = await getExhibitionList(params)

  queryOpt.dataList = res?.records ?? []
  queryOpt.total = res?.total ?? 0
  queryOpt.loading = false
}
handleGetList()


// 新增 / 修改 / 查看
const isShowDialogAddOrEdit = ref(false)
const rowObj = ref({})
const dialogTypes = ref(0)

function handleAdd() {
  rowObj.value = {}
  dialogTypes.value = 1
  isShowDialogAddOrEdit.value = true
}
function onEdit(row) {
  rowObj.value = row ?? {}
  dialogTypes.value = 2
  isShowDialogAddOrEdit.value = true
}
function onView(row) {
  rowObj.value = row ?? {}
  dialogTypes.value = 0
  isShowDialogAddOrEdit.value = true
}
function handleCloseDialogAddOrEdit() {
  isShowDialogAddOrEdit.value = false
  handleGetList()
}

/** 删除操作 */
const ids = ref([])
function onSelect(arr) {
  ids.value = arr.value
}

const del_id = ref('')
function handleDelete(row) {
  del_id.value = row?.id || 'delIds'
}

async function doDelete() {
  if (del_id.value == 'delIds') {
    for (let i = 0; i < ids.value.length; i++) {
      await removeExhibition(ids.value[i])
    }
  } else {
    await removeExhibition(del_id.value)
  }
  del_id.value = ''
  ElMessage.success('删除成功');
  handleGetList()
}

</script>
<style lang="scss" scoped></style>