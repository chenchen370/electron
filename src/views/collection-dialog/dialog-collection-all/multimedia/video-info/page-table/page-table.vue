<template>
  <div>
    <el-table v-loading="loading" :data="tableList" @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" type="index" width="60" />
      <el-table-column label="视频" align="center" prop="relicPath" width="90">
        <template #default="scope">
          <video style="width: 50px; height: 50px" :src="scope.row.relicPath" />
        </template>
      </el-table-column>
      <el-table-column label="文件名称" align="center" prop="mediaName" />
      <el-table-column label="上传时间" align="center" prop="createTime">
        <template #default="scope">
          {{ parseTime(scope.row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="150" fixed="right" class-name="small-padding fixed-width">
        <template #default="scope">
          <comm-handle-btn-table icon-name="View" @handle-table-btn="handleRowDetail(scope.row)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import CommHandleBtnTable from '@/components/comm-cpns/comm-handle-btn-table/comm-handle-btn-table.vue'
import { parseTime } from '@/utils/zhebo'

defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  tableList: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['handleSelectionChange', 'handleRowUpdate', 'handleRowDelete', 'handleRowDetail'])

function handleSelectionChange(selection) {
  emits('handleSelectionChange', selection)
}

function handleRowUpdate(row) {
  emits('handleRowUpdate', row)
}

function handleRowDelete(row) {
  emits('handleRowDelete', [row.id])
}

function handleRowDetail(row) {
  const list = [
    { type: 'text', name: '视频', value: row['relicPath'] },
    { type: 'text', name: '文件名称', value: row['mediaName'] },
    { type: 'text', name: '上传时间', value: parseTime(row.createTime) }
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
