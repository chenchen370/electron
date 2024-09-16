<template>
  <div>
    <el-table v-loading="loading" :data="tableList" @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" type="index" width="60" />
      <el-table-column label="著录出版时间" align="center" prop="recordPublishTime">
        <template #default="scope">
          {{ parseTime(scope.row.recordPublishTime) }}
        </template>
      </el-table-column>
      <el-table-column label="研究论著类型" align="center" prop="typesResearchPapers">
        <template #default="scope">
          {{ getLabel(optionsInfo.options_research_papers_type, scope.row.typesResearchPapers) }}
        </template>
      </el-table-column>
      <el-table-column label="研究论著题名" align="center" prop="titleResearchPapers" />
      <el-table-column label="作者" align="center" prop="author" />
      <el-table-column label="出版机构及书名" align="center" prop="publishInstitutionBookTitle" />
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
import { getLabel } from '@/utils/comm-util/getLabel'
import optionsInfo from '@/views/collection-info-manage/media-kinds-list/dialog/options-study'

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
    { type: 'text', name: '著录出版时间', value: parseTime(row.recordPublishTime) },
    { type: 'text', name: '研究论著类型', value: getLabel(optionsInfo.options_research_papers_type, row.typesResearchPapers) },
    { type: 'text', name: '研究论著题名', value: row['titleResearchPapers'] },
    { type: 'text', name: '作者', value: row['author'] },
    { type: 'text', name: '出版机构及书名', value: row['publishInstitutionBookTitle'] }
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
