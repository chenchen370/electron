<template>
  <el-dialog class="coder-wang-dialog" v-model="open" width="1280px" append-to-body :before-close="handleCancel"
    align-center :show-close="false">
    <template #header="{ titleId, titleClass }">
      <span class="detail-title">藏品核心指标详情</span>
    </template>

    <el-scrollbar :height="`calc(100vh - 280px)`">
      <el-form class="coder-wang-form" ref="formRef" :model="form" :rules="rules" label-width="auto"
        label-position="top" size="large">
        <el-row :span="24" :gutter="46">
          <el-col :span="8">
            <el-form-item label="藏品编号" prop="relicId">
              <el-input v-model="form.relicId" clearable :disabled="isDisabled"
                :placeholder="isDisabled ? '' : '请输入藏品编号'">
                <template #prepend>
                  <el-select v-model="form.relicIdType" clearable :disabled="isDisabled"
                    :placeholder="isDisabled ? '' : '请选择编号类型'" style="width: 100%">
                    <el-option v-for="item in optionsInfo?.options_collection_number_name" :key="item.value"
                      :label="item.label" :value="item.value" />
                  </el-select>
                </template>
              </el-input>
            </el-form-item>

            <!--            <el-form-item label="收入号" prop="aaa">-->
            <!--              <el-input v-model="form.aaa" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入收入号'" />-->
            <!--            </el-form-item>-->

            <el-form-item label="原名" prop="relicRealName">
              <el-input v-model="form.relicRealName" clearable :disabled="isDisabled"
                :placeholder="isDisabled ? '' : '请输入原名'" />
            </el-form-item>

            <el-form-item label="文物类别" prop="relicCategory">
              <el-select v-model="form.relicCategory" clearable :disabled="isDisabled"
                :placeholder="isDisabled ? '' : '请选择文物类别'" style="width: 100%">
                <el-option v-for="item in optionsInfo.options_artifact_type" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>

            <el-form-item label="文物级别" prop="relicLevel">
              <el-select v-model="form.relicLevel" clearable :disabled="isDisabled"
                :placeholder="isDisabled ? '' : '请选择文物级别'" style="width: 100%">
                <el-option v-for="item in optionsInfo.options_artifact_level" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>

            <el-form-item label="实际数量" prop="relicNum">
              <el-input v-model="form.relicNum" clearable :disabled="isDisabled"
                :placeholder="isDisabled ? '' : '请输入实际数量'">
                <template #append>
                  <el-select v-model="form.numUnit" clearable :disabled="isDisabled"
                    :placeholder="isDisabled ? '' : '请选择单位'" style="width: 100%">
                    <el-option v-for="item in optionsInfo?.options_actual_quantity_unit" :key="item.value"
                      :label="item.label" :value="item.value" />
                  </el-select>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item label="外形尺寸" prop="sizeUnit">
              <el-row :size="0" :gutter="12">
                <el-col :span="12" class="size-unit-input-wrap">
                  <span class="title">单位</span>
                  <el-select v-model="form.sizeUnit" clearable :disabled="isDisabled"
                    :placeholder="isDisabled ? '' : '请选择外形尺寸单位'" style="width: 100%">
                    <el-option v-for="item in optionsInfo.options_dimensional_units" :key="item.value"
                      :label="item.label" :value="item.value" />
                  </el-select>
                </el-col>

                <el-col :span="12" class="size-unit-input-wrap">
                  <span class="title">通长</span>
                  <el-input class="size-unit-input" v-model="form.sizeLong" clearable :disabled="isDisabled"
                    :placeholder="isDisabled ? '' : '请输入通长'">
                    <template #append>
                      <span class="input-tip" v-if="sizeUnit"> {{ sizeUnit }} </span>
                    </template>
                  </el-input>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="库房（库区）名称" prop="relicWarehouse">
              <el-select v-model="form.relicWarehouse" clearable :disabled="isDisabled"
                :placeholder="isDisabled ? ' ' : '请选择/输入库房（库区）名称'" filterable remote reserve-keyword allow-create
                remote-show-suffix :remote-method="_getWarehouseAllList" :loading="api_options.loading"
                style="width: 100%">
                <el-option v-for="item in api_options.options_house" :key="item.userName" :label="item.houseName"
                  :value="item.houseId" />
              </el-select>
            </el-form-item>

            <el-form-item label="保存状态" prop="relicState">
              <el-select v-model="form.relicState" clearable :disabled="isDisabled"
                :placeholder="isDisabled ? '' : '请选择保存状态'" style="width: 100%">
                <el-option v-for="item in optionsInfo.options_save_status" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>

            <el-form-item label="完残程度" prop="relicCompleteness">
              <el-select v-model="form.relicCompleteness" clearable :disabled="isDisabled"
                :placeholder="isDisabled ? '' : '请选择完残程度'" placeholder="请选择完残程度" style="width: 100%">
                <el-option v-for="item in optionsInfo.options_degree_disability" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="藏品分类号" prop="relicCategoryNo">
              <el-input v-model="form.relicCategoryNo" clearable :disabled="isDisabled"
                :placeholder="isDisabled ? '' : '请输入藏品分类号'" />
            </el-form-item>

            <el-form-item label="名称" prop="relicName">
              <el-input v-model="form.relicName" clearable :disabled="isDisabled"
                :placeholder="isDisabled ? '' : '请输入名称'" />
            </el-form-item>

            <el-form-item label="质地类别" prop="relicMaterial">
              <el-select v-model="form.relicMaterial" clearable :disabled="isDisabled"
                :placeholder="isDisabled ? '' : '请选择质地类别'" style="width: 100%">
                <el-option v-for="item in optionsInfo.options_cp_texture_1" :key="item.dictValue"
                  :label="item.dictLabel" :value="item.dictValue" />
              </el-select>
            </el-form-item>

            <el-form-item label="年代" prop="relicYears">
              <el-tree-select node-key="dictCode" v-model="form.relicYears" clearable :disabled="isDisabled"
                :placeholder="isDisabled ? '' : '请选择年代'" :data="optionsInfo.options_years" style="width: 100%" :props="{
                  children: 'children',
                  label: 'dictLabel',
                  value: 'dictCode'
                }" check-strictly />
            </el-form-item>

            <el-form-item label="质量范围" prop="massRange">
              <el-select v-model="form.massRange" clearable :disabled="isDisabled"
                :placeholder="isDisabled ? '' : '请选择质量范围'" style="width: 100%">
                <el-option v-for="item in api_options.options_quality_range" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>

            <el-form-item label="" prop="" style="padding-top: 34px">
              <el-row :size="0" :gutter="12">
                <el-col :span="12" class="size-unit-input-wrap">
                  <span class="title">通宽</span>
                  <el-input class="size-unit-input" v-model="form.sizeWidth" clearable :disabled="isDisabled"
                    :placeholder="isDisabled ? '' : '请输入通宽'" style="margin-right: 12px">
                    <template #append>
                      <span class="input-tip" v-if="sizeUnit"> {{ sizeUnit }} </span>
                    </template>
                  </el-input>
                </el-col>

                <el-col :span="12" class="size-unit-input-wrap">
                  <span class="title">通高</span>
                  <el-input class="size-unit-input" v-model="form.sizeHigh" clearable :disabled="isDisabled"
                    :placeholder="isDisabled ? '' : '请输入通高'">
                    <template #append>
                      <span class="input-tip" v-if="sizeUnit"> {{ sizeUnit }} </span>
                    </template>
                  </el-input>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="文物来源" prop="relicFrom">
              <el-select v-model="form.relicFrom" clearable :disabled="isDisabled"
                :placeholder="isDisabled ? '' : '请选择文物来源'" style="width: 100%">
                <el-option v-for="item in optionsInfo.options_source_cultural_relics" :key="item.value"
                  :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>

            <el-form-item label="入藏时间范围" prop="relicTimeRange">
              <el-select v-model="form.relicTimeRange" clearable :disabled="isDisabled"
                :placeholder="isDisabled ? '' : '请选择入藏时间范围'" style="width: 100%">
                <el-option v-for="item in optionsInfo.options_time_range_tibet" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-form-item>

            <el-form-item label="完残状况" prop="relicStatus">
              <el-input v-model="form.relicStatus" clearable :disabled="isDisabled"
                :placeholder="isDisabled ? '' : '请输入完残状况'" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item>
              <image-upload upload-width="350px" upload-height="268px" :limit="1" :model-value="form.relicImg"
                upload-url="/heritage/file/upload/repair" @update:modelValue="handleUploadRelicImg" />
              <!--              <image-preview :height="230" :width="350" style="margin-top: 34px" :src="form.relicPath" />-->
            </el-form-item>

            <el-form-item label="具体年代" prop="relicYearsDetail">
              <el-input v-model="form.relicYearsDetail" clearable :disabled="isDisabled"
                :placeholder="isDisabled ? '' : '请输入具体年代'" />
            </el-form-item>

            <el-form-item label="具体质量" prop="massDetail">
              <el-input v-model="form.massDetail" clearable :disabled="isDisabled"
                :placeholder="isDisabled ? '' : '请输入具体质量'">
                <template #append>
                  <el-select v-model="form.massUnit" clearable :disabled="isDisabled"
                    :placeholder="isDisabled ? '' : '请选择质量单位'" style="width: 100%">
                    <el-option v-for="item in optionsInfo.options_quality_unit" :key="item.value" :label="item.label"
                      :value="item.value" />
                  </el-select>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item label="具体尺寸" prop="sizeDetail">
              <el-input v-model="form.sizeDetail" clearable :disabled="isDisabled"
                :placeholder="isDisabled ? '' : '请输入具体尺寸'" />
            </el-form-item>

            <el-form-item label="具体来源" prop="relicFromDetail">
              <el-input v-model="form.relicFromDetail" clearable :disabled="isDisabled"
                :placeholder="isDisabled ? '' : '请输入具体来源'" />
            </el-form-item>

            <el-form-item label="入藏年度" prop="relicTimeYear">
              <el-input v-model="form.relicTimeYear" clearable :disabled="isDisabled"
                :placeholder="isDisabled ? '' : '请输入入藏年度'" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="备注" prop="remarks">
          <el-input v-model="form.remarks" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入备注'" />
        </el-form-item>
      </el-form>
    </el-scrollbar>
    <template #footer>
      <div class="dialog-footer">
        <el-button class="button-c-sure" type="primary" @click="handleSubmitAudit">提交审核</el-button>
        <el-button class="button-p-cancel" @click="handleSave">保存</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import ImageUpload from '@/components/ImageUpload/index.vue'
