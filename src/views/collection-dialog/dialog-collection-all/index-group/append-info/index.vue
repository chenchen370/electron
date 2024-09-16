<template>
  <el-form class="coder-wang-form" ref="formRef" :model="form" :rules="rules" label-width="auto" size="large" label-position="top">
    <el-card class="mb-21 coder-wang-card" header="类别" shadow="never">
      <el-row :gutter="45">
        <el-col :span="8">
          <el-form-item label="文物类别" prop="relicsCategory">
            <el-select v-model="form.relicsCategory" clearable :disabled="isDisabled" :placeholder="isDisabled ? ' ' : '请选择文物类别'" style="width: 100%">
              <el-option v-for="item in optionsInfo.options_artifact_type" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="藏品基本部类" prop="basicCategoriesCollectiblesCategory">
            <el-select
              v-model="form.basicCategoriesCollectiblesCategory"
              clearable
              :disabled="isDisabled"
              :placeholder="isDisabled ? ' ' : '请选择藏品基本部类'"
              style="width: 100%"
            >
              <el-option v-for="item in optionsInfo.options_basic_categories_collectibles" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="标本类别" prop="specimenCategory">
            <el-select v-model="form.specimenCategory" clearable :disabled="isDisabled" :placeholder="isDisabled ? ' ' : '请选择标本类别'" style="width: 100%">
              <el-option v-for="item in optionsInfo.options_specimen_category" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="45">
        <el-col :span="8">
          <el-form-item label="模型类别" prop="modelCategory">
            <el-select v-model="form.modelCategory" clearable :disabled="isDisabled" :placeholder="isDisabled ? ' ' : '请选择模型类别'" style="width: 100%">
              <el-option v-for="item in optionsInfo.options_model_category" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="复制品类别" prop="copyCategory">
            <el-select v-model="form.copyCategory" clearable :disabled="isDisabled" :placeholder="isDisabled ? ' ' : '请选择复制品类别'" style="width: 100%">
              <el-option v-for="item in optionsInfo.options_copy_category" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="其他藏品类别" prop="otherCollectionCategory">
            <el-input v-model="form.otherCollectionCategory" clearable :disabled="isDisabled" :placeholder="isDisabled ? ' ' : '请输入其他藏品类别'" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="mb-21 coder-wang-card" header="定级" shadow="never">
      <el-row :gutter="45">
        <el-col :span="8">
          <el-form-item label="文物级别" prop="relicLevelGrading">
            <!--            <el-input v-model="form.relicLevelGrading" :disabled="isDisabled" />-->
            <el-select v-model="form.relicLevelGrading" clearable :disabled="isDisabled" :placeholder="isDisabled ? ' ' : '请选择文物级别'" style="width: 100%">
              <el-option v-for="item in optionsInfo.options_artifact_level" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="文物藏品保密级别" prop="confidentialityLevelGrading">
            <!--            <el-input v-model="form.confidentialityLevelGrading" :disabled="isDisabled" />-->
            <el-select
              v-model="form.confidentialityLevelGrading"
              clearable
              :disabled="isDisabled"
              :placeholder="isDisabled ? ' ' : '请选择文物藏品保密级别'"
              style="width: 100%"
            >
              <el-option v-for="item in optionsInfo.options_collection_secrecy_level" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="标本藏品级别" prop="specimenLevelGrading">
            <el-input v-model="form.specimenLevelGrading" clearable :disabled="isDisabled" :placeholder="isDisabled ? ' ' : '请输入标本藏品级别'" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="mb-21 coder-wang-card" header="地域" shadow="never">
      <el-row :gutter="45">
        <el-col :span="8">
          <el-form-item label="地域类型" prop="regionalType">
            <!--            <el-input v-model="form.regionalType" :disabled="isDisabled" />-->
            <el-select v-model="form.regionalType" clearable :disabled="isDisabled" :placeholder="isDisabled ? ' ' : '请选择地域类型'" style="width: 100%">
              <el-option v-for="item in optionsInfo.options_regional_type" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="地域表示方式" prop="geographicalRepresentation">
            <!--            <el-input v-model="form.geographicalRepresentation" :disabled="isDisabled" />-->
            <el-select
              v-model="form.geographicalRepresentation"
              clearable
              :disabled="isDisabled"
              :placeholder="isDisabled ? ' ' : '请选择地域表示方式'"
              style="width: 100%"
            >
              <el-option v-for="item in optionsInfo.options_geographical_representation" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="地域" prop="region">
            <el-input v-model="form.region" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入地域'" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="mb-21 coder-wang-card" header="人文" shadow="never">
      <el-row :gutter="45">
        <el-col :span="8">
          <el-form-item label="人文类型" prop="humanitiesType">
            <!--            <el-input v-model="form.humanitiesType" :disabled="isDisabled" />-->
            <el-select v-model="form.humanitiesType" clearable :disabled="isDisabled" :placeholder="isDisabled ? ' ' : '请选择人文类型'" style="width: 100%">
              <el-option v-for="item in optionsInfo.options_humanities_type" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="人文表示方式" prop="humanisticRepresentation">
            <!--            <el-input v-model="form.humanisticRepresentation" :disabled="isDisabled" />-->
            <el-select
              v-model="form.humanisticRepresentation"
              clearable
              :disabled="isDisabled"
              :placeholder="isDisabled ? ' ' : '请选择人文表示方式'"
              style="width: 100%"
            >
              <el-option v-for="item in optionsInfo.options_humanistic_representation" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="人文" prop="humanity">
            <el-input v-model="form.humanity" clearable :disabled="isDisabled" :placeholder="isDisabled ? ' ' : '请输入人文'" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item label="人物传略" prop="biographiesCharacters">
        <el-input v-model="form.biographiesCharacters" clearable :disabled="isDisabled" :placeholder="isDisabled ? ' ' : '请输入人文'" />
      </el-form-item>
    </el-card>

    <el-card class="mb-21 coder-wang-card" header="功能" shadow="never">
      <el-row :gutter="45">
        <el-col :span="8">
          <el-form-item label="功能类别" prop="functionalCategories">
            <el-cascader
              v-model="form.functionalCategories"
              clearable
              :disabled="isDisabled"
              :placeholder="isDisabled ? ' ' : '请选择功能类别'"
              style="width: 100%"
              :options="optionsInfo.options_functional_categories"
              :props="{
                label: 'dictLabel',
                value: 'dictCode',
                children: 'children'
              }"
            />
            <!--            <el-input v-model="form.functionalCategories" :disabled="isDisabled" />-->
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="功能" prop="functions">
            <el-input v-model="form.functions" clearable :disabled="isDisabled" :placeholder="isDisabled ? ' ' : '请输入功能'" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="实际用途" prop="actualUse">
            <el-input v-model="form.actualUse" clearable :disabled="isDisabled" :placeholder="isDisabled ? ' ' : '请输入实际用途'" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="mb-21 coder-wang-card" header="工艺技法" shadow="never">
      <el-row :gutter="45">
        <el-col :span="8">
          <el-form-item label="成型工艺" prop="formingProcess">
            <el-input v-model="form.formingProcess" clearable :disabled="isDisabled" :placeholder="isDisabled ? ' ' : '请输入成型工艺'" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="流派类型" prop="genreType">
            <el-input v-model="form.genreType" clearable :disabled="isDisabled" :placeholder="isDisabled ? ' ' : '请输入流派类型'" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="流派" prop="school">
            <el-input v-model="form.school" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入流派'" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row :gutter="45">
        <el-col :span="8">
          <el-form-item label="绘画技法" prop="paintingTechniques">
            <el-input v-model="form.paintingTechniques" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入绘画技法'" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="装饰生成工艺" prop="decorationGenerationProcess">
            <el-input v-model="form.decorationGenerationProcess" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入装饰生成工艺'" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="文字生成工艺" prop="textGenerationProcess">
            <el-input v-model="form.textGenerationProcess" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入文字生成工艺'" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="mb-21 coder-wang-card" header="色泽" shadow="never">
      <el-row :gutter="45">
        <el-col :span="8">
          <el-form-item label="颜色类别" prop="colorCategory">
            <!--            <el-input v-model="form.colorCategory" :disabled="isDisabled" />-->
            <el-select v-model="form.colorCategory" clearable :disabled="isDisabled" :placeholder="isDisabled ? ' ' : '请选择颜色类别'" style="width: 100%">
              <el-option v-for="item in optionsInfo.options_color_category" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="颜色" prop="colour">
            <el-input v-model="form.colour" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入颜色'" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="光泽类别" prop="glossCategory">
            <el-input v-model="form.glossCategory" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入颜色'" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="光泽" prop="gloss">
            <el-input v-model="form.gloss" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入光泽'" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="mb-21 coder-wang-card" header="装饰" shadow="never">
      <el-row :gutter="45">
        <el-col :span="8">
          <el-form-item label="装饰形式类别" prop="decorativeFormCategories">
            <el-input v-model="form.decorativeFormCategories" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入装饰形式类别'" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="装饰题材类别" prop="decorativeThemeCategories">
            <el-cascader
              v-model="form.decorativeThemeCategories"
              clearable
              :disabled="isDisabled"
              :placeholder="isDisabled ? ' ' : '请选择装饰题材类别'"
              style="width: 100%"
              :options="optionsInfo.options_decorative_theme_categories"
              :props="{
                label: 'dictLabel',
                value: 'dictCode',
                children: 'children'
              }"
            />
            <!--            <el-select-->
            <!--              v-model="form.decorativeThemeCategories"-->
            <!--              clearable-->
            <!--              :disabled="isDisabled"-->
            <!--              :placeholder="isDisabled ? ' ' : '请选择装饰题材类别'"-->
            <!--              style="width: 100%"-->
            <!--            >-->
            <!--              <el-option v-for="item in optionsInfo.options_decorative_theme_categories" :key="item.value" :label="item.label" :value="item.label" />-->
            <!--            </el-select>-->
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="装饰组成方式" prop="decorationCompositionMethod">
            <!--            <el-input v-model="form.decorationCompositionMethod" :disabled="isDisabled" />-->
            <el-cascader
              v-model="form.decorationCompositionMethod"
              clearable
              :disabled="isDisabled"
              :placeholder="isDisabled ? ' ' : '请选择装饰组成方式'"
              style="width: 100%"
              :options="optionsInfo.options_decoration_composition_method"
              :props="{
                label: 'dictLabel',
                value: 'dictCode',
                children: 'children'
              }"
            />
            <!--            <el-select-->
            <!--              v-model="form.decorationCompositionMethod"-->
            <!--              clearable-->
            <!--              :disabled="isDisabled"-->
            <!--              :placeholder="isDisabled ? ' ' : '请选择装饰组成方式'"-->
            <!--              style="width: 100%"-->
            <!--            >-->
            <!--              <el-option v-for="item in optionsInfo.options_decoration_composition_method" :key="item.value" :label="item.label" :value="item.label" />-->
            <!--            </el-select>-->
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="施饰部位" prop="decorativeParts">
            <el-input v-model="form.decorativeParts" clearable :disabled="isDisabled" :placeholder="isDisabled ? ' ' : '请输入施饰部位'" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="主题装饰情况" prop="themeDecorationSituation">
            <el-input v-model="form.themeDecorationSituation" clearable :disabled="isDisabled" :placeholder="isDisabled ? ' ' : '请输入主题装饰情况'" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <!--  这里原来都是富文本   -->
    <el-card class="mb-21 coder-wang-card" header="题识" shadow="never">
      <el-row :span="24" :gutter="45">
        <el-col :span="8">
          <el-form-item label="铭文" prop="inscription">
            <el-input v-model="form.inscription" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入铭文'" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="款识" prop="styleRecognition">
            <el-input v-model="form.styleRecognition" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入款识'" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="题跋" prop="inscriptionPostscript">
            <el-input v-model="form.inscriptionPostscript" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入题跋'" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="题名" prop="title">
            <el-input v-model="form.title" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入题名'" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="印鉴" prop="seal">
            <el-input v-model="form.seal" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入印鉴'" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="内容提要" prop="contentSummary">
            <el-input v-model="form.contentSummary" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入内容提要'" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="mb-21 coder-wang-card" header="文字" shadow="never">
      <el-row :gutter="45">
        <el-col :span="8">
          <el-form-item label="文字种类" prop="textType">
            <el-input v-model="form.textType" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入文字种类'" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="字体类别" prop="fontCategory">
            <el-input v-model="form.fontCategory" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入字体类别'" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="字迹颜色" prop="handwritingColor">
            <el-input v-model="form.handwritingColor" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入字迹颜色'" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="文字生成工艺" prop="generationProcessText">
        <el-input v-model="form.generationProcessText" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入文字生成工艺'" />
      </el-form-item>
    </el-card>

    <el-card class="mb-21 coder-wang-card" header="自然特征" shadow="never">
      <el-row :gutter="45">
        <el-col :span="8">
          <el-form-item label="化石类别" prop="fossilCategories">
            <el-select v-model="form.fossilCategories" clearable :disabled="isDisabled" :placeholder="isDisabled ? ' ' : '请选择化石类别'" style="width: 100%">
              <el-option v-for="item in optionsInfo.options_fossil_categories" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="性别" prop="gender">
            <el-input v-model="form.gender" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入性别'" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="模式类别" prop="patternCategory">
            <el-input v-model="form.patternCategory" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入模式类别'" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="发育阶段" prop="developmentalStage">
            <el-input v-model="form.developmentalStage" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入发育阶段'" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="化石" prop="fossil">
            <el-input v-model="form.fossil" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入化石'" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>
  </el-form>
