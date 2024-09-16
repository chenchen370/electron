<template>
  <el-dialog class="coder-wang-dialog" v-model="open" width="760px" append-to-body
    :before-close="handleCancel" align-center :show-close="false">
    <div>
      <div class="cont">
        <p>默认为该审核记录中全部多媒体记录，是否确认 全部审核 {{ approvalResult == 'agree' ? '通过' : '拒绝' }}！</p>
      </div>

      <el-form class="coder-wang-form" ref="thingRef" :model="formData" :rules="rules" label-width="auto"
        label-position="top" size="large">
        <el-form-item label="审核意见" prop="approvalRemark">
          <el-input v-model="formData.approvalRemark" type="textarea" :rows="4" placeholder="请输入审核意见" clearable />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button class="button-c-sure" style="margin-right: 28px" type="primary" @click="handleSure">确定</el-button>
        <el-button class="button-p-cancel" @click="handleCancel">关闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
const props = defineProps({
  rowObj: {
    type: Object,
    default: () => ({})
  },
  approvalResult: {
    type: String,
    default: '' // agree 通过 refuse 拒绝
  }
})

const formData = reactive({
  approvalRemark: undefined, // 审核意见
  approvalResult: undefined
})
const rules = {}
const open = ref(true)

const emits = defineEmits(['handleCloseAuditAll'])

function handleSure() {
  formData.approvalResult = props.approvalResult
  emits('handleCloseAuditAll', 1, formData)
}

function handleCancel() {
  emits('handleCloseAuditAll')
}
</script>

<style lang="scss" scoped>
.cont {
  width: 100%;
  font-family: Source Han Serif CN;
  font-size: 26px;
  font-weight: normal;
  line-height: 60px;
  text-align: center;
  letter-spacing: 0em;

  font-variation-settings: 'opsz';
  font-feature-settings: 'kern';
  color: #3d3d3d;

  display: flex;
  align-items: center;
}
</style>
