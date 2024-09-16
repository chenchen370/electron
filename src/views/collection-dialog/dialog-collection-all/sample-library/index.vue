<template>
  <el-scrollbar :height="`calc(100vh - 370px)`">
    <el-form class="coder-wang-form" ref="formRef" :model="form" :rules="rules" label-width="auto" label-position="top"
      size="large">
      <el-row :span="24" :gutter="50">
        <el-col :span="8">
          <el-form-item label="标本编号" prop="sampleNo">
            <el-input v-model="form.sampleNo" clearable :disabled="isDisabled"
              :placeholder="isDisabled ? '' : '请输入标本编号'">
              <template #prepend>
                <el-select v-model="form.sampleType" clearable :disabled="isDisabled"
                  :placeholder="isDisabled ? ' ' : '请选择编号类型'" style="width: 100%">
                  <el-option v-for="item in optionsInfo?.options_specimen_category" :key="item.value"
                    :label="item.label" :value="item.value" />
                </el-select>
              </template>
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="中文名称" prop="cnName">
            <el-input v-model="form.cnName" clearable :disabled="isDisabled"
              :placeholder="isDisabled ? '' : '请输入中文名称'" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="拉丁文名称/英文名称" prop="enName">
            <el-input v-model="form.enName" clearable :disabled="isDisabled"
              :placeholder="isDisabled ? '' : '请输入拉丁文名称/英文名称'" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="类别B" prop="typeB">
            <el-input v-model="form.typeB" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入类别B'" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="级别B" prop="typeA">
            <el-input v-model="form.typeA" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入级别B'" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="年代" prop="relicsYears">
            <el-tree-select node-key="dictCode" v-model="form.relicsYears" clearable :disabled="isDisabled"
              :placeholder="isDisabled ? ' ' : '请选择年代'" :data="optionsInfo.options_years" style="width: 100%" :props="{
                children: 'children',
                label: 'dictLabel',
                value: 'dictCode'
              }" check-strictly />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="具体年代" prop="relicYearsDetail">
            <el-input v-model="form.relicYearsDetail" clearable :disabled="isDisabled"
              :placeholder="isDisabled ? '' : '请输入具体年代'" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="采集地/产地" prop="collectLocation">
            <el-input v-model="form.collectLocation" clearable :disabled="isDisabled"
              :placeholder="isDisabled ? '' : '请输入采集地/产地'" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="来源方式" prop="sourceMethod">
            <el-select v-model="form.sourceMethod" clearable :disabled="isDisabled"
              :placeholder="isDisabled ? ' ' : '请选择来源方式'" style="width: 100%">
              <el-option v-for="item in optionsInfo.options_source_cultural_relics" :key="item.value"
                :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="16">
          <el-form-item label="外形尺寸" prop="sizeUnit">
            <el-row :size="0" :gutter="24">
              <el-col :span="6" class="size-unit-input-wrap">
                <span class="title">单位</span>
                <el-select v-model="form.sizeUnit" clearable :disabled="isDisabled"
                  :placeholder="isDisabled ? ' ' : '请选择外形尺寸单位'" style="width: 100%">
                  <el-option v-for="item in optionsInfo.options_dimensional_units" :key="item.value" :label="item.label"
                    :value="item.label" />
                </el-select>
              </el-col>

              <el-col :span="6" class="size-unit-input-wrap">
                <span class="title">通长</span>
                <el-input class="size-unit-input" v-model="form.sizeLong" clearable :disabled="isDisabled"
                  :placeholder="isDisabled ? '' : '请输入通长'">
                  <template #append>
                    <span class="input-tip-1" v-if="sizeUnit"> {{ sizeUnit }} </span>
                  </template>
                </el-input>
              </el-col>

              <el-col :span="6" class="size-unit-input-wrap">
                <span class="title">通宽</span>
                <el-input class="size-unit-input" v-model="form.sizeWidth" clearable :disabled="isDisabled"
                  :placeholder="isDisabled ? '' : '请输入通宽'" style="margin-right: 12px">
                  <template #append>
                    <span class="input-tip-1" v-if="sizeUnit"> {{ sizeUnit }} </span>
                  </template>
                </el-input>
              </el-col>

              <el-col :span="6" class="size-unit-input-wrap">
                <span class="title">通高</span>
                <el-input class="size-unit-input" v-model="form.sizeHigh" clearable :disabled="isDisabled"
                  :placeholder="isDisabled ? '' : '请输入通高'">
                  <template #append>
                    <span class="input-tip-1" v-if="sizeUnit"> {{ sizeUnit }} </span>
                  </template>
                </el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="具体尺寸" prop="sizeDetail">
            <el-input v-model="form.sizeDetail" clearable :disabled="isDisabled"
              :placeholder="isDisabled ? '' : '请输入具体尺寸'" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="实际数量" prop="sampleNum">
            <el-input v-model="form.sampleNum" clearable :disabled="isDisabled"
              :placeholder="isDisabled ? '' : '请输入实际数量'">
              <template #append>
                <el-select v-model="form.numUnit" clearable :disabled="isDisabled"
                  :placeholder="isDisabled ? ' ' : '请选择单位'" style="width: 100%">
                  <el-option v-for="item in optionsInfo?.options_actual_quantity_unit" :key="item.value"
                    :label="item.label" :value="item.value" />
                </el-select>
              </template>
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="保藏方式" prop="saveMethod">
            <el-input v-model="form.saveMethod" clearable :disabled="isDisabled"
              :placeholder="isDisabled ? '' : '请输入保藏方式'" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="入藏时间范围" prop="relicTime">
            <el-select v-model="form.relicTime" clearable :disabled="isDisabled"
              :placeholder="isDisabled ? ' ' : '请选择入藏时间范围'" style="width: 100%">
              <el-option v-for="item in optionsInfo.options_time_range_tibet" :key="item.value" :label="item.label"
                :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="入藏年度" prop="relicTimeYear">
            <el-date-picker style="width: 100%" v-model="form.relicTimeYear" type="year" format="YYYY" clearable
              :disabled="isDisabled" :placeholder="isDisabled ? '' : '请选择入藏年度'" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="描述" prop="relicDesc">
            <el-input v-model="form.relicDesc" clearable :disabled="isDisabled"
              :placeholder="isDisabled ? '' : '请输入描述'" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="备注" prop="comment">
            <el-input v-model="form.comment" clearable :disabled="isDisabled"
              :placeholder="isDisabled ? '' : '请输入备注'" />
          </el-form-item>
        </el-col>
      </el-row>

      <div class="tip-bottom">
        以上指标名称与 <span class="module">藏品信息指标群</span>、<span class="module">藏品工作管理信息</span>
        中有重叠，本页面修改并完成审核后，数据将更新至其他页面，请谨慎修改
      </div>
    </el-form>
  </el-scrollbar>
