<template>
  <el-dialog :title="`${proFormProps.title}`" v-model="proFormVisible" width="1200px" @close="close" align-center
    :show-close="false">
    <div class="mn-container">
      <el-form ref="formRef" :model="form" :disabled="proFormProps.isView" :rules="rules" label-position="left"
        size="large">
        <el-row :gutter="20">
          <!-- <el-col :span="12">
            <el-form-item label="监测状态" prop="monitingStatus">
              <el-select
                v-model="form.monitingStatus"
                placeholder="请选择"
                :disabled="proFormProps?.disabledAarr?.indexOf('监测状态') > -1"
              >
                <el-option
                  v-for="item in moniting_status"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col> -->
          <el-col :span="16">
            <el-form-item label="储藏柜编号" prop="cabinetId" style="margin-bottom: 0;">
              <div class="td-font_tip td-flex items-center">
                编号为数字或数字和字母的综合，不能重复。建议：如可命名为001
              </div>
            </el-form-item>
            <el-input v-model="form.cabinetId" placeholder="" disabled>
              <!-- <template #prepend>CCG</template> -->
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="cabinetName" label="储藏柜名称" class="td-flex column">
              <el-input v-model="form.cabinetName" placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="储藏柜所在位置" prop="houseId" class="td-flex column">
              <el-select v-model="form.houseId" placeholder="所属库房" @change="changeCabinet" class="full-width">
                <el-option v-for="item in cabinet_addr" :key="item.houseId" :label="item.houseName"
                  :value="item.houseId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="具体位置描述" prop="cabinetAddrDetail" class="td-flex column">
              <el-input v-model="form.cabinetAddrDetail" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="储藏柜类型" prop="cabinetType" class="td-flex column">
              <el-select v-model="form.cabinetType" placeholder="请选择" class="full-width">
                <el-option v-for="item in cabinet_type" :key="item.value" :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="储藏柜大小" prop="cabinetVolume" class="td-flex column">
              <div class="td-flex">
                <el-input v-model="form.cabinetLength" placeholder="长" class="td-flex-item" />
                <div class="td-ml4 td-mr4">×</div>
                <el-input v-model="form.cabinetWidth" placeholder="宽" class="td-flex-item" />
                <div class="td-ml4 td-mr4">×</div>
                <el-input v-model="form.cabinetHigh" placeholder="高" class="td-flex-item" />
                <el-input v-model="form.cabinetVolume" placeholder="体积" class="td-ml10" style="width:260px">
                  <template #suffix>m³（立方米）</template>
                </el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="储藏柜型号" prop="modelNum" class="td-flex column">
              <el-input v-model="form.modelNum" placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="储藏柜功能类型" prop="funcType" class="td-flex column">
              <el-select v-model="form.funcType" placeholder="请选择">
                <el-option v-for="item in func_type" :key="item.value" :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="功能描述" prop="funcContent" style="margin-bottom: 0;">
              <div class="td-font_tip">
                若含控制设备，请描述具体控制内容
              </div>
            </el-form-item>
            <el-input v-model="form.funcContent" placeholder="请输入" />
          </el-col>
          <el-col :span="8">
            <el-form-item label="储藏柜厂商" prop="facturer" class="td-flex column">
              <el-input v-model="form.facturer" placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="厂商电话" prop="facturerTel" class="td-flex column">
              <el-input v-model="form.facturerTel" placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="厂商联系人" prop="facturerContact" class="td-flex column">
              <el-input v-model="form.facturerContact" placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人电话" prop="facturerContactTel" class="td-flex column">
              <el-input v-model="form.facturerContactTel" placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="藏品存放数预估" prop="storeNum" class="td-flex column">
              <el-input v-model="form.storeNum" placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="屉/格数量" prop="drawerCount" class="td-flex column">
              <el-input v-model="form.drawerCount" placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="柜内藏品信息">
              <div class="i-link td-pointer">下载当前储藏柜藏品信息</div>
            </el-form-item>
            <el-table class="td-mt20" :data="additionalList" border>
              <el-table-column label="藏品编号名称" prop="cabinetId" show-overflow-tooltip />
              <el-table-column label="藏品编号" prop="cabinetIdName" show-overflow-tooltip />
              <el-table-column label="藏品名称" prop="cabinetName" show-overflow-tooltip />
              <el-table-column label="文物类别" prop="unitPrice" show-overflow-tooltip />
              <el-table-column label="文物级别" prop="unitPrice" show-overflow-tooltip />
              <el-table-column label="所在储藏柜" prop="cabinetAddrDetail" show-overflow-tooltip />
              <el-table-column label="屉/格" prop="drawerCount" show-overflow-tooltip />
            </el-table>
          </el-col>
        </el-row>
      </el-form>
      <div class="td-flex center td-mt40">
        <!-- <el-button
          type="primary"
          @click="handleSubmit"
          v-show="!proFormProps.isView"
        >
          保存
        </el-button> -->
        <!-- <div class="i-button_primary" @click="handleSubmit" v-show="!proFormProps.isView">
          确定
        </div> -->
        <el-button class="button-c-sure" v-show="!proFormProps.isView" type="primary"
          @click="handleSubmit">确定</el-button>
        <!-- <div class="i-button_cancel td-ml10" @click="close">取消</div> -->
        <!-- <el-button @click="proFormVisible = false"> 取消 </el-button> -->
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import {
  createIdCabinet,
  getAllByHouseId,
} from '@/api/artifact/cabinet';
import { reactive } from 'vue';
import { ElMessage } from 'element-plus';
const { proxy } = getCurrentInstance();
const { cabinet_type, func_type, moniting_status } = proxy.useDict(
  'cabinet_type',
  'func_type',
  'moniting_status'
);
import { getWarehouseAllList } from '@/api/artifact/warehouse';
const proFormVisible = ref(false);
const formRef = ref(null);
const additionalList = reactive([]);
const cabinet_addr = ref([]);
const form = ref({
  cabinetId: '',
  cabinetName: '',
  houseId: '',
  // houseName: '',
  monitingStatus: '',
  cabinetType: '',
  cabinetVolume: '',
  cabinetAddr: '',
  cabinetAddrDetail: '',
  cabinetLength: '',
  cabinetWidth: '',
  cabinetHigh: '',
  funcType: '',
  funcContent: '',
  facturer: '',
  drawerCount: '',
  modelNum: '',
  facturerTel: '',
  facturerContact: '',
  facturerContactTel: '',
  storeNum: '',
  realTimeData: {
    // batteryLevel: 0,
    // co2: '0',
    // deviceSerialNo: '0',
    // humidity: '0',
    // illumination: '0',
    // "pushTime": "2024-04-02T09:47:32.697Z",
    // temperature: '0',
    // ultraviolet: '0',
    // voc: '0'
  }
});
const rules = reactive({
  cabinetId: [{ required: true, trigger: 'blur', message: '请输入' }],
  houseId: [{ required: true, trigger: 'change', message: '请输入' }],
  storeNum: [{ required: true, trigger: 'blur', message: '请输入' }],
  facturerTel: [
    {
      pattern: '((\\d{11})|^((\\d{7,8})|(\\d{4}|\\d{3})-(\\d{7,8})|(\\d{4}|\\d{3})-(\\d{7,8})-(\\d{4}|\\d{3}|\\d{2}|\\d{1})|(\\d{7,8})-(\\d{4}|\\d{3}|\\d{2}|\\d{1}))$)',
      trigger: 'blur',
      message: '请输入正确的厂商电话'
    }
  ],
  facturerContactTel: [
    {
      pattern: '((\\d{11})|^((\\d{7,8})|(\\d{4}|\\d{3})-(\\d{7,8})|(\\d{4}|\\d{3})-(\\d{7,8})-(\\d{4}|\\d{3}|\\d{2}|\\d{1})|(\\d{7,8})-(\\d{4}|\\d{3}|\\d{2}|\\d{1}))$)',
      trigger: 'blur',
      message: '请输入正确的联系人电话'
    }
  ]
});
const proFormProps = ref({
  isView: false,
  title: '',
  row: {}
});

