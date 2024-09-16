<template>
  <el-dialog :title="`${proFormProps.title}`" v-model="proFormVisible" width="1028px" @close="close" align-center
    :show-close="false">
    <div class="mn-container">
      <ProTable ref="proTable" :request-api="getTableList" :columns="columns" @selection-change="handleSelectionChange">
        <template #action="scope">
          <div>以下为可匹配的评估方案，请选择相应的评估方案</div>
        </template>
      </ProTable>

      <div class="td-flex center td-mt30">
        <el-button class="button-c-sure" v-show="!proFormProps.isView" type="primary"
          @click="handleSubmit">确定</el-button>
        <!-- <div class="i-button_cancel td-ml10" @click="close">取消</div> -->
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="jsx">
import { reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { getAssessList } from '@/api/warning/assess';
const { proxy } = getCurrentInstance();
const { suitable_environment } = proxy.useDict('suitable_environment');

const columns = reactive([
  {
    type: 'selection'
  },
  {
    label: '序号',
    width: 60,
    type: 'index'
  },
  {
    label: '评估方案名称',
    prop: 'schemeName',
    width: 130,
    form: {
      el: 'text'
    },
    search: { el: 'text', props: {} }
  },
  {
    label: '权重方案',
    prop: 'stabilityScale',
    form: {
      el: 'text'
    },
    render: props => {
      return (
        <>
          <div class="text-left" id={'case' + props.$index}>
            <div>监测点综合评估权重</div>
            <div>
              洁净度：{props.row.cleanlinessScale}
              <span class="td-ml16">
                有效稳定性：{props.row.stabilityScale}
              </span>
            </div>
            <div>洁净度评分权重</div>
            <div>
              CO2：{props.row.co2Scale}
              <span class="td-ml16"></span>VOC：{props.row.vocScale}
              <span class="td-ml16"></span>有机污染物：
              {props.row.ogncContamiScale}
              <span class="td-ml16"></span>无机污染物：
              {props.row.inogncContamiScale}
              <span class="td-ml16"></span>含硫污染物：
              {props.row.sulfurContamiScale}
            </div>
            <div>有效稳定性评分权重</div>
            <div>
              数据稳定性：{props.row.dataStabilityScale}
              <span class="td-ml16"></span>数据偏离程度：
              {props.row.dataOffsetScale}
              <br />
              温度：{props.row.temperatureScale}
              <span class="td-ml16"></span>湿度：{props.row.humidityScale}
              <span class="td-ml16"></span>紫外线：{props.row.ultravioletScale}
              <span class="td-ml16"></span>光照：{props.row.illuminationScale}
            </div>
          </div>
        </>
      );
    }
  }
]);
const proFormVisible = ref(false);
const proFormProps = ref({
  isView: false,
  title: '',
  row: {}
});
const getTableList = params => {
  let newParams = JSON.parse(JSON.stringify(params));
  return getAssessList(newParams);
};
// ProTable 实例
const selection = ref();
const proTable = ref();

const close = () => {
  reset();
  proFormProps.value = {
    isView: false,
    title: '',
    row: {}
  };
  proTable.value?.clearSelection();
  proFormVisible.value = false;
};
const handleSelectionChange = v => {
  selection.value = v;
};
const reset = () => { };
const handleSubmit = async () => {
  if (!selection.value) {
    ElMessage.warning({ message: '请选择方案' });
    return;
  }
  if (selection.value.length > 1) {
    ElMessage.warning({ message: '只能选择一个评估方案' });
    return;
  }
  const mappingList = Array.from(selection.value).map(v => {
    let item = {
      schemeId: v.schemeId,
      cabinetId: proFormProps.value.row?.cabinetId
    };
    return item;
  });
  const param = {
    mappingList,
    confMethod: '1'
  };
  await proFormProps.value.api(param);
  ElMessage.success({ message: `${proFormProps.value.title}成功` });
  proFormProps.value.getTableList();
  proFormVisible.value = false;
};

const acceptParams = params => {
  proFormProps.value = params;
  proFormVisible.value = true;
};

defineExpose({
  acceptParams
});
</script>
<style lang="scss" scoped>
:deep(.el-protable-main-header) {
  padding-top: 10px;
}
</style>
