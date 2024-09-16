<template>
  <!-- 添加或修改活动对话框 -->
  <el-dialog class="coder-wang-dialog" :title="title" v-model="open" width="1280px" append-to-body
    :before-close="handleCancel" align-center :show-close="false">
    <el-scrollbar :height="`calc(100vh - 280px)`">
      <el-form class="coder-wang-form-wrap" ref="formRef" :model="form" :rules="rules" label-width="auto" size="large"
        label-position="top">
        <el-row :span="24" :gutter="49">
          <el-col :span="8">
            <el-form-item prop="mobileReason">
              <template #label>
                移动原因
                <span class="label-tip-move-cause">本次增加的记录只适合不需要进行流程审批的记录，需要审批必须进入“藏品提用”发起流程。</span>
              </template>
              <el-select v-model="form.mobileReason" clearable placeholder="请选择移动原因" style="width: 100%">
                <el-option v-for="item in optionsInfo?.options_reason_withdrawal" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="tip-bottom">
          <div class="left"></div>
          请务必先选择移动原因，再填写一下内容
          <div class="right"></div>
        </div>

        <el-row :span="24" :gutter="49">
          <el-col :span="8">
            <el-form-item label="提用登记号" prop="flowNo">
              <el-input v-model="form.flowNo" clearable placeholder="请输入提用登记号" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="提用日期" prop="flowDate">
              <el-date-picker style="width: 100%" v-model="form.flowDate" type="date" format="YYYY-MM-DD" clearable
                placeholder="请选择提用日期" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="提用人" prop="flower">
              <el-select v-model="form.flower" clearable placeholder="请选择/输入提用人" filterable remote reserve-keyword
                allow-create remote-show-suffix :remote-method="getListUser" :loading="api_options.loading"
                style="width: 100%">
                <el-option v-for="item in api_options.options_user" :key="item.userName" :label="item.userName"
                  :value="item.userName" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="提用单位或部门" prop="flowDept">
              <el-input v-model="form.flowDept" placeholder="请输入提用单位或部门" clearable />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="提用负责人" prop="flowDirector">
              <el-select v-model="form.flowDirector" clearable placeholder="请选择/输入提用负责人" filterable remote
                reserve-keyword allow-create remote-show-suffix :remote-method="getListUser"
                :loading="api_options.loading" style="width: 100%">
                <el-option v-for="item in api_options.options_user" :key="item.userName" :label="item.userName"
                  :value="item.userName" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="审批单位" prop="approvalUnit">
              <el-input v-model="form.approvalUnit" placeholder="请输入审批单位" clearable />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="审批人" prop="approvaler">
              <el-select v-model="form.approvaler" clearable placeholder="请选择/输入提用审批人" filterable remote reserve-keyword
                allow-create remote-show-suffix :remote-method="getListUser" :loading="api_options.loading"
                style="width: 100%">
                <el-option v-for="item in api_options.options_user" :key="item.userName" :label="item.userName"
                  :value="item.userName" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="批准文号">
              <el-input placeholder="请输入批准文号" clearable />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="保管部负责人" prop="storageDirector">
              <el-select v-model="form.storageDirector" clearable placeholder="请选择/输入保管部负责人" filterable remote
                reserve-keyword allow-create remote-show-suffix :remote-method="getListUser"
                :loading="api_options.loading" style="width: 100%">
                <el-option v-for="item in api_options.options_user" :key="item.userName" :label="item.userName"
                  :value="item.userName" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="展览类型" prop="exhibitType">
              <el-select v-model="form.exhibitType" clearable placeholder="请选择展览类型" style="width: 100%">
                <el-option v-for="item in optionsInfo?.options_exhibition_type" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="展览名称" prop="exhibitName">
              <el-input v-model="form.exhibitName" placeholder="请输入展览名称" clearable />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="展览开始时间" prop="exhibitStartTime">
              <el-date-picker style="width: 100%" v-model="form.exhibitStartTime" type="datetime"
                format="YYYY-MM-DD HH:mm:ss" clearable placeholder="请选择展览开始时间" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="展览截至时间" prop="exhibitEndTime">
              <el-date-picker style="width: 100%" v-model="form.exhibitEndTime" type="datetime"
                format="YYYY-MM-DD HH:mm:ss" clearable placeholder="请选择展览截至时间" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="展览组织机构" prop="exhibitInstitutions">
              <el-input v-model="form.exhibitInstitutions" placeholder="请输入展览组织机构" clearable />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="展览举办地点" prop="exhibitLocation">
              <el-input v-model="form.exhibitLocation" placeholder="请输入展览举办地点" clearable />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="接展单位">
              <el-input placeholder="请输入接展单位" clearable />
            </el-form-item>
          </el-col>

          <el-col :span="16">
            <el-form-item label="备注" prop="remarks">
              <el-input v-model="form.remarks" placeholder="请输入备注" clearable />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-scrollbar>
    <template #footer>
      <div class="dialog-footer">
        <el-button class="button-p-cancel" @click="handleCancel">返回</el-button>
        <el-button class="button-c-sure" type="primary" @click="handleSubmit">保存</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref } from 'vue'

