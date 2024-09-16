<template>
  <el-dialog class="coder-wang-dialog" :title="title" v-model="open" width="600px" append-to-body
    :before-close="handleCancel" align-center :show-close="false">
    <el-form class="coder-wang-form" ref="thingRef" :model="formData" label-width="auto" label-position="top"
      size="large">
      <el-form-item label="" prop="relicName">
        <el-row :span="24" style="margin-top: 20px">
          <el-radio-group v-model="formData.exportVal">
            <el-col :span="10" :offset="2" v-for="(item, index) in mediaList">
              <el-radio :label="item.value">
                {{ item.name }}
              </el-radio>
            </el-col>
          </el-radio-group>
        </el-row>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button class="button-p-cancel" @click="handleCancel" style="margin-right: 20px">返回</el-button>
        <el-button class="button-c-sure" type="primary" @click="handleExport">导出</el-button>
      </div>
    </template>

    <dialog-export-table v-if="isShowDialogExportTable" :table-list="tableList"
      @handle-close-dialog-export-table="handleCloseDialogExportTable" />
  </el-dialog>
</template>

<script setup>
import CommHandleBtn from '@/components/comm-cpns/comm-handle-btn/comm-handle-btn.vue'
import { exportDangAn, exportDengJiKa, exportDongTaiImage, exportList, exportYiPu, exportYiPuAll, exportZongZhang } from '@/api/collection-info-query/thing'
import DialogExportTable from '@/views/collection-info-query/dialog/dialog-export-table.vue'

const { proxy } = getCurrentInstance()
const props = defineProps({
  ids: {
    type: Array,
    default: () => []
  }
})
const title = ref('导出')
const open = ref(true)
const tableList = ref([])
const isShowDialogExportTable = ref(false)
const formData = reactive({
  exportVal: undefined
})

const mediaList = [
  { name: '藏品档案', value: 'dang-an' },
  { name: '藏品列表', value: 'list' },
  { name: '藏品总账数据', value: 'zong-zhang' },
  { name: '动态藏品列表图片数据', value: 'dong-tai-image' },
  { name: '文物登记卡', value: 'deng-ji-ka' },
  { name: '一普全部数据', value: 'yi-pu-all' },
  { name: '一普数据', value: 'yi-pu' }
]

const emits = defineEmits(['handleCloseDialogExport'])
async function handleExport(code) {
  if (props.ids.length === 0) return proxy?.$modal.msgError('请先选择藏品')
  let res
  switch (formData.exportVal) {
    case 'dang-an':
      res = await exportDangAn(props.ids.join(','))
      break
    case 'list':
      res = await exportList(props.ids.join(','))
      break
    case 'zong-zhang':
      res = await exportZongZhang(props.ids.join(','))
      break
    case 'dong-tai-image':
      res = await exportDongTaiImage(props.ids.join(','))
      break
    case 'deng-ji-ka':
      res = await exportDengJiKa(props.ids.join(','))
      break
    case 'yi-pu-all':
      res = await exportYiPuAll(ids.value.join(','))
      break
    case 'yi-pu':
      res = await exportYiPu(ids.value.join(','))
      break
  }

  console.log('res =======>', res)
  if (res?.data && res?.data?.id) {
    res.data.code = code
    tableList.value = [res.data]
    isShowDialogExportTable.value = true

    // 开启弹窗
  } else {
    proxy?.$modal.msg(res?.msg)
  }
}

function handleCloseDialogExportTable() {
  isShowDialogExportTable.value = false
}

// 取消按钮
function handleCancel() {
  emits('handleCloseDialogExport')
}
</script>

<style lang="scss" scoped></style>
