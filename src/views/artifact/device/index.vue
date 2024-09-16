<template>
  <!-- <div class="td-flex justify-between">
    <el-radio-group v-model="deviceType" class="td-mb10" @change="typeChange">
      <el-radio-button label="1">传感器设备</el-radio-button>/>
      <el-radio-button label="2">调控设备</el-radio-button>/>
      <el-radio-button label="3">网关设备</el-radio-button>/>
    </el-radio-group>
    <div>设备总计：{{ total }}，异常设备总数：{{ totalNo }}</div>
  </div> -->
  <el-tabs v-model="deviceType" class="demo-tabs" @tabChange="typeChange">
    <el-tab-pane label="传感器设备" name="1">1</el-tab-pane>
    <!-- <el-tab-pane label="调控设备" name="2">2</el-tab-pane> -->
    <el-tab-pane label="网关设备" name="3">3</el-tab-pane>
  </el-tabs>
  <ProTable ref="proTable" :request-api="getTableList" :noHasTab="false" :columns="columnsG" v-if="deviceType == '3'" @reset="reset"
    @selectionChange="doSelectionChange">
    <template #deviceRunStatus="scope">
      <span :class="[scope.row.deviceRunStatus == 1 ? 'text-danger' : '']">{{
        scope.row.deviceRunStatus == 1 ? '异常' : '正常'
      }}</span>
    </template>
    <!-- 表格 header 按钮 -->
    <template #action="scope">
      <el-button type="primary" @click="openProForm('新增')" plain icon="Plus">新增</el-button>
      <el-button type="primary" @click="deleteAccount(selectionArr[0])" plain icon="Delete"
        :disabled="selectionArr.length != 1 ||selectionArr[0].deviceStartStatu == 1">删除</el-button>

        <el-button type="primary" @click="onDownloadOrUpload('1')" plain icon="Download">导出</el-button>
      <el-upload ref="uploadRef" class="upload-demo td-ml12" accept=".xlsx, .xls, .excel" :limit="1"
        :file-list="fileList" :http-request="httpRequestHandle" :show-file-list="false"
        style="display: inline-block;vertical-align: middle;">
        <template #trigger>
          <el-button type="primary" plain icon="Upload">导入</el-button>
        </template>
      </el-upload>
    </template>
    <!-- 表格操作 -->
    <template #operation="scope">
      <!-- <div class="td-icon icon-new_replace td-mr10 td-pointer" title="历史数据查询"
        @click="openHistoryForm('历史数据查询', scope.row)"></div>
      <div class="td-icon icon-new_search td-mr10 td-pointer" title="历史状态查询"
        @click="openStatusForm('历史状态查询', scope.row)">
      </div> -->
      <!-- <div class="td-icon icon-new_add td-mr10 td-pointer" title="编辑" @click="openProForm('编辑', scope.row)">
      </div>
      <div class="td-icon icon-new_delete td-mr10 td-pointer" title="删除" @click="deleteAccount(scope.row)"
        :disabled="scope.row.deviceStartStatu == 1">
      </div>
      <div class="td-icon icon-new_file td-pointer" title="详情" @click="openProForm('详情', scope.row)">
      </div> -->
      <el-icon size="22" color="#38675C" title="编辑" @click="openProForm('编辑', scope.row)" class="td-mr22 td-pointer">
        <EditPen />
      </el-icon>
      <el-icon size="22" color="#38675C" title="删除" @click="deleteAccount(scope.row)" class="td-mr22 td-pointer" :disabled="scope.row.deviceStartStatu == 1">
        <Delete />
      </el-icon>
      <el-icon size="22" color="#38675C" title="详情" @click="openProForm('详情', scope.row)" class="td-pointer">
        <View />
      </el-icon>
    </template>
  </ProTable>
  <!-- <ProTable ref="proTable" :request-api="getTableList" :columns="columnsD" v-else-if="deviceType == '2'" @reset="reset"
    @selectionChange="doSelectionChange">
    <template #deviceRunStatus="scope">
      <span :class="[scope.row.deviceRunStatus == 1 ? 'text-danger' : '']">{{
        scope.row.deviceRunStatus == 1 ? '异常' : '正常'
        }}</span>
    </template>
    <template #action="scope">
      <el-button type="primary" @click="openProForm('新增')" plain icon="Plus">新增</el-button>
      <el-button type="primary" @click="deleteAccount(selectionArr[0])" plain icon="Delete"
        :disabled="selectionArr.length != 1">删除</el-button>
    </template>
    <template #operation="scope">
      <div class="td-icon icon-new_replace td-mr10 td-pointer" title="历史数据查询"
        @click="openHistoryForm('历史数据查询', scope.row)"></div>
      <div class="td-icon icon-new_search td-mr10 td-pointer" title="历史状态查询"
        @click="openStatusForm('历史状态查询', scope.row)">
      </div>
      <div class="td-icon icon-new_add td-mr10 td-pointer" title="编辑" @click="openProForm('编辑', scope.row)">
      </div>
      <div class="td-icon icon-new_delete td-mr10 td-pointer" title="删除" @click="deleteAccount(scope.row)"
        :disabled="scope.row.deviceStartStatu == 1">
      </div>
      <div class="td-icon icon-new_file td-pointer" title="详情" @click="openProForm('详情', scope.row)">
      </div>
    </template>
  </ProTable> -->
  <ProTable ref="proTable" :request-api="getTableList" :noHasTab="false" :columns="columns" @reset="reset"
    @selectionChange="doSelectionChange" v-else>
    <template #deviceRunStatus="scope">
      <span :class="[scope.row.deviceRunStatus == 1 ? 'text-danger' : '']">{{
        scope.row.deviceRunStatus == 1 ? '异常' : '正常'
      }}</span>
    </template>
    <!-- 表格 header 按钮 -->
    <template #action="scope">
      <el-button type="primary" @click="openProForm('新增')" plain icon="Plus">新增</el-button>
      <el-button type="primary" @click="deleteAccount(selectionArr[0])" plain icon="Delete"
        :disabled="selectionArr.length != 1 ||selectionArr[0].deviceStartStatu == 1">删除</el-button>

        <el-button type="primary" @click="onDownloadOrUpload('1')" plain icon="Download">导出</el-button>
      <el-upload ref="uploadRef" class="upload-demo td-ml12" accept=".xlsx, .xls, .excel" :limit="1"
        :file-list="fileList" :http-request="httpRequestHandle" :show-file-list="false"
        style="display: inline-block;vertical-align: middle;">
        <template #trigger>
          <el-button type="primary" plain icon="Upload">导入</el-button>
        </template>
      </el-upload>
    </template>
    <!-- 表格操作 -->
    <template #operation="scope">
      <!-- <div class="td-icon icon-new_replace td-mr10 td-pointer" title="历史数据查询"
        @click="openHistoryForm('历史数据查询', scope.row)"></div> -->
        <el-icon size="22" color="#38675C" title="历史数据查询" @click="openHistoryForm('历史数据查询', scope.row)" class="td-mr22 td-pointer">
        <Search />
      </el-icon>
      <!-- <div class="td-icon icon-new_search td-mr10 td-pointer" title="历史状态查询"
        @click="openStatusForm('历史状态查询', scope.row)">
      </div> -->
      <!-- <div class="td-icon icon-new_add td-mr10 td-pointer" title="编辑" @click="openProForm('编辑', scope.row)">
      </div>
      <div class="td-icon icon-new_delete td-mr10 td-pointer" title="删除" @click="deleteAccount(scope.row)"
        :disabled="scope.row.deviceStartStatu == 1">
      </div>
      <div class="td-icon icon-new_file td-pointer" title="详情" @click="openProForm('详情', scope.row)">
      </div> -->
      <el-icon size="22" color="#38675C" title="编辑" @click="openProForm('编辑', scope.row)" class="td-mr22 td-pointer">
        <EditPen />
      </el-icon>
      <el-icon size="22" color="#38675C" title="删除" @click="deleteAccount(scope.row)" class="td-mr22 td-pointer" :disabled="scope.row.deviceStartStatu == 1">
        <Delete />
      </el-icon>
      <el-icon size="22" color="#38675C" title="详情" @click="openProForm('详情', scope.row)" class="td-pointer">
        <View />
      </el-icon>
    </template>
  </ProTable>
  <ProForm :columns="columnsG" :searchCol="2" width="60%" ref="drawerRef" v-if="deviceType == '3'"></ProForm>
  <ProForm :columns="columnsD" :searchCol="2" width="60%" ref="drawerRef" v-else-if="deviceType == '2'"></ProForm>
  <ProForm :columns="columns" :searchCol="2" width="60%" ref="drawerRef" v-else></ProForm>
  <edit ref="editRef" />
  <statusHis ref="statusHisRef" />
