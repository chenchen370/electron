<template>
  <el-dialog class="coder-wang-dialog" v-model="open" width="1280px" append-to-body :before-close="handleCancel" align-center :show-close="false">
    <template #header="{ titleId, titleClass }">
      <span class="detail-title">多媒体信息审核</span>
    </template>

    <el-form
      class="coder-wang-form"
      ref="thingRef"
      :model="form"
      :rules="rules"
      label-width="auto"
      label-position="top"
      size="large"
      style="padding-bottom: 218px"
    >
      <el-scrollbar :height="`calc(100vh - 400px)`">
        <el-row :span="24" :gutter="50">
          <el-col :span="16">
            <el-form-item label="文件名称" prop="mediaName">
              <el-input v-model="form.mediaName" :disabled="isDisabled" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="类别" prop="category">
              <el-select v-model="form.category" :disabled="isDisabled" style="width: 100%" placeholder=" ">
                <el-option v-for="item in optionsInfo?.options_category" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="16">
            <el-form-item label="藏品编号" prop="relicsId">
              <el-input v-model="form.relicsId" :disabled="isDisabled">
                <template #prepend>
                  <el-select v-model="form.number" :disabled="isDisabled" style="width: 100%" placeholder=" ">
                    <el-option v-for="item in optionsInfo?.options_collection_number_name" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </template>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="藏品名">
              <el-input :disabled="isDisabled" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="所属单位" prop="affiliatedUnit">
              <el-input v-model="form.affiliatedUnit" :disabled="isDisabled" />
            </el-form-item>

            <el-form-item label="记录角度" prop="recordAngle">
              <el-select v-model="form.recordAngle" clearable :disabled="isDisabled" placeholder=" ">
                <el-option v-for="item in optionsInfo?.options_record_angle" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>

            <el-form-item label="采集时间" prop="collectionTime">
              <el-date-picker
                style="width: 100%"
                v-model="form.collectionTime"
                type="datetime"
                format="YYYY-MM-DD HH:mm:ss"
                clearable
                :disabled="isDisabled"
                placeholder=" "
              />
            </el-form-item>

            <el-form-item label="采集精度" prop="collectionAccuracy">
              <el-input v-model="form.collectionAccuracy" clearable :disabled="isDisabled" placeholder=" ">
                <template #append>
                  <el-select v-model="form.collectionAccuracyUnit" clearable :disabled="isDisabled" placeholder=" " style="width: 100%">
                    <el-option v-for="item in optionsInfo?.options_collection_accuracy_unit" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item label="属性填写时间" prop="attributeFilledTime">
              <el-date-picker
                style="width: 100%"
                v-model="form.attributeFilledTime"
                type="datetime"
                format="YYYY-MM-DD HH:mm:ss"
                clearable
                :disabled="isDisabled"
                placeholder=" "
              />
            </el-form-item>

            <el-form-item label="制作部门" prop="productionDepartment">
              <el-input v-model="form.productionDepartment" :disabled="isDisabled" />
            </el-form-item>

            <el-form-item label="制作单位" prop="productionUnit">
              <el-input v-model="form.productionUnit" :disabled="isDisabled" />
            </el-form-item>

            <el-form-item label="关键字" prop="keyword">
              <el-input v-model="form.keyword" :disabled="isDisabled" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="规格" prop="specifications">
              <el-input v-model="form.specifications" :disabled="isDisabled" />
            </el-form-item>

            <el-form-item label="采集方式" prop="collectionMethod">
              <el-select v-model="form.collectionMethod" clearable :disabled="isDisabled" placeholder=" " style="width: 100%">
                <el-option v-for="item in optionsInfo?.options_collection_method" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>

            <el-form-item label="采集设备" prop="collectionEquipment">
              <el-input v-model="form.collectionEquipment" :disabled="isDisabled" />
            </el-form-item>

            <el-form-item label="采集加工手段" prop="collectionProcessMethods">
              <el-select v-model="form.collectionProcessMethods" :disabled="isDisabled" placeholder=" " style="width: 100%">
                <el-option v-for="item in optionsInfo?.options_collection_processing_methods" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>

            <el-form-item label="入库审核人" prop="inventoryReviewer">
              <el-input v-model="form.inventoryReviewer" :disabled="isDisabled" />
            </el-form-item>

            <el-form-item label="制作时间" prop="productionTime">
              <el-date-picker
                style="width: 100%"
                v-model="form.productionTime"
                type="datetime"
                format="YYYY-MM-DD HH:mm:ss"
                clearable
                :disabled="isDisabled"
                placeholder=" "
              />
            </el-form-item>

            <el-form-item label="制作地点" prop="productionLocation">
              <el-input v-model="form.productionLocation" :disabled="isDisabled" />
            </el-form-item>

            <el-form-item label="备注" prop="remarks">
              <el-input v-model="form.remarks" :disabled="isDisabled" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="记录介质" prop="recordMedium">
              <el-select v-model="form.recordMedium" clearable :disabled="isDisabled" placeholder=" " style="width: 100%">
                <el-option v-for="item in optionsInfo?.options_recording_medium" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>

            <el-form-item label="采集人" prop="collectors">
              <el-input v-model="form.collectors" :disabled="isDisabled" />
            </el-form-item>

            <el-form-item label="采集格式" prop="collectionFormat">
              <el-input v-model="form.collectionFormat" :disabled="isDisabled" />
            </el-form-item>

            <el-form-item label="属性填写人" prop="attributeFilledUser">
              <el-input v-model="form.attributeFilledUser" :disabled="isDisabled" />
            </el-form-item>

            <el-form-item label="入库审核时间" prop="entryReviewTime">
              <el-date-picker
                style="width: 100%"
                v-model="form.entryReviewTime"
                type="datetime"
                format="YYYY-MM-DD HH:mm:ss"
                clearable
                :disabled="isDisabled"
                placeholder=" "
              />
            </el-form-item>

            <el-form-item label="负责人" prop="responsiblePerson">
              <el-input v-model="form.responsiblePerson" :disabled="isDisabled" />
            </el-form-item>

            <el-form-item label="材料介绍" prop="materialIntroduction">
              <el-input v-model="form.materialIntroduction" :disabled="isDisabled" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-scrollbar>
    </el-form>

    <div class="bottom-handle">
      <el-form class="coder-wang-form" :form="formAudit" label-width="auto" size="large" label-position="top">
        <el-row :span="24" :gutter="50">
          <el-col :span="8">
            <el-form-item label="审批意见" prop="aa">
              <el-input v-model="formAudit.approvalRemark" />
            </el-form-item>
          </el-col>

          <el-col :span="16">
            <el-form-item label="审批结果" prop="relicName">
              <el-col :span="12" style="padding-left: 0">
                <div class="audit-item" :class="formAudit.approvalResult == 'agree' ? 'audit-item-success' : ''" @click="handleAuditStatus('agree')">
                  <span class="icon">√</span>
                  审核通过
                </div>
              </el-col>
              <el-col :span="12" style="padding-right: 0">
                <div class="audit-item" :class="formAudit.approvalResult == 'refuse' ? 'audit-item-fail' : ''" @click="handleAuditStatus('refuse')">
                  <span class="icon">X</span>
                  审核不通过
                </div>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row justify="center" style="margin-top: 32px">
          <el-space :size="31">
            <el-button class="button-p-cancel" @click="handleCancel"> 关闭 </el-button>
            <el-button class="button-c-sure" type="primary" @click="handleSure"> 确定 </el-button>
          </el-space>
        </el-row>
      </el-form>
    </div>
  </el-dialog>
