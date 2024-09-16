<template>
  <el-dialog title="选择提用藏品" v-model="visible" width="1200px" append-to-body @close="hide" align-center
    :show-close="false">
    <el-table border ref="tableRef" height="525" :data="list" :row-key="getRowKey" v-loading="listLoading"
      @selection-change="onSelectChange">
      <el-table-column type="selection" width="55" align="center" :reserve-selection="true" />
      <el-table-column label="藏品登记号" align="center" prop="relicsId" />
      <el-table-column label="藏品名称" align="center" prop="relicName" />
      <el-table-column label="文物类别" align="center" prop="relicCategory">
        <!-- <template #default="{ row }">
          <dict-tag :options="artifact_type" :value="row.relicCategory" />
        </template> -->
      </el-table-column>
      <el-table-column label="文物级别" align="center" prop="relicLevel">
        <!-- <template #default="{ row }">
          <dict-tag :options="artifact_level" :value="row.relicLevel" />
        </template> -->
      </el-table-column>
      <el-table-column label="文物年代" align="center" prop="relicYear">
        <!-- <template #default="{ row }">
          {{ getFormatText(years, row.relicYears) }}
        </template> -->
      </el-table-column>
      <el-table-column label="文物图片" align="center" prop="relicPath">
        <template #default="{ row }">
          <image-preview :width="50" :height="50" :src="row.relicPath" />
        </template>
      </el-table-column>
    </el-table>
    <div class="flex justify-between">
      <div class="p-y-4 text-md">
        已选择 <b>{{ selectedCount }}</b> 项
      </div>
      <pagination v-show="page.total > 0" :autoScroll="false" :total="page.total" v-model:page="page.currentPage"
        v-model:limit="page.pageSize" @pagination="onPageChange" />
    </div>
    <div class="h-5"></div>
    <template #footer>
      <div class="dialog-footer">
        <el-button class="button-c-sure" type="primary" @click="onSubmit">确 定</el-button>
        <el-button class="button-p-cancel" @click="hide">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { outManageRelicsPage } from '@/api/warehouse/index'
import { useTable } from '@/hooks/useTable'
import { useDialog } from '@/hooks/useDialog'

const { proxy } = getCurrentInstance()
const { artifact_level } = proxy.useDict('artifact_level')
const { artifact_type } = proxy.useDict('artifact_type')

const { years } = proxy.useDict('years')
function getFormatText(list, value) {
  if (!list?.length) return '';
  const item = list.find(v => v.code === Number(value))
  return item?.label || '-'
}

const tableRef = ref()
const getRowKey = row => row.relicsId

const { visible } = useDialog()

const selectedList = ref([])

const selectedCount = computed(() => selectedList.value.length)

async function show(list = []) {
  selectedList.value = list
  visible.value = true
  await nextTick()
  setDefaultSelect()
}

function setDefaultSelect() {
  selectedList.value.forEach(v => {
    console.log('setDefaultSelect')
    console.log(v)
    tableRef.value.toggleRowSelection(v, true)
  })
}

const queryAction = page => {
  return outManageRelicsPage({
    pageNum: page.currentPage,
    pageSize: page.pageSize
  }).then(data => {
    return {
      list: data.records,
      total: data.total
    }
  })
}

function onSelectChange(v) {
  selectedList.value = v
}

function onSubmit() {
  if (selectedCount.value === 0) {
    proxy.$modal.msgWarning('请至少选择1个藏品')
    return
  }
  emits('ok', selectedList.value)
  hide()
}

const { page, onPageChange, list, listLoading, onSearch, queryList } = useTable({ queryAction, pageSize: 5 })
const emits = defineEmits(['ok'])
onMounted(() => {
  queryList()
})

function clear() {
  tableRef.value.clearSelection()
}

function hide() {
  visible.value = false
  clear()
}

defineExpose({
  refresh: onSearch,
  init: queryAction,
  clear,
  show,
  hide
})
</script>

<style lang="scss" scoped></style>
