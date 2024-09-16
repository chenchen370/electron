<template>
  <div>
    <el-table v-loading="loading" :data="tableList" @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" type="index" width="60" />
      <el-table-column label="博物馆名称" align="center" prop="museumName" />
      <el-table-column label="国家" align="center" prop="country" />
      <el-table-column label="省份" align="center" prop="provinces" />
      <el-table-column label="市" align="center" prop="cities" />
      <el-table-column label="区" align="center" prop="districts" />
      <el-table-column label="街道" align="center" prop="street" />
      <el-table-column label="经度" align="center" prop="latitude" />
      <el-table-column label="维度" align="center" prop="longitude" />
      <el-table-column label="操作" align="center" width="150" fixed="right" class-name="small-padding fixed-width">
        <template #default="scope">
          <comm-handle-btn-table icon-name="EditPen" @handle-table-btn="handleRowUpdate(scope.row)" v-hasPermi="['collection:museum-information:update']" />
          <comm-handle-btn-table icon-name="Delete" @handle-table-btn="handleRowDelete(scope.row)" v-hasPermi="['collection:museum-information:delete']" />
          <comm-handle-btn-table icon-name="View" @handle-table-btn="handleRowDetail(scope.row)" v-hasPermi="['collection:museum-information:check']" />
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
    { type: 'text', name: '博物馆名称', value: row['museumName'] },
    { type: 'text', name: '国家', value: row['country'] },
    { type: 'text', name: '省份', value: row['provinces'] },
    { type: 'text', name: '市', value: row['cities'] },
    { type: 'text', name: '区', value: row['districts'] },
    { type: 'text', name: '街道', value: row['street'] },
    { type: 'text', name: '经度', value: row['latitude'] },
    { type: 'text', name: '维度', value: row['longitude'] }
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
