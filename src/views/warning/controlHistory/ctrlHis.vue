<template>
  <el-dialog :title="`${proFormProps.title}`" v-model="proFormVisible" width="1028px" @close="close" align-center
    :show-close="false">
    <div class="mn-container">
      <ProTable ref="proTable" :request-api="getTableList" :columns="columns"></ProTable>
      <div class="td-flex justify-end td-mt20">
        <!-- <div class="i-button_cancel td-ml10" @click="close">取消</div> -->
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="jsx">
import { reactive } from 'vue';
import {
  getCtrlDeviceCtrlHis,
  getCtrlDeviceRunHis,
} from '@/api/warning/ctrlDevice';

const columns = reactive([
  // {
  //   type: 'selection'
  // },
  {
    label: '序号',
    width: 60,
    type: 'index'
  },
  {
    label: '设备序列号',
    prop: 'deviceSerialNo',
    form: {
      el: 'text'
    }
  },
  {
    label: '周期',
    prop: 'period',
    form: {
      el: 'text'
    }
  },
  {
    label: '温度上限',
    prop: 'temperatureUp',
    form: {
      el: 'text'
    }
  },
  {
    label: '温度下限',
    prop: 'temperatureLow',
    form: {
      el: 'text'
    }
  },
  {
    label: '湿度上限',
    prop: 'humidityUp',
    form: {
      el: 'text'
    }
  },
  {
    label: '湿度下限',
    prop: 'humidityLow',
    form: {
      el: 'text'
    }
  },
  {
    label: '预设湿度',
    prop: 'humidity',
    form: {
      el: 'text'
    }
  },
  {
    label: '日期时间',
    prop: 'addDate',
    render({ row }) {
      return <>{row?.addDate} {row?.addTime}</>;
    },
  },
  // { prop: 'operation', width: 180, label: '操作', fixed: 'right' }
]);

const proFormVisible = ref(false);
const proFormProps = ref({
  isView: false,
  title: '',
  row: {}
});
const getTableList = params => {
  let newParams = JSON.parse(JSON.stringify(params));
  newParams.deviceSerialNo = proFormProps.value.row?.deviceSerialNo || proFormProps.value.row?.deviceId || '';
  return getCtrlDeviceCtrlHis(newParams);
};
// ProTable 实例
const proTable = ref();
const close = () => {
  proFormProps.value = {
    isView: false,
    title: '',
    row: {}
  };
  proFormVisible.value = false;
};

const acceptParams = params => {
  proFormProps.value = params;
  proFormVisible.value = true;
  proTable.value.getTableList();
};

defineExpose({
  acceptParams
});
</script>
