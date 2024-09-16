<template>
  <el-dialog :title="`${proFormProps.title}`" v-model="proFormVisible" width="1028px" @close="close" align-center
    :show-close="false">
    <div class="mn-container">
      <ProTable ref="proTable" :request-api="getTableList" :columns="columns" @selection-change="handleSelectionChange">
      </ProTable>
      <div class="td-flex center td-mt20">
        <el-button class="button-c-sure" v-show="!proFormProps.isView" type="primary"
          @click="handleSubmit">确定</el-button>
        <!-- <div class="i-button_cancel td-ml10" @click="close">取消</div> -->
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="jsx">
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { getAssessConfList } from '@/api/warning/assess';
import realTimeData from '@/views/artifact/exhibitionHall/realTimeData';
import { getWarehouseAllList } from '@/api/artifact/warehouse';
import pic from '@/views/warning/monitorPoint/pic';
const { proxy } = getCurrentInstance();
const { func_type, artifact_type } = proxy.useDict(
  'func_type',
  'artifact_type'
);
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
    label: '监测区域类型',
    prop: 'isShow',
    isShow: false,
    search: { el: 'select', props: {}, defaultValue: '1' },
    enum: [
      { label: '展厅', value: '1' },
      { label: '库房', value: '0' }
    ]
  },
  {
    label: '监测点位置描述',
    prop: 'cabinetAddrDetail',
    width: 150,
    form: {
      el: 'text'
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
    label: '监测区域',
    prop: 'houseId',
    width: 150,
    form: {
      el: 'select'
    },
    enum: cabinet_addr,
    render: props => {
      return <>{props.row?.houseName}</>;
    }
  },
  {
    label: '功能类型',
    prop: 'funcType',
    isShow: false,
    search: { el: 'select', props: {} },
    enum: func_type
  },
  {
    label: '文物类别',
    prop: 'artifactType',
    form: {
      el: 'select',
      defaultValue: ''
    },
    search: { el: 'select', props: {} },
    enum: artifact_type
  },
  {
    label: '监测数据',
    prop: 'realTimeData',
    width: 200,
    form: {
      el: 'text'
    },
    render: props => {
      return (
        <>
          <realTimeData
            modelValue={props?.row.realTimeData ? props?.row.realTimeData : {}}
          />
        </>
      );
    }
  }
]);

const proFormVisible = ref(false);
const proFormProps = ref({
  isView: false,
  title: '',
  row: {}
});
const getTableList = params => {
  let newParams = JSON.parse(JSON.stringify(params));
  newParams.assessStatus = 0;
  return getAssessConfList(newParams);
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
const getWarehouseAllLists = async () => {
  const { rows } = await getWarehouseAllList({ isShow: 1 });
  cabinet_addr.value = [];
  rows.map(v => {
    cabinet_addr.value.push({
      label: v.houseName,
      key: v.houseId,
      value: v.houseId
    });
  });
};
getWarehouseAllLists();
const handleSelectionChange = v => {
  selection.value = v;
};
const reset = () => { };
const handleSubmit = async () => {
  if (!selection.value) {
    ElMessage.warning({ message: '请选择报警方案' });
    return;
  }
  const mappingList = Array.from(selection.value).map(v => {
    let item = {
      cabinetId: v.cabinetId,
      schemeId: proFormProps.value.row?.schemeId
    };
    return item;
  });
  const param = {
    mappingList,
    confMethod: '2'
  };
  await proFormProps.value.api(param);
  ElMessage.success({ message: `${proFormProps.value.title}成功` });
  proFormProps.value.getTableList();
  proFormVisible.value = false;
};
const acceptParams = params => {
  proFormProps.value = params;
  proFormVisible.value = true;
};
defineExpose({
  acceptParams
});
</script>
<style lang="scss" scoped>
.i-link {
  color: #29d;
  text-decoration: underline;
}

.m-add_row {
  height: 32px;
  padding: 0 30px;
  background: #ffffff;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  font-weight: 400;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
  line-height: 22px;
  cursor: pointer;
}

.pro-form {
  :deep(.el-form-item) {
    margin: 0;
  }
}
</style>
