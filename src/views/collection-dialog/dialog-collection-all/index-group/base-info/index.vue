<template>
  <el-form class="coder-wang-form" :model="form" :rules="rules" ref="formRef" label-width="auto" size="large"
    label-position="top">
    <el-row :span="24" :gutter="75">
      <el-col :span="8">
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入名称'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="原名" prop="originalName">
          <el-input v-model="form.originalName" clearable :disabled="isDisabled"
            :placeholder="isDisabled ? '' : '请输入原名'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="年代" prop="years">
          <el-tree-select node-key="dictCode" v-model="form.years" clearable :disabled="isDisabled"
            :placeholder="isDisabled ? ' ' : '请选择年代'" :data="optionsInfo.options_years" style="width: 100%" :props="{
              children: 'children',
              label: 'dictLabel',
              value: 'dictCode'
            }" check-strictly />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="年代类型" prop="ageType">
          <el-select v-model="form.ageType" clearable :disabled="isDisabled" :placeholder="isDisabled ? ' ' : '请选择年代类型'"
            style="width: 100%">
            <el-option v-for="item in optionsInfo.options_years_type" :key="item.value" :label="item.label"
              :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="具体年代" prop="specificEra">
          <el-input v-model="form.specificEra" clearable :disabled="isDisabled"
            :placeholder="isDisabled ? '' : '请输入具体年代'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="质地类别" prop="textureCategory">
          <el-select v-model="form.textureCategory" clearable :disabled="isDisabled"
            :placeholder="isDisabled ? ' ' : '请选择质地类别'" style="width: 100%">
            <el-option v-for="item in optionsInfo.options_cp_texture_1" :key="item.dictValue" :label="item.dictLabel"
              :value="item.dictValue" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="实际数量单位" prop="actualQuantityUnit">
          <!--          <el-input v-model="form.actualQuantityUnit" />-->
          <el-select v-model="form.actualQuantityUnit" clearable :disabled="isDisabled"
            :placeholder="isDisabled ? ' ' : '请选择实际数量单位'" style="width: 100%">
            <el-option v-for="item in optionsInfo.options_actual_quantity_unit" :key="item.value" :label="item.label"
              :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="实际数量" prop="actualQuantity">
          <el-input v-model="form.actualQuantity" clearable :disabled="isDisabled"
            :placeholder="isDisabled ? '' : '请输入实际数量'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="物态类别" prop="categoryPhysicalStates">
          <el-select v-model="form.categoryPhysicalStates" clearable :disabled="isDisabled"
            :placeholder="isDisabled ? ' ' : '请选择物态类别'" style="width: 100%">
            <el-option v-for="item in optionsInfo.options_physical_state_category" :key="item.value" :label="item.label"
              :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="质量单位" prop="qualityUnit">
          <el-select v-model="form.qualityUnit" clearable :disabled="isDisabled"
            :placeholder="isDisabled ? ' ' : '请选择质量单位'" style="width: 100%">
            <el-option v-for="item in optionsInfo.options_quality_unit" :key="item.value" :label="item.label"
              :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="具体质量" prop="specificQuality">
          <el-input v-model="form.specificQuality" clearable :disabled="isDisabled"
            :placeholder="isDisabled ? '' : '请输入具体质量'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="质量范围" prop="qualityRange">
          <el-select v-model="form.qualityRange" clearable :disabled="isDisabled"
            :placeholder="isDisabled ? ' ' : '请选择质量范围'" style="width: 100%">
            <el-option v-for="item in api_options.options_quality_range" :key="String(item.value)" :label="item.label"
              :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="传统数量单位" prop="traditionalQuantityUnits">
          <el-input v-model="form.traditionalQuantityUnits" :disabled="true" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="传统数量" prop="traditionalQuantity">
          <el-input v-model="form.traditionalQuantity" clearable :disabled="isDisabled"
            :placeholder="isDisabled ? '' : '请输入传统数量'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="测量部位" prop="measurementLocation">
          <el-input v-model="form.measurementLocation" clearable :disabled="isDisabled"
            :placeholder="isDisabled ? '' : '请输入测量部位'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="容积单位" prop="volumetricUnit">
          <el-select v-model="form.volumetricUnit" clearable :disabled="isDisabled"
            :placeholder="isDisabled ? ' ' : '请选择容积单位'" style="width: 100%">
            <el-option v-for="item in optionsInfo.options_volumetric_unit" :key="item.value" :label="item.label"
              :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="容积" prop="volume">
          <el-input v-model="form.volume" clearable :disabled="isDisabled" :placeholder="isDisabled ? ' ' : '请输入容积'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="独特标记" prop="uniqueMarkings">
          <el-input v-model="form.uniqueMarkings" clearable :disabled="isDisabled"
            :placeholder="isDisabled ? ' ' : '请输入独特标记'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="完残程度" prop="degreeDisability">
          <el-select v-model="form.degreeDisability" clearable :disabled="isDisabled"
            :placeholder="isDisabled ? ' ' : '请选择完残程度'" style="width: 100%">
            <el-option v-for="item in optionsInfo.options_degree_disability" :key="item.value" :label="item.label"
              :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="完残状况" prop="disabilityStatus">
          <el-input v-model="form.disabilityStatus" clearable :disabled="isDisabled"
            :placeholder="isDisabled ? ' ' : '请输入完残状况'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="形态特征" prop="morphologicalFeatures">
          <el-input v-model="form.morphologicalFeatures" clearable :disabled="isDisabled"
            :placeholder="isDisabled ? ' ' : '请输入形态特征'" />
        </el-form-item>
      </el-col>

      <el-col :span="16">
        <el-form-item label="外形尺寸" prop="dimensionalUnits">
          <el-row :size="0" :gutter="24">
            <el-col :span="6" class="size-unit-input-wrap">
              <span class="title">单位</span>
              <el-select v-model="form.dimensionalUnits" clearable :disabled="isDisabled"
                :placeholder="isDisabled ? ' ' : '请选择外形尺寸单位'" style="width: 100%">
                <el-option v-for="item in optionsInfo.options_dimensional_units" :key="item.value" :label="item.label"
                  :value="item.value" />
              </el-select>
            </el-col>

            <el-col :span="6" class="size-unit-input-wrap">
              <span class="title">通长</span>
              <el-input class="size-unit-input" v-model="form.fullLength" clearable :disabled="isDisabled"
                :placeholder="isDisabled ? '' : '请输入通长'">
                <template #append>
                  <span class="input-tip-1" v-if="sizeUnit"> {{ sizeUnit }} </span>
                </template>
              </el-input>
            </el-col>

            <el-col :span="6" class="size-unit-input-wrap">
              <span class="title">通宽</span>
              <el-input class="size-unit-input" v-model="form.passageWidth" clearable :disabled="isDisabled"
                :placeholder="isDisabled ? ' ' : '请输入通宽'" style="margin-right: 12px">
                <template #append>
                  <span class="input-tip-1" v-if="sizeUnit"> {{ sizeUnit }} </span>
                </template>
              </el-input>
            </el-col>

            <el-col :span="6" class="size-unit-input-wrap">
              <span class="title">通高</span>
              <el-input class="size-unit-input" v-model="form.tonggao" clearable :disabled="isDisabled"
                :placeholder="isDisabled ? ' ' : '请输入通高'">
                <template #append>
                  <span class="input-tip-1" v-if="sizeUnit"> {{ sizeUnit }} </span>
                </template>
              </el-input>
            </el-col>
          </el-row>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="具体尺寸" prop="specificDimensions">
          <el-input v-model="form.specificDimensions" clearable :disabled="isDisabled"
            :placeholder="isDisabled ? ' ' : '请输入具体尺寸'" />
        </el-form-item>
      </el-col>
    </el-row>

    <!--    <el-form-item label="形态特征" prop="specificDimensions" style="width: 100%">-->
    <!--      <rich-text-tinymce style="width: 100%" :form-data="form" :prop="`dd`" placeholder="请添加图文详情" />-->
    <!--    </el-form-item>-->
  </el-form>