import optionsInfo from '../options'
import { listUser } from '@/api/system/user'
import { addMoveRecord, delMoveRecord } from '@/api/collection-all/manage-work/move-record'

const props = defineProps({
  title: {
    type: String,
    default: '标题'
  },
  relicsId: {
    type: [String, Number],
    default: null
  },
  rowObj: {
    type: Object,
    default: () => ({})
  },
  proxy: {
    type: Object,
    default: () => ({})
  }
})

const emits = defineEmits(['handleCancel', 'handleSubmit'])

const open = ref(true)
const formRef = ref()

const form = reactive({
  id: undefined,
  aa: '',

  mobileReason: undefined, // 移动原因
  flowNo: undefined, // 提用登记号
  flowDate: undefined, // 提用日期
  flower: undefined, // 提用人
  flowDept: undefined, // 提用单位或部门
  flowDirector: undefined, // 提用负责人
  approvalUnit: undefined, // 审批单位
  approvaler: undefined, // 审批人

  // 批准文号(缺)

  storageDirector: undefined, // 保管部负责人
  exhibitType: undefined, // 展览类型
  exhibitName: undefined, // 展览名称
  exhibitStartTime: undefined, // 展览开始时间
  exhibitEndTime: undefined, // 展览截至时间
  exhibitInstitutions: undefined, // 展览组织机构
  exhibitLocation: undefined, // 展览举办地点
  // 接展单位(缺)
  remarks: undefined // 备注
})
const rules = {}

// options
const api_options = reactive({
  loading: false,
  options_user: []
})

// 用户
async function getListUser(userName) {
  api_options.loading = true
  try {
    const res = await listUser({ pageNum: 1, pageSize: 999, userName })
    api_options.options_user = res?.rows ?? []
    api_options.loading = false
  } catch (e) {
    api_options.loading = false
    api_options.options_user = []
  }
}
getListUser()

// 回填数据
watch(
  () => props.rowObj,
  val => {
    console.log('rowObj ===> ', val)
    if (Object.keys(val).length > 0) {
      initForm(val)
    }
  },
  {
    immediate: true,
    deep: true
  }
)
// 回填数据
function initForm(rowObj) {
  Object.keys(form).forEach(key => {
    form[key] = rowObj[key]
  })
}

/** 提交按钮 */
function handleSubmit() {
  formRef.value.validate(async valid => {
    try {
      if (valid) {
        form.relicsId = props.relicsId
        if (form?.id != null) {
          await delMoveRecord(form)
          props?.proxy?.$modal.msgSuccess('修改成功')
          emits('handleSubmit')
        } else {
          console.log('form ===> ', form)
          await addMoveRecord(form)
          props?.proxy?.$modal.msgSuccess('新增成功')
          emits('handleSubmit')
        }
      }
    } catch (e) { }
  })
}

// 取消按钮
function handleCancel() {
  emits('handleCancel')
}
</script>

<style scoped lang="scss">
.el-scrollbar {

  //box-sizing: border-box;
  :deep(.el-scrollbar__bar.is-horizontal) {
    height: 0;
    width: 0;
  }
}

.label-tip-move-cause {
  position: absolute;
  left: 100px;
  top: 0;

  font-family: Source Han Serif CN;
  font-size: 16px;
  font-weight: normal;
  line-height: normal;
  display: flex;
  align-items: center;
  letter-spacing: 0em;
  color: #848484;
}

.tip-bottom {
  font-family: Source Han Serif CN;
  font-size: 16px;
  line-height: 16px;
  font-weight: normal;

  font-variation-settings: 'opsz' auto;
  font-feature-settings: 'kern' on;
  color: #ff6000;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;

  .left,
  .right {
    height: 1px;
    display: flex;
    flex: 1;
    background: #ff6000;
  }

  .left {
    margin-right: 62px;
  }

  .right {
    margin-left: 62px;
  }
}
</style>
