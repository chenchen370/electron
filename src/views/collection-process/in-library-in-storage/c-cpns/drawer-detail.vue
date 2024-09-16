<template>
  <el-drawer v-model="visible" title="入馆入库流程详情" size="1000px">
    <el-descriptions title="基本入藏信息" :column="3" style="--el-fill-color-blank: transparent">
      <el-descriptions-item label="登记人">{{ detail.flowPerson }}</el-descriptions-item>
      <el-descriptions-item label="登记日期">
        <FormatDateValue :value="detail.flowTime" />
      </el-descriptions-item>
      <el-descriptions-item label="收件人"> {{ detail.receipt }} </el-descriptions-item>
      <el-descriptions-item label="交件人"> {{ detail.delivery }} </el-descriptions-item>
      <el-descriptions-item label="征集人"> {{ detail.collectPerson }} </el-descriptions-item>
      <el-descriptions-item label="备注"> {{ detail.flowDesc }} </el-descriptions-item>
      <el-descriptions-item label="附件"> {{ detail.flowAttachment }} </el-descriptions-item>
    </el-descriptions>
    <div class="p-y-5 text-lg font-bold">入藏藏品</div>
    <el-table :data="list" v-loading="listLoading" border>
      <el-table-column label="藏品编号" align="center" prop="flowId" />
      <el-table-column label="藏品名称" align="center" prop="relicName" />
      <el-table-column label="文物图片" align="center">
        <template #default="{ row }">
          <image-preview :width="50" :height="50" :src="row.relicPath" />
        </template>
      </el-table-column>
      <el-table-column label="数量" align="center" prop="relicNum" />
      <el-table-column label="单位" align="center" prop="numUnit">
        <template #default="{ row }">
          <dict-tag :options="actual_quantity_unit" :value="row.numUnit" />
        </template>
      </el-table-column>
      <el-table-column label="文物年代" align="center" prop="relicYear">
        <template #default="{ row }">
          {{ getFormatText(years, row.relicYear) }}
        </template>
      </el-table-column>
      <el-table-column label="质地" align="center" prop="relicMaterial">
        <template #default="{ row }">
          <dict-tag :options="cp_texture_1" :value="row.relicMaterial" />
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="relicDesc" />
    </el-table>
    <div class="mt-4">
      <pagination v-show="page.total > 0" :total="page.total" v-model:page="page.currentPage"
        v-model:limit="page.pageSize" @pagination="onPageChange" />
    </div>
    <div class="h-60"></div>
    <div class="bg-#EFF0E9 p-8 absolute left-0 bottom-0 w-full" v-if="isReview">
      <el-form :model="reviewForm" ref="reviewFormRef" size="large" label-position="top" :inline="true"
        label-width="auto">
        <div class="flex w-full">
          <el-form-item label="审批结果">
            <div class="bg-#50A13E c-white w-80 text-center flex items-center justify-center gap-4">
              <el-icon size="18">
                <SuccessFilled />
              </el-icon>
              <span>完成入库</span>
            </div>
          </el-form-item>
          <el-form-item label="审批意见" class="flex-1" :rules="[{ required: true, message: '请输入审批意见' }]" prop="remark">
            <el-input class="w-full bg-white" v-model="reviewForm.remark" placeholder="请输入" clearable
              @keyup.enter="onConfirmReview" />
          </el-form-item>
        </div>
        <div class="flex justify-end w-full">
          <el-form-item>
            <el-button class="button-p-cancel" @click="hide">关闭</el-button>
            <el-button class="button-c-sure" type="primary" :loading="submitLoading"
              @click="onConfirmReview">确定</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </el-drawer>
</template>

<script setup lang='ts'>
import { useDialog, } from '@/hooks/useDialog'
import { inManageDetail } from '@/api/warehouse/index'
import FormatDateValue from '@/components/FormatDateValue/index.vue'
import { isNull } from 'lodash-es';
import { approvalProcess } from '@/api/approval/index'
import { type Page, useTable } from '@/hooks/useTable';
import { getFlowRelics } from '@/api/flow'
// @ts-ignore
const { proxy } = getCurrentInstance();

const { cp_texture_1 } = proxy.useDict('cp_texture_1')
const { actual_quantity_unit } = proxy.useDict('actual_quantity_unit')
const { years } = proxy.useDict('years')


function getFormatText(list: any[], value: string) {
  if (!list?.length) return '';
  const item = list.find(v => v.code === Number(value))
  return item?.label || '-'
}

const { visible, initLoading, submitLoading, hide } = useDialog()
const { list, page, listLoading, onPageChange, onSearch } = useTable({
  queryAction
})

async function queryAction(page: Page) {
  const data = {
    flowId: detail.flowNo,
    pageNum: page.currentPage,
    pageSize: page.pageSize,
    status: 0,
  }
  return getFlowRelics(data).then(res => {
    return {
      list: res.records,
      total: res.total
    }
  })
}


const detail = reactive<any>({
  "pageNum": undefined,
  "pageSize": undefined,
  "id": undefined,
  "flowNo": undefined,
  "flowPerson": undefined,
  "flowTime": undefined,
  "collectPerson": undefined,
  "delivery": undefined,
  "receipt": undefined,
  "flowDesc": undefined,
  "relicsNum": undefined,
  "createTime": undefined,
  "createBy": undefined,
  "updateBy": undefined,
  "updateTime": undefined,
  "approveStatus": undefined,
  "approveFailedDesc": undefined,
  "flowStatus": undefined,
  "flowAttachment": undefined,
  "tbFlowRelics": undefined,
});
const emits = defineEmits(['ok'])

function formatData(data: any) {
  Object.keys(data).forEach(k => {
    if (k === 'tbFlowRelics') {
      data[k] = data[k] || [];
      return;
    }
    if (isNull(data[k]) || data[k] === '') {
      data[k] = '-'
    }
  })

}
function setValues(data: any) {
  Object.keys(data).forEach(k => {
    detail[k] = data[k]
  })
}

async function show(data: any, isReviewValue = false) {
  initLoading.value = true;
  visible.value = true;
  isReview.value = isReviewValue;
  if (isReview.value) {
    await nextTick();
    reviewFormRef.value?.resetFields();
  }
  const res = await inManageDetail(data.id)
  formatData(res.data);
  setValues(res.data)
  console.log('detail-------')
  console.log(detail)
  initLoading.value = false
  onSearch();
}

const isReview = ref(false)
const reviewFormRef = ref();
const reviewForm = reactive({
  result: 'agree',
  remark: ''
})
async function onConfirmReview() {
  const valid = await reviewFormRef.value.validate()
  if (!valid) return;
  const data = {
    id: detail.id,
    type: 1,
    ...reviewForm,
  }
  submitLoading.value = true;
  approvalProcess(data).then(() => {
    proxy.$modal.msgSuccess('入库成功')
    hide()
    emits('ok')
  }).finally(() => {
    submitLoading.value = false;
  })
}

defineExpose({
  show,
  hide
})
</script>

<style></style>