</template>

<script setup>
import { addBaseInfo, auditBaseInfo, editBaseInfo, getBaseInfo } from '@/api/collection-all/index-group/base-info'
import RichTextTinymce from '@/components/comm-cpns/rich-text-tinymce/rich-text-tinymce.vue'
import { findDict } from '@/utils/findDict'

import { addStudy, editStudy } from '@/api/collection-all/multimedia/study'
import { auditAppendInfo } from '@/api/collection-all/index-group/append-info'

const props = defineProps({
  handleStatus: {
    type: String,
    default: 'check' // submit （新增 + 修改 + 提交审核）check（查看）
  },
  relicsId: {
    type: [String, Number],
    default: 0
  },
  proxy: {
    type: Object,
    default: () => ({})
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
  if (form?.dimensionalUnits) {
    const label = props.optionsInfo.options_dimensional_units?.find(item => item.value == form?.dimensionalUnits)?.label
    console.log('label', label)
    console.log("label?.indexOf('(')", label?.indexOf('（'))
    const n = label?.indexOf('（')
    if (n) {
      return label.slice(n)
    } else {
      return form?.dimensionalUnits
    }
  } else {
    return ''
  }
})

const form = reactive({
  id: undefined, // id
  relicsId: undefined, // 文物藏品基本信息id

  name: undefined, // 名称
  originalName: undefined, // 原名
  years: undefined, // 年代

  ageType: undefined, // 年代类型
  specificEra: undefined, // 具体年代
  textureCategory: undefined, // 质地类别

  actualQuantity: undefined, // 实际数量
  actualQuantityUnit: undefined, // 实际数量单位
  categoryPhysicalStates: undefined, // 物态类别
  //
  // qualitativeSubcategories: undefined, // 质地子类别
  // texture: undefined, // 质地

  qualityUnit: undefined, // 质量单位
  specificQuality: undefined, // 具体质量
  qualityRange: undefined, // 质量范围

  measurementLocation: undefined, // 测量部位

  traditionalQuantityUnits: '件/套', // 传统数量单位()
  traditionalQuantity: undefined, // 传统数量
  morphologicalFeatures: undefined, // 形态特征

  disabilityStatus: undefined, // 完残状况
  uniqueMarkings: undefined, // 独特标记
  degreeDisability: undefined, // 完残程度

  volumetricUnit: undefined, // 容积单位
  volume: undefined, // 容积

  dimensionalUnits: undefined, // 尺寸单位
  specificDimensions: undefined, // 具体尺寸
  fullLength: undefined, // 通长
  passageWidth: undefined, // 通宽
  tonggao: undefined // 通高
})
const rules = {
  name: [
    {
      required: true,
      message: '名称必填项'
    }
  ],
  years: [
    {
      required: true,
      message: '年代必填项'
    }
  ],
  ageType: [
    {
      required: true,
      message: '年代类型必填项'
    }
  ],
  eraRepresentation: [
    {
      required: true,
      message: '年代表示方式必填项'
    }
  ],
  specificEra: [
    {
      required: true,
      message: '具体年代必填项'
    }
  ],
  actualQuantityUnit: [
    {
      required: true,
      message: '实际数量单位必填项'
    }
  ],
  actualQuantity: [
    {
      required: true,
      message: '实际数量必填项'
    }
  ],
  qualityUnit: [
    {
      required: true,
      message: '质量单位必填项'
    }
  ],
  textureCategory: [
    {
      required: true,
      message: '质地类别必填项'
    }
  ],
  specificQuality: [
    {
      required: true,
      message: '具体质量必填项'
    }
  ],
  qualityRange: [
    {
      required: true,
      message: '质量范围必填项'
    }
  ],
  dimensionalUnits: [
    {
      required: true,
      message: '尺寸单位必填项'
    }
  ],
  measurementLocation: [
    {
      required: true,
      message: '测量部位必填项'
    }
  ],
  degreeDisability: [
    {
      required: true,
      message: '完残程度必填项'
    }
  ]
}
const options_other_info = reactive({
  options_zhi_di_lv_2: [],
  options_zhi_di_lv_3: [],
  traditional_quantity_units: [
    {
      label: '件',
      value: 1
    },
    {
      label: '套',
      value: 2
    }
  ]
})
const api_options = reactive({
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

async function init() {
  form.relicsId = props.relicsId

  const res = await getBaseInfo(props.relicsId)

  Object.assign(form, res?.data ?? {})
  if (form.years && typeof form.years === 'string') {
    form.years = Number(form.years)
  }
}
init()

options_other_info.options_zhi_di_lv_2 = computed(() => {
  return findDict(options_info?.options_cp_texture_1 ?? [], form.textureCategory)
})

options_other_info.options_zhi_di_lv_3 = computed(() => {
  return findDict(options_other_info?.options_zhi_di_lv_2 ?? [], form.qualitativeSubcategories)
})
const formRef = ref()
async function submit() {
  console.log('props?.proxy ===>', props?.proxy)
  if (!formRef.value) return
  await formRef.value.validate(async (valid, fields) => {
    if (valid) {
      form.relicsId = props.relicsId
      if (!form.id) {
        await addBaseInfo(form)
        props?.proxy?.$modal?.msgSuccess('基本信息保存成功')
        await init()
      } else {
        await editBaseInfo(form)
        props?.proxy?.$modal?.msgSuccess('基本信息保存成功')
        await init()
      }
    }
  })
}

async function audit() {
  if (!form.id) {
    return props?.proxy?.$modal?.msgSuccess('请先保存基本信息')
  }
  await auditBaseInfo(form)
  props?.proxy?.$modal?.msgSuccess('基本信息提交审核成功')
}
defineExpose({ submit, audit })
</script>

<style lang="scss" scoped>
.size-unit-input-wrap {
  position: relative;

  .title {
    position: absolute;
    top: -34px;
    right: 10px;

    font-family: Source Han Serif CN;
    font-size: 16px;
    font-weight: normal;
    line-height: normal;

    font-variation-settings: 'opsz';
    font-feature-settings: 'kern';
    color: #333333;
  }

  .size-unit-input {
    .input-tip-1 {
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
    }

    :deep(.el-input__wrapper) {
      //border-top: 1px solid #aec2bd;
      //border-bottom: 1px solid #aec2bd;
      //border-left: 1px solid #aec2bd;
      border: 1px solid #aec2bd !important;
      border-right: none;
      box-shadow: none !important;
    }
  }
}

:deep(.el-input.is-disabled .el-input__wrapper) {
  background: #ecede9;
  border-radius: 2px 2px 2px 2px;
  border: 1px solid #aec2bd;
  box-shadow: none;
}

:deep(.el-input-group__prepend) {
  padding: 0 !important;
}

:deep(.el-input-group__append) {
  background: transparent;
  padding: 0 !important;
}
</style>
