<template>
  <ProTable ref="proTable" :request-api="getTableList" :columns="columns">
    <template #operation="scope">
      <!-- <el-button type="primary" link @click="openHistoryForm('数据曲线', scope.row)">数据曲线</el-button>
      <el-button type="primary" link @click="openProForm('调控设置', scope.row)">调控设置</el-button>
      <el-button type="primary" link @click="openCtrlHisForm('调控历史', scope.row)">调控历史</el-button> -->

      <div class="td-icon icon-ctrl_list td-mr20 td-pointer" title="数据曲线" @click="openHistoryForm('数据曲线', scope.row)">
      </div>
      <div class="td-icon icon-ctrl_set td-mr20 td-pointer" title="调控设置" @click="openProForm('调控设置', scope.row)"></div>
      <div class="td-icon icon-ctrl_his td-pointer" title="调控历史" @click="openCtrlHisForm('调控历史', scope.row)"></div>
    </template>
  </ProTable>

  <ProForm :columns="columns" :searchCol="2" width="80%" ref="drawerRef"></ProForm>
  <edit ref="editRef" />
  <ctrlHis ref="ctrlHisRef" />
  <ctrlSet ref="ctrlSetRef" />

</template>
<script setup lang="jsx">
import { useHandleData } from '@/components/ProTable/hooks';

import {
  getCtrlDevicelistWithData,
  getCtrlDeviceRunList,
  getCtrlDeviceCtrlHis,
  addCtrlDevice
} from '@/api/warning/ctrlDevice';
import Edit from './edit';
import ctrlHis from './ctrlHis';
import ctrlSet from './ctrlSet';
const { proxy } = getCurrentInstance();
const { artifact_type, ctrl_device_name, device_start_statu, device_run_status, ctrl_warning_status } = proxy.useDict('artifact_type', 'ctrl_device_name', 'device_start_statu', 'device_run_status', 'ctrl_warning_status');

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
    label: '名称',
    prop: 'deviceName',
    minWidth: 180,
    search: { el: 'select', props: {} },
    enum: ctrl_device_name
  },
  {
    label: '设备序列号',
    prop: 'deviceId',
    minWidth: 130,
    search: { el: 'text', props: {} },
  },
  {
    label: '描述',
    prop: 'deviceDesc',
    minWidth: 130,
  },
  {
    label: '所在区域',
    prop: 'devicePosition',
    minWidth: 130,
  },
  {
    label: '展柜名称',
    prop: 'cabinetName',
    minWidth: 130,
  },
  {
    label: '展柜Id',
    prop: 'cabinetId',
    isShow: false,
    search: { el: 'text', props: {} },
  },
  {
    label: '启动状态',
    prop: 'deviceStartStatu',
    minWidth: 130,
    isShow: false,
    search: { el: 'select', props: {} },
    enum: device_start_statu
  },
  {
    label: '状态',
    prop: 'deviceRunStatus',
    minWidth: 130,
    search: { el: 'select', props: {} },
    enum: device_run_status,
    render({ row }) {
      if (row.deviceRunStatus == 1) {
        return <><span class="monitor-theme_2">异常</span></>
      } else {
        return <><span class="monitor-theme_1">正常</span></>
      }
    },
  },
  {
    label: '数据',
    prop: 'realTimeData',
    minWidth: 200,
    render({ row }) {
      if (row?.realTimeData) {
        return <>
          <div class={'text-left'}>温度：{row?.realTimeData?.caseTemperature} ℃</div>
          <div class={'text-left'}>湿度：{row?.realTimeData?.caseHumidity} %</div>
          <div class={'text-left'}>水位报警：{row?.realTimeData?.ctrlWarningStatusDic}</div>
        </>;
      } else {
        return '';
      }

    },
  },
  {
    label: '更新时间',
    prop: 'updateTime',
    minWidth: 130,
  },
  { prop: 'operation', width: 230, label: '操作', fixed: 'right' }
]);
const columnsvol = reactive([
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
    prop: 'cabinetName',
    minWidth: 180,
    form: {
      el: 'text'
    }
  },
  {
    label: '文物类别',
    prop: 'artifactType',
    minWidth: 130,
    search: { el: 'select', props: {} },
    enum: artifact_type
  },
  {
    label: '柜内调控设备实时数据',
    prop: 'ctrlRealTimeData',
    minWidth: 330,
    _children: [
      {
        label: '湿度',
        prop: 'humidity',
        minWidth: 130,
        render({ row }) {
          return <>{row?.ctrlRealTimeData?.caseHumidity} {row?.ctrlRealTimeData?.humidityUp} {row?.ctrlRealTimeData?.humidityLow}</>;
        },
      },
      // {
      //   label: '湿度预设值',
      //   prop: 'setHumidity',
      //   minWidth: 130,
      //   render(row) {
      //     let txt = row?.ctrlRealTimeData?.map(v => {
      //       return <>{v.setHumidity}</>;
      //     })
      //     return txt;
      //   },
      // },
      {
        label: '温度',
        prop: 'temperature',
        minWidth: 130,
        render({ row }) {
          return <>{row?.ctrlRealTimeData?.hotNodeTemperature} {row?.ctrlRealTimeData?.coldNodeTemperature}</>;
        },
      },
      // {
      //   label: '温度预设值',
      //   prop: 'caseTemperature',
      //   minWidth: 130,
      //   render(row) {
      //     let txt = row?.ctrlRealTimeData?.map(v => {
      //       return <>{v.caseTemperature}</>;
      //     })
      //     return txt;
      //   },
      // },
      // {
      //   label: '水箱水位',
      //   prop: 'waterLevelStatus',
      //   minWidth: 130,
      //   render(row) {
      //     let txt = row?.ctrlRealTimeData?.map(v => {
      //       return <>{formatterStatus(v.waterLevelStatus)}</>;
      //     })
      //     return txt;
      //   },
      // },
    ],
  },
  {
    label: '柜内监测数据',
    prop: 'cabinetRealTimeData',
    _children: [
      {
        label: '湿度',
        prop: 'humidity',
        minWidth: 130,
        render({ row }) {
          return <>{row?.cabinetRealTimeData?.humidity}</>;
        },
      },
      {
        label: '温度',
        prop: 'temperature',
        minWidth: 130,
        render({ row }) {
          return <>{row?.cabinetRealTimeData?.temperature}</>;
        },
      },
    ],
  },
  {
    label: '所在区域小环境监测数据',
    prop: 'houseRealTimeData',
    _children: [
      {
        label: '湿度',
        prop: 'humidity',
        minWidth: 130,
        render({ row }) {
          return <>{row?.houseRealTimeData?.humidity}</>;
        },
      },
      {
        label: '温度',
        prop: 'temperature',
        minWidth: 130,
        render({ row }) {
          return <>{row?.houseRealTimeData?.temperature}</>;
        },
      },
    ],
  },
  { prop: 'operation', width: 230, label: '操作', fixed: 'right' }
]);

