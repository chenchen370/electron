<template>
  <el-dialog v-model="open" width="1280px" :title="types ? (types == 1 ? '新增' : '编辑') : '查看'" append-to-body
    :before-close="handleCancel" :show-close="false" align-center>
    <el-scrollbar style="height: 610px">
      <el-form ref="formRef" :model="form" :rules="rules" label-width="auto" label-position="top"
        style="padding: 0 25px;">
        <el-row :gutter="50">
          <el-col :span="8">
            <el-form-item label="展览名称" prop="exhibitionName">
              <el-input v-model="form.exhibitionName" placeholder="请输入" :disabled="!types" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="展览类型" prop="exhibitionType">
              <el-select placeholder="请选择" v-model="form.exhibitionType" clearable :disabled="!types">
                <el-option v-for="dict in options.exhibition_type" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="展览主题" prop="exhibitionTheme">
              <el-input v-model="form.exhibitionTheme" placeholder="请输入" :disabled="!types" />
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="展览起止时间" prop="">
              <el-date-picker v-model="dateValue" type="daterange" range-separator="-" start-placeholder="开始日期"
                end-placeholder="结束日期" value-format="YYYY-MM-DD" :disabled="!types" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="展览组织机构" prop="exhibitionOrganization">
              <el-input v-model="form.exhibitionOrganization" placeholder="请输入" :disabled="!types" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="展览介绍" prop="introduction">
              <el-input v-model="form.introduction" placeholder="请输入" :disabled="!types" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="批文号" prop="approvalNumber">
              <el-input v-model="form.approvalNumber" placeholder="请输入" :disabled="!types" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="接展单位" prop="extensionUnit">
              <el-input v-model="form.extensionUnit" placeholder="请输入" :disabled="!types" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="批准机构" prop="approvalAuthority">
              <el-input v-model="form.approvalAuthority" placeholder="请输入" :disabled="!types" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="展览举办地点" prop="exhibitionVenue">
              <el-input v-model="form.exhibitionVenue" placeholder="请输入" :disabled="!types" />
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="展览所在展厅" prop="houseId">
              <el-select v-model="form.houseId" placeholder="请选择" clearable :disabled="!types"
                @change="selectHouseChange">
                <el-option v-for="item in cabinet_addr" :key="item.houseId" :label="item.houseName"
                  :value="item.houseId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="展柜列表" prop="">
          <el-table :data="cabinetList" border>
            <el-table-column label="展柜编号" align="center" width="100" prop="cabinetId" />
            <el-table-column label="展柜类型" align="center" width="160" prop="cabinetTypeDic" />
            <el-table-column label="藏品信息" align="center" prop="relicsInfoRsps">
              <template #default="{ row }">
                {{ getRelicsInfo(row.relicsInfoRsps) }}
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="80" v-if="types">
              <template #default="{ row }">
                <CommHandleBtnTable :icon-name="types && types == 1 ? 'CirclePlus' : 'EditPen'"
                  @handle-table-btn="cabinetId = row.cabinetId" />
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>

        <el-form-item label="展览藏品" prop="">
          <div class="download_tips">
            <span>可下载当前展览藏品信息</span>
            <img class="icon" src="@/assets/images/handle-btn-icon/export.png" alt="" @click="download" />
          </div>
          <el-table :data="relicsList" border>
            <el-table-column label="展厅名称" align="center" prop="">
              <template #default="{ row }">
                {{ form.houseName }}
              </template>
            </el-table-column>
            <el-table-column label="展柜编号" align="center" prop="cabinetId" />
            <el-table-column label="藏品归属" align="center" prop="relicWarehouse" />
            <el-table-column label="藏品编号名称" align="center" prop="relicIdType" />
            <el-table-column label="藏品编号" align="center" prop="relicId" />
            <el-table-column label="藏品名称" align="center" prop="relicName" />
          </el-table>
        </el-form-item>
      </el-form>
    </el-scrollbar>

    <template #footer>
      <div class="dialog-footer">
        <el-space :size="40" v-if="types">
          <el-button class="button-c-sure" type="primary" @click="handleSave">{{ types == 1 ? '保存' : '确定'
            }}</el-button>
          <el-button class="button-p-cancel" @click="handleCancel"> 取消 </el-button>
        </el-space>
        <el-space :size="40" v-else>
          <el-button class="button-c-sure" type="primary" @click="handleCancel">取消</el-button>
        </el-space>
      </div>
    </template>
  </el-dialog>
  <!-- 藏品编辑 -->
  <DialogSelectRelices v-if="cabinetId" :cabinetId="cabinetId" :exhibition-id="form.id"
    @on-close="handleRelicesClose" />
