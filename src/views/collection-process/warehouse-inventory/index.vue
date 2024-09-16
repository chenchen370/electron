<template>
  <ProTable ref="proTable" :request-api="getTableList" :columns="columns" @selectionChange="doSelectionChange">
    <!-- 表格 header 按钮 -->
    <template #action="scope">
      <el-button type="primary" @click="openProForm('发起盘点流程', selectionArr?.[0] || {})" plain icon="Plus"
        :disabled="selectionArr.length != 1">发起盘点流程</el-button>
    </template>
    <!-- 表格操作 -->
    <template #operation="scope">
      <!-- <el-icon size="22" color="#38675C" title="编辑" @click="openProForm('编辑', scope.row)" class="td-mr22 td-pointer">
        <EditPen />
      </el-icon> -->
      <!-- <el-icon size="22" color="#38675C" title="删除" @click="deleteAccount(scope.row)" class="td-mr22 td-pointer">
        <Delete />
      </el-icon> -->
      <el-icon size="22" color="#38675C" title="查看" @click="openProForm('查看', scope.row)" class="td-pointer">
        <View />
      </el-icon>
    </template>
  </ProTable>
  <ProForm :columns="columns" :searchCol="2" width="80%" ref="drawerRef"></ProForm>
  <edit ref="editRef" />
  <editvol ref="editvolRef" />
</template>
<script setup lang="jsx">
import { useHandleData } from '@/components/ProTable/hooks';
import {
  getCountingPage,
  doCountingCreate,
  doCountingCount
} from '@/api/warehouse-inventory';
import Edit from './edit';
import Editvol from './editvol';
const { proxy } = getCurrentInstance();
const { dc_checkway } = proxy.useDict(
  'dc_checkway'
);
const orderType = [
  {
    label: '全盘',
    value: '1'
  },
  {
    label: '抽盘',
    value: '2'
  },
];

const orderStat = [
  {
    label: '未盘点',
    value: '0'
  },
  {
    label: '盘点中',
    value: '1'
  },
  {
    label: '已盘点',
    value: '2'
  },
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
    label: '盘点名称',
    prop: 'orderTitle',
    sortable: true,
    minWidth: 150,
    form: {
      el: 'text'
    }
  },
  {
    label: '盘点编号',
    prop: 'orderNo',
    width: 100,
    form: {
      el: 'text'
    }
  },
  {
    label: '计划盘点时间',
    prop: 'orderStartTime',
    minWidth: 180,
    sortable: true,
    form: {
      el: 'date-picker',
      props: { 'value-format': 'x', format: 'YYYY-MM-DD' },
      order: 2
    },
    // search: {
    //   el: 'date-picker',
    //   props: { type: 'daterange', valueFormat: 'YYYY-MM-DD' }
    // },
    render: props => {
      return <>{props.row.orderStartTime ? props.row.orderStartTime.replaceAll('T', ' ').slice(0, 19) : ''}</>;
    },
  },
  {
    label: '应盘总数',
    prop: 'orderAll',
    width: 200,
    form: {
      el: 'text'
    }
  },
  {
    label: '已盘数量',
    prop: 'orderReady',
    width: 200,
    form: {
      el: 'text'
    }
  },
  {
    label: '盘点类型',
    prop: 'orderType',
    minWidth: 150,
    form: {
      el: 'select',
      defaultValue: ''
    },
    // search: { el: 'select', props: {} },
    enum: orderType
  },
  {
    label: '盘点状态',
    prop: 'orderStat',
    minWidth: 150,
    form: {
      el: 'select',
      defaultValue: ''
    },
    enum: orderStat
  },
  {
    label: '盘点人',
    prop: 'countingUserName',
    minWidth: 230,
    form: {
      el: 'text'
    }
  },

  { prop: 'operation', width: 180, label: '操作', fixed: 'right' }
]);
const selectionArr = ref([]);
const doSelectionChange = params => {
  selectionArr.value = params
};
const getTableList = params => {
  let newParams = JSON.parse(JSON.stringify(params));

  return getCountingPage(newParams).then(res => {
    return { ...res, rows: res.data || [], total: res?.data?.length || 0 }
  });
};

// ProTable 实例
const proTable = ref();

// 删除用户信息
const deleteAccount = async params => {
  //await useHandleData(
  //   removeDatecheck,
  //   { ids: [params.dcId] },
  //   `删除盘点 id【${params.dcId}】的数据项`
  // );
  proTable.value?.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref(null);
const openProForms = (title, row = {}) => {
  const params = {
    title,
    isView: title === '查看',
    row: { ...row },
    api:
      title === '新增'
        ? addDatecheck
        : title === '编辑'
          ? ''
          : undefined,
    getTableList: proTable.value?.getTableList
  };
  drawerRef.value?.acceptParams(params);
};
const editRef = ref(null);
const editvolRef = ref(null);
const openProForm = (title, row = {}) => {
  const params = {
    title,
    isView: false,
    // type: type.value,
    row: { ...row },
    api: doCountingCreate,
    getTableList: proTable.value?.getTableList
  };
  if (title == '发起盘点流程') {
    editvolRef.value?.acceptParams(params);
  } else {
    editRef.value?.acceptParams(params);
  }
};
</script>