</template>

<script setup>
import optionsInfo from './options-media'
import { auditBatchCollection } from '@/api/collection-info-manage'

const props = defineProps({
  currentRow: {
    type: Object,
    default: () => ({})
  },
  proxy: {
    type: Object,
    default: () => ({})
  }
})
const select = ref()

const open = ref(true)
const isDisabled = ref(true)
const form = reactive({
  id: undefined,
  mediaName: undefined, // 文件名称
  relicPath: undefined, // 文件路径（缺）
  relicsId: undefined, // 文物藏品基本信息id
  number: undefined, // 编号类型
  // 藏品名（缺）
  category: undefined, // 类别
  affiliatedUnit: undefined, // 所属单位
  specifications: undefined, // 规格
  recordMedium: undefined, // 记录介质
  recordAngle: undefined, // 记录角度
  collectionMethod: undefined, // 采集方式
  collectors: undefined, // 采集人
  collectionTime: undefined, // 采集时间
  collectionEquipment: undefined, // 采集设备
  collectionFormat: undefined, // 采集格式
  collectionAccuracy: undefined, // 采集精度
  collectionAccuracyUnit: undefined, // 采集精度单位
  collectionProcessMethods: undefined, // 采集加工手段
  attributeFilledUser: undefined, // 属性填写人
  attributeFilledTime: undefined, // 属性填写时间
  inventoryReviewer: undefined, // 入库审核人
  entryReviewTime: undefined, // 入库审核时间
  productionDepartment: undefined, // 制作部门
  productionTime: undefined, // 制作时间
  responsiblePerson: undefined, // 负责人
  productionUnit: undefined, // 制作单位
  productionLocation: undefined, // 制作地点
  materialIntroduction: undefined, // 材料介绍
  keyword: undefined, // 关键字

  researchType: undefined, // 媒体类型
  remarks: undefined // 备注
})

