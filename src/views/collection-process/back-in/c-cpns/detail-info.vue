<template>
  <el-descriptions title="基本提用信息" :column="3" style="--el-fill-color-blank: transparent">
    <el-descriptions-item label="提用去向">
      <dict-tag :options="out_type" :value="data.outType" className="inline-block" />
    </el-descriptions-item>
    <el-descriptions-item label="提用类型">
      <dict-tag :options="application_type" :value="data.applicationType" className="inline-block" />
    </el-descriptions-item>
    <el-descriptions-item label="提用登记号">{{ data.flowNo }}</el-descriptions-item>
    <el-descriptions-item label="提用日期"> {{ data.carryTime }} </el-descriptions-item>
    <el-descriptions-item label="提用人"> {{ data.carryPerson }} </el-descriptions-item>
    <el-descriptions-item label="提用负责人"> {{ data.carryRespon }} </el-descriptions-item>
    <el-descriptions-item label="证明人"> {{ data.witness }} </el-descriptions-item>
    <el-descriptions-item label="审批单位"> {{ data.approvalUnit }} </el-descriptions-item>
    <el-descriptions-item label="审批人"> {{ data.approvalName }} </el-descriptions-item>
    <el-descriptions-item label="批准文号"> {{ data.approvalNumber }} </el-descriptions-item>
    <el-descriptions-item label="合同号"> {{ data.contractNumber }} </el-descriptions-item>
  </el-descriptions>
  <el-descriptions title="提用详细信息" :column="3" style="--el-fill-color-blank: transparent">
    <template v-if="data.applicationType === '1'">
      <el-descriptions-item label="展览类型">
        <dict-tag :options="exhibition_type" :value="data.exhibitionType" className="inline-block" />
      </el-descriptions-item>
      <el-descriptions-item label="选择展览名称">{{ data.exhibitionName }}</el-descriptions-item>
      <el-descriptions-item label="展览时间">{{ data.endDate }}</el-descriptions-item>
      <el-descriptions-item label="展览组织机构">{{ data.exhibitionOrg }}</el-descriptions-item>
      <el-descriptions-item label="展览举办地点">{{ data.location }}</el-descriptions-item>
      <el-descriptions-item label="借展单位">{{ data.borrowDep }}</el-descriptions-item>
      <el-descriptions-item label="批准机构">{{ data.approvalUnit }}</el-descriptions-item>
      <el-descriptions-item label="批文号">{{ data.approvalNumber }}</el-descriptions-item>
    </template>
    <template v-if="data.applicationType === '2'">
      <el-descriptions-item label="修复时间">{{ data.endDate }}</el-descriptions-item>
      <el-descriptions-item label="承担机构">{{ data.fixDep }}</el-descriptions-item>
      <el-descriptions-item label="修复人">{{ data.fixer }}</el-descriptions-item>
      <el-descriptions-item label="修复地点">{{ data.location }}</el-descriptions-item>
      <el-descriptions-item label="修复原因">{{ data.fixReason }}</el-descriptions-item>
      <el-descriptions-item label="修复情况及结果">{{ data.fixResult }}</el-descriptions-item>
    </template>
    <el-descriptions-item label="移动原因">{{ data.moveReason }}</el-descriptions-item>
    <el-descriptions-item label="移动时间">{{ data.endDate }}</el-descriptions-item>
    <el-descriptions-item label="移动目的地">{{ data.location }}</el-descriptions-item>
    <el-descriptions-item label="区域详细地址"> {{ data.areaAddress }} </el-descriptions-item>
    <el-descriptions-item label="执行单位"> {{ data.executeDep }} </el-descriptions-item>
    <el-descriptions-item label="具体事由"> {{ data.specificReasons }} </el-descriptions-item>
    <el-descriptions-item label="备注"> {{ data.comment }} </el-descriptions-item>
  </el-descriptions>
</template>

<script setup>
const { proxy } = getCurrentInstance();
const { out_type } = proxy.useDict('out_type')
const { application_type } = proxy.useDict('application_type')
const { exhibition_type } = proxy.useDict('exhibition_type')

defineProps({
  data: {
    type: Object,
    default: () => {
      return {}
    }
  }
})
</script>

<style></style>
