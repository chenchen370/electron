<template>
  <el-form class="coder-wang-form" ref="formRef" :model="form" :rules="rules" label-width="auto" size="large" label-position="top">
    <el-row :gutter="75">
      <el-col :span="8">
        <el-form-item label="收藏单位" prop="collectionUnit">
          <el-input v-model="form.collectionUnit" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入收藏单位'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="收入号" prop="incomeNumber">
          <el-input v-model="form.incomeNumber" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入收入号'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="藏品编号" prop="number">
          <el-input v-model="form.number" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入藏品编号'" style="width: 100%">
            <template #prepend>
              <el-select
                v-model="form.collectionNumberName"
                clearable
                :disabled="isDisabled"
                :placeholder="isDisabled ? ' ' : '请选择编号类型'"
                style="width: 100%"
              >
                <el-option v-for="item in optionsInfo?.options_collection_number_name" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </template>
          </el-input>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="历史登记号" prop="historicalRegistrationNumber">
          <el-input v-model="form.historicalRegistrationNumber" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入历史登记号'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="藏品分类号" prop="collectionClassificationNumber">
          <el-input v-model="form.collectionClassificationNumber" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入藏品分类号'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="条形码及其他标识编码号" prop="barcodeOtherIdentificationCode">
          <el-input
            v-model="form.barcodeOtherIdentificationCode"
            clearable
            :disabled="isDisabled"
            :placeholder="isDisabled ? '' : '请输入条形码及其他标识编码号'"
          />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="本馆子分类" prop="classificationRestaurant">
          <el-input v-model="form.classificationRestaurant" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入本馆子分类'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="本馆分类名称" prop="classificationNameLibrary">
          <el-input v-model="form.classificationNameLibrary" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入本馆分类名称'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="入馆登记日期" prop="registrationDate">
          <el-date-picker
            style="width: 100%"
            v-model="form.registrationDate"
            type="date"
            format="YYYY-MM-DD"
            clearable
            :disabled="isDisabled"
            :placeholder="isDisabled ? ' ' : '请选择入馆登记日期'"
          />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="入馆凭证号" prop="entryVoucherNumber">
          <el-input v-model="form.entryVoucherNumber" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入入馆凭证号'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="入藏时间范围" prop="timeFrame">
          <!--          <el-input v-model="form.timeFrame" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入入藏时间范围'" />-->
          <el-select v-model="form.timeFrame" clearable :disabled="isDisabled" :placeholder="isDisabled ? ' ' : '请选择入藏时间范围'" style="width: 100%">
            <el-option v-for="item in optionsInfo?.options_time_range_tibet" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="入藏年度" prop="collectionYear">
          <el-date-picker
            style="width: 100%"
            v-model="form.collectionYear"
            type="year"
            format="YYYY"
            clearable
            :disabled="isDisabled"
            :placeholder="isDisabled ? ' ' : '请选择入藏年度'"
          />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="入库时间" prop="storageTime">
          <el-date-picker
            style="width: 100%"
            v-model="form.storageTime"
            type="datetime"
            format="YYYY-MM-DD HH:mm:ss"
            clearable
            :disabled="isDisabled"
            :placeholder="isDisabled ? ' ' : '请选择入库时间'"
          />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="入藏库房" prop="enteringStorageRoom">
          <el-input v-model="form.enteringStorageRoom" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入入藏库房'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="研究部门" prop="researchDepartment">
          <el-select v-model="form.researchDepartment" clearable :disabled="isDisabled" :placeholder="isDisabled ? ' ' : '请选择研究部门'" style="width: 100%">
            <el-option v-for="item in optionsInfo?.options_research_department" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="保护优先等级" prop="priority">
          <el-select v-model="form.priority" clearable :disabled="isDisabled" :placeholder="isDisabled ? ' ' : '请选择保护优先等级'" style="width: 100%">
            <el-option v-for="item in optionsInfo?.options_protection_priority_level" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="保管适宜相对湿度" prop="suitableRelativeHumidityStorage">
          <el-input v-model="form.suitableRelativeHumidityStorage" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入保管适宜相对湿度'" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="保管适宣相对温度" prop="suitableStorageTemperature">
          <el-input v-model="form.suitableStorageTemperature" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入保管适宣相对温度'" />
        </el-form-item>
      </el-col>

      <el-col :span="24">
        <el-form-item label="保管注意事项" prop="storagePrecautions">
          <el-input v-model="form.storagePrecautions" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入保管注意事项'" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-card class="mb-21 coder-wang-card" header="保存位置" shadow="never">
      <el-row :gutter="75">
        <el-col :span="8">
          <el-form-item label="库房（库区）名称" prop="warehouseName">
            <el-input v-model="form.warehouseName" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入库房（库区）名称'" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="库房（库区）编号" prop="warehouseNumber">
            <el-input v-model="form.warehouseNumber" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入库房（库区）编号'" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="库房负责人" prop="warehouseManager">
            <el-input v-model="form.warehouseManager" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入库房负责人'" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="保存位置（柜/架）" prop="saveLocation">
            <el-input v-model="form.saveLocation" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入保存位置（柜/架）'" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="保存位置（柜/架）编号" prop="saveLocationNumber">
            <el-input v-model="form.saveLocationNumber" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入保存位置（柜/架）编号'" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="柜(架）展/格" prop="saveCabinet">
            <el-input v-model="form.saveCabinet" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入柜(架）展/格'" />
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label="存放方位" prop="storageOrientation">
            <el-input v-model="form.storageOrientation" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入存放方位'" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="mb-21 coder-wang-card" header="现状" shadow="never">
      <el-row :gutter="75">
        <el-col :span="8">
          <el-form-item label="当前状况" prop="currentSituation">
            <el-input v-model="form.currentSituation" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入当前状况'" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="保存状态" prop="saveStatus">
            <el-select v-model="form.saveStatus" clearable :disabled="isDisabled" :placeholder="isDisabled ? ' ' : '请选择保存状态'" style="width: 100%">
              <el-option v-for="item in optionsInfo?.options_save_status" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="当前保存条件" prop="currentSavingConditions">
            <el-select
              v-model="form.currentSavingConditions"
              clearable
              :disabled="isDisabled"
              :placeholder="isDisabled ? '' : '请选择当前保存条件'"
              style="width: 100%"
            >
              <el-option v-for="item in optionsInfo?.options_current_saving_conditions" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="自然损坏" prop="naturalDamage">
            <el-input v-model="form.naturalDamage" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入自然损坏'" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="人为损坏" prop="humanInducedDamage">
            <el-input v-model="form.humanInducedDamage" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入人为损坏'" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="备注" prop="remarks">
            <el-input v-model="form.remarks" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入备注'" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-card>
  </el-form>
</template>

<script setup>
import {
  addInTheLibraryStoreInfo,
  auditInTheLibraryStoreInfo,
  editInTheLibraryStoreInfo,
  getInTheLibraryStoreInfo
} from '@/api/collection-all/manage-work/in-the-library-store-info'
import optionsInfo from './options'
import { addSourceInfo, editSourceInfo } from '@/api/collection-all/manage-work/source-info'
import { auditBackOut } from '@/api/collection-all/manage-work/backout'

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

  collectionUnit: undefined, // 收藏单位
  incomeNumber: undefined, // 收入号
  number: undefined, // 编号（总登记号）
  collectionNumberName: undefined, // 藏品编号名称

  historicalRegistrationNumber: undefined, // 历史登记号
  collectionClassificationNumber: undefined, // 藏品分类号
  barcodeOtherIdentificationCode: undefined, // 条形码及其他标识编码号

  classificationRestaurant: undefined, // 本馆子分类
  classificationNameLibrary: undefined, // 本馆分类名称
  registrationDate: undefined, // 入馆登记日期
  entryVoucherNumber: undefined, // 入馆凭证号

  timeFrame: undefined, // 入藏时间范围
  collectionYear: undefined, // 入藏年度

  storageTime: undefined, // 入库时间
  enteringStorageRoom: undefined, // 入藏库房

  researchDepartment: undefined, // 研究部门
  priority: undefined, // 保护优先等级（缺）
  suitableRelativeHumidityStorage: undefined, // 保管适宜相对湿度
  suitableStorageTemperature: undefined, // 保管适宣相对温度
  storagePrecautions: undefined, // 保管注意事项

  // 保存位置
  warehouseName: undefined, // 库房（库区）名称
  warehouseNumber: undefined, // 库房（库区）编号
  warehouseManager: undefined, // 库房负责人
  saveLocation: undefined, // 保存位置（柜/架）
  saveLocationNumber: undefined, // 保存位置（柜/架）编号
  saveCabinet: undefined, // 柜(架）展/格（缺）
  storageOrientation: undefined, // 存放方位

  // 现状
  currentSituation: undefined, // 当前状况
  saveStatus: undefined, // 保存状态
  currentSavingConditions: undefined, // 当前保存条件
  naturalDamage: undefined, // 自然损坏
  humanInducedDamage: undefined, // 人为损坏

  currentLocation: undefined, // 当前处所
  collectionCabinetNumber: undefined, // 藏品柜编号
  remarks: undefined // 备注
})

