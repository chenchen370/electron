<template>
  <el-dialog v-model="open" :title="types == 'view' ? '查看' : '确认注销'" width="1280px" :class="types" append-to-body
    :before-close="handleCancel" :show-close="false" align-center>
    <el-scrollbar :style="{ height: types == 'view' ? '586px' : '440px' }">
      <el-card shadow="never">
        <template #header>
          <div class="card_title">基本注销信息</div>
        </template>
        <el-form :model="form" ref="formRef" size="large" :inline="true" label-position="top">
          <el-row :span="24" :gutter="50" style="width: 1160px;">
            <el-col :span="16">
              <el-form-item label="注销登记号" prop="" required style="width: 100%;">
                <div class="inpoutBox">
                  <el-input class="input1" v-model="formYear" :disabled="true" />
                  <el-input class="input2" v-model="formNo" :disabled="true" />
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="注销日期" prop="flowTime" style="width: 100%;">
                <el-input v-model="form.flowTime" :disabled="true" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="经手人" prop="handler" style="width: 100%;">
                <el-input v-model="form.handler" :disabled="true" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="负责人" prop="director" style="width: 100%;">
                <el-input v-model="form.director" :disabled="true" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审批人" prop="approvalName" style="width: 100%;">
                <el-input v-model="form.approvalName" :disabled="true" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审批单位" prop="approvalUnit" style="width: 100%;">
                <el-input v-model="form.approvalUnit" :disabled="true" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="批准文号" prop="approvalNo" style="width: 100%;">
                <el-input v-model="form.approvalNo" :disabled="true" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="藏品图片" prop="attachment">

              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>

      <el-card shadow="never" style="margin-top:32px">
        <template #header>
          <div class="card_title">注销藏品</div>
        </template>
        <el-table :data="dataList">
          <el-table-column label="藏品编号名称" align="center" prop="" width="110" />
          <el-table-column label="藏品编号" align="center" prop="relicsId" />
          <el-table-column label="藏品名称" align="center" prop="relicName" />
          <el-table-column label="文物类别" align="center" prop="relicCategory" />
          <el-table-column label="实际数量" align="center" prop="relicNum" />
          <el-table-column label="实际数量单位" align="center" prop="numUnit" width="110" />
          <el-table-column label="文物级别" align="center" prop="relicLevel" />
          <el-table-column label="完整程度" align="center" prop="relicCompleteness" />
          <el-table-column label="所在库房" align="center" prop="" />
          <el-table-column label="库房负责人" align="center" prop="" width="95" />
        </el-table>
      </el-card>
    </el-scrollbar>

    <template #footer>
      <el-form size="large" :inline="true" label-position="top" style="margin: 25px 0;" v-if="types == 'confirm'">
        <el-row :span="24" :gutter="40" style="width: 1160px;">
          <el-col :span="8">
            <el-form-item label="审批意见" prop="">
              <el-input v-model="remark" placeholder="请输入" clearable />
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="审批结果" prop="" required style="width: 100%;">
              <div class="btnBox">
                <div class="approveBtn" :class="{ active: isPass == 1 }" @click="isPass = isPass == 1 ? 0 : 1">
                  <el-icon :size="20" :color="isPass == 1 ? '#fff' : '#38675C'">
                    <CircleCheckFilled />
                  </el-icon>
                  <span>确认注销</span>
                </div>
                <div class="approveBtn refuse" :class="{ active: isPass == 2 }" @click="isPass = isPass == 2 ? 0 : 2">
                  <el-icon :size="20" :color="isPass == 2 ? '#fff' : '#DF0C0C'">
                    <CircleCloseFilled />
                  </el-icon>
                  <span>注销不通过</span>
                </div>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="dialog-footer">
        <el-space :size="40" v-if="types == 'confirm'">
          <el-button class="button-p-cancel" @click="handleCancel"> 关闭 </el-button>
          <el-button class="button-c-sure" type="primary" @click="handleSave">确定</el-button>
        </el-space>
        <el-space :size="40" v-else>
          <el-button class="button-c-sure" type="primary" @click="handleCancel"> 关闭 </el-button>
        </el-space>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ElMessage } from 'element-plus';

import CommHandleBtn from '@/components/comm-cpns/comm-handle-btn/comm-handle-btn.vue'

import { confirmApproval } from '@/api/workManage/approval'
import { getFlowRelics } from '@/api/flow/index'

const props = defineProps({
  rowObj: {
    type: Object,
    default: () => ({})
  },
  types: {
    type: String,
    default: 'view'
  },
})

const open = ref(true)

let formYear = ref('')
let formNo = ref('')
let form = reactive({})

let dataList = ref([])

let isPass = ref(0)
let remark = ref('')

watch(
  () => props.rowObj,
  val => {
    if (val) {
      console.log('writeOffEdit', val)
      Object?.keys(val).forEach(key => {
        form[key] = val[key]
      })
      form['flowTime'] = val['flowTime']?.substr(0, 10)
      if (val['id']) {
        formYear.value = val['flowNo']?.substr(0, 4)
        formNo.value = val['flowNo']?.substr(4)
      }
      getFlowRelicsList(form['flowNo'])
    }
  },
  {
    deep: true,
    immediate: true
  }
)

const emits = defineEmits(['closeDialogConfirm'])
function handleCancel() {
  emits('closeDialogConfirm')
}
function handleSave() {
  if (!isPass.value) return ElMessage.warning('请选择审批结果')
  const params = { id: form.id, result: isPass.value == '1' ? 'agree' : 'refuse', remark: remark.value, type: 7 }
  confirmApproval(params).then(res => {
    ElMessage.success('提交成功');
    emits('closeDialogConfirm')
  })
}
function getFlowRelicsList(flowNo) {
  getFlowRelics({ flowId: flowNo, pageNum: 1, pageSize: 999 }).then(res => {
    dataList.value = res?.records ?? []
  })
}
</script>

<style lang="scss" scoped>
.inpoutBox {
  width: 100%;
  display: flex;

  .input1 {
    flex: 1;
    margin-right: 10px;
  }

  .input2 {
    width: calc(50% - 25px);
  }
}

:deep(.el-card__header) {
  padding: 0 !important;

  .card_title {
    padding: 7px 30px;
    line-height: 26px;
    background: #EFF0E9;
    color: #064235;
    font-size: 18px;
    font-weight: 600;
  }
}


.btnBox {
  display: flex;
  gap: 44px;
  width: 100%;
}

.approveBtn {
  flex: 1;
  height: 40px;
  font-size: 16px;
  line-height: 40px;
  border-radius: 2px;
  color: #38675C;
  border: 1px solid #AEC2BD;
  display: flex;
  gap: 22px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-sizing: border-box;

  &.refuse {
    border-color: #f3adad;
    color: #DF0C0C;
  }

  &.active {
    color: #fff;
    border: none;
    background-color: #38675C;

    &.refuse {
      background-color: #DF0C0C;
    }
  }


}
</style>
<style>
.approve .el-dialog__footer {
  background-color: #EFF0E9;
}
</style>