import { addCollection, auditCollection, detailCollection, detailEditCollection, editCollection } from '@/api/collection-info-manage'
import { addBaseCaseDesc, editBaseCaseDesc } from '@/api/collection-all/index-group/base-case-desc'
import { getWarehouseAllList } from '@/api/artifact/warehouse'

const emits = defineEmits(['handleCloseCollectionCoreIndex'])

const props = defineProps({
  currentRow: {
    type: Object,
    default: () => ({})
  },
  proxy: {
    type: Object,
    default: () => ({})
  },
  apiDetail: {
    type: String,
    default: 'edit'
  },
  optionsInfo: {
    type: Object,
    default: () => ({})
  }
})

const isDisabled = computed(() => {
  return props.handleStatus === 'check'
})

const sizeUnit = computed(() => {
  if (form?.sizeUnit) {
    const label = props.optionsInfo.options_dimensional_units?.find(item => item.value == form?.sizeUnit)?.label
    console.log('label', label)
    console.log("label?.indexOf('(')", label?.indexOf('（'))
    const n = label?.indexOf('（')
    if (n) {
      return label.slice(n)
    } else {
      return form?.sizeUnit
    }
  } else {
    return ''
  }
})

const open = ref(true)
const form = reactive({
  id: undefined,
  relicId: undefined, // 藏品总登记号
  relicIdType: undefined, // 登记号类型
  relicCategoryNo: undefined, // 藏品分类号
  // 收入号（没）
  relicName: undefined, // 名称
  relicRealName: undefined, // 原名
  relicMaterial: undefined, // 质地类别
  relicCategory: undefined, // 文物类别
  relicLevel: undefined, // 文物级别

  relicYears: undefined, // 年代
  relicYearsDetail: undefined, // 具体年代

  massRange: undefined, // 质量范围
  massUnit: undefined, // 质量单位
  massDetail: undefined, // 具体质量

  sizeUnit: undefined, // 尺寸单位
  sizeLong: undefined, // 通长
  sizeWidth: undefined, // 通宽
  sizeHigh: undefined, // 通高
  sizeDetail: undefined, // 具体尺寸

  relicNum: undefined, // 实际数量
  numUnit: undefined, // 数量单位

  relicFrom: undefined, // 藏品来源
  relicFromDetail: undefined, // 具体来源

  relicWarehouse: undefined, // 库房（库区）名称
  relicTimeRange: undefined, // 入藏时间范围
  relicTimeYear: undefined, // 入藏年度

  relicState: undefined, // 保存状态
  relicCompleteness: undefined, // 完残程度
  relicStatus: undefined // 完残状况

  // relicDesc: undefined, // 形态特征
  // relicPath: undefined, // 藏品主图
  // relicPosition: undefined, // 藏品地域
  // relicShare: undefined, // 藏品是否共享
  // relicTag: undefined, // 独特标记
  // relicTime: undefined // 入藏时间
})

