<template>
  <ProTable ref="proTable" :request-api="getTableList" :columns="columns" @selectionChange="doSelectionChange">
    <!-- 表格 header 按钮 -->
    <template #action="scope">
      <el-button type="primary" @click="openProForm('新增')" plain icon="Plus">新增</el-button>
      <el-button type="primary" @click="deleteAccount(selectionArr[0])" plain icon="Delete"
      :disabled="selectionArr.length != 1">删除</el-button>
    </template>
    <!-- 表格操作 -->
    <template #operation="scope">
      <el-icon size="22" color="#38675C" title="编辑" @click="openProForm('编辑', scope.row)" class="td-mr20 td-pointer">
        <EditPen />
      </el-icon>
      <el-icon size="22" color="#38675C" title="删除" @click="deleteAccount(scope.row)" class="td-mr20 td-pointer">
        <Delete />
      </el-icon>
      <el-icon size="22" color="#38675C" title="查看" @click="openProForm('查看', scope.row)" class="td-pointer">
        <View />
      </el-icon>
    </template>
  </ProTable>
  <ProForm :columns="columns" :searchCol="2" width="80%" ref="drawerRef"></ProForm>
</template>
<script setup lang="jsx">
import { useHandleData } from '@/components/ProTable/hooks';
import {
  getMonitorPointList,
  addMonitorPoint,
  editMonitorPoint,
  removeMonitorPoint,
} from '@/api/warning/monitorPoint';
import { getDeviceList } from '@/api/warning/device';
import cusSelectTree from '@/views/artifact/device/cusSelectTree';
import { avatarEmits } from 'element-plus';
import pic from './pic.vue'
const { proxy } = getCurrentInstance();
const { moniting_status } = proxy.useDict('moniting_status');
const device_list = ref([]);
const area_list = ref([]);
const deviceAreaId = ref('');
const devicePoint = ref({});
// ProTable 实例
const proTable = ref();

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
    label: '监测点所在坐标',
    prop: 'pointLocation',
    isShow: false,
    minWidth: 180,
    form: {
      el: 'text',
      placeholder: '所在平面图坐标点X,Y',
      rules: [
        {
          required: true,
          message: '请输入监测点所在坐标',
          trigger: 'blur'
        }
      ]
    }
  },
  // {
  //   label: '适用环境',
  //   prop: 'pointType',
  //   form: {
  //     el: 'select',
  //     defaultValue: ''
  //   },
  //   search: { el: 'select', props: {} },
  //   enum: suitable_environment
  // },
  {
    label: '监测点位置描述',
    prop: 'pointDesc',
    minWidth: 200,
    form: {
      el: 'text',
      rules: [
        {
          required: true,
          message: '请输入监测点位置描述',
          trigger: 'blur'
        }
      ]
    },
    render: props => {
      return (
        <>
          <pic modelValue={props?.row ? props?.row : {}} />
        </>
      );
    }
  },
  {
    label: '监测点类型',
    prop: 'pointType',
    minWidth: 150,
    search: { el: 'select', props: {} },
    enum: [
      { label: '小环境', value: '1' },
      { label: '微环境', value: '2' }
    ],
    render: props => {
      return <>{props.row.pointTypeDic}</>;
    }
  },
  {
    label: '所在区域',
    prop: 'houseId',
    // isShow: false,
    minWidth: 230,
    form: {
      el: 'select',
      span: 1,
      rules: [
        {
          required: true,
          message: '请选择所在区域',
          trigger: 'change'
        }
      ],
      render: (props, { emit }) => {
        return (
          <>
            <cusSelectTree
              readOnly={props.title === '查看'}
              modelValue={
                props.itemValue.cabinetName ? props.itemValue.houseName + props.itemValue?.cabinetName : props.itemValue.houseName
              }
              onUpdate:modelValue={value => {
                deviceAreaId.value = value;
                emit('update:modelValue', value);
              }}
            />
          </>
        );
      }
    },
    render: props => {
      return <>{props.row.houseName} {props.row.cabinetName}</>;
    },
    search: {
      el: 'select',
      props: {},
      render: (props, { emit }) => {
        return (
          <>
            <cusSelectTree
              modelValue={props.modelValue ? props.modelValue : ''}
              onUpdate:modelValue={value => {
                const arr = value?.split(',')
                proTable.value.searchParam.houseId = arr?.[0] || '';
                proTable.value.searchParam.cabinetId = arr?.[1] || '';
                {/* emit('update:modelValue', value); */ }
              }}
            />
          </>
        );
      }
    }
  },
  {
    label: '设备号列表',
    // isShow: false,
    prop: 'deviceList',
    minWidth: 230,
    form: {
      el: 'select',
      props: { multiple: true },
      rules: [
        {
          required: true,
          message: '请选择设备号列表',
          trigger: 'change'
        }
      ]
    },
    enum: device_list,
    render: props => {
      let txt = props.row.deviceList?.map(v => {
        return <div>{v}</div>;
      })
      return txt
    }
  },
  { prop: 'operation', width: 180, label: '操作', fixed: 'right' }
]);

const selectionArr = ref([]);
const doSelectionChange = params => {
  selectionArr.value = params
};

watch(deviceAreaId, val => {
  const arr = val?.split(',')
  drawerRef.value.proFormProps.row.houseId = arr?.[0] || '';
  drawerRef.value.proFormProps.row.cabinetId = arr?.[1] || '';

  devicePoint.value.houseId = arr?.[0] || '';
  devicePoint.value.cabinetId = arr?.[1] || '';
  getAllDeviceLists();
});

const getAllDeviceLists = async (id) => {
  const { rows } = await getDeviceList({
    pageOpen: false,
    houseId: devicePoint.value?.houseId,
    cabinetId: devicePoint.value?.cabinetId,
  });
  device_list.value = [];
  drawerRef.value.proFormProps.row.deviceList = '';

  rows.map(v => {
    device_list.value.push({
      label: v.deviceId + '（' + v.deviceNameDic + '）',
      key: v.deviceId,
      value: v.deviceId
    });
  });

};
// getAllDeviceLists();
const getTableList = params => {
  selectionArr.value = []
  proTable.value?.clearSelection()

  let newParams = JSON.parse(JSON.stringify(params));
  return getMonitorPointList(newParams);
};

// 删除用户信息
const deleteAccount = async params => {
  await useHandleData(
    removeMonitorPoint,
    { ids: [params.pointId] },
    `删除监测点 ${params.pointDesc}`
  );
  proTable.value?.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref(null);
const settingRef = ref(null);
const openProForm = async (title, row = {}) => {
  if (title !== '新增') {
    devicePoint.value.houseId = row.houseId
    devicePoint.value.cabinetId = row.cabinetId

    await getAllDeviceLists();
  }
  const params = {
    title,
    isView: title === '查看',
    row: { ...row },
    api:
      title === '新增'
        ? addMonitorPoint
        : title === '编辑'
          ? editMonitorPoint
          : undefined,
    getTableList: proTable.value?.getTableList
  };
  drawerRef.value?.acceptParams(params);
};
</script>