</template>
<script setup lang="jsx">
import { useHandleData } from '@/components/ProTable/hooks';
import {
  getDeviceList,
  addDevice,
  editDevice,
  removeDevice,
  getStatusList,
  getDeviceStatusList
} from '@/api/warning/device';
import { reactive } from 'vue';
import Edit from './edit';
import statusHis from './statusHis';
// import { getWarehouseAllList } from '@/api/artifact/warehouse';
// import { getAllByHouseId } from '@/api/artifact/cabinet';
import {
  deviceExport,
  deviceImport
} from '@/api/artifact/file';

import cusSelect from './cusSelect';
import cusSelectTree from './cusSelectTree';
const { proxy } = getCurrentInstance();
const {
  device_type,
  device_name,
  device_start_statu,
  device_run_status,
  gateway_device_name,
  ctrl_device_name,
} = proxy.useDict(
  'device_name',
  'device_type',
  'device_start_statu',
  'device_run_status',
  'gateway_device_name',
  'ctrl_device_name',
);
const activeName = ref('first');
// ProTable 实例
const proTable = ref();
const deviceType = ref('1');

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
    minWidth: 150,
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
    minWidth: 150,
    form: {
      el: 'select',
      defaultValue: ''
    },
    search: { el: 'select', props: {} },
    enum: device_name
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
    minWidth: 150,
    form: {
      el: 'text',
      defaultValue: ''
    }
  },
  {
    label: '采集频率',
    prop: 'deviceFrequency',
    width: 130,
    form: {
      el: 'text',
      rules: [
        {
          required: true,
          message: '请输入采集频率',
          trigger: 'blur'
        }
      ]
    }
  },
  {
    label: '设备启动状态',
    prop: 'deviceStartStatu',
    width: 130,
    form: {
      el: 'select',
      defaultValue: '',
      span: 2
    },
    search: { el: 'select', props: {} },
    enum: device_start_statu
  },
  {
    label: '设备所在区域',
    prop: 'houseId',
    width: 230,
    form: {
      el: 'select',
      span: 1,
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
    label: '设备位置(具体位置)',
    prop: 'devicePosition',
    width: 180,
    form: {
      el: 'text',
      span: 1
    }
  },
  // {
  //   label: '所在平面图坐标点',
  //   prop: 'imageLocation',
  //   isShow:false,
  //   form: {
  //     el: 'text',
  //     placeholder: '所在平面图坐标点X,Y',
  //     span: 16
  //   }
  // },
  {
    label: '设备描述',
    prop: 'deviceDesc',
    width: 180,
    form: {
      el: 'text',
      span: 16
    }
  },
  {
    label: '设备运行状态',
    prop: 'deviceRunStatus',
    width: 130,
    // form: {
    // el: 'select',
    // defaultValue: ''
    // },
    // search: { el: 'select', props: {} },
    enum: device_run_status
  },

  { prop: 'operation', width: 230, label: '操作', fixed: 'right' }
]);
const columnsD = reactive([
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
    minWidth: 150,
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
    minWidth: 150,
    form: {
      el: 'select',
      defaultValue: ''
    },
    search: { el: 'select', props: {} },
    enum: ctrl_device_name
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
    minWidth: 150,
    form: {
      el: 'text',
      defaultValue: ''
    }
  },
  {
    label: '采集频率',
    prop: 'deviceFrequency',
    width: 130,
    form: {
      el: 'text',
      rules: [
        {
          required: true,
          message: '请输入采集频率',
          trigger: 'blur'
        }
      ]
    }
  },
  {
    label: '设备启动状态',
    prop: 'deviceStartStatu',
    width: 130,
    form: {
      el: 'select',
      defaultValue: '',
      span: 2
    },
    search: { el: 'select', props: {} },
    enum: device_start_statu
  },
  {
    label: '设备所在区域',
    prop: 'houseId',
    width: 230,
    form: {
      el: 'select',
      span: 1,
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
    label: '设备位置(具体位置)',
    prop: 'devicePosition',
    width: 180,
    form: {
      el: 'text',
      span: 1
    }
  },
  // {
  //   label: '所在平面图坐标点',
  //   prop: 'imageLocation',
  //   isShow:false,
  //   form: {
  //     el: 'text',
  //     placeholder: '所在平面图坐标点X,Y',
  //     span: 16
  //   }
  // },
  {
    label: '设备描述',
    prop: 'deviceDesc',
    width: 180,
    form: {
      el: 'text',
      span: 16
    }
  },
  {
    label: '设备运行状态',
    prop: 'deviceRunStatus',
    width: 130,
    // form: {
    // el: 'select',
    // defaultValue: ''
    // },
    // search: { el: 'select', props: {} },
    enum: device_run_status
  },

  { prop: 'operation', width: 230, label: '操作', fixed: 'right' }
]);
const columnsG = reactive([
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
    minWidth: 130,
    form: {
      el: 'text'
    },
    search: { el: 'text', props: {} }
  },
  {
    label: '设备名称',
    prop: 'deviceName',
    width: 130,
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
    minWidth: 130,
    form: {
      el: 'text',
      defaultValue: ''
    }
  },
  {
    label: '采集频率',
    prop: 'deviceFrequency',
    width: 130,
    form: {
      el: 'text',
      rules: [
        {
          required: true,
          message: '请输入采集频率',
          trigger: 'blur'
        }
      ]
    }
  },
  {
    label: '设备启动状态',
    prop: 'deviceStartStatu',
    minWidth: 130,
    form: {
      el: 'select',
      defaultValue: '',
      span: 2
    },
    search: { el: 'select', props: {} },
    enum: device_start_statu
  },
  {
    label: '设备所在区域',
    prop: 'houseId',
    width: 230,
    form: {
      el: 'select',
      span: 1,
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
    label: '设备位置(具体位置)',
    prop: 'devicePosition',
    width: 180,
    form: {
      el: 'text',
      span: 1
    }
  },
  // {
  //   label: '所在平面图坐标点',
  //   prop: 'imageLocation',
  //   isShow:false,
  //   form: {
  //     el: 'text',
  //     placeholder: '所在平面图坐标点X,Y',
  //     span: 16
  //   }
  // },
  {
    label: '设备运行状态',
    prop: 'deviceRunStatus',
    minWidth: 180,
    enum: device_run_status
  },
  { prop: 'operation', width: 230, label: '操作', fixed: 'right' }
]);