</template>

<script setup>
import { addAppendInfo, auditAppendInfo, editAppendInfo, getAppendInfo } from '@/api/collection-all/index-group/append-info'
import optionsInfo from './options'
import { addBaseInfo, editBaseInfo } from '@/api/collection-all/index-group/base-info'
import { auditBaseCaseDesc } from '@/api/collection-all/index-group/base-case-desc'

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

const isDisabled = computed(() => {
  return props.handleStatus === 'check'
})

const form = reactive({
  id: undefined, // id
  relicsId: undefined, // 文物藏品基本信息id

  // 类别
  relicsCategory: undefined, // 文物类别
  basicCategoriesCollectiblesCategory: undefined, // 藏品基本部类
  specimenCategory: undefined, // 标本类别
  modelCategory: undefined, // 模型类别
  copyCategory: undefined, // 复制品类别
  otherCollectionCategory: undefined, // 其他藏品类别

  // 顶级
  relicLevelGrading: undefined, // 文物级别
  confidentialityLevelGrading: undefined, // 文物藏品保密级别
  specimenLevelGrading: undefined, // 标本藏品级别

  // 地域
  regionalType: undefined, // 地域类型
  geographicalRepresentation: undefined, // 地域表示方式
  region: undefined, // 地域

  // 人文
  humanitiesType: undefined, // 人文类型
  humanisticRepresentation: undefined, // 人文表示方式
  humanity: undefined, // 人文
  biographiesCharacters: undefined, // 人物传略

  // 功能
  functionalCategories: undefined, // 功能类别
  functions: undefined, // 功能
  actualUse: undefined, // 实际用途

  // 工艺技法
  formingProcess: undefined, // 成型工艺
  genreType: undefined, // 流派类型
  school: undefined, // 流派
  paintingTechniques: undefined, // 绘画技法
  decorationGenerationProcess: undefined, // 装饰生成工艺
  textGenerationProcess: undefined, // 文字生成工艺

  // 色泽
  colorCategory: undefined, // 颜色类别
  colour: undefined, // 颜色
  glossCategory: undefined, // 光泽类别
  gloss: undefined, // 光泽

  // 装饰
  decorativeFormCategories: undefined, // 装饰形式类别
  decorativeThemeCategories: undefined, // 装饰题材类别
  decorationCompositionMethod: undefined, // 装饰组成方式
  decorativeParts: undefined, // 施饰部位
  themeDecorationSituation: undefined, // 主题装饰情况

  // 题识
  inscription: undefined, // 铭文
  styleRecognition: undefined, // 款识
  inscriptionPostscript: undefined, // 题跋
  title: undefined, // 题名
  seal: undefined, // 印鉴
  contentSummary: undefined, // 内容提要

  // 文字
  textType: undefined, // 文字种类
  fontCategory: undefined, // 字体类别
  handwritingColor: undefined, // 字迹颜色
  generationProcessText: undefined, // 文字生成工艺

  // 自然特征
  fossilCategories: undefined, // 化石类别
  gender: undefined, // 性别
  patternCategory: undefined, // 模式类别
  developmentalStage: undefined, // 发育阶段
  fossil: undefined // 化石
})
const rules = {
  relicsCategory: [
    {
      required: true,
      message: ''
    }
  ],
  relicLevelGrading: [
    {
      required: true,
      message: ''
    }
  ]
}
async function init() {
  form.relicsId = props.relicsId

  const res = await getAppendInfo(props.relicsId)
  console.log('append info res ===> ', res)

  if (res?.data) {
    Object?.keys(form).forEach(key => {
      form[key] = res?.data?.[key]
    })
    if (form?.functionalCategories) {
      form.functionalCategories = Number(form.functionalCategories)
    }
    if (form?.decorativeThemeCategories) {
      form.decorativeThemeCategories = Number(form.decorativeThemeCategories)
    }
    if (form?.decorationCompositionMethod) {
      form.decorationCompositionMethod = Number(form.decorationCompositionMethod)
    }
  }
}

