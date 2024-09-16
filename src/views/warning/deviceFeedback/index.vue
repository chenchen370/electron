<template>
  <el-tabs v-model="deviceType" class="demo-tabs" @tabChange="typeChange">
    <el-tab-pane label="异常" name="1">异常</el-tab-pane>
    <el-tab-pane label="巡检" name="2">巡检</el-tab-pane>
  </el-tabs>
  <ProTable ref="proTable" :request-api="getTableList" :columns="columns" :noHasTab="false" v-if="deviceType == 1">
    <template #operation="scope">
      <el-icon v-if="scope.row.dealStatus != 1" size="22" color="#38675C" title="处理"
        @click="openProForm('处理', scope.row)" class="td-mr20 td-pointer">
        <EditPen />
      </el-icon>
      <!-- <el-icon size="22" color="#38675C" @click="deleteAccount(scope.row)" class="td-mr20 td-pointer">
        <Delete />
      </el-icon> -->
      <el-icon size="22" color="#38675C" title="详情" @click="openProForm('详情', scope.row)" class="td-pointer">
        <View />
      </el-icon>
    </template>
  </ProTable>
  <ProTable ref="proTable" :request-api="getTableList" :columns="columnsXj" :noHasTab="false"
    @selectionChange="doSelectionChange" v-else>
    <!-- 表格操作 -->
    <template #operation="scope">
      <el-icon v-if="!scope.row.checkTime" size="22" color="#38675C" title="巡检" @click="openProForm('巡检', scope.row)"
        class="td-mr22 td-pointer">
        <EditPen />
      </el-icon>
      <!-- <el-icon size="22" color="#38675C" title="详情" @click="openProForm('详情', scope.row)" class="td-pointer">
        <View />
      </el-icon> -->
    </template>
  </ProTable>
  <ProForm :columns="columns" width="60%" ref="drawerRef" v-if="deviceType == 1&&openTitle !== '详情'"></ProForm>
  <ProForm :columns="columnsYc" :searchCol="2" width="60%" ref="drawerRef" v-if="deviceType == 1&&openTitle === '详情'"></ProForm>
  <ProForm :columns="columnsXj" width="60%" ref="drawerRef" v-if="deviceType == 2"></ProForm>
</template>
<script setup lang="jsx">
import { useHandleData } from '@/components/ProTable/hooks';
import {
  getDeviceFeedbackList,
} from '@/api/warning/deviceFeedback';
import {
  getDatecheckList,
  editDatecheck,
  removeDatecheck,
  setDatecheck
} from '@/api/warning/datecheck';
import {
  getExceptionEventList,
  editExceptionEvent,
} from '@/api/warning/exceptionEvent';
import {
  getDeviceList
} from '@/api/warning/device';
import {
  getDisplayCabinetList,
} from '@/api/artifact/displayCabinet';
import { el } from 'element-plus/es/locales.mjs';
import { getWarehouseAllList } from '@/api/artifact/warehouse';
const { proxy } = getCurrentInstance();
const {
  deal_method,
  dc_checktype,
  dc_checkway
} = proxy.useDict(
  'deal_method',
  'dc_checktype',
  'dc_checkway'
);
const dealStatus = [
  {
    label: '已处理',
    value: '1'
  },
  {
    label: '未处理',
    value: '0'
  },
];
const deviceType = ref('1');
const cabinet_addr = ref([]);
const device_list = ref([]);
const displayCabinet_list = ref([]);
const openTitle = ref('');

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
    label: '展厅名称',
    prop: 'houseId',
    minWidth: 160,
    search: { el: 'select', props: {} },
    enum: cabinet_addr,
    render: props => {
      return (
        <>
          {props.row?.houseName}
        </>
      );
    }
  },
  {
    label: '展柜编号',
    prop: 'cabinetId',
    minWidth: 160,
    search: { el: 'select', props: {} },
    enum: displayCabinet_list,
  },
  // {
  //   label: '库房',
  //   isShow: false,
  //   prop: 'checkContent',
  //   minWidth: 200,
  //   form: {
  //     el: 'text'
  //   }
  // },
  {
    label: '设备编号',
    prop: 'deviceId',
    minWidth: 160,
    search: { el: 'select', props: {} },
    enum: device_list,
  },
  {
    label: '设备位置',
    prop: 'devicePosition',
    minWidth: 160,
  },
  {
    label: '发生时间',
    prop: 'dealDate',
    minWidth: 210,
    // form: {
    //   el: 'date-picker',
    //   props: { type: 'datetime', valueFormat: 'YYYY-MM-DD HH:mm:ss' }
    // },
    render: props => {
      return <div>{props.row.dealDate ? props.row.dealDate.replaceAll('T', ' ').slice(0, 19) : ''}</div>;
    }
  },
  {
    label: '问题描述',
    prop: 'exceptionDesc',
    minWidth: 160,
  },
  {
    label: '维护方式',
    prop: 'dealMethod',
    minWidth: 160,
    form: {
      el: 'text',
      rules: [
        {
          required: true,
          message: '请输入巡检内容',
          trigger: 'blur'
        }
      ]
    },
    // enum: deal_method
  },
  {
    label: '处理结果',
    prop: 'dealStatus',
    minWidth: 160,
    // form: {
    //   el: 'select',
    //   defaultValue: ''
    // },
    enum: dealStatus
  },
  { prop: 'operation', width: 180, label: '操作', fixed: 'right' }
]);

