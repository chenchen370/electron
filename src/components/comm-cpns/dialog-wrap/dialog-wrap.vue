<template>
  <el-dialog v-model="isOpen" title="Warning" :width="width ?? '30%'" :before-close="handleCancelClick" align-center
    :show-close="false">
    <div>
      <slot name="dialogContent"></slot>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button v-if="isShowCancelBtn" class="button-c-sure" type="primary" @click="handleSureClick">确 定</el-button>
        <el-button v-if="isShowSureBtn" class="button-p-cancel" @click="handleCancelClick">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
// 0.定义props
interface IProp {
  width: string
  isShowCancelBtn?: boolean
  isShowSureBtn?: boolean
}
withDefaults(defineProps<IProp>(), {
  width: '',
  isShowCancelBtn: true,
  isShowSureBtn: true
})
// 定义自定义事件
const emits = defineEmits(['handleSureClick', 'handleCancelClick'])

const isOpen = ref(true)
function handleSureClick() {
  emits('handleSureClick')
}
function handleCancelClick() {
  emits('handleCancelClick')
}
</script>

<style scoped></style>
