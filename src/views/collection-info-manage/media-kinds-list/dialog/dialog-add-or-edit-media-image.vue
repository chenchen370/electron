<template>
  <el-dialog class="by-el-dialog" v-model="open" width="640px" append-to-body :before-close="handleCancel" align-center
    :show-close="false">
    <template #header="{ titleId, titleClass }">
      <span class="detail-title">图片编辑</span>
    </template>
    <el-form class="by-form-dialog" ref="thingRef" :model="formData" :rules="rules" label-width="auto"
      label-position="top" size="large">
      <el-checkbox-group v-model="checkboxGroup1">
        <el-checkbox label="Option1" value="Value1" border disabled />
        <el-checkbox label="Option2" value="Value2" border disabled />
      </el-checkbox-group>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-space :size="29">
          <el-button class="button-p-cancel" @click="handleCancel">关闭</el-button>
          <el-button class="button-c-sure" type="primary" @click="handleSure">确定</el-button>
        </el-space>
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
const isReadonly = ref(true)
const formData = reactive({
  mediaType: undefined
})

const checkboxGroup1 = ref(['Value1'])

const rules = {}

const emits = defineEmits(['handleCloseDialogMediaSelect'])

function handleSure() {
  emits('handleCloseDialogMediaSelect')
}

function handleCancel() {
  emits('handleCloseDialogMediaSelect')
}
</script>

<style lang="scss" scoped>
.detail-title {
  font-family: Source Han Serif CN;
  font-size: 16px;
  font-weight: normal;
  line-height: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 0em;
  color: #333333;
}
</style>
