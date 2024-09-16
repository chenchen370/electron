<template>
  <ProTable ref="proTable" :request-api="getTableList" :columns="columns">
    <!-- 表格 header 按钮 -->
    <template #action="scope">
      <el-button type="primary" @click="openProForm('新增')" plain icon="Plus"
        >新增</el-button
      >
    </template>
    <template #deviceRunStatus="scope">
      <span :class="[scope.row.deviceRunStatus == 1 ? 'txt-danger' : '']">{{
        scope.row.deviceRunStatus == 1 ? '异常' : '正常'
      }}</span>
    </template>
    <!-- 表格操作 -->
    <template #operation="scope">
      <!-- <el-button
        type="primary"
        link
        @click="openHistoryForm('历史数据查询', scope.row)"
        >历史数据</el-button
      > -->
      <el-button type="primary" link @click="openProForm('详情', scope.row)"
        >详情</el-button
      >
      <el-button type="primary" link @click="openProForm('编辑', scope.row)"
        >编辑</el-button
      >
      <!-- <el-button type="primary" link @click="deleteAccount(scope.row)"
        >删除</el-button
      > -->
    </template>
  </ProTable>

  <ProForm
    :columns="columns"
    :searchCol="2"
    width="80%"
    ref="drawerRef"
  ></ProForm>
  <edit ref="editRef" />
</template>
<script setup lang="jsx">
import { useHandleData } from '@/components/ProTable/hooks';
import {
  getDeviceList,
  addDevice,
  editDevice,
  removeDevice,
  getStatusList
} from '@/api/warning/device';
import { reactive } from 'vue';
import Edit from './edit';
import cusSelect from './cusSelect';
import IconSelect from '@/components/IconSelect';
import { getWarehouseAllList } from '@/api/artifact/warehouse';
import { getAllByHouseId } from '@/api/artifact/cabinet';
const { proxy } = getCurrentInstance();
const {
  device_type,
  device_name,
  device_start_statu,
  device_run_status,
  device_code,
  gateway_device_name,
} = proxy.useDict(
  'device_name',
  'device_type',
  'device_start_statu',
  'device_run_status',
  'device_code',
  'gateway_device_name',
);
const cabinet_addr = ref([]);
const cabinet_addr_detail = ref([]);

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
    label: '设备ID',
    prop: 'deviceId',
    form: {
      el: 'text',
      rules: [
        {
          required: true,
          message: '请输入设备ID',
          trigger: 'blur'
        }
      ]
    },
    search: { el: 'text', props: {} }
  },
  {
    label: '设备名称',
    prop: 'deviceName',
    form: {
      el: 'select',
      defaultValue: ''
    },
    search: { el: 'select', props: {} },
    enum: gateway_device_name
  },
  // {
  //   label: '设备类型',
  //   prop: 'deviceType',
  //   form: {
  //     el: 'select',
  //     defaultValue: ''
  //   },
  //   search: { el: 'select', props: {} },
  //   enum: device_type
  // },
  {
    label: '设备型号',
    prop: 'deviceCode',
    form: {
      el: 'text',
      defaultValue: ''
    }
    // search: { el: 'select', props: {} },
    // enum: device_code
  },
  {
    label: '所在区域',
    prop: 'deviceArea',
    width: 130,
    form: {
      el: 'select',
      span: 1,
      render: (props, { emit }) => {
        return (
          <>
            <cusSelect
              readOnly={props.title === '查看'}
              data={cabinet_addr.value}
              modelValue={
                props.itemValue.deviceArea ? props.itemValue.deviceArea : ''
              }
              onUpdate:modelValue={value => {
                deviceArea.value = value;
                emit('update:modelValue', value);
              }}
            />
          </>
        );
      }
    },
    search: { el: 'select', props: {} }
  },
  {
    label: '具体位置',
    prop: 'devicePosition',
    width: 150,
    form: {
      el: 'select',
      span: 1,
      render: (props, { emit }) => {
        return (
          <>
            <cusSelect
              readOnly={props.title === '查看'}
              data={cabinet_addr_detail.value}
              modelValue={
                props.itemValue.devicePosition
                  ? props.itemValue.devicePosition
                  : ''
              }
              onUpdate:modelValue={value => {
                emit('update:modelValue', value);
              }}
            />
          </>
        );
      }
    }
  },
  {
    label: '设备启动状态',
    prop: 'deviceStartStatu',
    width: 130,
    form: {
      el: 'select',
      defaultValue: ''
    },
    search: { el: 'select', props: {} },
    enum: device_start_statu
  },
  {
    label: '设备运行状态',
    prop: 'deviceRunStatus',
    width: 130,
    form: {
      el: 'select',
      defaultValue: ''
    },
    // search: { el: 'select', props: {} },
    enum: device_run_status
  },
  // {
  //   label: '设备采集频率',
  //   prop: 'deviceFrequency',
  //   form: {
  //     el: 'text'
  //   }
  // },
  // {
  //   label: '检测区域编号',
  //   prop: 'deviceAreaId',
  //   form: {
  //     el: 'text'
  //   }
  // },
  {
    label: '设备描述',
    prop: 'deviceDesc',
    form: {
      el: 'text',
      span: 2
    }
  },
  { prop: 'operation', width: 180, label: '操作', fixed: 'right' }
]);
// ProTable 实例
const proTable = ref();
const deviceType = ref('1');
const deviceArea = ref('');

