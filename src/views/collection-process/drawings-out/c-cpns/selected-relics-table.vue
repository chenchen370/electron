<template>
  <el-table :data="list" height="500" border size="small" rowKey="relicsId">
    <el-table-column label="序号" type="index" width="50" />
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
    <el-table-column label="操作" fixed="right" v-if="!onlyShow" align="center" width="110"
      class-name="small-padding fixed-width">
      <template #default="{ row, index }">
        <el-button link type="primary" icon="Delete" title="删除" @click="emits('delete', index)" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup>
import CommHandleBtn from '@/components/comm-cpns/comm-handle-btn/comm-handle-btn.vue'
import { useTable } from '@/hooks/useTable'
import { getFlowRelics, delRelics } from '@/api/flow'
const { proxy } = getCurrentInstance()
const { artifact_level } = proxy.useDict('artifact_level')
const { artifact_type } = proxy.useDict('artifact_type')
const { years } = proxy.useDict('years')

function getFormatText(list, value) {
  if (!list?.length) return '';
  const item = list.find(v => v.code === Number(value))
  return item?.label || '-'
}


defineProps({
  list: {
    type: Array,
    default: () => []
  },
  onlyShow: {
    type: Boolean,
    default: false,
  }
})
const emits = defineEmits('delete')
</script>

<style></style>
