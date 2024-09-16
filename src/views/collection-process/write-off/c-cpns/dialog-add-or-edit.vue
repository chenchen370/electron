<template>
  <el-dialog v-model="open" width="1280px" append-to-body :before-close="handleCancel" align-center
    :show-close="false">
    <template #header>
      <span>注销流程</span>
    </template>
    <el-tabs v-model="activeTabName" style="height: 586px">
      <el-tab-pane name="0" label="基本注销信息">
        <el-form :model="form" ref="formRef" size="large" :inline="true" label-position="top">
          <el-row :span="24" :gutter="50" style="width: 1160px">
            <el-col :span="16">
              <el-form-item label="注销登记号" prop="" required style="width: 100%">
                <div class="inpoutBox">
                  <el-input class="input1" v-model="formYear" placeholder="请输入" clearable disabled />
                  <el-input class="input2" v-model="formNo" placeholder="请输入" clearable disabled />
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="注销日期" prop="flowTime" style="width: 100%">
                <el-input v-model="form.flowTime" placeholder="请输入" clearable disabled />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="经手人" prop="handler" style="width: 100%">
                <el-select v-model="form.handler" filterable clearable remote reserve-keyword allow-create
                  suffix-icon="User" placeholder="请输入" remote-show-suffix :remote-method="getListUser"
                  :loading="options_info.loading" class="userSelect">
                  <el-option v-for="item in options_info.options_user" :key="item.userId" :label="item.userName"
                    :value="item.userName" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="负责人" prop="director" style="width: 100%">
                <el-select v-model="form.director" filterable clearable remote reserve-keyword allow-create
                  suffix-icon="User" placeholder="请输入" remote-show-suffix :remote-method="getListUser"
                  :loading="options_info.loading" class="userSelect">
                  <el-option v-for="item in options_info.options_user" :key="item.userId" :label="item.userName"
                    :value="item.userName" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审批人" prop="approvalName" style="width: 100%">
                <el-select v-model="form.approvalName" filterable clearable remote reserve-keyword allow-create
                  suffix-icon="User" placeholder="请输入" remote-show-suffix :remote-method="getListUser"
                  :loading="options_info.loading" class="userSelect">
                  <el-option v-for="item in options_info.options_user" :key="item.userId" :label="item.userName"
                    :value="item.userName" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="审批单位" prop="approvalUnit" style="width: 100%">
                <el-input v-model="form.approvalUnit" placeholder="请输入" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="批准文号" prop="approvalNo" style="width: 100%">
                <el-input v-model="form.approvalNo" placeholder="请输入" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="上传附件" prop="attachment">
                <file-upload v-model="form.attachment" uploadUrl="/heritage/file/upload/common" :is-show-tip="false" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane name="1" label="选择注销藏品">
        <SelectRelices @on-select="handleSelectReLices" />
      </el-tab-pane>
    </el-tabs>

    <template #footer>
      <div class="dialog-footer">
        <el-space :size="40">
          <el-button class="button-c-sure" type="primary" @click="handleSave"
            v-show="activeTabName == '1'">确定</el-button>
          <el-button class="button-p-cancel" @click="handleCancel" v-show="activeTabName == '1'"> 取消 </el-button>
          <el-button class="button-c-sure" type="primary" @click="handleNext"
            v-show="activeTabName == '0'">下一步</el-button>
        </el-space>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ElMessage } from 'element-plus'

import SelectRelices from '@/components/comm-cpns/select-relices/select-relices.vue'

import { getLabel } from '@/utils/comm-util/getLabel.js'

import { listUser } from '@/api/system/user'
import { getWirteOffNo, addWirteOff, saveWirteOffRelics, updateWirteOff, delWirteOff } from '@/api/workManage/writeOff'

const props = defineProps({
  rowObj: {
    type: Object,
    default: () => ({})
  }
})

const emits = defineEmits(['handleCloseDialogAddOrEdit'])

const open = ref(true)

const activeTabName = ref('0')

let formYear = ref('')
let formNo = ref('')
const form = reactive({})
const rules = reactive({})

watch(
  () => props.rowObj,
  val => {
    if (val) {
      val['flowTime'] = val['flowTime']?.substr(0, 10)
      Object?.keys(val).forEach(key => {
        form[key] = val[key]
      })
      if (val['id']) {
        formYear.value = val['flowNo']?.substr(0, 4)
        formNo.value = val['flowNo']?.substr(4)
      } else {
        getFlowNo()
      }
    }
  },
  {
    deep: false,
    immediate: true
  }
)

// 获取注销号
function getFlowNo() {
  getWirteOffNo().then(res => {
    formYear.value = res?.yearNo ?? ''
    formNo.value = res?.no ?? ''
    form['flowTime'] = res?.date.substr(0, 10) ?? ''
    form['flowNo'] = formYear.value + formNo.value
  })
}

// 新增注销流程（无关联藏品id）
async function handleNext() {
  // 若需校验才能下一步
  const params = Object.assign({}, form)
  const res = await (params.id ? updateWirteOff(params) : addWirteOff(params))
  activeTabName.value = '1'
}

// 选择藏品
const relicesChosen = ref([])
function handleSelectReLices(selection) {
  relicesChosen.value = selection.map(item => item.id)
}

// 暂存关联藏品（flowNo=flowId）

function handleSave() {
  const params = { relicsIds: relicesChosen.value, flowId: form.flowNo }
  saveWirteOffRelics(params).then(res => {
    ElMessage.success('提交成功')
    emits('handleCloseDialogAddOrEdit')
  })
}

function handleCancel() {
  emits('handleCloseDialogAddOrEdit')
}

// options
const options_info = reactive({
  loading: false,
  options_user: []
})
async function getListUser(userName = '') {
  options_info.loading = true
  const res = await listUser({ pageNum: 1, pageSize: 999, userName })
  options_info.options_user = res.rows ?? []
  options_info.loading = false
}
getListUser()
</script>

<style lang="scss" scoped>
.el-scrollbar {

  //box-sizing: border-box;
  :deep(.el-scrollbar__bar.is-horizontal) {
    height: 0;
    width: 0;
  }
}

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
</style>
