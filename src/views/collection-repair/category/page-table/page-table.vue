<template>
  <div>
    <el-table border v-loading="loading" :data="tableList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" type="index" width="60" />

      <el-table-column label="文物类别" align="center" prop="relicCategory" width="100">
        <template #default="scope">
          {{ getLabel(props.optionsInfo.options_artifact_type, scope.row['relicCategory'], 'value', 'label') }}
        </template>
      </el-table-column>

      <el-table-column label="文物级别" align="center" prop="relicLevel" width="100">
        <template #default="scope">
          {{ getLabel(props.optionsInfo.options_artifact_level, scope.row['relicLevel'], 'value', 'label') }}
        </template>
      </el-table-column>

      <el-table-column label="文物来源" align="center" prop="relicFrom" width="100" />

      <el-table-column label="文物登记号" align="center" prop="relicId" width="110" />

      <el-table-column label="文物图片" align="center" prop="relicImg" width="90">
        <template #default="scope">
          <ImagePreview :width="50" :height="50" :src="scope.row.relicImg" />
        </template>
      </el-table-column>

      <el-table-column label="文物存在问题" align="center" prop="relicProblem" width="125" />

      <el-table-column label="文物修复状态" align="center" prop="relicState" width="125">
        <template #default="scope">
          <template v-if="scope.row.relicState == '0'">
            <el-tag type="warning">
              {{ getLabel(props.optionsInfo.options_relic_state, scope.row['relicState'], 'value', 'label') }}
            </el-tag>
          </template>

          <template v-if="scope.row.relicState == '1'">
            <el-tag type="success">
              {{ getLabel(props.optionsInfo.options_relic_state, scope.row['relicState'], 'value', 'label') }}
            </el-tag>
          </template>

          <template v-if="scope.row.relicState == '2'">
            <el-tag type="info">
              {{ getLabel(props.optionsInfo.options_relic_state, scope.row['relicState'], 'value', 'label') }}
            </el-tag>
          </template>
        </template>
      </el-table-column>

      <el-table-column label="具体年代" align="center" prop="relicYearsDetail" width="100" />

      <el-table-column label="藏品名称" align="center" prop="relicName" width="100" />

      <el-table-column label="藏品材质" align="center" prop="relicMaterial" width="100" />

      <el-table-column label="收藏单位" align="center" prop="collectionUnit" width="100" />

      <el-table-column label="保护修复单位" align="center" prop="protectionRepairUnit" width="125" />

      <el-table-column label="批准单位名称" align="center" prop="ratifyUnitName" width="125" />

      <el-table-column label="批准文号" align="center" prop="ratifyNum" width="100" />

      <el-table-column label="方案设计单位" align="center" prop="schemeDesignUnit" width="125" />

      <el-table-column label="方案名称" align="center" prop="schemeName" width="100" />

      <el-table-column label="方案编号" align="center" prop="schemeCode" width="100" />

      <el-table-column label="工时" align="center" prop="workingHours" />

      <el-table-column label="周期" align="center" prop="cycle" />

      <el-table-column label="提取经办人" align="center" prop="extractUserName" width="110" />

      <el-table-column label="提取日期" align="center" prop="extractTime" width="120">
        <template #default="scope">
          {{ formatDate(scope.row.extractTime) }}
        </template>
      </el-table-column>

      <el-table-column label="返还经办人" align="center" prop="returnUserName" width="110" />

      <el-table-column label="返还日期" align="center" prop="returnTime" width="160">
        <template #default="scope">
          {{ formatDate(scope.row.returnTime) }}
        </template>
      </el-table-column>

      <el-table-column label="备注" align="center" prop="remark" />

      <el-table-column label="操作" align="center" width="150" fixed="right" class-name="small-padding fixed-width">
        <template #default="scope">
          <comm-handle-btn-table icon-name="EditPen" @handle-table-btn="handleRowUpdate(scope.row)" v-hasPermi="['collection-repair:category:update']" />
          <comm-handle-btn-table icon-name="Delete" @handle-table-btn="handleRowDelete(scope.row)" v-hasPermi="['collection-repair:category:delete']" />
          <comm-handle-btn-table icon-name="View" @handle-table-btn="handleRowDetail(scope.row)" v-hasPermi="['collection-repair:category:check']" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import type { TDetailList } from '@/components/comm-cpns/dialog-detail/type.ts'
import type { IPropsFrom } from '../type.ts'

import { formatDate } from '@/utils'
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
    { type: 'text', name: '收藏单位', value: row['collectionUnit'] },
    { type: 'text', name: '提取经办人', value: row['extractUserName'] },
    { type: 'time', name: '提取日期', value: row['extractTime'] },
    { type: 'text', name: '保护修复单位', value: row['protectionRepairUnit'] },
    { type: 'text', name: '批准文号', value: row['ratifyNum'] },
    { type: 'text', name: '批准单位名称', value: row['ratifyUnitName'] },
    {
      type: 'text',
      name: '文物类别',
      value: getLabel(props.optionsInfo.options_artifact_type, row['relicCategory'], 'value', 'label')
    },
    { type: 'text', name: '文物来源', value: row['relicFrom'] },
    { type: 'text', name: '文物登记号', value: row['relicId'] },
    { type: 'image', name: '文物图片', value: row['relicImg'] },
    {
      type: 'text',
      name: '文物级别',
      value: getLabel(props.optionsInfo.options_artifact_level, row['relicLevel'], 'value', 'label')
    },
    { type: 'text', name: '藏品材质', value: row['relicMaterial'] },
    { type: 'text', name: '藏品名称', value: row['relicName'] },
    { type: 'text', name: '文物存在问题', value: row['relicProblem'] },
    {
      type: 'tag',
      name: '文物修复状态',
      value: getLabel(props.optionsInfo.options_relic_state, row['relicState'], 'value', 'label'),
      tagType: row.relicState == '0' ? 'warning' : row.relicState == '1' ? 'success' : row.relicState == '2' ? 'info' : ''
    },
    { type: 'text', name: '具体年代', value: row['relicYearsDetail'] },
    { type: 'text', name: '返还经办人', value: row['returnUserName'] },
    { type: 'time', name: '返还日期', value: row['returnTime'] },
    { type: 'text', name: '方案编号', value: row['schemeCode'] },
    { type: 'text', name: '方案设计单位', value: row['schemeDesignUnit'] },
    { type: 'text', name: '工时', value: row['workingHours'] },
    { type: 'text', name: '周期', value: row['cycle'] },
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
