<template>
  <el-drawer v-model="visible" title="提用出库流程详情" size="1000px">
    <DetailInfo :data="detail" />
    <div class="p-y-5 text-lg font-bold">提用藏品</div>
    <RelicsTable :list="detail.tbFlowRelics" :onlyShow="true" />
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
              <span>完成出库</span>
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
import { outManageDetail } from '@/api/warehouse/index'
import DetailInfo from '@/views/collection-process/back-in/c-cpns/detail-info.vue'
import RelicsTable from './selected-relics-table.vue'
import { isNull } from 'lodash-es';
import { approvalProcess } from '@/api/approval/index'
// @ts-ignore
const { proxy } = getCurrentInstance();
const { visible, initLoading, submitLoading, hide } = useDialog()
const detail = ref<any>({
  id: undefined,
  tbFlowRelics: []
});
const emits = defineEmits(['ok'])

function formatData(data: any) {
  Object.keys(data).forEach(k => {
    if (isNull(data[k]) || data[k] === '') {
      data[k] = '-'
    }
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
  const res = await outManageDetail(data.id)
  formatData(res.data);
  detail.value = res.data;
  initLoading.value = false
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
    id: detail.value.id,
    type: 2,
    ...reviewForm,
  }
  submitLoading.value = true;
  approvalProcess(data).then(() => {
    proxy.$modal.msgSuccess('出库成功')
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