const rules = {
  relicName: [
    {
      required: true,
      message: '名称必填'
    }
  ],
  relicYears: [
    {
      required: true,
      message: '年代必填'
    }
  ],
  relicYearsDetail: [
    {
      required: true,
      message: '具体年代必填'
    }
  ],
  relicNum: [
    {
      required: true,
      message: '实际数量必填'
    }
  ],
  massUnit: [
    {
      required: true,
      message: '质量单位必填'
    }
  ],
  relicMaterial: [
    {
      required: true,
      message: '质地类别必填'
    }
  ],
  massDetail: [
    {
      required: true,
      message: '具体质量必填'
    }
  ],
  massRange: [
    {
      required: true,
      message: '质量范围必填'
    }
  ],
  sizeUnit: [
    {
      required: true,
      message: '外形尺寸必填'
    }
  ],

  relicCompleteness: [
    {
      required: true,
      message: '完残程度必填'
    }
  ],
  relicCategory: [
    {
      required: true,
      message: '文物类别必填'
    }
  ],
  relicLevel: [
    {
      required: true,
      message: '文物级别必填'
    }
  ],
  relicId: [
    {
      required: true,
      message: '藏品编号必填'
    }
  ],
  relicFrom: [
    {
      required: true,
      message: '文物来源必填'
    }
  ]
}