</template>

<script setup>
import { addSampleLibrary, auditSampleLibrary, editSampleLibrary, getSampleLibrary } from '@/api/collection-all/sample-library'
import { auditSourceInfo } from '@/api/collection-all/manage-work/source-info'

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
    const label = props.optionsInfo.options_dimensional_units?.find(item => item.label == form?.sizeUnit)?.label
    console.log('label ===>?', label)
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

const form = reactive({
  id: undefined,

  sampleNo: undefined, // 标本编号
  sampleType: undefined, // 标本分类
  cnName: undefined, // 中文名称
  enName: undefined, // 拉丁文名称/英文名称
  typeB: undefined, // 类别B
  typeA: undefined, // 级别B
  relicsYears: undefined, // 年代
  relicYearsDetail: undefined, // 具体年代
  collectLocation: undefined, // 采集地/产地
  sourceMethod: undefined, // 来源方式
  sizeUnit: undefined, // 尺寸单位
  sizeLong: undefined, // 通长
  sizeWidth: undefined, // 通宽
  sizeHigh: undefined, // 通高
  sizeDetail: undefined, // 具体尺寸
  sampleNum: undefined, // 实际数量
  numUnit: undefined, // 数量单位
  saveMethod: undefined, // 保藏方式
  relicTime: undefined, // 入藏时间范围
  relicTimeYear: undefined, // 入藏年度
  relicDesc: undefined, // 描述
  comment: undefined // 备注
})
const rules = {}

async function init() {
  form.relicsId = props.relicsId

  const res = await getSampleLibrary(props.relicsId)

  Object.assign(form, res?.data ?? {})
  if (form.relicsYears && typeof form.relicsYears === 'string') {
    form.relicsYears = Number(form.relicsYears)
  }
}
init()

const formRef = ref()
async function handleTabSubmit() {
  try {
    console.log('props?.proxy ===>', props?.proxy)
    if (!formRef.value) return
    await formRef.value.validate(async (valid, fields) => {
      if (valid) {
        form.relicsId = props.relicsId
        if (!form.id) {
          await addSampleLibrary(form)
          props?.proxy?.$modal?.msgSuccess('标本库指标保存成功')
          await init()
        } else {
          await editSampleLibrary(form)
          props?.proxy?.$modal?.msgSuccess('标本库指标保存成功')
          await init()
        }
      }
    })
  } catch (e) {
    console.error(e)
  }
}

async function audit() {
  if (!form.id) {
    return props?.proxy?.$modal?.msgSuccess('请先保存标本库指标')
  }
  await auditSampleLibrary(form)
  props?.proxy?.$modal?.msgSuccess('标本库指标提交审核成功')
}

defineExpose({ handleTabSubmit, audit })
</script>

<style lang="scss" scoped>
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

.tip-bottom {
  font-family: Source Han Serif CN;
  font-size: 16px;
  font-weight: normal;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-variation-settings: 'opsz';
  font-feature-settings: 'kern';
  color: #333333;
  margin-bottom: 60px;

  .module {
    text-decoration: underline;
    text-underline-offset: 3px;
    /* 文字与下划线之间的间距 */
  }
}
</style>
