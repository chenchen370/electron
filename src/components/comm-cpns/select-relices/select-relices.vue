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
          <el-form-item label="所在库房" prop="relicWarehouse" style="width: 100%">
            <el-select v-model="searchParams.relicWarehouse" placeholder="请选择" clearable>
              <el-option v-for="item in cabinet_addr" :key="item.houseId" :label="item.houseName"
                :value="item.houseId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="当前状态" prop="isWarehouse" style="width: 100%">
            <el-select v-model="searchParams.isWarehouse" placeholder="请选择" clearable>
              <el-option v-for="item in statusArr" :key="item.value" :label="item.label"
                :value="item.value"></el-option>
            </el-select>
          </el-form-item>
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
      <el-table-column type="selection" width="30" align="center" :selectable="selectable" />
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
    </el-table>
    <div class="el-pagination-wrap">
      <pagination :total="queryOpt.total" :page="paginationParams.pageNum" v-model:limit="paginationParams.pageSize"
        @pagination="paginationChange" />
    </div>
  </div>
</template>

<script setup>
import { getLabel } from '@/utils/comm-util/getLabel.js'

import { getWarehouseAllList } from '@/api/artifact/warehouse'
import { listThing } from '@/api/collection-info-query/thing'

const emits = defineEmits(['onSelect'])

const cabinet_addr = ref([])
const statusArr = reactive([
  { label: '不在库', value: '0' },
  { label: '在库', value: '1' },
  { label: '入库中', value: '2' }
])

const ids = ref([])

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

  const params = Object.assign({}, searchParams, paginationParams)
  const res = await listThing(params)
  queryOpt.thingList = res.data.records
  queryOpt.total = res.data.total
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
function selectable(row) {
  return row.isWarehouse != '0'
}
function selectionChange(selection) {
  // ids.value = selection.map(item => item.id)
  // emits('onSelect', ids)
  emits('onSelect', selection)
}

const getWarehouseAllLists = async () => {
  const { rows } = await getWarehouseAllList({ isShow: 0 })
  cabinet_addr.value = rows
}
getWarehouseAllLists()


</script>

<style></style>