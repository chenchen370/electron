<template>
  <el-dialog :title="`${proFormProps.title}`" v-model="proFormVisible" width="1028px" @close="close" align-center
    :show-close="false">
    <div class="mn-container">
      <el-tabs v-model="deviceType" class="demo-tabs" @tabChange="typeChange">
        <el-tab-pane :label="item.warehouseName" :name="item.warehouseId" v-for="(item, idx) in tabs" :key="idx">{{
          item.warehouseName }}</el-tab-pane>
      </el-tabs>

      <ProTable ref="proTable" :request-api="getTableList" :columns="columns" @selection-change="handleSelectionChange">
      </ProTable>
      <div class="td-flex center td-mt40">
        <el-button class="button-c-sure" v-show="!proFormProps.isView" type="primary"
          @click="handleSubmit">保存</el-button>
        <!-- <div class="i-button_cancel td-ml10" @click="close">取消</div> -->
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { reactive } from 'vue';
import { ElMessage } from 'element-plus';
import {
  getCountingWarehouse,
  getCountingRelics,
  doCountingCreate
} from '@/api/warehouse-inventory';
const { proxy } = getCurrentInstance();
const {
  monitor_type,
  scheme_status
} = proxy.useDict(
  'monitor_type',
  'scheme_status'
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
    isShow: false,
    search: { el: 'text', props: {} },
  },
  {
    label: '计划盘点时间',
    prop: 'orderStartTime',
    isShow: false,
    search: {
      el: 'date-picker',
      props: { type: 'daterange', valueFormat: 'YYYY-MM-DD' }
    }
  },
  {
    label: '盘点人',
    prop: 'countingUserName',
    isShow: false,
    search: { el: 'text', props: {} },
  },
  {
    label: '盘点类型',
    prop: 'orderType',
    isShow: false,
    search: { el: 'select', props: {} },
    enum: orderType
  },

  {
    label: '藏品编号名称',
    prop: 'collectionNumberName',
    width: 150,
    form: {
      el: 'text'
    }
  },
  {
    label: '编号',
    prop: 'collectionNumber',
    form: {
      el: 'text'
    }
  },
  {
    label: '藏品名称',
    prop: 'relicNames',
    width: 150,
    form: {
      el: 'text'
    }
  },
  {
    label: '文物类别',
    prop: 'monitorType',
    width: 100,
    form: {
      el: 'select',
      defaultValue: ''
    },
    // search: { el: 'select', props: {} },
    enum: monitor_type.value
  },
  {
    label: '实际数量',
    prop: 'relicNum',
    minWidth: 100,
    form: {
      el: 'text'
    }
  },
  {
    label: '实际数量单位',
    prop: 'numUnit',
    minWidth: 120,
    form: {
      el: 'text'
    }
  },
  {
    label: '文物级别',
    prop: 'schemesscodes',
    minWidth: 100,
    form: {
      el: 'text'
    }
  },
  {
    label: '完残程度',
    prop: 'relicCompleteness',
    minWidth: 100,
    form: {
      el: 'text'
    }
  },
  {
    label: '库房负责人',
    prop: 'warehouseManager',
    minWidth: 120,
    form: {
      el: 'text'
    }
  },
  {
    label: '当前状态',
    prop: 'saveStatus',
    width: 100,
    form: {
      el: 'select',
      defaultValue: ''
    },
    // search: { el: 'select', props: {} },
    // enum: scheme_status.value
  }
]);
const proFormVisible = ref(false);
const proFormProps = ref({
  isView: false,
  title: '',
  row: {}
});
const tabs = ref([]);
const deviceType = ref('');
const typeChange = v => {
  deviceType.value = v;
  nextTick(() => {
    proTable.value?.getTableList();
  })
};
const getTableList = params => {
  let newParams = JSON.parse(JSON.stringify(params));
  // newParams.schemeStatus = 1
  newParams = { ...newParams, warehouseId: deviceType.value }
  return getCountingRelics(newParams).then(res => {
    return { ...res, rows: res.data || [], total: res?.data?.length || 0 }
  });
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
  console.log(selection.value);
};
const reset = () => { };
const handleSubmit = async () => {
  // if (!selection.value) {
  //   ElMessage.warning({ message: '请选择' });
  //   return;
  // }
  // const mappingList = Array.from(selection.value).map(v => {
  //   let item = {
  //     addDate: v.addDate,
  //     addTime: v.addTime,
  //     id: v.id,
  //     linkAreaId: proFormProps.value.type == 1 || proFormProps.value.type == 3 ? proFormProps.value.row?.houseId : proFormProps.value.row?.cabinetId,
  //     schemeId: v.schemeId
  //   };
  //   return item;
  // });
  // const param = {
  //   areaId: proFormProps.value.type == 1 || proFormProps.value.type == 3 ? proFormProps.value.row?.houseId : proFormProps.value.row?.cabinetId,
  //   mappingList,
  //   type: proFormProps.value.type
  // };
  const param = {
    ...proFormProps.value.row,
    warehouseIds: deviceType.value
  }
  await proFormProps.value.api(param);
  ElMessage.success({ message: `${proFormProps.value.title}成功` });
  proFormProps.value.getTableList();
  proFormVisible.value = false;
};

const acceptParams = params => {
  console.log(params)
  proFormProps.value = params;
  proFormVisible.value = true;

  getCountingWarehouse().then(res => {
    tabs.value = res.data || []
    if (!deviceType.value) deviceType.value = res.data?.[0].warehouseId || ''
  })
};

defineExpose({
  acceptParams
});
</script>
<style scoped lang="scss">
:deep(.el-tabs__content) {
  display: none;
}
</style>