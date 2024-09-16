<template>
  <el-dialog class="coder-wang-dialog" v-model="open" width="1280px" append-to-body :before-close="handleCancel" align-center :show-close="false">
    <template #header="{ titleId, titleClass }">
      <span class="detail-title">多媒体文档信息 - {{ title }}</span>
    </template>
    <div>
      <el-scrollbar :height="`calc(100vh - 300px)`">
        <el-form class="coder-wang-form" ref="formRef" :model="form" label-width="auto" label-position="top" size="large">
          <el-row :span="24" :gutter="50">
            <el-col :span="16">
              <el-row :span="24">
                <el-col :span="24">
                  <el-form-item label="文件名称" prop="mediaName">
                    <el-input v-model="form.mediaName" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入文件名称'" />
                  </el-form-item>
                </el-col>

                <el-col :span="24">
                  <el-form-item label="文件编号" prop="mediaNo">
                    <el-input v-model="form.mediaNo" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入文件编号'" />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>

            <el-col :span="8">
              <el-form-item label="更换文件" prop="relicPath">
                <comm-upload-fle v-model="form.relicPath" :file-type="['doc', 'xls', 'ppt', 'txt', 'pdf', 'jpg', 'jpeg', 'png']" :limit="1" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :span="24" :gutter="50">
            <el-col :span="8">
              <el-form-item label="藏品编号" prop="relicId">
                <el-input v-model="formShow.relicId" :disabled="true">
                  <template #prepend>
                    <el-select v-model="formShow.relicIdType" :disabled="true" style="width: 100%">
                      <el-option v-for="item in optionsInfo?.options_collection_number_name" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="藏品名" prop="relicName">
                <el-input v-model="formShow.relicName" :disabled="true" />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="类别" prop="mediaCategory">
                <el-select v-model="form.mediaCategory" clearable :disabled="isDisabled" :placeholder="isDisabled ? ' ' : '请选择类别'" style="width: 100%">
                  <el-option v-for="item in optionsInfo?.options_category" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="所属单位" prop="affiliatedUnit">
                <el-input v-model="form.affiliatedUnit" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入所属单位'" />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="规格" prop="mediaSpec">
                <el-input v-model="form.mediaSpec" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入规格'" />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="记录介质" prop="recordMedium">
                <el-select v-model="form.recordMedium" clearable :disabled="isDisabled" :placeholder="isDisabled ? ' ' : '请选择记录介质'" style="width: 100%">
                  <el-option v-for="item in optionsInfo?.options_recording_medium" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="记录角度" prop="recordAngle">
                <el-select v-model="form.recordAngle" clearable :disabled="isDisabled" :placeholder="isDisabled ? ' ' : '请选择记录角度'" style="width: 100%">
                  <el-option v-for="item in optionsInfo?.options_record_angle" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="采集方式" prop="collectWay">
                <el-select v-model="form.collectWay" clearable :disabled="isDisabled" :placeholder="isDisabled ? ' ' : '请选择采集方式'" style="width: 100%">
                  <el-option v-for="item in optionsInfo?.options_collection_method" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="采集人" prop="collectPerson">
                <el-select
                  v-model="form.collectPerson"
                  clearable
                  :disabled="isDisabled"
                  :placeholder="isDisabled ? ' ' : '请选择/输入采集人'"
                  filterable
                  remote
                  reserve-keyword
                  allow-create
                  remote-show-suffix
                  :remote-method="getListUser"
                  :loading="api_options.loading"
                  style="width: 100%"
                >
                  <el-option v-for="item in api_options.options_user" :key="item.userName" :label="item.userName" :value="item.userName" />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="采集时间" prop="collectTime">
                <el-date-picker
                  style="width: 100%"
                  v-model="form.collectTime"
                  type="datetime"
                  format="YYYY-MM-DD HH:mm:ss"
                  clearable
                  :disabled="isDisabled"
                  :placeholder="isDisabled ? ' ' : '请选择采集时间'"
                />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="采集设备" prop="collectDevice">
                <el-input v-model="form.collectDevice" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入采集设备'" />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="采集格式" prop="collectFormat">
                <el-input v-model="form.collectFormat" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入采集格式'" />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="采集精度" prop="collectAccuracy">
                <el-input v-model="form.collectAccuracy" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入采集精度'">
                  <template #append>
                    <el-select
                      v-model="form.collectAccuracyUnit"
                      clearable
                      :disabled="isDisabled"
                      :placeholder="isDisabled ? ' ' : '请选择精度单位'"
                      style="width: 100%"
                    >
                      <el-option v-for="item in optionsInfo?.options_collection_accuracy_unit" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="采集加工手段" prop="collectionProcessMethods">
                <el-select
                  v-model="form.collectionProcessMethods"
                  clearable
                  :disabled="isDisabled"
                  :placeholder="isDisabled ? ' ' : '请选择采集加工手段'"
                  style="width: 100%"
                >
                  <el-option v-for="item in optionsInfo?.options_collection_processing_methods" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="属性填写人" prop="attributeFilledUser">
                <el-select
                  v-model="form.attributeFilledUser"
                  clearable
                  :disabled="isDisabled"
                  :placeholder="isDisabled ? ' ' : '请选择/输入属性填写人'"
                  filterable
                  remote
                  reserve-keyword
                  allow-create
                  remote-show-suffix
                  :remote-method="getListUser"
                  :loading="api_options.loading"
                  style="width: 100%"
                >
                  <el-option v-for="item in api_options.options_user" :key="item.userName" :label="item.userName" :value="item.userName" />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="属性填写时间" prop="attributeFilledTime">
                <el-date-picker
                  style="width: 100%"
                  v-model="form.attributeFilledTime"
                  type="datetime"
                  format="YYYY-MM-DD HH:mm:ss"
                  clearable
                  :disabled="isDisabled"
                  :placeholder="isDisabled ? ' ' : '请选择属性填写时间'"
                />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="入库审核人" prop="inventoryReviewer">
                <el-select
                  v-model="form.inventoryReviewer"
                  clearable
                  :disabled="isDisabled"
                  :placeholder="isDisabled ? ' ' : '请选择/输入入库审核人'"
                  filterable
                  remote
                  reserve-keyword
                  allow-create
                  remote-show-suffix
                  :remote-method="getListUser"
                  :loading="api_options.loading"
                  style="width: 100%"
                >
                  <el-option v-for="item in api_options.options_user" :key="item.userName" :label="item.userName" :value="item.userName" />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="入库审核时间" prop="entryReviewTime">
                <el-date-picker
                  style="width: 100%"
                  v-model="form.entryReviewTime"
                  type="datetime"
                  format="YYYY-MM-DD HH:mm:ss"
                  clearable
                  :disabled="isDisabled"
                  :placeholder="isDisabled ? ' ' : '请选择入库审核时间'"
                />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="制作部门" prop="makeDept">
                <el-input v-model="form.makeDept" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入制作部门'" />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="制作时间" prop="makeTime">
                <el-date-picker
                  style="width: 100%"
                  v-model="form.makeTime"
                  type="datetime"
                  format="YYYY-MM-DD HH:mm:ss"
                  clearable
                  :disabled="isDisabled"
                  :placeholder="isDisabled ? ' ' : '请选择制作时间'"
                />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="负责人" prop="responsiblePerson">
                <el-select
                  v-model="form.responsiblePerson"
                  clearable
                  :disabled="isDisabled"
                  :placeholder="isDisabled ? ' ' : '请选择/输入负责人'"
                  filterable
                  remote
                  reserve-keyword
                  allow-create
                  remote-show-suffix
                  :remote-method="getListUser"
                  :loading="api_options.loading"
                  style="width: 100%"
                >
                  <el-option v-for="item in api_options.options_user" :key="item.userName" :label="item.userName" :value="item.userName" />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="制作单位" prop="makeCompany">
                <el-input v-model="form.makeCompany" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入制作单位'" />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="制作地点" prop="makeLocation">
                <el-input v-model="form.makeLocation" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入制作地点'" />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="材料介绍" prop="materialIntroduction">
                <el-input v-model="form.materialIntroduction" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入材料介绍'" />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="关键字" prop="keyword">
                <el-input v-model="form.keyword" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入关键字'" />
              </el-form-item>
            </el-col>

            <el-col :span="8">
              <el-form-item label="备注" prop="remarks">
                <el-input v-model="form.remarks" clearable :disabled="isDisabled" :placeholder="isDisabled ? '' : '请输入备注'" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-scrollbar>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-space :size="29">
          <el-button class="button-c-sure" type="primary" @click="handleCancel" v-if="handleStatus === 'check'"> 关闭 </el-button>
          <el-button class="button-p-cancel" type="primary" @click="handleSure" v-if="handleStatus !== 'check'"> 保存 </el-button>
        </el-space>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import optionsInfo from './options-media'
