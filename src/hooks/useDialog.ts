import { ref } from 'vue'
import type { FormInstance } from 'element-plus'

export function useDialog() {
  const visible = ref(false)
  const initLoading = ref(false)
  const submitLoading = ref(false)
  const isEdit = ref(false)
  const formRef = ref<FormInstance>()

  async function validate() {
    if (!formRef.value) return
    return await formRef.value.validate()
  }

  function resetForm() {
    formRef.value?.resetFields()
  }

  function hide() {
    visible.value = false
  }

  return {
    formRef,
    isEdit,
    visible,
    initLoading,
    submitLoading,
    validate,
    resetForm,
    hide
  }
}
