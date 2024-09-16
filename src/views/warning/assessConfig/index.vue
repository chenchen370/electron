<template>
  <!-- <el-radio-group v-model="type" class="td-mb10" @change="typeChange">
    <el-radio-button label="1">展厅配置</el-radio-button> />
    <el-radio-button label="0">库房配置</el-radio-button> />
  </el-radio-group> -->
  <el-tabs v-model="type" @tabChange="typeChange">
    <el-tab-pane label="展厅配置" name="1">展厅配置</el-tab-pane>
    <el-tab-pane label="库房配置" name="0">库房配置</el-tab-pane>
  </el-tabs>
  <ProTable ref="proTable" :request-api="getTableList" :columns="columns" :noHasTab="false">
    <template #operation="scope">
      <div class="td-icon icon-set td-pointer" title="方案分配" :disabled="scope.row.assessStatus == 1"
        @click="openProForm('方案分配', scope.row)">
      </div>
    </template>
  </ProTable>

  <edit ref="editRef" />
</template>
<script setup lang="jsx">
import { setConfigAssess, getAssessConfList } from '@/api/warning/assess';
import Edit from './edit';
import realTimeData from '@/views/artifact/exhibitionHall/realTimeData';
import { getWarehouseAllList } from '@/api/artifact/warehouse';
import pic from '@/views/warning/monitorPoint/pic';

const { proxy } = getCurrentInstance();
const { artifact_type, } = proxy.useDict('artifact_type');
const type = ref('1');
const cabinet_addr = ref([]);
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
    prop: 'cabinetName',
    minWidth: 180,
    search: { el: 'text', props: {}, },
  },
  {
    label: '监测点位置描述',
    prop: 'cabinetAddrDetail',
    minWidth: 180,
    search: { el: 'text', props: {} },
    render: props => {
      return (
        <>
          <pic modelValue={props?.row ? props?.row : {}} />
        </>
      );
    }
  },
  {
    label: '监测区域',
    prop: 'houseId',
    width: 150,
    search: { el: 'select', props: {} },
    enum: cabinet_addr,
    render: props => {
      return <>{props.row?.houseName}</>;
    }
  },
  {
    label: '文物类别',
    prop: 'artifactType',
    minWidth: 150,
    search: { el: 'select', props: {} },
    enum: artifact_type
  },
  {
    label: '监测数据',
    prop: 'realTimeData',
    width: 200,
    render: props => {
      return (
        <>
          <realTimeData
            modelValue={props?.row.realTimeData ? props?.row.realTimeData : {}}
          />
        </>
      );
    }
  },
  {
    label: '评估方案名称',
    prop: 'schemeName',
    minWidth: 220,
    render: props => {
      return <>{props?.row?.assessScheme?.schemeName}</>;
    }
  },
  { prop: 'operation', width: 120, label: '操作', fixed: 'right' }
]);

const typeChange = v => {
  proTable.value?.getTableList();
};
const getTableList = params => {
  getWarehouseAllLists();

  let newParams = JSON.parse(JSON.stringify(params));
  newParams.isShow = type.value;
  return getAssessConfList(newParams);
};

const getWarehouseAllLists = async () => {
  const { rows } = await getWarehouseAllList({ isShow: type.value });
  cabinet_addr.value = [];
  rows.map(v => {
    cabinet_addr.value.push({
      label: v.houseName,
      key: v.houseId,
      value: v.houseId
    });
  });
};
// ProTable 实例
const proTable = ref();

const editRef = ref(null);
const openProForm = (title, row = {}) => {
  const params = {
    title,
    isView: false,
    type: type.value,
    row: { ...row },
    api: setConfigAssess,
    getTableList: proTable.value?.getTableList
  };
  editRef.value?.acceptParams(params);
};
</script>
<style scoped lang="scss">
:deep(.el-tabs__content) {
  display: none;
}
:deep(.el-form-item__label-wrap){
  margin-left: 0 !important;
}
</style>