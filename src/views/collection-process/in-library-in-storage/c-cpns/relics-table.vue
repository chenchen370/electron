<template>
  <div>
    <!-- 查询 -->
    <!-- <el-form :model="searchParams" size="large" :inline="true" label-width="auto">
      <el-row :span="24" :gutter="18">
        <el-col :span="6">
          <el-form-item label="编号" prop="flowNo" style="width: 100%">
            <el-input style="width: 100%" placeholder="请输入" v-model="searchParams.flowNo" clearable @keyup.enter="onSearch" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="藏品名称" prop="delivery" style="width: 100%">
            <el-input style="width: 100%" placeholder="请输入" v-model="searchParams.delivery" clearable @keyup.enter="onSearch" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="所在库方" prop="flowTime" style="width: 100%">
            <el-date-picker
              value-format="YYYY-MM-DD"
              style="width: 100%"
              v-model="searchParams.flowTime"
              placeholder="请输入"
              clearable
              @keyup.enter="onSearch"
            />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="当前状态" prop="status" style="width: 100%">
            <el-select size="large" placeholder="请选择" v-model="searchParams.status" clearable style="width: 100%">
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24" justify="end">
          <div class="td-flex justify-end">
            <el-button class="button-c-primary" type="primary" icon="Search" @click="onSearch">查询</el-button>
            <el-button class="button-p-black" icon="Refresh" @click="onReset">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form> -->
    <div class="mb-4 flex justify-end gap-2">
      <CommHandleBtn title="下载清单模板" img-name="exp" @handleClick="onDownloadTpl" />
      <el-upload ref="uploadRef" :show-file-list="false" :action="uploadFileUrl"
        accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        :on-success="onUploadSuccess" :on-error="onUploadError" :headers="uploadHeaders">
        <template #trigger>
          <CommHandleBtn title="导入" img-name="exp" />
        </template>
      </el-upload>
      <CommHandleBtn title="新增" img-name="add" @handleClick="editForDialogRef.show(editData)" />
    </div>
    <el-table :data="list" v-loading="listLoading" border @selection-change="onSelectChange">
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column label="藏品编号" align="center" prop="flowId" />
      <el-table-column label="藏品名称" align="center" prop="relicName" />
      <el-table-column label="文物图片" align="center">
        <template #default="{ row }">
          <image-preview :width="50" :height="50" :src="row.relicPath" />
        </template>
      </el-table-column>
      <el-table-column label="数量" align="center" prop="relicNum" />
      <el-table-column label="单位" align="center" prop="numUnit" />
      <el-table-column label="文物年代" align="center" prop="relicYear" />
      <el-table-column label="质地" align="center" prop="relicMaterial" />
      <el-table-column label="备注" align="center" prop="relicDesc" />
      <el-table-column label="操作" fixed="right" align="center" width="110" class-name="small-padding fixed-width">
        <template #default="{ row }">
          <el-button link type="primary" icon="EditPen" title="编辑" @click="editForDialogRef.show(row, true)" />
          <el-button link type="primary" icon="Delete" title="删除" @click="onDel(row)" />
        </template>
      </el-table-column>
    </el-table>
    <div class="mt-4">
      <pagination v-show="page.total > 0" :total="page.total" v-model:page="page.currentPage"
        v-model:limit="page.pageSize" @pagination="onPageChange" />
    </div>

    <EditForDialog ref="editForDialogRef" @ok="onRefresh" />
  </div>
</template>

<script setup>
import CommHandleBtn from '@/components/comm-cpns/comm-handle-btn/comm-handle-btn.vue'
import { useTable } from '@/hooks/useTable'
import { getFlowRelics, delRelics } from '@/api/flow'
import { inManageImportTemplate } from '@/api/warehouse/index'
import EditForDialog from '@/components/relics/dialog-form.vue'
import { useHandleData } from '@/components/ProTable/hooks'
import { getToken } from '@/utils/auth'
import { downloadComm } from '@/utils/request'

const { proxy } = getCurrentInstance();

defineProps({
  isEdit: {
    type: Boolean,
    default: false
  }
})

const uploadHeaders = ref({ Authorization: "Bearer " + getToken() });
const editForDialogRef = ref()



function onRefresh() {
  queryList()
}

const showEditDialog = (data, isEdit) => {
  editForDialogRef.value.show(data, isEdit)
}

const { list, page, queryList, listLoading, searchLoading, onPageChange, onSearch } = useTable({
  queryAction
})
const flowNo = ref();
let editData = {}
const searchParams = reactive({})
let total = 0

// function onReset() { }

const uploadFileUrl = computed(() => {
  return `${import.meta.env.VITE_APP_BASE_API}/heritage/warehouse/in/manage/import/relics/${flowNo.value}`


})
async function queryAction(page) {
  console.log(searchParams)
  const data = {
    ...searchParams,
    flowId: editData.flowNo,
    pageNum: page.currentPage,
    pageSize: page.pageSize
  }
  return getFlowRelics(data).then(res => {
    total = res.total
    return {
      list: res.records,
      total: res.total
    }
  })
}
function onSelectChange(v) {
  console.log(v)
}

function init({ data = {} }) {
  flowNo.value = data.flowNo;
  editData = data
  queryList()
}

async function onDel(row) {
  await useHandleData(delRelics, row.id, `删除藏品【${row.relicName}】`)
  queryList()
}

function isEmpty() {
  return total === 0
}

function getTotal() {
  return total
}

function onDownloadTpl() {
  downloadComm('/heritage/warehouse/in/manage/importTemplate', {}, '藏品导入模板.xls', { method: 'get' })
}
defineExpose({
  init,
  queryList,
  onSearch,
  isEmpty,
  getTotal
})

function onUploadSuccess(v) {
  proxy.$modal.msgSuccess('导入成功')
  onSearch()
}
function onUploadError(v) {
  proxy.$modal.msgSuccess('导入失败, 请重新导入')
}
</script>

<style></style>
