<template>
  <el-dialog :title="`${proFormProps.title}`" v-model="proFormVisible" width="1180px" @close="close" align-center
    :show-close="false">
    <div class="mn-container">
      <el-form ref="formRef" :model="form" :disabled="proFormProps.isView" :rules="rules" label-width="100px"
        size="large" :inline="true" label-position="right">
        <el-form-item label="评估方案名称" prop="schemeName" label-width="120px" class="full-width">
          <div class="td-flex full-width">
            <el-input v-model="form.schemeName" placeholder="" class="full-width" />
            <el-button type="primary" class="td-ml10">设置默认权限</el-button>
          </div>
        </el-form-item>
        <div class="i-title">监测点综合评估权重</div>
        <div class="i-title_sub td-mt12">
          监测点的综合评估权重主要通过洁净度与有效稳定性两个维度来计算分数，再输入计算权重，洁净度与有效稳定性权重之和必须为1。
        </div>
        <div class="full-width td-flex td-pt18">
          <el-form-item label="有效稳定性" prop="stabilityScale">
            <el-input-number v-model="form.stabilityScale" class="mx-4" :min="0" :max="1" controls-position="right" />
          </el-form-item>
          <el-form-item label="洁净度" prop="cleanlinessScale">
            <el-input-number v-model="form.cleanlinessScale" class="mx-4" :min="0" :max="1" controls-position="right" />
          </el-form-item>
        </div>
        <div class="m-hr_dashed"></div>
        <div class="i-title">洁净度评分权重</div>
        <div class="i-title_sub td-mt12">
          洁净度评分主要通过VOC、CO2、有机/无机/含硫污染物几项监测类型来计算，请输入各监测类型的计算权重，各监测类型权重之和必须为1。
        </div>
        <div class="full-width td-pt18">
          <el-form-item label="有机污染物" prop="ogncContamiScale">
            <el-input-number v-model="form.ogncContamiScale" class="mx-4" :min="0" :max="1" controls-position="right" />
          </el-form-item>
          <el-form-item label="无机污染物" prop="inogncContamiScale">
            <el-input-number v-model="form.inogncContamiScale" class="mx-4" :min="0" :max="1"
              controls-position="right" />
          </el-form-item>
          <el-form-item label="含硫污染物" prop="sulfurContamiScale">
            <el-input-number v-model="form.sulfurContamiScale" class="mx-4" :min="0" :max="1"
              controls-position="right" />
          </el-form-item>
          <el-form-item label="CO2" prop="co2Scale">
            <el-input-number v-model="form.co2Scale" class="mx-4" :min="0" :max="1" controls-position="right" />
          </el-form-item>
          <el-form-item label="VOC" prop="vocScale">
            <el-input-number v-model="form.vocScale" class="mx-4" :min="0" :max="1" controls-position="right" />
          </el-form-item>
        </div>
        <div class="m-hr_dashed"></div>
        <div class="i-title">有效稳定性评分权重</div>
        <div class="i-title_sub td-mt12">
          有效稳定性是监测数据的稳定性评分与监测数据偏离正常阚值程度计算得来的综合评分，主要通过温度、湿度、光照、紫外线几项监测类型来计算。
        </div>
        <div class="full-width i-title_sub td-mt8">
          请输入数据稳定性与数据偏离程度的计算权重，权重之和必须为1。
        </div>
        <div class="full-width td-pt18">
          <el-form-item label="数据稳定性" prop="dataStabilityScale">
            <el-input-number v-model="form.dataStabilityScale" class="mx-4" :min="0" :max="1"
              controls-position="right" />
          </el-form-item>
          <el-form-item label="数据偏离程度" prop="dataOffsetScale" label-width="110px">
            <el-input-number v-model="form.dataOffsetScale" class="mx-4" :min="0" :max="1" controls-position="right" />
          </el-form-item>
        </div>
        <div class="i-title_sub td-mt12">
          请输入数据有效稳定性各监测类型的计算权重，各监测类型权重之和必须为1。
        </div>
        <div class="full-width td-pt18">
          <el-form-item label="温度" prop="temperatureScale">
            <el-input-number v-model="form.temperatureScale" class="mx-4" :min="0" :max="1" controls-position="right" />
          </el-form-item>
          <el-form-item label="湿度" prop="humidityScale">
            <el-input-number v-model="form.humidityScale" class="mx-4" :min="0" :max="1" controls-position="right" />
          </el-form-item>
          <el-form-item label="光照" prop="illuminationScale">
            <el-input-number v-model="form.illuminationScale" class="mx-4" :min="0" :max="1"
              controls-position="right" />
          </el-form-item>
          <el-form-item label="紫外线" prop="ultravioletScale">
            <el-input-number v-model="form.ultravioletScale" class="mx-4" :min="0" :max="1" controls-position="right" />
          </el-form-item>
        </div>
      </el-form>
      <div class="td-flex center td-mt40">
        <el-button class="button-c-sure" v-show="!proFormProps.isView" type="primary"
          @click="handleSubmit">确定</el-button>
        <!-- <div class="i-button_cancel td-ml10" @click="close">取消</div> -->
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
const { proxy } = getCurrentInstance();

const proFormVisible = ref(false);
const formRef = ref(null);
const form = ref({
  schemeId: '',
  schemeName: '',
  stabilityScale: '',
  cleanlinessScale: '',
  co2Scale: '',
  humidityScale: '',
  illuminationScale: '',
  inogncContamiScale: '',
  ogncContamiScale: '',
  sulfurContamiScale: '',
  temperatureScale: '',
  ultravioletScale: '',
  vocScale: '',
  dataOffsetScale: '',
  dataStabilityScale: ''
});
const rules = reactive({
  schemeName: [{ required: true, trigger: 'blur', message: '请输入' }]
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
    schemeId: '',
    schemeName: '',
    stabilityScale: '',
    cleanlinessScale: '',
    co2Scale: '',
    humidityScale: '',
    illuminationScale: '',
    inogncContamiScale: '',
    ogncContamiScale: '',
    sulfurContamiScale: '',
    temperatureScale: '',
    ultravioletScale: '',
    vocScale: '',
    dataOffsetScale: '',
    dataStabilityScale: ''
  };
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

const acceptParams = params => {
  proFormProps.value = params;
  if (params.title == '新增') {
  } else {
    Object.keys(form.value).forEach(function (key) {
      form.value[key] = params.row[key];
    });
    form.value['id'] = params.row['schemeId'];
  }
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

.pro-form {
  :deep(.el-form-item) {
    margin: 0;
  }
}

.i-title {
  font-size: 16px;
  color: #333333;
}

.i-title_sub {
  font-weight: 400;
  font-size: 14px;
  color: #999999;
  line-height: 20px;
  text-align: left;
  font-style: normal;
  text-transform: none;
}

.m-hr_dashed {
  border-top: 1px dashed #D8D8D8;
  margin-bottom: 25px
}
</style>
