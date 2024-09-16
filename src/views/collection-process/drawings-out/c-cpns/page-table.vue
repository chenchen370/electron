<template>
  <div>
    <el-table style="width: 100%" v-loading="loading" :data="list" border>
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column label="序号" type="index" align="center" width="60" />
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
          <!-- <dict-tag :options="application_type" :value="row.applicationType" /> -->
        </template>
      </el-table-column>
      <el-table-column label="当前状态" align="center" prop="processStatus">
        <template #default="{ row }">
          {{ row.processStatus || '-' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="110" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button class="text-lg" link type="primary" icon="EditPen" title="编辑" @click="emits('edit', scope.row)"
            v-if="type === 'mine'" />
          <el-button class="text-lg" v-if="type === 'mine'" link type="primary" icon="Delete" title="删除"
            @click="onDelete(scope.row)" />
          <el-button class="text-lg" link type="primary" icon="View" title="查看" @click="emits('detail', scope.row)" />
          <el-button class="text-lg" link type="primary" icon="Download" title="下载" @click="onDowload(scope.row)"
            v-if="type === 'approval'" />
          <el-button class="text-lg" link type="primary" title="出库" @click="emits('review', scope.row)"
            v-if="type === 'approval'">
            <svg-icon icon-class="icon_backin" />
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ElMessageBox } from 'element-plus'
import { getLabel } from '@/utils/comm-util/getLabel.js'
import { downloadComm } from '@/utils/request'
const emits = defineEmits(['remove', 'edit', 'detail', 'review'])

function onDowload(row) {
  downloadComm(`/heritage/warehouse/back/manage/downloadCert/${row.id}`, {}, `${row.id}_藏品提用凭证.docx`, { method: 'get' })
}

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'mine'
  },
  options: {
    type: Object,
    default: () => { }
  }
})

function onDelete(row) {
  ElMessageBox.confirm('确认删除该流程吗？').then(() => {
    emits('remove', row)
  })
}
</script>

<style lang="scss" scoped></style>
