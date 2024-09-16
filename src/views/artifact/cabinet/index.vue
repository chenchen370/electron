<template>
  <ProTable ref="proTable" :request-api="getTableList" :columns="columns" @selectionChange="doSelectionChange">
    <template #messageCon> aaaa </template>
    <!-- 表格 header 按钮 -->
    <template #action="scope">
      <el-button type="primary" @click="openProForm('新增')" plain icon="Plus">新增</el-button>
      <el-button type="primary" @click="deleteAccount(selectionArr[0])" plain icon="Delete"
        :disabled="selectionArr.length != 1">删除</el-button>

      <el-button type="primary" @click="onDownloadOrUpload('1')" plain icon="Download">导出</el-button>
      <el-upload ref="uploadRef" class="upload-demo td-ml12" accept=".xlsx, .xls, .excel" :limit="1"
        :file-list="fileList" :http-request="httpRequestHandle" :show-file-list="false"
        style="display: inline-block;vertical-align: middle;">
        <template #trigger>
          <el-button type="primary" plain icon="Upload">导入</el-button>
        </template>
      </el-upload>
      <!-- <el-button
        type="success"
        :disabled="scope.selectedList.length !== 1"
        plain
        icon="Edit"
        @click="openProForm('编辑', scope.selectedList[0])"
        >设为已读</el-button
      > -->
      <!-- <el-button
        type="danger"
        :disabled="!scope.isSelected"
        @click="batchDelete(scope.selectedListIds)"
        plain
        icon="Delete"
        >删除</el-button
      > -->
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
  getCabinetList,
  addCabinet,
  editCabinet,
  removeCabinet,

} from '@/api/artifact/cabinet';
import {
  getCabinetExport,
  getCabinetImport
} from '@/api/artifact/file';
import Edit from './edit';
import { getWarehouseAllList } from '@/api/artifact/warehouse';
import realTimeData from '@/views/artifact/exhibitionHall/realTimeData';
const { proxy } = getCurrentInstance();
const { cabinet_type, func_type, moniting_status, sys_yes_no } = proxy.useDict(
  'cabinet_type',
  'func_type',
  'moniting_status',
  'sys_yes_no'
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
    label: '编号',
    prop: 'cabinetId',
    width: 120,
    form: {
      el: 'text'
    }
  },
  {
    label: '储藏柜名称',
    prop: 'cabinetName',
    minWidth: 150,
    form: {
      el: 'text'
    }
  },
  {
    label: '储藏柜类型',
    prop: 'cabinetType',
    width: 180,
    form: {
      el: 'select',
      defaultValue: ''
    },
    search: { el: 'select', props: {} },
    enum: cabinet_type
  },
  {
    label: '储藏柜功能类型',
    prop: 'funcType',
    width: 200,
    form: {
      el: 'select',
      defaultValue: ''
    },
    search: { el: 'select', props: {} },
    enum: func_type
  },
  {
    label: '所属库房',
    prop: 'houseId',
    width: 120,
    form: {
      el: 'select'
    },
    search: { el: 'select', props: {} },
    enum: cabinet_addr,
    render: props => {
      return (
        <>
          {props.row?.houseName}
        </>
      );
    }
  },
  {
    label: '监测状态',
    prop: 'monitingStatus',
    width: 130,
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
    minWidth: 200,
    form: {
      el: 'text'
    },
    render: props => {
      return (
        <>
          <realTimeData
            modelValue={props?.row?.realTimeData ? props?.row.realTimeData : {}}
          />
        </>
      );
    }
  },
  {
    label: '藏品数量统计',
    prop: 'storeNum',
    width: 150,
    form: {
      el: 'text'
    }
  },
  {
    label: '储藏柜存放率',
    prop: 'storageRate',
    width: 150,
    form: {
      el: 'text'
    }
  },
  // {
  //   label: '详细位置',
  //   prop: 'cabinetAddrDetail',
  //   width: 120,
  //   form: {
  //     el: 'text'
  //   }
  // },
  // {
  //   label: '高',
  //   prop: 'cabinetHigh',
  //   width: 60,
  //   form: {
  //     el: 'text'
  //   }
  // },
  // {
  //   label: '长',
  //   prop: 'cabinetLength',
  //   width: 60,
  //   form: {
  //     el: 'text'
  //   }
  // },
  // {
  //   label: '宽',
  //   prop: 'cabinetWidth',
  //   width: 60,
  //   form: {
  //     el: 'text'
  //   }
  // },
  // {
  //   label: '体积',
  //   prop: 'cabinetVolume',
  //   width: 60,
  //   form: {
  //     el: 'text'
  //   }
  // },

  // {
  //   label: '屉/格数量',
  //   prop: 'drawerCount',
  //   width: 100,
  //   form: {
  //     el: 'text'
  //   }
  // },
  // {
  //   label: '厂商',
  //   prop: 'facturer',
  //   width: 120,
  //   form: {
  //     el: 'text'
  //   }
  // },
  // {
  //   label: '厂商联系人',
  //   prop: 'facturerContact',
  //   width: 120,
  //   form: {
  //     el: 'text'
  //   }
  // },
  // {
  //   label: '厂商联系人电话',
  //   prop: 'facturerContactTel',
  //   width: 120,
  //   form: {
  //     el: 'text'
  //   }
  // },
  // {
  //   label: '厂商电话',
  //   prop: 'facturerTel',
  //   width: 140,
  //   form: {
  //     el: 'text'
  //   }
  // },
  // {
  //   label: '控制内容',
  //   prop: 'funcContent',
  //   width: 120,
  //   form: {
  //     el: 'text'
  //   }
  // },
  // {
  //   label: '型号',
  //   prop: 'modelNum',
  //   width: 120,
  //   form: {
  //     el: 'text'
  //   }
  // },

  { prop: 'operation', width: 230, label: '操作', fixed: 'right' }
]);
const getWarehouseAllLists = async () => {
  const { rows } = await getWarehouseAllList({ isShow: 0 });
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
const selectionArr = ref([]);
const doSelectionChange = params => {
  selectionArr.value = params
};

const fileList = ref([])
async function httpRequestHandle(f) {
  try {
    const formData = new FormData() // 创建form对象
    formData.append('file', f.file) // 通过append向form对象添加数据
    const res = await getCabinetImport(formData)
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
  getCabinetExport(newParams)
};
// 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
// 默认不做操作就直接在 ProTable 组件上绑定	:requestApi="getUserList"
const getTableList = params => {
  selectionArr.value = []
  proTable.value?.clearSelection()

  let newParams = JSON.parse(JSON.stringify(params));
  return getCabinetList(newParams);
};

// ProTable 实例
const proTable = ref();

// 删除用户信息
const deleteAccount = async params => {
  await useHandleData(
    removeCabinet,
    { ids: params.cabinetId },
    `删除储藏柜编号为【${params.cabinetId}】的数据项`
  );
  proTable.value?.getTableList();
};

const editRef = ref(null);
const openProForm = (title, row = {}) => {
  const params = {
    title,
    isView: title === '详情',
    row: { ...row },
    disabledAarr: title === '编辑' ? ['监测状态'] : [],
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
</script>
