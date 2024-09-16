<template>
  <ProTable ref="proTable" :request-api="getTableList" :columns="columns" @selectionChange="doSelectionChange">
    <!-- 表格 header 按钮 -->
    <template #action="scope">
      <el-button type="primary" @click="openProForm('新增')" plain icon="Plus">新增</el-button>
      <el-button type="primary" @click="deleteAccount(selectionArr[0])" plain icon="Delete"
        :disabled="selectionArr.length != 1">删除</el-button>

      <el-button type="primary" @click="onDownloadOrUpload('1')" plain icon="Download">导出</el-button>

      <el-upload ref="uploadRef" class="upload-demo td-ml12" accept=".xlsx, .xls, .excel" :limit="1"
        :file-list="fileList" :http-request="httpRequestHandle" icon="Download" :show-file-list="false"
        style="display: inline-block;vertical-align: middle;">
        <template #trigger>
          <el-button type="primary" plain icon="Upload">导入</el-button>
        </template>
      </el-upload>
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

  <edit ref="editRef" />
</template>
<script setup lang="jsx">
import { useHandleData } from '@/components/ProTable/hooks';
import {
  getWarehouseList,
  addWarehouse,
  editWarehouse,
  removeWarehouse
} from '@/api/artifact/warehouse';

import {
  warehouseExport,
  warehouseImport
} from '@/api/artifact/file';

import Edit from './edit';
import realTimeData from '@/views/artifact/exhibitionHall/realTimeData';
const { proxy } = getCurrentInstance();
const { house_type, moniting_status } = proxy.useDict(
  'house_type',
  'moniting_status',
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
    label: '库房编号',
    prop: 'houseId',
    minWidth: 130,
    form: {
      el: 'text'
    }
  },
  {
    label: '负责人',
    prop: 'chargePerson',
    width: 120,
    form: {
      el: 'text'
    }
  },
  {
    label: '库房所在位置',
    prop: 'houseAddrDic',
    width: 150,
    form: {
      el: 'text'
    }
  },
  {
    label: '库房名称',
    prop: 'houseName',
    minWidth: 150,
    form: {
      el: 'text'
    }
  },
  {
    label: '库房类型',
    prop: 'houseType',
    width: 120,
    form: {
      el: 'select',
      defaultValue: ''
    },
    search: { el: 'select', props: {} },
    enum: house_type
  },
  {
    label: '库房/平面图（多张）',
    prop: 'houseGraph',
    minWidth: 220,
    showOverflowTooltip: false,

    render: props => {
      if (props.row.houseGraph) {
        let html1 = props.row.houseGraph?.split(',').map(v => {
          return (
            <el-image
              src={import.meta.env.VITE_APP_FILES_API + v}
              fit="cover"
              style="width: 50px; height: 50px;display:inline-block;margin-right:10px"
            />
          );
        });
        return <><div style="white-space: nowrap; overflow: auto">{html1}</div></>
      } else {
        return ''
      }

    }
  },
  {
    label: '监测状态',
    prop: 'monitingStatus',
    width: 160,
    form: {
      el: 'select',
      defaultValue: ''
    },
    search: { el: 'select', props: {} },
    enum: moniting_status
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
  },
  { prop: 'operation', width: 180, label: '操作', fixed: 'right' }
]);
const fileList = ref([])
async function httpRequestHandle(f) {
  try {
    const formData = new FormData() // 创建form对象
    formData.append('file', f.file) // 通过append向form对象添加数据
    const res = await warehouseImport(formData)
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
  console.log(proTable.value.searchParam)
  let newParams = JSON.parse(JSON.stringify(proTable.value.searchParam));
  warehouseExport(newParams)
};

const selectionArr = ref([]);
const doSelectionChange = params => {
  selectionArr.value = params
};
const getTableList = params => {
  selectionArr.value = []
  proTable.value?.clearSelection()

  let newParams = JSON.parse(JSON.stringify(params));
  return getWarehouseList(newParams);
};

// ProTable 实例
const proTable = ref();

// 删除用户信息
const deleteAccount = async params => {
  await useHandleData(
    removeWarehouse,
    { ids: [params.houseId] },
    `删除库房编号为【${params.houseId}】的数据项`
  );
  proTable.value?.getTableList();
};

// 打开 drawer(新增、详情、编辑)
const editRef = ref(null);
const openProForm = (title, row = {}) => {
  const params = {
    title,
    isView: title === '详情',
    row: { ...row },
    disabledAarr: title === '编辑' ? ['监测状态'] : [],
    api:
      title === '新增'
        ? addWarehouse
        : title === '编辑'
          ? editWarehouse
          : undefined,
    getTableList: proTable.value?.getTableList
  };
  editRef.value?.acceptParams(params);
};
</script>
