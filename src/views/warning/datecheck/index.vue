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
      <el-icon size="22" color="#38675C" title="编辑" @click="openProForm('编辑', scope.row)" class="td-mr22 td-pointer">
        <EditPen />
      </el-icon>
      <el-icon size="22" color="#38675C" title="删除" @click="deleteAccount(scope.row)" class="td-mr22 td-pointer">
        <Delete />
      </el-icon>
      <el-icon size="22" color="#38675C" title="详情" @click="openProForm('详情', scope.row)" class="td-pointer">
        <View />
      </el-icon>
    </template>
  </ProTable>
  <ProForm :columns="columns" :searchCol="2" width="80%" ref="drawerRef"></ProForm>
</template>
<script setup lang="jsx">
import { useHandleData } from '@/components/ProTable/hooks';
import {
  getDatecheckList,
  addDatecheck,
  editDatecheck,
  removeDatecheck
} from '@/api/warning/datecheck';
const { proxy } = getCurrentInstance();
const { dc_checktype, dc_checkway } = proxy.useDict(
  'dc_checktype',
  'dc_checkway'
);
const columns = reactive([
  {
    type: 'selection'
  },
  {
    label: '序号',
    width: 60,
    type: 'index'
  },
  // {
  //   label: '编号',
  //   prop: 'dcDviceid',
  //   width: 100,
  //   form: {
  //     el: 'text'
  //   }
  // },
  {
    label: '维护人员',
    prop: 'dcCheckoperate',
    minWidth: 150,
    form: {
      el: 'text'
    }
  },
  {
    label: '维护日期',
    prop: 'dcChecktime',
    minWidth: 150,
    form: {
      el: 'date-picker',
      props: { 'value-format': 'x', format: 'YYYY-MM-DD' },
      order: 2
    },
    search: {
      el: 'date-picker',
      // props: { 'value-format': 'x', format: 'YYYY-MM-DD' },
      // props: { type: 'date', valueFormat: 'YYYY-MM-DD' },
      props: { type: 'daterange', valueFormat: 'YYYY-MM-DD' }
    }
  },
  {
    label: '维护类型',
    prop: 'dcChecktype',
    minWidth: 150,
    form: {
      el: 'select',
      defaultValue: ''
    },
    search: { el: 'select', props: {} },
    enum: dc_checktype.value
  },
  {
    label: '维护方式',
    prop: 'dcCheckway',
    minWidth: 150,
    form: {
      el: 'select',
      defaultValue: ''
    },
    search: { el: 'select', props: {} },
    enum: dc_checkway.value
  },
  {
    label: '操作详情',
    prop: 'dcOpedetail',
    width: 200,
    form: {
      el: 'text'
    }
  },
  {
    label: '维护描述',
    prop: 'dcDesc',
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
  selectionArr.value = []
  proTable.value?.clearSelection()

  let newParams = JSON.parse(JSON.stringify(params));

  newParams.startDate = newParams.dcChecktime?.[0] || ''
  newParams.endDate = newParams.dcChecktime?.[1] || ''

  delete newParams.dcChecktime
  return getDatecheckList(newParams);
};

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

// 打开 drawer(新增、详情、编辑)
const drawerRef = ref(null);
const openProForm = (title, row = {}) => {
  const params = {
    title,
    isView: title === '详情',
    row: { ...row },
    api:
      title === '新增'
        ? addDatecheck
        : title === '编辑'
          ? editDatecheck
          : undefined,
    getTableList: proTable.value?.getTableList
  };
  drawerRef.value?.acceptParams(params);
};
</script>
