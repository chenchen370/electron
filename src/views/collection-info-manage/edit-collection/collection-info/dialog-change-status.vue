<template>
  <el-dialog class="coder-wang-dialog" align-center v-model="open" width="760px" append-to-body
    :before-close="handleCancel">
    <div class="cont">
      <p>确认将当前状态变更为“不在库”吗？</p>
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
  }
})

const open = ref(true)

const emits = defineEmits(['handleCloseDialogChangeStatus'])

function handleSure() {
  emits('handleCloseDialogChangeStatus')
}

function handleCancel() {
  emits('handleCloseDialogChangeStatus')
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
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 0em;

  font-variation-settings: 'opsz';
  font-feature-settings: 'kern';
  color: #3d3d3d;
  display: flex;
  margin-bottom: 50px;
}
</style>
