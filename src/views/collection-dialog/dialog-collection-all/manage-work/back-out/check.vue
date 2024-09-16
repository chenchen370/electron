<template>
  <div
    class="back-out"
    :style="{
      marginTop: handleStatus === 'check' ? '0' : '45px'
    }"
  >
    <el-row class="border-bottom" :span="24">
      <el-col :span="4" class="desc-item border-right"> 核销日期 </el-col>
      <el-col :span="4" class="desc-item border-right"> {{ parseTime(form?.verificationDate ?? '') }} </el-col>
      <el-col :span="4" class="desc-item border-right"> 核销批文 </el-col>
      <el-col :span="4" class="desc-item border-right"> {{ form?.verificationApprovalNumber }}</el-col>
      <el-col :span="4" class="desc-item border-right"> 核销审批人 </el-col>
      <el-col :span="4" class="desc-item"> {{ form?.verificationApprover }} </el-col>
    </el-row>
    <el-row class="border-bottom" :span="24">
      <el-col :span="4" class="desc-item border-right"> 核销原因 </el-col>
      <el-col :span="20" class="desc-item"> {{ form?.reasonVerification }} </el-col>
    </el-row>
    <el-row class="border-bottom" :span="24">
      <el-col :span="4" class="desc-item border-right"> 核销后去向 </el-col>
      <el-col :span="20" class="desc-item"> {{ form?.destinationAfterVerification }} </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { getBackOut } from '@/api/collection-all/manage-work/backout'
import { parseTime } from '@/utils/zhebo'

const props = defineProps({
  handleStatus: {
    type: String,
    default: 'check' // submit （新增 + 修改 + 提交审核）check（查看）
  },
  relicsId: {
    type: [String, Number],
    default: null
  },
  proxy: {
    type: Object,
    default: () => ({})
  }
})

const isReadonly = ref(true)
const form = reactive({
  id: undefined, // id
  relicsId: undefined, // 文物藏品基本信息id

  destinationAfterVerification: undefined, // 核销后去向
  reasonVerification: undefined, // 核销原因
  verificationApprovalNumber: undefined, // 核销批准文号
  verificationApprover: undefined, // 核销审批人
  verificationDate: undefined // 核销日期
})

async function init() {
  form.relicsId = props.relicsId

  const res = await getBackOut(props.relicsId)

  if (res?.data) {
    Object?.keys(form).forEach(key => {
      form[key] = res?.data?.[key]
    })
  }
}
init()
</script>

<style lang="scss" scoped>
.back-out {
  border-top: 1px solid #8ca29d;
  border-left: 1px solid #8ca29d;
  border-right: 1px solid #8ca29d;
}
.desc-item {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  //padding: 9px 0 9px 30px;
  .label,
  .value {
    font-family:
      Source Han Serif CN,
      Source Han Serif CN;
    font-weight: 400;
    font-size: 16px;
    color: #666666;
    line-height: 16px;
    text-align: left;
    font-style: normal;
    text-transform: none;

    overflow: hidden; /* 规定超出内容宽度的元素隐藏 */
    white-space: nowrap; /* 规定文本是否折行 */
    text-overflow: ellipsis !important;
  }
  .label-2 {
    width: 100px;
    text-align: right;
  }

  .label-3 {
    width: 146px;
    text-align: right;
  }

  .value {
    //width: calc(100% - 146px);
    color: #8ca29d;
    //border: 1px solid red;
    display: inline-block;
    overflow: hidden; /* 规定超出内容宽度的元素隐藏 */
    white-space: nowrap; /* 规定文本是否折行 */
    text-overflow: ellipsis !important;
  }
}

.border-right {
  border-right: 1px solid #8ca29d;
}

.border-bottom {
  border-bottom: 1px solid #8ca29d;
}
</style>
