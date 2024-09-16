<template>
  <div>
    <el-table v-loading="loading" :data="tableList" @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" type="index" width="60" />
      <el-table-column label="商品名" align="center" prop="commodityName" />
      <el-table-column label="材料名称" align="center" prop="materialName" />
      <el-table-column label="药剂级别" align="center" prop="drugLevel" width="160" />
      <el-table-column label="主要成分" align="center" prop="mainComponents" />
      <el-table-column label="性能" align="center" prop="mainPerformance" />
      <el-table-column label="配比" align="center" prop="mainProportion" />
      <el-table-column label="生产厂家" align="center" prop="manufacturer" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" width="150" fixed="right" class-name="small-padding fixed-width">
        <template #default="scope">
          <comm-handle-btn-table icon-name="EditPen" @handle-table-btn="handleRowUpdate(scope.row)" v-hasPermi="['collection-repair:material:update']" />
          <comm-handle-btn-table icon-name="Delete" @handle-table-btn="handleRowDelete(scope.row)" v-hasPermi="['collection-repair:material:delete']" />
          <comm-handle-btn-table icon-name="View" @handle-table-btn="handleRowDetail(scope.row)" v-hasPermi="['collection-repair:material:check']" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import type { IPropsFrom } from '../type.ts'
import type { TDetailList } from '@/components/comm-cpns/dialog-detail/type.ts'
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
    { type: 'text', name: '商品名', value: row['commodityName'] },
    { type: 'text', name: '材料名称', value: row['materialName'] },
    { type: 'text', name: '药剂级别', value: row['drugLevel'] },
    { type: 'text', name: '主要成分', value: row['mainComponents'] },
    { type: 'text', name: '性能', value: row['mainPerformance'] },
    { type: 'text', name: '配比', value: row['mainProportion'] },
    { type: 'text', name: '生产厂家', value: row['manufacturer'] }
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
