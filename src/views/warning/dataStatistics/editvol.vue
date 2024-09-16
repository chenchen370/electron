<template>
  <el-dialog :title="`${proFormProps.title}`" v-model="proFormVisible" width="1028px" @close="close" align-center
    :show-close="false">
    <div class="mn-container">
      <ProTable ref="proTable" :request-api="getTableList" :columns="columns"></ProTable>

      <div class="td-flex justify-end td-mt20">
        <!-- <div
          class="i-button_primary"
          @click="handleSubmit"
          v-show="!proFormProps.isView"
        >
          确认
        </div> -->
        <!-- <div class="i-button_cancel td-ml10" @click="close">取消</div> -->
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="jsx">
import { reactive } from 'vue';
import { getMonitorDataHis } from '@/api/warning/monitorData';
const { proxy } = getCurrentInstance();
const {
  moniting_status,
  artifact_type,
  warning_status,
  func_type,
  monitor_range,
  monitor_type,
  warning_location_type,
  suitable_environment
} = proxy.useDict(
  'moniting_status',
  'artifact_type',
  'warning_status',
  'func_type',
  'monitor_range',
  'monitor_type',
  'warning_location_type',
  'suitable_environment'
);

const area_type = [
  {
    label: '展厅',
    value: '1'
  },
  {
    label: '库房',
    value: '2'
  },
  {
    label: '展柜',
    value: '3'
  },
  {
    label: '储藏柜',
    value: '4'
  }
];
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
    label: '监测点位置描述',
    prop: 'warningDetail',
    width: 180,
    search: { el: 'text', props: {}, order: 1 }
  },
  {
    label: '文物类别',
    prop: 'artifactType',
    width: 130,
    form: {
      el: 'select',
      defaultValue: ''
    },
    search: { el: 'select', props: {}, order: 9 },
    enum: artifact_type
  },
  {
    label: '监测类型',
    isShow: false,
    prop: 'monitorType',
    search: { el: 'select', props: {}, order: 10 },
    enum: monitor_type
  },
  {
    label: '监测范围',
    isShow: false,
    prop: 'monitorRange',
    search: { el: 'select', props: {}, order: 3 },
    enum: suitable_environment
  },
  {
    label: '监测区域类型',
    isShow: false,
    prop: 'warningLocationType',
    search: { el: 'select', props: {}, order: 2 },
    // enum: warning_location_type
    enum: area_type
  },
  {
    label: '展柜/储藏柜功能类型',
    isShow: false,
    prop: 'funcType',
    search: { el: 'select', props: {} },
    enum: func_type
  },
  {
    label: '警报状态',
    prop: 'warningStatus',
    width: 130,
    form: {
      el: 'select',
      defaultValue: ''
    },
    search: { el: 'select', props: {} },
    enum: warning_status,
    render: props => {
      return (
        <>
          <div class={'monitor-theme_' + props.row.warningStatus}>
            {props.row.warningStatus}
          </div>
        </>
      );
    }
  },
  {
    label: '温度',
    prop: 'temperature',
    render: props => {
      return (
        <>
          <div
            class={
              props.row.warningType?.split(',').indexOf('1') > -1
                ? 'monitor-theme_' + props.row.warningStatus
                : ''
            }
          >
            {props.row.temperature}
          </div>
        </>
      );
    }
  },
  {
    label: '湿度',
    prop: 'humidity',
    render: props => {
      return (
        <>
          <div
            class={
              props.row.warningType?.split(',').indexOf('2') > -1
                ? 'monitor-theme_' + props.row.warningStatus
                : ''
            }
          >
            {props.row.humidity}
          </div>
        </>
      );
    }
  },
  {
    label: 'CO2(ppm)',
    width: 130,
    prop: 'co2',
    render: props => {
      return (
        <>
          <div
            class={
              props.row.warningType?.split(',').indexOf('3') > -1
                ? 'monitor-theme_' + props.row.warningStatus
                : ''
            }
          >
            {props.row.co2}
          </div>
        </>
      );
    }
  },
  {
    label: '光照（lx）',
    width: 120,
    prop: 'illumination',
    render: props => {
      return (
        <>
          <div
            class={
              props.row.warningType?.split(',').indexOf('5') > -1
                ? 'monitor-theme_' + props.row.warningStatus
                : ''
            }
          >
            {props.row.illumination}
          </div>
        </>
      );
    }
  },
  {
    label: '紫外线（uW/cm2）',
    prop: 'ultraviolet',
    width: 180,
    render: props => {
      return (
        <>
          <div
            class={
              props.row.warningType?.split(',').indexOf('6') > -1
                ? 'monitor-theme_' + props.row.warningStatus
                : ''
            }
          >
            {props.row.ultraviolet}
          </div>
        </>
      );
    }
  },
  {
    label: 'VOC(ppm)',
    prop: 'voc',
    width: 130,
    render: props => {
      return (
        <>
          <div
            class={
              props.row.warningType?.split(',').indexOf('4') > -1
                ? 'monitor-theme_' + props.row.warningStatus
                : ''
            }
          >
            {props.row.voc}
          </div>
        </>
      );
    }
  },
  {
    label: '有机污染物',
    prop: 'ogncContami',
    width: 130,
    form: {
      el: 'text'
    }
  },
  {
    label: '无机污染物',
    prop: 'inogncContami',
    width: 130,
    form: {
      el: 'text'
    }
  },
  {
    label: '含硫污染物',
    prop: 'sulfurContami',
    width: 130,
    form: {
      el: 'text'
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
  newParams.warningLocationId = proFormProps.value.row?.houseId;
  return getMonitorDataHis(newParams);
};
// ProTable 实例
const proTable = ref();

const close = () => {
  reset();
  proFormProps.value = {
    isView: false,
    title: '',
    row: {}
  };
  proFormVisible.value = false;
};

const reset = () => { };
const handleSubmit = async () => {
  proFormProps.value.getTableList();
  proFormVisible.value = false;
};

const acceptParams = params => {
  console.log(params);
  proFormProps.value = params;
  proFormVisible.value = true;
};

defineExpose({
  acceptParams
});
</script>
