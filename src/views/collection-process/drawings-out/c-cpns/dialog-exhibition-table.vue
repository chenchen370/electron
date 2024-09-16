<template>
  <el-dialog title="选择展览" v-model="visible" width="1200px" append-to-body @close="hide" align-center
    :show-close="false">
    <el-table border ref="tableRef" max-height="600" :data="list" :row-key="getRowKey" v-loading="listLoading">
      <el-table-column label="序号" type="index" align="center" width="55" />
      <el-table-column label="展览名称" align="center" prop="exhibitionName" />
      <el-table-column label="展览类型" align="center" prop="exhibitionType">
        <template #default="{ row }">
          {{ getLabel(options.exhibition_type, row.exhibitionType) }}
        </template>
      </el-table-column>
      <el-table-column label="所在展厅" align="center" prop="houseName" />
      <!-- <el-table-column label="监测数据" align="center" prop="exhibitionVenue" /> -->
      <el-table-column label="展览起止时间" align="center" prop="" width="200">
        <template #default="{ row }">
          {{ parseTime(row.exhibitionStartTime, '{y}.{m}.{d}') }} ~ {{ parseTime(row.exhibitionEndTime, '{y}.{m}.{d}')
          }}
        </template>
      </el-table-column>
      <el-table-column label="展览主题" align="center" prop="exhibitionTheme" />
      <el-table-column label="操作" fixed="right" align="center" width="90" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" title="选择" @click="onSelect(scope.row)">选择</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex justify-between">
      <div></div>
      <pagination v-show="page.total > 0" :autoScroll="false" :total="page.total" v-model:page="page.currentPage"
        v-model:limit="page.pageSize" @pagination="onPageChange" />
    </div>
    <div class="h-5"></div>
  </el-dialog>
</template>

<script setup>
import { parseTime } from '@/utils/zhebo'
import { exhibitionManagePage } from '@/api/warehouse/index'
import { useTable } from '@/hooks/useTable'
import { useDialog } from '@/hooks/useDialog'
import { getLabel } from '@/utils/comm-util/getLabel';

defineProps({
  options: {
    type: Object,
    default: () => { }
  }
})

onMounted(() => {
  queryList()
})

// @ts-ignore
const tableRef = ref()
const getRowKey = (row) => row.relicsId
const { visible } = useDialog()
const selected = ref()
async function show(list = []) {
  selected.value = list
  visible.value = true
  await nextTick()
}

const queryAction = (page) => {
  return exhibitionManagePage({
    pageNum: page.currentPage,
    pageSize: page.pageSize
  }).then((data) => {
    console.log('queryExhibitionListPage')
    console.log(data)
    return {
      list: data.data.records,
      total: data.data.total
    }
  })
}

function onSelect(v) {
  emits('ok', v)
  hide()
}

const { page, onPageChange, list, listLoading, onSearch, queryList } = useTable({ queryAction, pageSize: 5 })
const emits = defineEmits(['ok'])


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