const rules = {}

const formAudit = reactive({
  approvalRemark: undefined,
  approvalResult: ''
})

watch(
  () => props.currentRow,
  val => {
    if (val) {
      Object.keys(form).forEach(key => {
        form[key] = val[key]
      })
    }
  },
  {
    deep: true,
    immediate: true
  }
)
const emits = defineEmits(['handleCloseDialogMediaAudit'])
function handleSubmitAudit() {
  emits('handleCloseDialogMediaAudit')
}

async function handleSure() {
  if (!formAudit.approvalResult) {
    props.proxy?.$modal.msgError('请先选择同意/拒绝')
  }

  const params = {
    ids: [form.id],
    ...formAudit
  }
  await auditBatchCollection(params)
  props.proxy?.$modal.msgSuccess(`审核${formAudit.approvalResult === 'agree' ? '通过' : '拒绝'}成功~`)
  emits('handleCloseDialogMediaAudit')
}

function handleCancel() {
  emits('handleCloseDialogMediaAudit')
}

function handleAuditStatus(val) {
  formAudit.approvalResult = val
}
</script>

<style lang="scss" scoped>
.detail-title {
  font-family:
    Source Han Serif CN,
    Source Han Serif CN;
  font-weight: 600;
  font-size: 20px;
  color: #064235;
  line-height: 29px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

.el-scrollbar {
  //box-sizing: border-box;
  :deep(.el-scrollbar__bar.is-horizontal) {
    height: 0;
    width: 0;
  }
}

.audit-item {
  cursor: pointer;
  width: 100%;
  height: 40px;

  font-family: Source Han Serif CN;
  font-size: 16px;
  font-weight: normal;
  line-height: normal;
  display: flex;
  align-items: center;
  letter-spacing: 0em;

  font-variation-settings: 'opsz';
  font-feature-settings: 'kern';
  color: #38675c;
  display: flex;
  justify-content: center;
  align-items: center;

  background: #eff0e9;

  box-sizing: border-box;
  border: 1px solid #aec2bd;

  &-success {
    background: #50a13e;
    border: none;
    color: #fff;

    .icon {
      background: #fff !important;
      color: #50a13e !important;
    }
  }

  &-fail {
    background: #df0c0c;
    border: none;
    color: #fff;

    .icon {
      background: #fff !important;
      color: #df0c0c !important;
    }
  }

  .icon {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #38675c;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 22px;
  }
}

.change-file {
  width: 350px;
  height: 40px;
  background: #38675c;
  border-radius: 2px 2px 2px 2px;

  font-family:
    Source Han Serif CN,
    Source Han Serif CN;
  font-weight: 400;
  font-size: 16px;
  color: #ffffff;
  line-height: 23px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  margin-top: 33px;
}

.size-unit-input {
  :deep(.el-input__wrapper) {
    border-right: none;
    border-top: 1px solid #aec2bd;
    border-bottom: 1px solid #aec2bd;
    border-left: 1px solid #aec2bd;
    //border: 1px solid red !important;
    box-shadow: none !important;
  }
}

.bottom-handle {
  padding: 20px 60px;
  box-sizing: border-box;
  background: #eff0e9;
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
}

:deep(.el-input-group__prepend) {
  padding: 0 !important;
}

:deep(.el-input-group__append) {
  background: transparent;
  padding: 0 !important;
}
</style>