const columnsYc = reactive([
  {
    type: 'selection'
  },
  {
    label: '序号',
    width: 60,
    type: 'index'
  },
  {
    label: '展厅名称',
    prop: 'houseId',
    minWidth: 160,
    form: {
      el: 'select',
      defaultValue: ''
    },
    search: { el: 'select', props: {} },
    enum: cabinet_addr,
    render: props => {
      return (
        <>
          {props.row?.houseName}
        </>
      );
    }
  },
  {
    label: '展柜编号',
    prop: 'cabinetId',
    minWidth: 160,
    form: {
      el: 'select',
      defaultValue: ''
    },
    search: { el: 'select', props: {} },
    enum: displayCabinet_list,
  },
  {
    label: '设备编号',
    prop: 'deviceId',
    minWidth: 160,
    form: {
      el: 'select',
      defaultValue: ''
    },
    search: { el: 'select', props: {} },
    enum: device_list,
  },
  {
    label: '设备位置',
    prop: 'devicePosition',
    minWidth: 160,
    form: {
      el: 'text'
    }
  },
  {
    label: '发生时间',
    prop: 'dealDate',
    minWidth: 210,
    form: {
      el: 'date-picker',
      props: { type: 'datetime', valueFormat: 'YYYY-MM-DD HH:mm:ss' }
    },
    render: props => {
      return <div>{props.row.dealDate ? props.row.dealDate.replaceAll('T', ' ').slice(0, 19) : ''}</div>;
    }
  },
  {
    label: '问题描述',
    prop: 'exceptionDesc',
    minWidth: 160,
    form: {
      el: 'text'
    }
  },
  {
    label: '维护方式',
    prop: 'dealMethod',
    minWidth: 160,
    form: {
      el: 'text',
      rules: [
        {
          required: true,
          message: '请输入巡检内容',
          trigger: 'blur'
        }
      ]
    },
  },
  {
    label: '处理结果',
    prop: 'dealStatus',
    minWidth: 160,
    form: {
      el: 'select',
      defaultValue: ''
    },
    enum: dealStatus
  },
  { prop: 'operation', width: 180, label: '操作', fixed: 'right' }
]);
const columnsXj = reactive([
  {
    type: 'selection'
  },
  {
    label: '序号',
    width: 60,
    type: 'index'
  },
  {
    label: '区域名称',
    prop: 'houseId',
    minWidth: 150,
    // form: {
    //   el: 'text'
    // }
    search: { el: 'select', props: {} },
    enum: cabinet_addr,
    render: props => {
      return (
        <>
          {props.row?.houseName}
        </>
      );
    }
  },
  {
    label: '发生时间',
    prop: 'checkTime',
    width: 180,
    // form: {
    //   el: 'date-picker',
    //   props: { 'value-format': 'x', format: 'YYYY-MM-DD' },
    //   order: 2
    // },
    search: {
      el: 'date-picker',
      // props: { 'value-format': 'x', format: 'YYYY-MM-DD' },
      // props: { type: 'date', valueFormat: 'YYYY-MM-DD' },
      props: { type: 'daterange', valueFormat: 'YYYY-MM-DD' }
    }
  },
  {
    label: '巡检类型',
    prop: 'checkTypeDic',
    minWidth: 150,
    // form: {
    //   el: 'select',
    //   defaultValue: ''
    // },
    // search: { el: 'select', props: {} },
    // enum: dc_checktype.value
  },
  {
    label: '巡检人员',
    prop: 'checkOperator',
    minWidth: 150,
    // form: {
    //   el: 'text'
    // }
  },
  // {
  //   label: '维护方式',
  //   prop: 'checkway',
  //   minWidth: 150,
  //   form: {
  //     el: 'select',
  //     defaultValue: ''
  //   },
  //   search: { el: 'select', props: {} },
  //   enum: dc_checkway.value
  // },
  {
    label: '巡检内容',
    isShow: false,
    prop: 'checkContent',
    minWidth: 200,
    form: {
      el: 'text',
      rules: [
        {
          required: true,
          message: '请输入巡检内容',
          trigger: 'blur'
        }
      ]
    }
  },

  { prop: 'operation', width: 150, label: '操作', fixed: 'right' }
]);
const selectionArr = ref([]);
const doSelectionChange = params => {
  selectionArr.value = params
};
const typeChange = v => {
  deviceType.value = v;
  nextTick(() => {
    proTable.value?.getTableList();
  })
};
const getTableList = params => {
  let newParams = JSON.parse(JSON.stringify(params));
  if (deviceType.value == 1) {
    return getExceptionEventList(newParams);
  } else {
    newParams.checkTime && (newParams.startDate = newParams.checkTime[0]);
    newParams.checkTime && (newParams.endDate = newParams.checkTime[1]);
    delete newParams.checkTime;
    return getDatecheckList(newParams);
  }
};
const getWarehouseAllLists = async () => {
  const { rows } = await getWarehouseAllList({ isShow: 0 });
  cabinet_addr.value = [];
  rows.map(v => {
    cabinet_addr.value.push({
      label: v.houseName,
      key: v.houseId,
      value: v.houseId
    });
  });
};
const getAllListsDis = async () => {
  const devices = await getDeviceList({ pageOpen: false });
  const displayCabinets = await getDisplayCabinetList({ pageOpen: false });
  device_list.value = [];
  displayCabinet_list.value = [];
  devices.rows?.map(v => {
    device_list.value.push({
      label: v.deviceNameDic,
      key: v.deviceId,
      value: v.deviceId
    });
  });
  displayCabinets.rows?.map(v => {
    displayCabinet_list.value.push({
      label: v.cabinetName,
      key: v.cabinetId,
      value: v.cabinetId
    });
  });
};
getAllListsDis()
getWarehouseAllLists();
// ProTable 实例
const proTable = ref();

// 删除用户信息
const deleteAccount = async params => {
  await useHandleData(
    removeDatecheck,
    { ids: [params.dcId] },
    `删除每日巡检 id【${params.dcId}】的数据项`
  );
  proTable.value?.getTableList();
};

// 打开 drawer(详情、处理)
const drawerRef = ref(null);
const openProForm = (title, row = {}) => {
  openTitle.value = title
  const params = {
    title,
    isView: title === '详情',
    row: { ...row },
    api: deviceType.value == 1 ? editExceptionEvent : setDatecheck,
    getTableList: proTable.value?.getTableList
  };
  drawerRef.value?.acceptParams(params);
};
</script>
<style scoped lang="scss">
:deep(.el-tabs__content) {
  display: none;
}
</style>