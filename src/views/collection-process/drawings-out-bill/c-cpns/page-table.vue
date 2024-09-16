<template>
  <div class="mt-5">
    <el-table style="width: 100%" v-loading="loading" :data="list" border>
      <el-table-column label="提用登记号" align="center" prop="flowNo" />
      <el-table-column label="提用人" align="center" prop="carryPerson" />
      <el-table-column label="提交时间" align="center" prop="flowTime" />
      <el-table-column label="藏品数量" align="center" width="90" prop="relicsNum" />
      <el-table-column label="提用去向" align="center" prop="outType">
        <template #default="{ row }">
          <dict-tag :options="options.out_type" :value="row.outType" />
        </template>
      </el-table-column>
      <el-table-column label="提用类型" align="center" prop="applicationType">
        <template #default="{ row }">
          <dict-tag :options="options.application_type" :value="row.applicationType" />
        </template>
      </el-table-column>
      <el-table-column label="审批状态" align="center" prop="flowStatus">
        <template #default="{ row }">
          {{ getLabel(options.flowStatus, row.flowStatus, 'value', 'label') }}
        </template>
      </el-table-column>
      <el-table-column label="当前状态" align="center" prop="processStatus">
        <template #default="{ row }">
          {{ row.processStatus || '-' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="110" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button class="text-lg" link type="primary" icon="View" title="查看" @click="emits('detail', scope.row)" />
          <el-button class="text-lg" link type="primary" icon="Download" title="下载" @click="onDowload(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { getLabel } from '@/utils/comm-util/getLabel.js'
import { downloadComm } from '@/utils/request'

function onDowload(row) {
  downloadComm(`/heritage/warehouse/back/manage/downloadCert/${row.id}`, {}, `${row.id}_藏品提用凭证.docx`, { method: 'get' })
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

const emits = defineEmits(['download', 'detail'])

</script>

<style lang="scss" scoped></style>