</template>

<script setup>
import { ElMessage } from 'element-plus';

import DialogSelectRelices from './dialog-select-relices.vue'
import CommHandleBtnTable from '@/components/comm-cpns/comm-handle-btn-table/comm-handle-btn-table.vue'

import { getWarehouseAllList } from '@/api/artifact/warehouse';
import { getDisplayCabinetList } from '@/api/artifact/displayCabinet';
import { editExhibition, addExhibition, getExhibitionRelics } from '@/api/exhibition-manage/exhibition'

const props = defineProps({
  rowObj: {
    type: Object,
    default: () => ({})
  },
  options: {
    type: Object,
    default: () => ({})
  },
  types: {
    type: Number,
    default: 0
  }
})

const emits = defineEmits(['handleCloseDialogAddOrEdit'])

const open = ref(true)

const formRef = ref()
const form = reactive({})
const rules = reactive({
  exhibitionName: [
    { required: true, message: '请输入', trigger: 'blur' },
  ],
  houseId: [
    { required: true, message: '请选择', trigger: 'change' },
  ],
})

const dateValue = ref([])

watch(
  () => props.rowObj,
  val => {
    if (val) {
      console.log(val)
      Object?.keys(val).forEach(key => {
        form[key] = val[key]
      })
      if (val['exhibitionStartTime']) {
        dateValue.value[0] = val['exhibitionStartTime']
      }
      if (val['exhibitionEndTime']) {
        dateValue.value[1] = val['exhibitionEndTime']
      }
      if (val['houseId']) {
        handleHallChange()
      }
      if (val['id']) {
        getExhibitionRelicsData()
      }
    }
  },
  {
    deep: true,
    immediate: true
  }
)

// 保存
function handleSave() {
  formRef.value.validate(async valid => {
    if (valid) {
      const params = Object.assign({}, form, { exhibitionStartTime: dateValue.value ? dateValue.value[0] : '', exhibitionEndTime: dateValue.value ? dateValue.value[1] : '' })
      const res = await (params.id ? editExhibition(params) : addExhibition(params))
      ElMessage.success('保存成功');
      if (params.id) {
        emits('handleCloseDialogAddOrEdit')
      } else {
        form.id = res
        handleHallChange()
        getExhibitionRelicsData()
      }
    }
  })
}

function handleCancel() {
  emits('handleCloseDialogAddOrEdit')
}

function getRelicsInfo(list) {
  return list.map(item => {
    return item.relicId
  })?.toString()
}

// 展厅数据
const cabinet_addr = ref([]);
function getWarehouseAllLists() {
  getWarehouseAllList({ isShow: 1 }).then(res => {
    cabinet_addr.value = res.rows;
  })
};
getWarehouseAllLists();

function selectHouseChange(val) {
  form.houseName = cabinet_addr.value.find(item => item.houseId == val)?.houseName
}

// 展柜数据
const cabinetList = ref([]);
function handleHallChange() {
  getDisplayCabinetList({ houseId: form.houseId }).then(res => {
    cabinetList.value = res.rows || [];
  })
}

// 查询展览藏品
const relicsList = ref([]);
function getExhibitionRelicsData() {
  getExhibitionRelics({ exhibitionId: form.id, pageNum: 1, pageSize: 999 }).then(res => {
    relicsList.value = res.records || [];
  })
}

// 展柜藏品编辑
const cabinetId = ref('')

function handleRelicesClose() {
  cabinetId.value = ''
  getExhibitionRelicsData()
}


function download() {

}
</script>

<style lang="scss" scoped>
.download_tips {
  display: flex;
  position: absolute;
  right: 0;
  top: -8px;
  line-height: 22px;
  transform: translateY(-100%);

  .icon {
    margin-left: 16px;
    width: 22px;
    height: 22px;
    cursor: pointer;
  }
}
</style>
