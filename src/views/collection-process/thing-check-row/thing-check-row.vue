<template>
  <el-dialog class="by-el-dialog" v-model="open" width="1280px" append-to-body :before-close="handleCancel" align-center
    :show-close="false">
    <template #header="{ titleId, titleClass }">
      <span class="detail-title">藏品核心指标详情</span>
    </template>

    <el-scrollbar :height="`calc(100vh - 280px)`">
      <el-form class="by-form-dialog" ref="thingRef" :model="form" :rules="rules" label-width="auto"
        label-position="top" size="large">
        <el-row :span="24" class="top">
          <div class="left">
            <el-row :span="24" :gutter="50">
              <el-col :span="24">
                <el-form-item label="名称" prop="relicName">
                  <el-input v-model="form.relicName" :readonly="isReadonly" />
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="藏品编号" prop="relicId">
                  <el-input v-model="form.relicId" :readonly="isReadonly" />
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="文物级别" prop="relicLevel">
                  <el-input v-model="form.relicLevel" :readonly="isReadonly" />
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="文物类别" prop="relicCategory">
                  <el-input v-model="form.relicsCategory" :readonly="isReadonly" />
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="实际数量" prop="relicNum">
                  <el-input v-model="form.relicNum" :readonly="isReadonly" />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="right">
            <image-preview :height="235" :width="350" style="margin-top: 34px" :src="form.relicPath" />
          </div>
        </el-row>

        <el-row :span="24" :gutter="50">
          <el-col :span="8">
            <el-form-item label="质量范围" prop="massRange">
              <el-input v-model="form.massRange" :readonly="isReadonly" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="入藏时间范围" prop="relicTime">
              <el-input v-model="form.relicTime" :readonly="isReadonly" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="质地类别" prop="textureCategory">
              <el-input v-model="form.textureCategory" :readonly="isReadonly" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="具体年代" prop="relicYearsDetail">
              <el-input v-model="form.relicYearsDetail" :readonly="isReadonly" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="入藏年代" prop="relicTimeYear">
              <el-input v-model="form.relicTimeYear" :readonly="isReadonly" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="文物来源" prop="relicFrom">
              <el-input v-model="form.relicFrom" :readonly="isReadonly" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="具体尺寸" prop="sizeDetail">
              <el-input v-model="form.sizeDetail" :readonly="isReadonly" />
            </el-form-item>
          </el-col>

          <el-col :span="16">
            <el-form-item label="单位" prop="sizeUnit">
              <el-space :size="0">
                <el-input v-model="form.sizeUnit" :readonly="isReadonly" class="size-unit-input"
                  style="margin-right: 19px">
                  <template #append>
                    <span class="input-tip-1">厘米（cm）</span>
                  </template>
                </el-input>

                <el-input v-model="form.sizeLong" :readonly="isReadonly" style="margin-right: 19px">
                  <template #prepend>
                    <span class="input-tip">通长</span>
                  </template>
                </el-input>

                <el-input v-model="form.sizeWidth" :readonly="isReadonly" style="margin-right: 19px">
                  <template #prepend>
                    <span class="input-tip">通宽</span>
                  </template>
                </el-input>

                <el-input v-model="form.sizeHigh" :readonly="isReadonly">
                  <template #prepend>
                    <span class="input-tip">通高</span>
                  </template>
                </el-input>
              </el-space>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="年代" prop="relicYears">
              <el-input v-model="form.relicYears" :readonly="isReadonly" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="原名" prop="relicRealName">
              <el-input v-model="form.relicRealName" :readonly="isReadonly" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="完残程度" prop="relicCompleteness">
              <el-input v-model="form.relicCompleteness" :readonly="isReadonly" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-scrollbar>
    <template #footer>
      <div class="dialog-footer">
        <el-button class="button-c-sure" type="primary" @click="handleCheckAll">查阅全部指标</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import options_info from './options'
import { getPassOnExperience } from '@/api/collection-all/manage-work/pass-on-experience'

const props = defineProps({
  currentRow: {
    type: Object,
    default: () => ({})
  }
})

