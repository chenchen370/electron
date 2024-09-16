<template>
  <el-dialog :title="`${proFormProps.title}`" v-model="proFormVisible" width="1028px" @close="close" align-center
    :show-close="false">
    <div class="mn-container">
      <ProTable ref="proTable" :request-api="getTableList" :columns="columns" @selection-change="handleSelectionChange">
      </ProTable>
      <div class="td-flex center td-mt40">
        <el-button class="button-c-sure" v-show="!proFormProps.isView" type="primary"
          @click="handleSubmit">确定</el-button>
        <!-- <div class="i-button_cancel td-ml10" @click="close">取消</div> -->
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { getSchemeList } from '@/api/warning/scheme';
const { proxy } = getCurrentInstance();
const {
  monitor_type,
  suitable_cp_texture,
  suitable_environment,
  scheme_status
} = proxy.useDict(
  'monitor_type',
  'suitable_cp_texture',
  'suitable_environment',
  'scheme_status'
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
  {
    label: '方案名称',
    prop: 'schemeName',
    form: {
      el: 'text'
    }
  },
  {
    label: '监测类型',
    prop: 'monitorType',
    width: 100,
    form: {
      el: 'select',
      defaultValue: ''
    },
    search: { el: 'select', props: {} },
    enum: monitor_type.value
  },
  {
    label: '适用环境',
    prop: 'suitableEnvironment',
    width: 100,
    form: {
      el: 'select',
      defaultValue: ''
    },
    search: { el: 'select', props: {} },
    enum: suitable_environment.value
  },
  {
    label: '适用藏品质地',
    prop: 'suitableCpTexture',
    form: {
      el: 'select',
      defaultValue: ''
    },
    search: { el: 'select', props: {} },
    enum: suitable_cp_texture.value
  },
  {
    label: '方案状态',
    prop: 'schemeStatus',
    width: 100,
    form: {
      el: 'select',
      defaultValue: ''
    },
    // search: { el: 'select', props: {} },
    enum: scheme_status.value
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
  newParams.schemeStatus = 1
  return getSchemeList(newParams);
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
  if (!selection.value) {
    ElMessage.warning({ message: '请选择报警方案' });
    return;
  }
  const mappingList = Array.from(selection.value).map(v => {
    let item = {
      addDate: v.addDate,
      addTime: v.addTime,
      id: v.id,
      linkAreaId: proFormProps.value.type == 1 || proFormProps.value.type == 3 ? proFormProps.value.row?.houseId : proFormProps.value.row?.cabinetId,
      schemeId: v.schemeId
    };
    return item;
  });
  const param = {
    areaId: proFormProps.value.type == 1 || proFormProps.value.type == 3 ? proFormProps.value.row?.houseId : proFormProps.value.row?.cabinetId,
    mappingList,
    type: proFormProps.value.type
  };
  await proFormProps.value.api(param);
  ElMessage.success({ message: `${proFormProps.value.title}成功` });
  proFormProps.value.getTableList();
  proFormVisible.value = false;
};

const acceptParams = params => {
  console.log(params)
  proFormProps.value = params;
  proFormVisible.value = true;
};

defineExpose({
  acceptParams
});
</script>
