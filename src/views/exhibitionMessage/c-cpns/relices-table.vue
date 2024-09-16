<template>
  <div>
    <el-form :model="searchParams" ref="searchRef" size="large" :inline="true">
      <el-row :gutter="22">
        <el-col :span="5">
          <el-form-item label="编号" prop="relicId" style="width: 100%">
            <el-input v-model="searchParams.relicId" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="藏品名称" prop="relicName" style="width: 100%">
            <el-input v-model="searchParams.relicName" placeholder="请输入" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="藏品归属" prop="relicWarehouse" style="width: 100%">
            <el-select v-model="searchParams.relicWarehouse" placeholder="请选择" clearable>

            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">

        </el-col>
        <el-col :span="4">
          <div class="td-flex justify-end" style="width: 100%">
            <el-button class="button-c-primary" type="primary" @click="handleGetList">查询</el-button>
            <el-button class="button-p-black" @click="handleReset">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <el-table height="380" :data="queryOpt.thingList" :loading="queryOpt.loading" @selection-change="selectionChange">
      <el-table-column type="selection" width="30" align="center" v-if="types" />
      <el-table-column label="藏品归属" align="center" prop="" />
      <el-table-column label="藏品编号名称" align="center" prop="" width="110" />
      <el-table-column label="藏品编号" align="center" prop="relicId" />
      <el-table-column label="藏品名称" align="center" prop="relicName" />
      <el-table-column label="文物类别" align="center" prop="relicCategory" />
      <el-table-column label="实际数量" align="center" prop="relicNum" />
      <el-table-column label="实际数量单位" align="center" prop="numUnit" width="110" />
      <el-table-column label="文物级别" align="center" prop="relicLevel" />
      <el-table-column label="完整程度" align="center" prop="relicCompleteness" />
      <el-table-column label="所在库房" align="center" prop="" />
      <el-table-column label="库房负责人" align="center" prop="" width="95" />
      <el-table-column label="当前状态" align="center" prop="isWarehouse">
        <template #default="{ row }">
          {{ getLabel(statusArr, row.isWarehouse, 'value', 'label') }}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="80">
        <template #default="{ row }">
          <CommHandleBtnTable icon-name="Delete" @handle-table-btn="handleRowDelete(row)" />
        </template>
      </el-table-column>
    </el-table>
    <div class="el-pagination-wrap">
      <pagination :total="queryOpt.total" :page="paginationParams.pageNum" v-model:limit="paginationParams.pageSize"
        @pagination="paginationChange" />
    </div>
  </div>
</template>

<script setup>
import CommHandleBtnTable from '@/components/comm-cpns/comm-handle-btn-table/comm-handle-btn-table.vue'

import { getLabel } from '@/utils/comm-util/getLabel.js'

import { listCabinetRelics } from '@/api/exhibition-manage/exhibition'

const props = defineProps({
  types: {
    type: Number,//0-已添加  1-待添加
    default: 0
  },
  cabinetId: {
    type: String,
    default: ''
  },
  exhibitionId: {
    type: String,
    default: ''
  }
})

const emits = defineEmits(['onSelect'])

const statusArr = reactive([
  { label: '不在库', value: '0' },
  { label: '在库', value: '1' },
  { label: '入库中', value: '2' }
])

const searchRef = ref()
const searchParams = reactive({})
const paginationParams = reactive({
  pageNum: 1,
  pageSize: 10
})

const queryOpt = reactive({
  thingList: [],
  total: 0,
  loading: false,
  showSearch: true
})

async function handleGetList() {
  queryOpt.loading = true
  const params = Object.assign({ exhibitionId: props.exhibitionId, cabinetId: props.cabinetId }, searchParams, paginationParams)
  const res = await listCabinetRelics(params)
  queryOpt.thingList = res.records
  queryOpt.total = res.total
  queryOpt.loading = false
}
handleGetList()


function paginationChange(val) {
  paginationParams.pageNum = val.page
  paginationParams.pageSize = val.limit
  handleGetList()
}

function handleReset() {
  searchRef.value?.resetFields()
  handleGetList()
}

function selectionChange(selection) {
  emits('onSelect', selection.map(item => item.id))
}

</script>

<style></style>