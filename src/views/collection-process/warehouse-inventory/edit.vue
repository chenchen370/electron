<template>
  <el-dialog :title="`${proFormProps.title}`" v-model="proFormVisible" width="1028px" @close="close" align-center
    :show-close="false">
    <div class="mn-container">
      <el-tabs v-model="deviceType" class="demo-tabs" @tabChange="typeChange">
        <el-tab-pane label="应盘总数" name="1">应盘总数</el-tab-pane>
        <el-tab-pane label="已盘数量" name="2">已盘数量</el-tab-pane>
      </el-tabs>

      <ProTable ref="proTable" :request-api="getTableList" :columns="columns" @selection-change="handleSelectionChange">
      </ProTable>
    </div>
  </el-dialog>
</template>

<script setup>
import { reactive } from 'vue';
import { ElMessage } from 'element-plus';
import {
  doCountingCount
} from '@/api/warehouse-inventory';
const { proxy } = getCurrentInstance();
const {
  scheme_status
} = proxy.useDict(
  'scheme_status'
);
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
  // {
  //   type: 'selection'
  // },
  // {
  //   label: '序号',
  //   width: 60,
  //   type: 'index'
  // },
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
    label: '盘点编号',
    prop: 'orderNo',
  },
  // {
  //   label: '在库状态',
  //   prop: 'orderStat',
  //   form: {
  //     el: 'select',
  //     defaultValue: ''
  //   },
  //   enum: orderStat
  // },
  // {
  //   label: '文物状态',
  //   prop: 'suitableCpTexture',
  //   form: {
  //     el: 'select',
  //     defaultValue: ''
  //   },
  //   enum: orderStat
  // },
  {
    label: '盘点状态',
    prop: 'orderStat',
    enum: orderStat
  }
]);
const proFormVisible = ref(false);
const proFormProps = ref({
  isView: false,
  title: '',
  row: {}
});
const deviceType = ref('1');
const typeChange = v => {
  deviceType.value = v;
  nextTick(() => {
    proTable.value?.getTableList();
  })
};
const getTableList = params => {
  let newParams = JSON.parse(JSON.stringify(params));
  newParams.id = proFormProps.value.row.id
  newParams.orderId = proFormProps.value.row.orderId
  newParams.orderNo = proFormProps.value.row.orderNo
  newParams.relicId = proFormProps.value.row.relicId
  newParams.relicRfid = proFormProps.value.row.relicRfid
  newParams.relicStat = proFormProps.value.row.relicStat

  return doCountingCount(newParams).then(res => {
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

const acceptParams = params => {
  console.log(params)
  proFormProps.value = params;
  proFormVisible.value = true;
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