const open = ref(true)
const isReadonly = ref(true)
const form = reactive({
  massDetail: undefined, // 具体质量
  massRange: undefined, // 质量范围
  massUnit: undefined, // 质量单位
  numUnit: undefined, // 数量单位
  relicCategory: undefined, // 藏品类别
  relicCategoryNo: undefined, // 藏品分类号
  relicCompleteness: undefined, // 完残程度
  relicDesc: undefined, // 形态特征
  relicFrom: undefined, // 藏品来源
  relicFromDetail: undefined, // 具体来源
  relicId: undefined, // 藏品总登记号
  relicLevel: undefined, // 文物级别
  relicMaterial: undefined, // 藏品材质
  relicName: undefined, // 藏品名称
  relicNum: undefined, // 实际数量
  relicPath: undefined, // 藏品主图
  relicPosition: undefined, // 藏品地域
  relicRealName: undefined, //
  relicShare: undefined, // 藏品是否共享
  relicState: undefined, // 文物保存状态
  relicTag: undefined, // 独特标记
  relicTime: undefined, // 入藏时间
  relicTimeYear: undefined, // 入藏年度
  relicWarehouse: undefined, // 藏品存储库房
  relicYears: undefined, // 藏品年代
  relicYearsDetail: undefined, // 具体年代
  sizeDetail: undefined, // 具体尺寸
  sizeUnit: undefined // 尺寸单位
})

const rules = {
  relicName: [
    {
      required: true,
      message: ''
    }
  ],
  relicYears: [
    {
      required: true,
      message: ''
    }
  ],
  relicYearsDetail: [
    {
      required: true,
      message: ''
    }
  ],
  relicNum: [
    {
      required: true,
      message: ''
    }
  ],
  massUnit: [
    {
      required: true,
      message: ''
    }
  ],
  textureCategory: [
    {
      required: true,
      message: ''
    }
  ],
  massDetail: [
    {
      required: true,
      message: ''
    }
  ],
  massRange: [
    {
      required: true,
      message: ''
    }
  ],
  sizeUnit: [
    {
      required: true,
      message: ''
    }
  ],

  relicCompleteness: [
    {
      required: true,
      message: ''
    }
  ],
  relicCategory: [
    {
      required: true,
      message: ''
    }
  ],
  relicLevel: [
    {
      required: true,
      message: ''
    }
  ],
  relicId: [
    {
      required: true,
      message: ''
    }
  ],
  relicTime: [
    {
      required: true,
      message: ''
    }
  ],
  relicFrom: [
    {
      required: true,
      message: ''
    }
  ]
}

watch(
  () => props.currentRow,
  val => {
    if (val) {
      Object?.keys(val).forEach(key => {
        form[key] = val[key]
      })
    }
  },
  {
    deep: true,
    immediate: true
  }
)
const emits = defineEmits(['handleSureRow', 'handleCancelRow', 'handleCheckAll'])
function handleSure() {
  emits('handleSureRow')
}
function handleCancel() {
  emits('handleCancelRow')
}

function handleCheckAll() {
  emits('handleCheckAll')
}

const tableDataPass = ref([])
async function getList() {
  const res = await getPassOnExperience({
    pageNum: 1,
    pageSize: 5,
    relicsId: props.relicsId
  })
  tableDataPass.value = res?.data?.records ?? []
}
getList()
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  .left {
    flex: 1;
    box-sizing: border-box;
    padding-right: 50px;
  }
}

:deep(.el-input-group__prepend) {
  padding: 0 !important;
}

:deep(.el-input-group__append) {
  background: transparent;
  padding: 0 !important;
}

.input-tip {
  display: inline-block !important;
  width: 100%;
  border-top: 1px solid #aec2bd;
  border-bottom: 1px solid #aec2bd;
  border-left: 1px solid #aec2bd;
  //padding: 0 26px;
  padding-left: 26px;
  padding-right: 26px;
}

.input-tip-1 {
  display: inline-block !important;
  width: 100%;
  border-top: 1px solid #aec2bd;
  border-bottom: 1px solid #aec2bd;
  border-right: 1px solid #aec2bd;
  padding-right: 0px;
}

.input-tip,
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

.el-scrollbar {

  //box-sizing: border-box;
  :deep(.el-scrollbar__bar.is-horizontal) {
    height: 0;
    width: 0;
  }
}

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
</style>
