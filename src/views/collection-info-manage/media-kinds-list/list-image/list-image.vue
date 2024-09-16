<template>
  <div class="app-container">
    <el-table
      style="width: 100%"
      height="calc(100vh - 490px)"
      v-loading="queryOpt.loading"
      :data="queryOpt.tableData"
      @selection-change="handleSelectionChange"
      border
    >
      <el-table-column type="selection" width="55" align="center" />

      <el-table-column label="序号" type="index" width="60" />

      <el-table-column label="图片" align="center" prop="relicPath" width="90">
        <template #default="scope">
          <ImagePreview :width="50" :height="50" :src="scope.row.relicPath" />
        </template>
      </el-table-column>

      <el-table-column label="文件名称" align="center" prop="mediaName" />

      <el-table-column label="编号" align="center" prop="mediaNo" />

      <el-table-column label="类别" align="center" prop="mediaCategory">
        <template #default="scope">
          {{ getLabel(optionsInfo?.options_collection_processing_methods ?? [], scope.row?.mediaCategory) }}
        </template>
      </el-table-column>

      <el-table-column label="最近保存时间" align="center" prop="createTime">
        <template #default="scope">
          {{ parseTime(scope.row?.createTime) }}
        </template>
      </el-table-column>

      <el-table-column label="审核状态" align="center" prop="" />

      <el-table-column label="操作" fixed="right" align="center" width="110" class-name="small-padding fixed-width">
        <template #default="scope">
          <comm-handle-btn-table v-if="handleStatus === 'submit'" icon-name="EditPen" @handle-table-btn="handleRowEdit(scope.row)" />
          <comm-handle-btn-table v-if="handleStatus === 'submit'" icon-name="Delete" @handle-table-btn="handleRowRemove(scope.row)" />
          <comm-handle-btn-table v-if="handleStatus === 'check'" icon-name="View" @handle-table-btn="handleRowCheck(scope.row)" />
          <comm-handle-btn-table v-if="handleStatus === 'audit'" icon-name="Stamp" @handle-table-btn="handleRowAudit(scope.row)" />
        </template>
      </el-table-column>
    </el-table>

    <!--    <div class="el-pagination-wrap">-->
    <!--      <pagination :total="queryOpt.total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="handleGetList" />-->
    <!--    </div>-->
  </div>
</template>

<script setup>
import CommHandleBtnTable from '@/components/comm-cpns/comm-handle-btn-table/comm-handle-btn-table.vue'
import { delMultimedia, getMultimedia } from '@/api/collection-all/multimedia/multimedia'
import { getLabel } from '@/utils/comm-util/getLabel'
import optionsInfo from '@/views/collection-info-manage/media-kinds-list/dialog/options-media'
import { parseTime } from '@/utils/zhebo'

const { proxy } = getCurrentInstance()
const props = defineProps({
  handleStatus: {
    type: String,
    default: 'submit'
  },
  mediaType: {
    type: String,
    default: ''
  },
  relicsId: {
    type: [String, Number],
    default: null
  }
})
const emits = defineEmits(['handleRowEdit', 'handleRowCheck', 'handleRowAudit'])
/** 查询列表 */
const queryRef = ref()

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10
})
const queryOpt = reactive({
  tableData: [],
  total: 0,
  loading: false,
  showSearch: true
})

async function handleGetList() {
  queryOpt.loading = true
  const res = await getMultimedia({ ...queryParams, mediaType: props.mediaType, relicNo: props.relicsId, relicId: props.relicsId })
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
const selectionArr = ref([])
const single = ref(true)
const multiple = ref(true)

function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.id)
  selectionArr.value = selection
  single.value = selection.length != 1
  multiple.value = !selection.length
}

// 编辑
function handleRowEdit(row) {
  emits('handleRowEdit', row)
}

// 删除
function handleRowRemove(row) {
  proxy.$modal
    .confirm(`是否删除 文件名称: ${row.mediaName} 数据项？`)
    .then(() => delMultimedia({ ids: row.id, relicsId: props.relicsId }))
    .then(() => {
      handleGetList()
      props.proxy.$modal.msgSuccess('删除成功')
    })
    .catch(() => {})
}

// 查看
function handleRowCheck(row) {
  emits('handleRowCheck', row)
}

// 审核
function handleRowAudit(row) {
  emits('handleRowAudit', row)
}

// 批量审批 / 批量删除
function handleGetIds() {
  return {
    ids: ids.value,
    msg: selectionArr.value
      ?.map(row => {
        return `${row?.name}`
      })
      .join('、')
  }
}

defineExpose({ handleRefresh, handleGetIds })
</script>

<style scoped lang="scss">
.tab-el-form {
  margin-top: 30px;
}
</style>
