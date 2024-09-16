<template>
  <div class="mt-5">
    <el-table style="width: 100%" v-loading="loading" :data="list" border>
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column label="序号" type="index" width="60" />
      <el-table-column label="入馆凭证号" align="center" prop="flowNo" />
      <el-table-column label="交件人" align="center" prop="delivery" />
      <el-table-column label="收件人" align="center" prop="receipt" />
      <el-table-column label="藏品数量" align="center" prop="relicsNum" />
      <el-table-column label="提交时间" align="center" prop="createTime" sortable>
        <template #default="{ row }">
          {{ formatDate(row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="审批状态" align="center" prop="approveStatus" sortable>
        <template #default="{ row }">
          <el-tag type="success" v-if="row.approveStatus == 0"> 已提交 </el-tag>
          <el-tag type="success" v-else-if="row.approveStatus == 1"> 审批中 </el-tag>
          <el-tag type="info" v-else-if="row.approveStatus == 2"> 审批结束 </el-tag>
          <el-tag type="danger" v-else-if="row.approveStatus == 3"> 驳回 </el-tag>
          <el-tag type="warning" v-else> 未提交 </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="当前状态" align="center" prop="flowStatus">
        <template #default="{ row }">
          {{ flowStatus[row.flowStatus] }}
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="110" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button class="text-lg" link type="primary" icon="View" title="查看" @click="emits('detail', scope.row)" />
          <el-button class="text-lg" link type="primary" icon="EditPen" title="编辑" @click="emits('edit', scope.row)"
            v-if="type === 'mine'" />
          <el-button class="text-lg" link type="primary" icon="Delete" title="删除" @click="emits('remove', scope.row)"
            v-if="type === 'mine'" />
          <el-button class="text-lg" link type="primary" title="入库" @click="emits('review', scope.row)"
            v-if="type === 'approval'">
            <svg-icon icon-class="icon_backin" />
          </el-button>
          <el-button class="text-lg" link type="primary" icon="Download" title="下载" @click="onDowload(scope.row)"
            v-if="type === 'approval'" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { formatDate } from '@/utils'
import { downloadComm } from '@/utils/request'
const flowStatus = ['未提交', '待审批', '审批通过', '被驳回']

const emits = defineEmits(['remove', 'edit', 'detail', 'review'])
function onDowload(row) {
  downloadComm(`/heritage/warehouse/in/manage/downloadCert/${row.id}`, {}, `${row.flowNo}_入藏凭证.docx`, { method: 'get' })
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
  }
})


</script>

<style lang="scss" scoped></style>
