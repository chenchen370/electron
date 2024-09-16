<template>
  <el-dialog class="coder-wang-dialog" v-model="open" width="1624px" append-to-body
    :before-close="handleCloseCollectionCoreIndex" align-center :show-close="false">
    <template #header="{ titleId, titleClass }">
      <span class="detail-title">藏品核心指标</span>
    </template>

    <el-scrollbar :height="`calc(100vh - 280px)`">
      <el-form class="coder-wang-form" ref="thingRef" :model="form" :rules="rules" label-width="auto"
        label-position="right" size="large">
        <el-row :span="24" :gutter="50">
          <el-col :span="12" class="left">
            <el-row :span="24" :gutter="50">
              <el-col :span="12">
                <el-form-item label="名称" prop="relicName">
                  <el-input v-model="form.relicName" :readonly="isReadonly" />
                </el-form-item>

                <el-form-item label="文物级别" prop="relicLevel">
                  <el-input v-model="form.relicLevel" :readonly="isReadonly" />
                </el-form-item>

                <el-form-item label="实际数量" prop="relicNum">
                  <el-input v-model="form.relicNum" :readonly="isReadonly" />
                </el-form-item>

                <el-form-item label="保存状态" prop="relicState">
                  <el-input v-model="form.relicState" :readonly="isReadonly" />
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="藏品编号" prop="relicId">
                  <el-input v-model="form.relicId" :readonly="isReadonly" />
                </el-form-item>

                <el-form-item label="质地类别" prop="textureCategory">
                  <el-input v-model="form.textureCategory" :readonly="isReadonly" />
                </el-form-item>

                <el-form-item label="文物来源" prop="relicFrom">
                  <el-input v-model="form.relicFrom" :readonly="isReadonly" />
                </el-form-item>

                <el-form-item label="完残程度" prop="relicCompleteness">
                  <el-input v-model="form.relicCompleteness" :readonly="isReadonly" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :span="24" :gutter="29">
              <el-form-item label="单位" style="width: 100%">
                <el-col :span="6">
                  <el-input class="size-unit-input" v-model="form.sizeUnit" :readonly="isReadonly"
                    style="width: 100%" />
                </el-col>
                <el-col :span="6">
                  <el-input class="size-unit-input" v-model="form.sizeLong" :readonly="isReadonly" style="width: 100%">
                    <template #prepend>
                      <span class="input-tip"> 通长 </span>
                    </template>
                  </el-input>
                </el-col>
                <el-col :span="6">
                  <el-input class="size-unit-input" v-model="form.sizeWidth" :readonly="isReadonly" style="width: 100%">
                    <template #prepend>
                      <span class="input-tip"> 通宽 </span>
                    </template>
                  </el-input>
                </el-col>
                <el-col :span="6">
                  <el-input class="size-unit-input" v-model="form.sizeHigh" :readonly="isReadonly" style="width: 100%">
                    <template #prepend>
                      <span class="input-tip"> 通高 </span>
                    </template>
                  </el-input>
                </el-col>
              </el-form-item>
            </el-row>

            <el-row :span="24" :gutter="50">
              <el-col :span="12">
                <el-form-item label="原名" prop="relicRealName">
                  <el-input v-model="form.relicRealName" :readonly="isReadonly" />
                </el-form-item>

                <el-form-item label="具体质量" prop="massDetail">
                  <el-input v-model="form.massDetail" :readonly="isReadonly" />
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="收入号" prop="">
                  <el-input :readonly="isReadonly" />
                </el-form-item>

                <el-form-item label="具体来源" prop="relicFromDetail">
                  <el-input v-model="form.relicFromDetail" :readonly="isReadonly" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="完残状况" prop="relicStatus">
              <el-input v-model="form.relicStatus" :readonly="isReadonly" />
            </el-form-item>

            <el-form-item label="当前保存情况" prop="">
              <el-input :readonly="isReadonly" />
            </el-form-item>
          </el-col>

          <el-col :span="12" class="right">
            <el-row :span="24" :gutter="50">
              <el-col :span="12">
                <el-form-item label="文物类别" prop="relicCategory">
                  <el-input v-model="form.relicsCategory" :readonly="isReadonly" />
                </el-form-item>

                <el-form-item label="质量范围" prop="massRange">
                  <el-input v-model="form.massRange" :readonly="isReadonly" />
                </el-form-item>

                <el-form-item label="具体尺寸" prop="sizeDetail">
                  <el-input v-model="form.sizeDetail" :readonly="isReadonly" />
                </el-form-item>

                <el-form-item label="入藏时间范围" prop="relicTimeRange">
                  <el-input v-model="form.relicTimeRange" :readonly="isReadonly" />
                </el-form-item>

                <el-form-item label="年代" prop="relicYears">
                  <el-input v-model="form.relicYears" :readonly="isReadonly" />
                </el-form-item>

                <el-form-item label="藏品分类号" prop="relicCategoryNo">
                  <el-input v-model="form.relicCategoryNo" :readonly="isReadonly" />
                </el-form-item>

                <el-form-item label="库房（库区）名称" prop="relicWarehouse">
                  <el-input v-model="form.relicWarehouse" :readonly="isReadonly" />
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item>
                  <image-preview :height="285" style="width: 100%" :src="form.relicPath" />
                </el-form-item>

                <el-form-item label="具体年代" prop="relicYearsDetail">
                  <el-input v-model="form.relicYearsDetail" :readonly="isReadonly" />
                </el-form-item>

                <el-form-item label="入藏年度" prop="relicTimeYear">
                  <el-input v-model="form.relicTimeYear" :readonly="isReadonly" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="备注" prop="remarks">
              <el-input v-model="form.remarks" :readonly="isReadonly" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :span="24" :gutter="50">
          <el-col :span="12">
            <el-form-item label="流传经历" prop="">
              <el-table border :data="tableDataPass">
                <el-table-column label="收藏机构" align="center" prop="collectionOrganization" />
                <el-table-column label="收藏人" align="center" prop="collectors" />
                <el-table-column label="起始时间" align="center" prop="startTime" width="180">
                  <template #default="scope">
                    {{ parseTime(scope.row.startTime) }}
                  </template>
                </el-table-column>

                <el-table-column label="结束时间" align="center" prop="endTime" width="180">
                  <template #default="scope">
                    {{ parseTime(scope.row.endTime) }}
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="审核信息" prop="">
              <div class="audit-info">
                <el-scrollbar style="width: 100%">
                  <div class="item" v-for="(item, index) in auditList" :key="index">
                    <span class="time">2017-11-25 15:00:00</span>
                    <span class="info">张三</span>
                    <span class="status"> 审核通过</span>
                  </div>
                </el-scrollbar>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-scrollbar>
    <template #footer>
      <div class="dialog-footer">
        <el-button class="button-c-sure" type="primary" @click="handleCheckCollectionAll">查阅全部指标</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { getPassOnExperience } from '@/api/collection-all/manage-work/pass-on-experience'