// 设置图片
function handleUploadRelicImg(res) {
  form.relicImg = res ?? ''
}

// 回填数据
watch(
  () => props.currentRow,
  val => {
    if (props.apiDetail == 'edit') {
      if (val?.relicsNo) {
        init(val?.relicsNo)
      }
    } else {
      if (val?.id) {
        init(val?.id)
      }
    }
  },
  {
    deep: true,
    immediate: true
  }
)

// edit id ==》 relicsNo
async function init(id) {
  if (props.apiDetail == 'edit') {
    const res = await detailEditCollection(id)
    console.log('init ---->', res)
    Object.assign(form, res?.data ?? {})
    form.relicYears = Number(form.relicYears)
  } else {
    const res = await detailCollection(id)
    Object.assign(form, res?.data ?? {})
    console.log('---form ---', form)
    form.relicYears = Number(form.relicYears)
  }
}

// async function handleSave() {
//   const res = await addCollection(form)
//   resData.value = res?.data ?? {}
//
//   // emits('handleCloseCollectionCoreIndex')
// }

const resData = ref()
const formRef = ref()
async function handleSave() {
  console.log('props?.proxy ===>', props?.proxy)
  if (!formRef.value) return
  await formRef.value.validate(async (valid, fields) => {
    if (valid) {
      if (!form.id) {
        const res = await addCollection(form)
        console.log('add res.data --->', res.data)
        props?.proxy?.$modal?.msgSuccess('藏品核心指标详情保存成功')
        await init(res?.data.relicsNo)
      } else {
        const res = await editCollection(form)
        props?.proxy?.$modal?.msgSuccess('藏品核心指标详情保存成功')
        console.log('edit res.data --->', res.data)
      }
    }
  })
}