const rules = {
  collectionCabinetNumber: [
    {
      required: true,
      message: ''
    }
  ],
  timeFrame: [
    {
      required: true,
      message: '入藏时间范围必填'
    }
  ]
}
async function init() {
  form.relicsId = props.relicsId

  const res = await getInTheLibraryStoreInfo(props.relicsId)
  console.log('other info res ===> ', res)

  if (res?.data) {
    Object?.keys(form).forEach(key => {
      form[key] = res?.data?.[key]
    })
  }
  console.log('other info form ===> ', form)
}
init()

console.log('other info relicsId ===> ', props.relicsId)

const formRef = ref()
async function submit() {
  console.log('props?.proxy ===>', props?.proxy)
  if (!formRef.value) return
  await formRef.value.validate(async (valid, fields) => {
    if (valid) {
      form.relicsId = props.relicsId
      if (!form.id) {
        await addInTheLibraryStoreInfo(form)
        props?.proxy?.$modal?.msgSuccess('入馆保管信息保存成功')
        await init()
      } else {
        await editInTheLibraryStoreInfo(form)
        props?.proxy?.$modal?.msgSuccess('入馆保管信息保存成功')
        await init()
      }
    }
  })
}

async function audit() {
  if (!form.id) {
    return props?.proxy?.$modal?.msgSuccess('请先保存入馆保管信息')
  }
  await auditInTheLibraryStoreInfo(form)
  props?.proxy?.$modal?.msgSuccess('入馆保管信息提交审核成功')
}

defineExpose({ submit, audit })
</script>

<style lang="scss" scoped>
.mb-21 {
  margin-bottom: 21px;
}

:deep(.el-input-group__prepend) {
  padding: 0 !important;
}

:deep(.el-input-group__append) {
  background: transparent;
  padding: 0 !important;
}
</style>
