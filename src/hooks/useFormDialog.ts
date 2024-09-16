import { ref } from 'vue'
import type { FormInstance } from 'element-plus'

function isPromise(value: any): value is Promise<any> {
  return value && typeof value.then === 'function'
}

export interface DialogOptions {
  onShow: (data: any) => Promise<any> | any
  onSuccess: (data: any) => void
  onFail?: (err?: any) => void
  onAdd?: () => Promise<any>
  onEdit?: () => Promise<any>
  onOutManageSubmit?: () => Promise<any>
}

export function useFormDialog({ onAdd, onEdit, onSuccess, onFail, onShow ,onOutManageSubmit}: DialogOptions) {
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
    formRef.value?.resetFields()
  }

  function show(data = {} as any, isEditModal = false) {
    visible.value = true
    isEdit.value = isEditModal

    const res = onShow(data)
    if (isPromise(res)) {
      initLoading.value = true
      res.finally(() => {
        initLoading.value = false
      })
    }
  }

  async function onSubmit() {
    const valid = await validate()
    if (!valid) return
    const api = isEdit.value ? onEdit : onAdd
    api?.()
      .then(onSuccess)
      .catch(onFail)
      .finally(() => {
        submitLoading.value = false
      })
  }

  async function onApprove() {
    console.log("onApprove....");
    const valid = await validate()
    if (!valid) return
    const api = onOutManageSubmit
    api?.()
      .then(onSuccess)
      .catch(onFail)
      .finally(() => {
        submitLoading.value = false
      })
  }


  return {
    formRef,
    isEdit,
    visible,
    initLoading,
    submitLoading,
    validate,
    resetForm,
    hide,
    onSubmit,
    show,
    onApprove
  }
}