function handleCancel() {
  console.log('qu')
  emits('handleCloseCollectionCoreIndex')
}

function handleSubmitAudit() {
  if (!resData.value?.id) {
    return props.proxy?.$modal?.msgError('请先保存藏品核心指标详情')
  }
  props.proxy.$modal
    .confirm(`是否提交审核 当前藏品核心指标详情 数据项？`)
    .then(() => auditCollection(resData.value.id))
    .then(() => {
      props.proxy.$modal.msgSuccess('提交审核成功')
      emits('handleCloseCollectionCoreIndex')
    })
    .catch(() => { })
}

// options
const api_options = reactive({
  loading: false,
  options_house: [],
  options_quality_range: []
})

api_options.options_quality_range = computed(() => {
  return props.optionsInfo.options_quality_range.map(item => {
    if (item.label.indexOf('&lt;') !== -1) {
      item.label = item.label.replace('&lt;', '<')
      return item
    } else if (item.label.indexOf('&gt;') !== -1) {
      item.label = item.label.replace('&gt;', '>')
      return item
    } else {
      return item
    }
  })
})

// 库房
async function _getWarehouseAllList() {
  api_options.loading = true
  try {
    const res = await getWarehouseAllList({ pageNum: 1, pageSize: 999, isShow: 0 })
    api_options.options_house = res?.rows ?? []
    api_options.loading = false
  } catch (e) {
    api_options.loading = false
    api_options.options_house = []
  }
}
_getWarehouseAllList()
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

:deep(.el-input-group__prepend) {
  padding: 0 !important;
}

:deep(.el-input-group__append) {
  background: transparent;
  padding: 0 !important;
}

//.input-tip {
//  font-family:
//    Source Han Serif CN,
//    Source Han Serif CN;
//  font-weight: 400;
//  font-size: 16px;
//  color: #333333;
//  text-align: left;
//  font-style: normal;
//  text-transform: none;
//  display: inline-block !important;
//  width: 100%;
//  border-top: 1px solid #aec2bd;
//  border-bottom: 1px solid #aec2bd;
//  border-left: 1px solid #aec2bd;
//  //padding: 0 26px;
//  padding-left: 26px;
//  padding-right: 26px;
//}

.size-unit-input-wrap {
  position: relative;

  .title {
    position: absolute;
    top: -34px;
    right: 4px;

    font-family: Source Han Serif CN;
    font-size: 16px;
    font-weight: normal;
    line-height: normal;

    font-variation-settings: 'opsz';
    font-feature-settings: 'kern';
    color: #333333;
  }

  .size-unit-input {
    .input-tip {
      font-family:
        Source Han Serif CN,
        Source Han Serif CN;
      font-weight: 400;
      font-size: 16px;
      color: #333333;
      text-align: left;
      font-style: normal;
      text-transform: none;
      display: inline-block !important;
      width: 100%;
      border-top: 1px solid #aec2bd;
      border-bottom: 1px solid #aec2bd;
      border-right: 1px solid #aec2bd;
      padding: 0 5px;
    }

    :deep(.el-input__wrapper) {
      border-right: none;
      //border-top: 1px solid #aec2bd;
      //border-bottom: 1px solid #aec2bd;
      //border-left: 1px solid #aec2bd;
      border: 1px solid #aec2bd !important;
      box-shadow: none !important;
    }
  }
}
</style>