const close = () => {
  reset();
  proFormProps.value = {
    isView: false,
    title: '',
    row: {}
  };
  proFormVisible.value = false;
};
const reset = () => {
  form.value = {
    cabinetId: '',
    cabinetName: '',
    houseId: '',
    // houseName: '',
    monitingStatus: '',
    cabinetType: '',
    cabinetVolume: '',
    cabinetAddr: '',
    cabinetAddrDetail: '',
    cabinetLength: '',
    cabinetWidth: '',
    cabinetHigh: '',
    funcType: '',
    funcContent: '',
    facturer: '',
    drawerCount: '',
    modelNum: '',
    facturerTel: '',
    facturerContact: '',
    facturerContactTel: '',
    storeNum: '',
    realTimeData: {
      // batteryLevel: 0,
      // co2: '0',
      // deviceSerialNo: '0',
      // humidity: '0',
      // illumination: '0',
      // "pushTime": "2024-04-02T09:47:32.697Z",
      // temperature: '0',
      // ultraviolet: '0',
      // voc: '0'
    }
  };
};
const changeCabinet = j => {
  const index = cabinet_addr.value.findIndex(v => j == v.value);
  // form.value.houseAddrDic = cabinet_addr.value[index].label;
};

const handleSubmit = () => {
  formRef.value.validate(async valid => {
    if (!valid) return;
    try {
      await proFormProps.value.api(form.value);
      ElMessage.success({ message: `${proFormProps.value.title}成功` });
      proFormProps.value.getTableList();
      proFormVisible.value = false;
    } catch (error) {
      console.log(error);
    }
  });
};
const createId = async () => {
  const { data } = await createIdCabinet();
  form.value.cabinetId = data.cabinetId;
};
const getAllDataByHouseId = async id => {
  const { data } = await getAllByHouseId(id);
  console.log(data);
};

const getWarehouseAllLists = async () => {
  const { rows } = await getWarehouseAllList({ isShow: 0 });
  cabinet_addr.value = rows;
};
const acceptParams = params => {
  proFormProps.value = params;
  // form.value = params.row;
  if (params.title == '新增') {
    createId();
  } else {
    Object.keys(form.value).forEach(function (key) {
      form.value[key] = params.row[key];
    });
    getAllDataByHouseId(form.value.houseId);
  }
  getWarehouseAllLists();
  proFormVisible.value = true;
};

defineExpose({
  acceptParams
});
</script>
<style lang="scss" scoped>
.i-link {
  color: #29d;
  text-decoration: underline;
}

:deep(.el-input .el-input-group__prepend) {
  box-shadow: 1px 0 0 0 var(--el-input-border-color) inset, 0 1px 0 0 var(--el-input-border-color) inset, 0 -1px 0 0 var(--el-input-border-color) inset;
  background-color: transparent !important;
}
</style>
