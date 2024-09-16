<template>
  <div>
    <el-table v-loading="loading" :data="tableList" @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" type="index" width="60" />
      <el-table-column label="主要功能" align="center" prop="majorFunction" />
      <el-table-column label="生产厂家" align="center" prop="manufacturer" />
      <el-table-column label="产品名" align="center" prop="productName" />
      <el-table-column label="质地" align="center" prop="texture" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" width="150" fixed="right" class-name="small-padding fixed-width">
        <template #default="scope">
          <comm-handle-btn-table icon-name="EditPen" @handle-table-btn="handleRowUpdate(scope.row)" v-hasPermi="['collection-repair:tool:update']" />
          <comm-handle-btn-table icon-name="Delete" @handle-table-btn="handleRowDelete(scope.row)" v-hasPermi="['collection-repair:tool:delete']" />
          <comm-handle-btn-table icon-name="View" @handle-table-btn="handleRowDetail(scope.row)" v-hasPermi="['collection-repair:tool:check']" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import type { TDetailList } from '@/components/comm-cpns/dialog-detail/type.ts'
import type { IPropsFrom } from '../type.ts'
import CommHandleBtnTable from '@/components/comm-cpns/comm-handle-btn-table/comm-handle-btn-table.vue'

interface IProps {
  loading: boolean
  tableList: Array<any>
}

withDefaults(defineProps<IProps>(), {
  loading: false,
  tableList: () => []
})

const emits = defineEmits(['handleSelectionChange', 'handleRowUpdate', 'handleRowDelete', 'handleRowDetail'])

function handleSelectionChange(selection: IPropsFrom[]) {
  emits('handleSelectionChange', selection)
}

function handleRowUpdate(row: IPropsFrom) {
  emits('handleRowUpdate', row)
}

function handleRowDelete(row: IPropsFrom) {
  emits('handleRowDelete', [row.id])
}

function handleRowDetail(row: IPropsFrom) {
  const list: TDetailList = [
    { type: 'text', name: '主要功能', value: row['majorFunction'] },
    { type: 'text', name: '生产厂家', value: row['manufacturer'] },
    { type: 'text', name: '产品名', value: row['productName'] },
    { type: 'text', name: '质地', value: row['texture'] },
    { type: 'text', name: '备注', value: row['remark'] }
  ]
  emits('handleRowDetail', list)
}
</script>

<style scoped lang="scss">
.demo-image__error .image-slot {
  font-size: 30px;
}

.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}

.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
</style>
