<template>
  <div>
    <el-table style="width: 100%" v-loading="loading" :data="list" border>
      <el-table-column label="提用登记号" align="center" prop="flowNo" />
      <el-table-column label="提用人" align="center" prop="carryPerson" />
      <el-table-column label="提交时间" align="center" prop="endTime" />
      <el-table-column label="提用去向" align="center">
        <template #default="{ row }">
          <dict-tag :options="options.out_type" :value="row.outType" />
        </template>
      </el-table-column>
      <el-table-column label="提用类型" align="center">
        <template #default="{ row }">
          <dict-tag :options="options.application_type" :value="row.applicationType" />
        </template>
      </el-table-column>
      <el-table-column label="藏品数量" align="center" prop="relicsNum" />
      <el-table-column label="状态" align="center" prop="outStatus">
        <template #default="{ row }">
          {{ row.outStatus }}
        </template>
      </el-table-column>
      <el-table-column label="退库统计" align="center" :width="180" prop="outNum">
        <template #default="{ row }">
          出库： {{ row.outNum }} 归还：{{ row.backNum }}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="110" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button class="text-lg" link type="primary" icon="View" title="查看" @click="emits('detail', scope.row)" />
          <el-button class="text-lg" link type="primary" icon="Download" title="下载" @click="onDowload(scope.row)" />
          <el-button class="text-lg" link type="primary" title="退库" @click="emits('back', scope.row)">
            <svg-icon icon-class="icon_backin" />
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
const emits = defineEmits(['download', 'detail', 'back'])

import { downloadComm } from '@/utils/request'

function onDowload(row) {
  downloadComm(`/heritage/warehouse/out/manage/downloadCert/${row.id}`, {}, `${row.id}_藏品入藏凭证.docx`, { method: 'get' })
}


const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  list: {
    type: Array,
    default: () => []
  },
  options: {
    type: Object,
    default: () => { }
  }
})
</script>