const getWarehouseAllLists = async () => {
  const { rows } = await getWarehouseAllList();
  cabinet_addr.value = [];
  rows.map(v => {
    cabinet_addr.value.push({
      label: v.houseName,
      key: v.houseId,
      value: v.houseName
    });
  });
};
const getAllDataByHouseId = async id => {
  const { rows } = await getAllByHouseId(id);
  cabinet_addr_detail.value = [];
  rows.map(v => {
    cabinet_addr_detail.value.push({
      label: v.cabinetName,
      key: v.cabinetId,
      value: v.cabinetName
    });
  });
};
watch(deviceArea, val => {
  const houseId = cabinet_addr.value[cabinet_addr.value.findIndex(v=>v.label==val)]?.key||''
  houseId&&getAllDataByHouseId(houseId);
});
getWarehouseAllLists();
const getTableList = params => {
  let newParams = JSON.parse(JSON.stringify(params));
  newParams.deviceType = '3';
  return getDeviceList(newParams);
};

// 删除用户信息
const deleteAccount = async params => {
  await useHandleData(
    removeDevice,
    { ids: params.deviceId },
    `删除【${params.deviceId}】`
  );
  proTable.value?.getTableList();
};

// 打开 drawer(新增、详情、编辑)
const drawerRef = ref(null);
const openProForm = (title, row = {}) => {
  row.deviceType = '3';
  const params = {
    title,
    isView: title === '详情',
    row: { ...row },
    disabledAarr:
      title === '编辑' ? ['设备ID', '设备名称', '所在区域', '具体位置'] : [],
    api:
      title === '新增' ? addDevice : title === '编辑' ? editDevice : undefined,
    getTableList: proTable.value?.getTableList
  };
  drawerRef.value?.acceptParams(params);
};

const editRef = ref(null);
const openHistoryForm = (title, row = {}) => {
  if (title === '编辑') {
    row.deviceArea && getWarehouseAllLists();
    row.devicePosition && getAllDataByHouseId();
  }
  const params = {
    title,
    isView: title === '详情',
    row: { ...row },
    api:
      title === '新增'
        ? addCabinet
        : title === '编辑'
        ? editCabinet
        : undefined,
    getTableList: proTable.value?.getTableList
  };
  editRef.value?.acceptParams(params);
};
</script>
<style lang="scss" scoped>
.txt-danger {
  color: #f00;
}
</style>
