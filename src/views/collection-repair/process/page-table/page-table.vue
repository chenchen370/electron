<template>
  <div>
    <el-table v-loading="loading" :data="tableList" @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" type="index" width="60" />

      <el-table-column label="修复档案路径" align="center" prop="documentUrl" width="160" :show-overflow-tooltip="true">
        <template #default="scope">
          <a :href="scope.row.documentUrl" target="_blank">
            {{ scope.row.documentUrl }}
          </a>
        </template>
      </el-table-column>

      <el-table-column label="修复分类" align="center" prop="repairId" width="110">
        <template #default="scope">
          {{ getLabel(props.optionsInfo.options_repair, scope.row['repairId'], 'id', 'relicName') }}
        </template>
      </el-table-column>

      <el-table-column label="修复材料" align="center" prop="repairMaterial" width="110">
        <template #default="scope">
          {{ getLabel(props.optionsInfo.options_repair_material, scope.row['repairMaterial'], 'id', 'materialName') }}
        </template>
      </el-table-column>

      <el-table-column label="修复人员" align="center" prop="repairUser" width="110" />

      <el-table-column label="修复日期" align="center" prop="repairTime" width="160">
        <template #default="scope">
          {{ formatDate(scope.row.repairTime) }}
        </template>
      </el-table-column>

      <el-table-column label="修复地点" align="center" prop="repairPlace" width="110" />

      <el-table-column label="修复工具" align="center" prop="repairTool" width="110" />

      <el-table-column label="影像资料" align="center" prop="imageData" width="110">
        <template #default="scope">
          <ImagePreview :width="50" :height="50" :src="scope.row.imageData" />
        </template>
      </el-table-column>

      <el-table-column label="实施条件" align="center" prop="implementationConditions" width="90" />

      <el-table-column label="技术手段" align="center" prop="technicalMeans" width="110" />

      <el-table-column label="技术环节" align="center" prop="technicalAspects" width="90" />

      <el-table-column label="工作内容描述" align="center" prop="repairContentDesc" width="125" />

      <el-table-column label="备注" align="center" prop="remark" />

      <el-table-column label="操作" align="center" width="150" fixed="right" class-name="small-padding fixed-width">
        <template #default="scope">
          <comm-handle-btn-table icon-name="EditPen" @handle-table-btn="handleRowUpdate(scope.row)" v-hasPermi="['collection-repair:process:update']" />
          <comm-handle-btn-table icon-name="Delete" @handle-table-btn="handleRowDelete(scope.row)" v-hasPermi="['collection-repair:process:delete']" />
          <comm-handle-btn-table icon-name="View" @handle-table-btn="handleRowDetail(scope.row)" v-hasPermi="['collection-repair:process:check']" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from '@/utils'
import type { TDetailList } from '@/components/comm-cpns/dialog-detail/type.ts'
import type { IPropsFrom } from '../type.ts'
import { getLabel } from '@/utils/comm-util/getLabel.js'
import CommHandleBtnTable from '@/components/comm-cpns/comm-handle-btn-table/comm-handle-btn-table.vue'

interface IProps {
  loading: boolean
  tableList: Array<any>
  optionsInfo?: any
}

const props = withDefaults(defineProps<IProps>(), {
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
    { type: 'link', name: '修复档案路径', value: row['documentUrl'] },
    {
      type: 'text',
      name: '修复分类',
      value: getLabel(props.optionsInfo.options_repair, row['repairId'], 'id', 'relicName')
    },
    {
      type: 'text',
      name: '修复材料',
      value: getLabel(props.optionsInfo.options_repair_material, row['repairMaterial'], 'id', 'materialName')
    },
    { type: 'image', name: '修复人员', value: row['repairUser'] },
    { type: 'time', name: '修复日期', value: row['repairTime'] },
    { type: 'text', name: '修复地点', value: row['repairPlace'] },
    { type: 'text', name: '修复工具', value: row['repairTool'] },

    { type: 'image', name: '影像资料', value: row['imageData'] },

    { type: 'text', name: '实施条件', value: row['implementationConditions'] },
    { type: 'text', name: '技术手段', value: row['technicalMeans'] },
    { type: 'text', name: '技术环节', value: row['technicalAspects'] },
    { type: 'text', name: '工作内容描述', value: row['repairContentDesc'] },

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