import { parseTime } from '@/utils/zhebo'
import { detailWarehouse, getWarehouseAllList } from '@/api/artifact/warehouse'

const props = defineProps({
  currentRow: {
    type: Object,
    default: () => ({})
  },
  relicsId: {
    type: [String, Number],
    default: null
  },
  optionsInfo: {
    type: Object,
    default: () => ({})
  }
})

const open = ref(true)
const isReadonly = ref(true)
const form = reactive({
  relicName: undefined, // 藏品名称
  relicId: undefined, // 藏品总登记号
  relicCategory: undefined, // 文物类别
  relicLevel: undefined, // 文物级别
  relicMaterial: undefined, // 质地类别
  massRange: undefined, // 质量范围
  relicNum: undefined, // 实际数量
  relicFrom: undefined, // 文物来源
  sizeDetail: undefined, // 具体尺寸
  relicState: undefined, // 文物保存状态
  relicCompleteness: undefined, // 完残程度
  relicTimeRange: undefined, // 入藏时间范围
  sizeUnit: undefined, // 尺寸单位
  sizeLong: undefined, // 通长
  sizeWidth: undefined, // 通宽
  sizeHigh: undefined, // 通高
  relicYears: undefined, // 年代
  relicRealName: undefined, // 原名
  relicCategoryNo: undefined, // 藏品分类号
  relicYearsDetail: undefined, // 具体年代
  massDetail: undefined, // 具体质量
  relicFromDetail: undefined, // 具体来源
  relicWarehouse: undefined, // 库房（库区）名称
  relicTimeYear: undefined, // 入藏年度
  relicStatus: undefined, // 完残状况
  remarks: undefined, // 备注

  massUnit: undefined, // 质量单位
  numUnit: undefined, // 数量单位
  relicDesc: undefined, // 形态特征
  relicPath: undefined, // 藏品主图
  relicPosition: undefined, // 藏品地域
  relicShare: undefined, // 藏品是否共享
  relicTag: undefined, // 独特标记
  relicTime: undefined // 入藏时间
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
  relicMaterial: [
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
      getMonitorStatus()
    }
  },
  {
    deep: true,
    immediate: true
  }
)
const emits = defineEmits(['handleCloseCollectionCoreIndex', 'handleCheckCollectionAll'])

function handleCloseCollectionCoreIndex() {
  emits('handleCloseCollectionCoreIndex')
}

function handleCheckCollectionAll() {
  emits('handleCheckCollectionAll')
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

// 审核信息列表
const auditList = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
const isShowALLAuditList = ref(false)
function handleIsShowAllAuditList() {
  isShowALLAuditList.value = !isShowALLAuditList.value
}

// 库房
const monitorStatus = ref('')
async function getMonitorStatus() {
  try {
    const list = await getWarehouseAllList({ pageNum: 1, pageSize: 999, isShow: 0 })
    const info = list?.row?.find(item => item.houseName == form.relicWarehouse)
    if (info?.houseId) {
      const detail = await detailWarehouse(info.houseId ?? 'KF0001')
      console.log('--------------', detail)
    }
  } catch (e) { }
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

:deep(.el-form) {
  .el-form-item__label-wrap {
    align-items: flex-start !important;
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
  padding-left: 8px;
  padding-right: 8px;
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
    :deep(.el-input__wrapper) {
      border-right: none;
      border-top: 1px solid #aec2bd;
      border-bottom: 1px solid #aec2bd;
      border-left: 1px solid #aec2bd;
      //border: 1px solid red !important;
      box-shadow: none !important;
    }
  }
}

.save-item {
  width: 100%;
  height: 40px;
  border-radius: 2px;
  opacity: 1;

  background: #f8f9f4;

  box-sizing: border-box;
  border: 1px solid #aec2bd;

  font-family: Source Han Serif CN;
  font-size: 16px;
  font-weight: normal;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: center;

  font-variation-settings: 'opsz';
  font-feature-settings: 'kern';
  color: #333333;
}

.audit-info {
  height: 130px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  box-sizing: border-box;
  border: 1px solid #aec2bd;
  padding: 0px 0px 0 30px;

  span {
    font-family: Source Han Serif CN;
    font-size: 16px;
    font-weight: normal;
    line-height: 16px;

    font-variation-settings: 'opsz';
    font-feature-settings: 'kern';
    color: #333333;
  }

  .item {

    //margin-bottom: 8px;
    .time {
      color: #999999;
      margin-right: 110px;
    }

    .info {
      margin-right: 46px;
    }

    .status {
      color: #0f9e4a;
    }
  }
}
</style>