const deviceAreaId = ref('');

const total = ref(0);
const totalNo = ref(0);

const fileList = ref([])
async function httpRequestHandle(f) {
  try {
    const formData = new FormData() // 创建form对象
    formData.append('file', f.file) // 通过append向form对象添加数据
    const res = await deviceImport(formData,{deviceType:deviceType.value})
    if (res?.code == '200') {
      f.onSuccess(res)
      proxy.$modal.msgSuccess('导入成功')
      proTable.value?.getTableList();
      fileList.value = []
    }
  } catch (e) {
    fileList.value = []
  }
}
const onDownloadOrUpload = v => {
  let newParams = JSON.parse(JSON.stringify(proTable.value.searchParam));
  deviceExport(newParams)
};

const reset = params => {
  console.log('reset', params);
};
const selectionArr = ref([]);
const doSelectionChange = params => {
  console.log('doSelectionChange', params);
  selectionArr.value = params
};
const typeChange = v => {
  deviceType.value = v;
  selectionArr.value = []
  proTable.value?.getTableList();
};

watch(deviceAreaId, val => {
  const arr = val?.split(',')
  drawerRef.value.proFormProps.row.houseId = arr?.[0] || '';
  drawerRef.value.proFormProps.row.cabinetId = arr?.[1] || '';
});
const getTableList = async params => {
  selectionArr.value = []
  proTable.value?.clearSelection()

  let newParams = JSON.parse(JSON.stringify(params));
  newParams.deviceType = deviceType.value;
  const a = await getDeviceStatusList({ deviceType: deviceType.value });
  const b = await getDeviceStatusList({
    deviceRunStatus: 1,
    deviceType: deviceType.value
  });
  total.value = a.total;
  totalNo.value = b.total;
  return getDeviceList(newParams);
};

// 删除用户信息
const deleteAccount = async params => {
  await useHandleData(
    removeDevice,
    { ids: params.deviceId },
    `删除设备Id为【${params.deviceId}】的数据项`
  );
  proTable.value?.getTableList();
};

// 打开 drawer(新增、详情、编辑)
const drawerRef = ref(null);
const openProForm = (title, row = {}) => {
  row.deviceType = deviceType.value;

  const params = {
    title,
    isView: title === '详情',
    row: { ...row },
    disabledAarr: title === '编辑' ? ['设备ID', '设备名称'] : [],
    api:
      title === '新增' ? addDevice : title === '编辑' ? editDevice : undefined,
    getTableList: proTable.value?.getTableList
  };
  drawerRef.value?.acceptParams(params);
};
const editRef = ref(null);
const openHistoryForm = (title, row = {}) => {
  row.deviceType = deviceType.value;
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
const statusHisRef = ref(null);
const openStatusForm = (title, row = {}) => {
  row.deviceType = deviceType.value;
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
  statusHisRef.value?.acceptParams(params);
};
</script>
<style scoped lang="scss">
:deep(.el-tabs__content) {
  display: none;
}

// :deep(.el-tabs__item) {
//   padding-bottom: 12px;
// }</style>