const getTableList = params => {
  let newParams = JSON.parse(JSON.stringify(params));
  return getCtrlDevicelistWithData(newParams);
};

// ProTable 实例
const proTable = ref();

const ctrlSetRef = ref(null);
const openProForm = (title, row = {}) => {
  const params = {
    title,
    isView: false,
    row: { ...row },
    api: addCtrlDevice,
    getTableList: proTable.value?.getTableList
  };
  ctrlSetRef.value?.acceptParams(params);
};
const editRef = ref(null);
const openHistoryForm = (title, row = {}) => {
  const params = {
    title,
    isView: false,
    row: { ...row },
    api: undefined,
    getTableList: proTable.value?.getTableList
  };
  editRef.value?.acceptParams(params);
};

const formatterStatus = (v) => {
  switch (v) {
    case '0':
      return '过低'
    case '1':
      return '正常'
    case '2':
      return '过高'
    default:
      return '无数据'
  }
}
const ctrlHisRef = ref(null);
const openCtrlHisForm = (title, row = {}) => {
  const params = {
    title,
    isView: false,
    row: { ...row },
    api: undefined,
    getTableList: proTable.value?.getTableList
  };
  ctrlHisRef.value?.acceptParams(params);
};
</script>
<style scoped lang="scss">
:deep(.el-form-item__label-wrap){
  margin-left: 0 !important;
}
</style>