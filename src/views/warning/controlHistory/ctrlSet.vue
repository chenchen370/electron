<template>
  <el-dialog :title="`${proFormProps.title}`" v-model="proFormVisible" width="680px" @close="close" align-center
    :show-close="false">
    <div class="mn-container">
      <el-form ref="formRef" :model="form" :disabled="proFormProps.isView" :rules="rules" label-width="110px">
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="调控类型" prop="setParamKey">
              <el-select v-model="form.setParamKey" placeholder="请选择">
                <el-option label="周期" value="1"></el-option>
                <el-option label="温湿度" value="2"></el-option>
                <!-- <el-option v-for="item in ctrl_device_param" :key="item.value" :label="item.label"
                  :value="item.value"></el-option> -->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="周期" prop="period" v-if="form.setParamKey == '1'">
              <el-input v-model="form.period" placeholder="" type="number" />
            </el-form-item>
            <div v-else>
              <el-form-item label="温度上限" prop="temperatureUp">
                <el-input v-model="form.temperatureUp" placeholder="" type="number" />
              </el-form-item>
              <el-form-item label="温度下限" prop="temperatureLow">
                <el-input v-model="form.temperatureLow" placeholder="" type="number" />
              </el-form-item>
              <el-form-item label="湿度上限" prop="humidityUp">
                <el-input v-model="form.humidityUp" placeholder="" type="number" />
              </el-form-item>
              <el-form-item label="湿度下限" prop="humidityLow">
                <el-input v-model="form.humidityLow" placeholder="" type="number" />
              </el-form-item>
              <el-form-item label="预设湿度" prop="humidity">
                <el-input v-model="form.humidity" placeholder="" type="number" />
              </el-form-item>
            </div>

          </el-col>
        </el-row>
      </el-form>
      <div class="td-flex justify-end">
        <div class="i-button_primary" @click="handleSubmit" v-show="!proFormProps.isView">
          设置
        </div>
        <!-- <div class="i-button_cancel td-ml10" @click="close">取消</div> -->
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
const { proxy } = getCurrentInstance();

const { ctrl_device_param } = proxy.useDict('ctrl_device_param');
const proFormVisible = ref(false);
const formRef = ref(null);
const form = ref({
  "deviceSerialNo": "",
  "humidity": "",
  "humidityLow": "",
  "humidityUp": "",
  "period": "",
  "temperatureLow": "",
  "temperatureUp": "",
  setParamKey: '1',
});
const rules = reactive({
  setParamKey: [{ required: true, trigger: 'blur', message: '请选择调控类型' }],
  period: [{ required: true, trigger: 'blur', message: '请输入' }],
  humidity: [{ required: true, trigger: 'blur', message: '请输入' }],
  humidityLow: [{ required: true, trigger: 'blur', message: '请输入' }],
  humidityUp: [{ required: true, trigger: 'blur', message: '请输入' }],
  temperatureLow: [{ required: true, trigger: 'blur', message: '请输入' }],
  temperatureUp: [{ required: true, trigger: 'blur', message: '请输入' }],
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
    deviceSerialNo: '',
    id: '',
    period: '',
    setParamKey: '1',
  };
};

const handleSubmit = () => {
  formRef.value.validate(async valid => {
    if (!valid) return;
    try {
      let params = {}
      if (form.value.setParamKey == '1') {
        params = {
          deviceSerialNo: form.value.deviceSerialNo,
          period: form.value.period,
        }
      } else {
        params = {
          deviceSerialNo: form.value.deviceSerialNo,
          "humidity": form.value.humidity,
          "humidityLow": form.value.humidityLow,
          "humidityUp": form.value.humidityUp,
          "temperatureLow": form.value.temperatureLow,
          "temperatureUp": form.value.temperatureUp,
        }
      }
      await proFormProps.value.api(params);
      ElMessage.success({ message: `${proFormProps.value.title}成功` });
      proFormProps.value.getTableList();
      proFormVisible.value = false;
    } catch (error) {
      console.log(error);
    }
  });
};

const acceptParams = params => {
  proFormProps.value = params;
  form.value['deviceSerialNo'] = params.row?.deviceSerialNo || proFormProps.value.row?.deviceId || '';
  proFormVisible.value = true;
};

defineExpose({
  acceptParams
});
</script>