import { listUser } from '@/api/system/user'
import { addMultimedia, editMultimedia } from '@/api/collection-all/multimedia/multimedia'
import CommUploadFle from '@/components/comm-cpns/comm-upload-file/comm-upload-fle.vue'

const props = defineProps({
  curtCollectionRow: {
    type: Object,
    default: () => ({})
  },
  title: {
    type: String,
    default: '标题'
  },
  currentRow: {
    type: Object,
    default: () => ({})
  },
  proxy: {
    type: Object,
    default: () => ({})
  },
  mediaSelectType: {
    type: String,
    default: null
  },
  handleStatus: {
    type: String,
    default: 'submit' // submit （新增 + 修改 + 提交审核）check（查看）
  }
})

const isDisabled = computed(() => {
  return props.handleStatus === 'check'
})

const open = true

const select = ref()
const form = reactive({
  id: undefined,
  relicId: undefined, // 传藏品序号，就是会出现负数那个
  relicName: undefined, // 藏品名
  relicNo: undefined, //  藏品登记号 仅页面显示使用
  mediaName: undefined, // 文件名称
  relicPath: undefined, // 文件路径
  mediaNo: undefined, // 文件编号

  mediaCategory: undefined, // 类别
  affiliatedUnit: undefined, // 所属单位

  mediaSpec: undefined, // 规格
  recordMedium: undefined, // 记录介质
  recordAngle: undefined, // 记录角度

  collectWay: undefined, // 采集方式
  collectPerson: undefined, // 采集人
  collectTime: undefined, // 采集时间
  collectDevice: undefined, // 采集设备
  collectFormat: undefined, // 采集格式
  collectAccuracy: undefined, // 采集精度
  collectAccuracyUnit: undefined, // 采集精度单位
  collectionProcessMethods: undefined, // 采集加工手段

  attributeFilledUser: undefined, // 属性填写人
  attributeFilledTime: undefined, // 属性填写时间

  inventoryReviewer: undefined, // 入库审核人
  entryReviewTime: undefined, // 入库审核时间

  makeDept: undefined, // 制作部门
  makeTime: undefined, // 制作时间
  responsiblePerson: undefined, // 负责人
  makeCompany: undefined, // 制作单位
  makeLocation: undefined, // 制作地点
  materialIntroduction: undefined, // 材料介绍
  keyword: undefined, // 关键字

  mediaType: undefined, // 媒体类型
  remarks: undefined // 备注
})

