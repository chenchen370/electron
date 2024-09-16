<template>
  <!-- 添加或修改活动对话框 -->
  <el-dialog class="coder-wang-dialog" :title="title" v-model="open" width="1280px" append-to-body
    :before-close="handleCancel" align-center :show-close="false">
    <el-form class="coder-wang-form-wrap" ref="formRef" :model="form" :rules="rules" label-width="auto" size="large"
      label-position="top">
      <el-row :span="24" :gutter="49">
        <el-col :span="8">
          <el-form-item label="移动原因" prop="mobileReason">
            <el-select v-model="form.mobileReason" clearable placeholder="请选择移动原因" style="width: 100%">
              <el-option v-for="item in optionsInfo?.options_reason_withdrawal" :key="item.value" :label="item.label"
                :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="开始时间" prop="exhibitStartTime">
            <el-date-picker style="width: 100%" v-model="form.exhibitStartTime" type="datetime"
              format="YYYY-MM-DD HH:mm:ss" clearable placeholder="请选择开始时间" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="截至时间" prop="exhibitEndTime">
            <el-date-picker style="width: 100%" v-model="form.exhibitEndTime" type="datetime"
              format="YYYY-MM-DD HH:mm:ss" clearable placeholder="请选择截至时间" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="移动目的地" prop="exhibitInstitutions">
            <el-input v-model="form.exhibitInstitutions" placeholder="请输入移动目的地" clearable />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="区域详细地址" prop="exhibitLocation">
            <el-input v-model="form.exhibitLocation" placeholder="请输入区域详细地址" clearable />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="执行单位" prop="approvalUnit">
            <el-input v-model="form.approvalUnit" placeholder="请输入执行单位" clearable />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="具体事由" prop="exhibitName">
            <el-input v-model="form.exhibitName" placeholder="请输入具体事由" clearable />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="备注" prop="remarks">
            <el-input v-model="form.remarks" placeholder="请输入备注" clearable />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

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
import { addMoveRecord, delMoveRecord, editMoveRecord } from '@/api/collection-all/manage-work/move-record'

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

  mobileReason: undefined, // 移动原因
  exhibitStartTime: undefined, // 开始时间
  exhibitEndTime: undefined, // 截至时间
  exhibitInstitutions: undefined, // 移动目的地
  exhibitLocation: undefined, // 区域详细地址
  approvalUnit: undefined, // 执行单位
  exhibitName: undefined, // 具体事由
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
          await editMoveRecord(form)
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
