<template>
  <ProTable ref="proTable" :request-api="getTableList" :columns="columns" @selectionChange="doSelectionChange">
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
  <hall-edit ref="exhibitionHallRef" />
</template>
<script setup lang="jsx">
import { useHandleData } from '@/components/ProTable/hooks';
import { ElMessageBox, ElMessage } from 'element-plus';
import {
  getExhibitionHallList,
  addExhibitionHall,
  editExhibitionHall,
  removeExhibitionHall
} from '@/api/artifact/exhibitionHall';
import {
  exhibitionHallExport,
  exhibitionHallImport
} from '@/api/artifact/file';

import hallEdit from './edit';
import realTimeData from './realTimeData';
const { proxy } = getCurrentInstance();
const { moniting_status, exhibition_hall_type } = proxy.useDict(
  'moniting_status',
  'exhibition_hall_type'
);

const houseTypeDic = ref([
  { label: '固定展厅', value: 1 },
  { label: '临时展厅', value: 0 }
]);
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
    label: '展厅编号',
    prop: 'houseId',
    width: 150,
    form: {
      el: 'text'
    }
  },
  {
    label: '展厅名称',
    prop: 'houseName',
    width: 150,
    form: {
      el: 'text'
    }
  },
  {
    label: '展厅类型',
    prop: 'houseType',
    width: 150,
    form: {
      el: 'select',
      defaultValue: ''
    },
    search: { el: 'select', props: {} },
    enum: exhibition_hall_type
  },
  {
    label: '展厅所在位置',
    prop: 'houseAddrDic',
    width: 150,
    form: {
      el: 'text'
    }
  },
  {
    label: '监测状态',
    prop: 'monitingStatus',
    width: 150,
    form: {
      el: 'select',
      defaultValue: ''
    },
    search: { el: 'select', props: {} },
    enum: moniting_status.value
  },
  {
    label: '实时监测数据',
    prop: 'realTimeData',
    minWidth: 200,
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
  // {
  //   label: '负责人',
  //   prop: 'chargePerson',
  //   form: {
  //     el: 'text'
  //   }
  // },
  // {
  //   label: '详细位置',
  //   prop: 'houseAddrDetail',
  //   form: {
  //     el: 'text'
  //   }
  // },
  // {
  //   label: '长',
  //   prop: 'houseLength',
  //   form: {
  //     el: 'text'
  //   }
  // },
  // {
  //   label: '宽',
  //   prop: 'houseWidth',
  //   form: {
  //     el: 'text'
  //   }
  // },
  // {
  //   label: '面积大小',
  //   prop: 'houseArea',
  //   form: {
  //     el: 'text'
  //   }
  // },
  {
    label: '展厅/平面图（多张）',
    prop: 'houseGraph',
    minWidth: 220,
    showOverflowTooltip: false,
    form: {
      el: 'text',
      render: props => {
        if (props.title === '详情') {
          return (
            <el-image
              src={props.modelValue}
              fit="cover"
              style="width: 50px; height: 50px"
            />
          );
        } else {
          return (
            <>
              <el-input
                modelValue={props.modelValue ? props.modelValue : ''}
                onUpdate:modelValue={value => {
                  emit('update:modelValue', value);
                }}
              ></el-input>
            </>
          );
        }
      }
    },
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
  { prop: 'operation', width: 180, label: '操作', fixed: 'right' }
]);
const fileList = ref([])
async function httpRequestHandle(f) {
  try {
    const formData = new FormData() // 创建form对象
    formData.append('file', f.file) // 通过append向form对象添加数据
    const res = await exhibitionHallImport(formData)
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
  exhibitionHallExport(newParams)
};

const selectionArr = ref([]);
const doSelectionChange = params => {
  selectionArr.value = params
};
const getTableList = params => {
  selectionArr.value = []
  proTable.value?.clearSelection()
  let newParams = JSON.parse(JSON.stringify(params));
  return getExhibitionHallList(newParams);
};

// ProTable 实例
const proTable = ref();

// 删除
const deleteAccount = async params => {
  ElMessageBox.confirm(
    `当前展厅处于实时监测状态，若删除展厅将导致本系统及监测系统所有监测功能失效，请谨慎选择！`,
    '确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      // type: confirmType,
      draggable: true
    }
  )
    .then(async () => {
      const res = await removeExhibitionHall({ ids: [params.houseId] });
      ElMessage({
        type: 'success',
        message: `操作成功!`
      });
      proTable.value?.getTableList();
    })
    .catch(_err => {
      // console.log(_err);
    });
};

const exhibitionHallRef = ref(null);
const openProForm = (title, row = {}) => {
  const params = {
    title,
    isView: title === '详情',
    row: { ...row },
    disabledAarr: title === '编辑' ? ['监测状态'] : [],
    api:
      title === '新增'
        ? addExhibitionHall
        : title === '编辑'
          ? editExhibitionHall
          : undefined,
    getTableList: proTable.value?.getTableList
  };
  exhibitionHallRef.value?.acceptParams(params);
};
</script>