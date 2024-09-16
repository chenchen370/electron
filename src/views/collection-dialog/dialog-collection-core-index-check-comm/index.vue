<template>
  <el-dialog class="coder-wang-dialog" v-model="open" width="1280px" append-to-body
    :before-close="handleCloseCollectionCoreIndex" align-center :show-close="false">
    <template #header="{ titleId, titleClass }">
      <span class="detail-title">藏品核心指标详情</span>
    </template>

    <el-scrollbar :height="`calc(100vh - 280px)`">
      <el-form class="coder-wang-form" ref="thingRef" :model="form" :rules="rules" label-width="auto"
        label-position="top" size="large">
        <el-row :span="24" :gutter="46">
          <el-col :span="8">
            <el-form-item label="藏品编号" prop="relicId">
              <el-input v-model="form.relicId" clearable :readonly="isReadonly"
                :placeholder="isReadonly ? '' : '请输入藏品编号'">
                <template #prepend>
                  <el-select v-model="form.relicIdType" clearable :readonly="isReadonly"
                    :placeholder="isReadonly ? ' ' : '请选择编号类型'" style="width: 100%">
                    <el-option v-for="item in optionsInfo?.options_collection_number_name" :key="item.value"
                      :label="item.label" :value="item.value" />
                  </el-select>
                </template>
              </el-input>
            </el-form-item>

            <el-form-item label="收入号" prop="">
              <el-input :readonly="isReadonly" />
            </el-form-item>

            <el-form-item label="原名" prop="relicRealName">
              <el-input v-model="form.relicRealName" :readonly="isReadonly" />
            </el-form-item>

            <el-form-item label="文物类别" prop="relicCategory">
              <el-input v-model="form.relicCategory" :readonly="isReadonly" />
            </el-form-item>

            <el-form-item label="文物级别" prop="relicLevel">
              <el-input v-model="form.relicLevel" :readonly="isReadonly" />
            </el-form-item>

            <el-form-item label="外形尺寸" prop="sizeUnit">
              <el-row :size="0" :gutter="12">
                <el-col :span="12" class="size-unit-input-wrap">
                  <span class="title">单位</span>
                  <el-input class="size-unit-input right" v-model="form.sizeUnit" :readonly="isReadonly">
                    <!--                    <template #append>-->
                    <!--                      <span class="input-tip"> {{ form.sizeUnit }} </span>-->
                    <!--                    </template>-->
                  </el-input>
                </el-col>

                <el-col :span="12" class="size-unit-input-wrap">
                  <span class="title">通长</span>
                  <el-input class="size-unit-input" v-model="form.sizeLong" :readonly="isReadonly">
                    <template #append>
                      <span class="input-tip" v-if="form.sizeUnit"> {{ form.sizeUnit }} </span>
                    </template>
                  </el-input>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="实际数量" prop="relicNum">
              <el-input v-model="form.relicNum" :readonly="isReadonly" />
            </el-form-item>

            <el-form-item label="保存状态" prop="relicState">
              <el-input v-model="form.relicState" :readonly="isReadonly" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="藏品分类号" prop="relicId">
              <el-input v-model="form.relicId" :readonly="isReadonly" />
            </el-form-item>

            <el-form-item label="名称" prop="relicName">
              <el-input v-model="form.relicName" :readonly="isReadonly" />
            </el-form-item>

            <el-form-item label="质地类别" prop="relicMaterial">
              <el-input v-model="form.relicMaterial" :readonly="isReadonly" />
            </el-form-item>

            <el-form-item label="年代" prop="relicYears">
              <el-input v-model="form.relicYears" :readonly="isReadonly" />
            </el-form-item>

            <el-form-item label="质量范围" prop="massRange">
              <el-input v-model="form.massRange" :readonly="isReadonly" />
            </el-form-item>

            <el-form-item label="" prop="" style="padding-top: 34px">
              <el-row :size="0" :gutter="12">
                <el-col :span="12" class="size-unit-input-wrap">
                  <span class="title">通宽</span>
                  <el-input class="size-unit-input" v-model="form.sizeWidth" :readonly="isReadonly">
                    <template #append>
                      <span class="input-tip" v-if="form.sizeUnit"> {{ form.sizeUnit }} </span>
                    </template>
                  </el-input>
                </el-col>

                <el-col :span="12" class="size-unit-input-wrap">
                  <span class="title">通高</span>
                  <el-input class="size-unit-input" v-model="form.sizeHigh" :readonly="isReadonly">
                    <template #append>
                      <span class="input-tip" v-if="form.sizeUnit"> {{ form.sizeUnit }} </span>
                    </template>
                  </el-input>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item label="文物来源" prop="relicFrom">
              <el-input v-model="form.relicFrom" :readonly="isReadonly" />
            </el-form-item>

            <el-form-item label="完残程度" prop="relicCompleteness">
              <el-input v-model="form.relicCompleteness" :readonly="isReadonly" />
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item>
              <image-preview :height="230" :width="350" style="margin-top: 34px" :src="form.relicPath" />
            </el-form-item>

            <el-form-item label="具体年代" prop="relicYearsDetail">
              <el-input v-model="form.relicYearsDetail" :readonly="isReadonly" />
            </el-form-item>

            <el-form-item label="具体质量" prop="massDetail">
              <el-input v-model="form.massDetail" :readonly="isReadonly" />
            </el-form-item>

            <el-form-item label="具体尺寸" prop="sizeDetail">
              <el-input v-model="form.sizeDetail" :readonly="isReadonly" />
            </el-form-item>

            <el-form-item label="具体来源" prop="relicFromDetail">
              <el-input v-model="form.relicFromDetail" :readonly="isReadonly" />
            </el-form-item>

            <el-form-item label="完残状况" prop="relicStatus">
              <el-input v-model="form.relicStatus" :readonly="isReadonly" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="流传经历">
          <el-table border :data="tableDataPass">
            <el-table-column label="收藏机构" align="center" prop="collectionOrganization" />
            <el-table-column label="收藏人" align="center" prop="collectors" />
            <el-table-column label="起始时间" align="center" prop="startTime">
              <template #default="scope">
                {{ parseTime(scope.row.startTime) }}
              </template>
            </el-table-column>

            <el-table-column label="结束时间" align="center" prop="endTime">
              <template #default="scope">
                {{ parseTime(scope.row.endTime) }}
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>

        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" :readonly="isReadonly" />
        </el-form-item>

        <el-form-item label="当前保存情况" prop="remark" style="width: 100%">
          <el-row class="save-item">库房：{{ form.relicWarehouse }}</el-row>
          <el-row class="save-item" style="border-top: none">监测状态：{{ monitorStatus }}</el-row>
        </el-form-item>

        <div class="audit-info">
          <span class="title">审核信息</span>
          <div class="cont">
            <div class="item" v-for="(item, index) in isShowALLAuditList ? auditList : auditList.slice(0, 6)"
              :key="index">
              <span>2017-11-25 15:00:00</span>
              <span>数据导入</span>
              <span>多媒体信息审核 {{ item }}</span>
            </div>

            <span class="is-all" v-if="auditList.length > 6" @click="handleIsShowAllAuditList">
              {{ isShowALLAuditList ? '收起全部' : '显示全部' }}
            </span>
          </div>
        </div>
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
  relicStatus: undefined, // 完残状况

  relicId: undefined, // 藏品总登记号
  relicLevel: undefined, // 文物级别
  relicMaterial: undefined, // 质地类别
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

// options
const api_options = reactive({
  loading: false,
  options_house: []
})

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
    &.right {
      :deep(input) {
        text-align: right !important;
      }
    }

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
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  span {
    font-family: Source Han Serif CN;
    font-size: 16px;
    font-weight: normal;
    line-height: normal;

    font-variation-settings: 'opsz';
    font-feature-settings: 'kern';
    color: #333333;
    margin-right: 41px;
  }

  .title {
    margin-right: 45px;
  }

  .cont {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    .item {
      margin-bottom: 8px;
    }

    .is-all {
      cursor: pointer;
      text-decoration: underline;
      text-underline-offset: 3px;
      /* 文字与下划线之间的间距 */
      color: #3a6eff;
    }
  }
}
</style>