const formShow = reactive({
  relicId: undefined,
  relicIdType: undefined,
  relicName: undefined
})
// options
const api_options = reactive({
  loading: false,
  options_user: []
})

// 用户
async function getListUser(userName) {
  api_options.loading = true
  try {
    const res = await listUser({ pageNum: 1, pageSize: 999, userName })
    api_options.options_user = res?.rows ?? []
    api_options.loading = false
  } catch (e) {
    api_options.loading = false
    api_options.options_user = []
  }
}
getListUser()

// 数据回屯
watch(
  [() => props.currentRow, () => props.curtCollectionRow, () => props.mediaSelectType],
  val => {
    if (val[0]) {
      Object?.keys(val[0]).forEach(key => {
        form[key] = val[0]?.[key] ?? undefined
      })
    }

    if (val[1]) {
      form.relicId = val[1].relicsNo
      form.relicNo = val[1].relicsNo
      form.relicName = val[1].relicName

      // 仅显示
      formShow.relicId = val[1].relicId
      formShow.relicIdType = val[1].relicIdType
      formShow.relicName = val[1].relicName
      console.log('---- form', form)
    }

    if (val[2]) {
      form.mediaType = props.mediaSelectType
    }
  },
  {
    deep: true,
    immediate: true
  }
)

const emits = defineEmits(['handleCloseMediaAddOrEdit'])

const formRef = ref()
async function handleSure() {
  if (!formRef.value) return
  await formRef.value.validate(async (valid, fields) => {
    if (valid) {
      if (!form.id) {
        await addMultimedia(form)
        props?.proxy?.$modal?.msgSuccess('新增成功')
      } else {
        await editMultimedia(form)
        props?.proxy?.$modal?.msgSuccess('修改成功')
      }
      emits('handleCloseMediaAddOrEdit', 1)
    } else {
      console.log('error submit!', fields)
    }
  })
}

function handleCancel() {
  emits('handleCloseMediaAddOrEdit')
}
</script>

<style lang="scss" scoped>
.detail-title {
  font-family: Source Han Serif CN;
  font-size: 20px;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0em;

  font-variation-settings: 'opsz';
  font-feature-settings: 'kern';
  color: #064235;
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
</style>
