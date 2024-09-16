<template>
  <div class="mt-5">
    <el-table style="width: 100%" v-loading="loading" :data="list" border>
      <el-table-column label="提用登记号" align="center" prop="flowNo" />
      <el-table-column label="提用人" align="center" prop="carryPerson" />
      <el-table-column label="提交时间" align="center" prop="endTime" />
      <el-table-column label="提用去向" align="center" prop="outType" />
      <el-table-column label="提用类型" align="center" prop="applicationType" />
      <el-table-column label="藏品数量" align="center" prop="pageSize" />
      <el-table-column label="状态" align="center" prop="flowStatus">
        <template #default="scope">
          <el-tag type="success" effect="plain" color="transparent">已退还</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="退库统计" align="center" prop="" />
      <el-table-column label="操作" fixed="right" align="center" width="110" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button class="text-lg" lin type="primary" icon="View" title="查看" @click="emits('detail', scope.row)" />
          <el-button class="text-lg" link type="primary" icon="Download" title="下载" @click="onDowload(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>

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
  }
})

const emits = defineEmits(['detail', 'download'])
</script>

<style lang="scss" scoped></style>
