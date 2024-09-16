<template>
  <ProTable ref="proTable" :request-api="getTableList" :columns="columns">
    <template #operation="scope">
      <el-icon size="22" color="#38675C" title="下载" @click="onDownload(scope.row)" class="td-pointer">
        <Download />
      </el-icon>
    </template>
  </ProTable>
  <ProForm :columns="columns" :searchCol="2" width="60%" ref="drawerRef"></ProForm>
</template>
<script setup lang="jsx">
import { useHandleData } from '@/components/ProTable/hooks';
import {
  getReportAreaHisList
} from '@/api/warning/dataReport';

const { proxy } = getCurrentInstance();
const {
  deal_method
} = proxy.useDict(
  'deal_method'
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
    label: '文件名',
    prop: 'fileName',
    minWidth: 220,
    render: props => {
      return (
        <>
          <el-link href={import.meta.env.VITE_APP_FILES_API + '/' + props.row.fileBucket + props.row.filePath} target={'_blank'}>{props.row.fileName}</el-link>
        </>
      );
    }
  },
  // {
  //   label: '文件大小',
  //   prop: 'fileSize',
  //   minWidth: 160,
  //   form: {
  //     el: 'text'
  //   }
  // },
  // {
  //   label: '文件池',
  //   prop: 'fileBucket',
  //   minWidth: 160,
  //   form: {
  //     el: 'text'
  //   }
  // },
  {
    label: '添加日期时间',
    prop: 'addDate',
    minWidth: 160,
    search: {
      el: 'date-picker',
      span:2,
      props: { type: 'datetimerange', valueFormat: 'YYYY-MM-DD HH:mm:ss' }
    },
    render: props => {
      return (
        <>
          <div>{props.row.addDate} {props.row.addTime}</div>
        </>
      );
    }
  },

  // { prop: 'operation', width: 180, label: '操作', fixed: 'right' }
]);

const getTableList = params => {
  let newParams = JSON.parse(JSON.stringify(params));

  newParams.startDate = newParams.addDate?.[0] || ''
  newParams.endDate = newParams.addDate?.[1] || ''

  delete newParams.addDate
  return getReportAreaHisList(newParams);
};


// ProTable 实例
const proTable = ref();

// 打开 drawer(新增、查看、处理)
const drawerRef = ref(null);

const onDownload = (row = {}) => {
  const url = import.meta.env.VITE_APP_FILES_API + row.filePath
  window.open(url)
};
</script>