init()

const formRef = ref()
async function submit() {
  console.log('props?.proxy ===>', props?.proxy)
  if (!formRef.value) return
  await formRef.value.validate(async (valid, fields) => {
    if (valid) {
      const params = JSON.parse(JSON.stringify(form))
      params.relicsId = props.relicsId
      if (form?.functionalCategories && form.functionalCategories.length > 0) {
        params.functionalCategories = form?.functionalCategories[form.functionalCategories.length - 1]
      }
      if (form?.decorativeThemeCategories && form.decorativeThemeCategories.length > 0) {
        params.decorativeThemeCategories = form?.decorativeThemeCategories[form.decorativeThemeCategories.length - 1]
      }
      if (form?.decorationCompositionMethod && form.decorationCompositionMethod.length > 0) {
        params.decorationCompositionMethod = form?.decorationCompositionMethod[form.decorationCompositionMethod.length - 1]
      }
      if (!params.id) {
        await addAppendInfo(params)
        props?.proxy?.$modal?.msgSuccess('附属信息保存成功')
        await init()
      } else {
        await editAppendInfo(params)
        props?.proxy?.$modal?.msgSuccess('附属信息保存成功')
        await init()
      }
    }
  })
}
async function audit() {
  if (!form.id) {
    return props?.proxy?.$modal?.msgSuccess('请先保存附属信息')
  }
  await auditAppendInfo(form)
  props?.proxy?.$modal?.msgSuccess('附属信息提交审核成功')
}
defineExpose({ submit, audit })
</script>

<style lang="scss" scoped>
.mb-21 {
  margin-bottom: 21px;
}
</style>
