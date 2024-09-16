<template>
  <ProTable ref="proTable" :request-api="getTableList" :columns="columns">
    <template #messageCon> aaaa </template>
    <!-- 表格 header 按钮 -->
    <template #action="scope">
      <el-button type="primary" @click="openProForm('上传文件')" plain icon="Plus">上传文件</el-button>
    </template>
    <!-- 表格操作 -->
    <template #operation="scope">
      <el-button type="primary" link @click="openProForm('编辑文件', scope.row)">编辑文件</el-button>
      <el-button type="primary" link @click="openProForm('替换文件', scope.row)">替换文件</el-button>
      <el-button type="primary" link @click="deleteFileFun(scope.row)">删除</el-button>
    </template>
  </ProTable>
  <el-dialog v-model="dialog.value" :width="dialog.width" :title="dialog.title" append-to-body align-center
    :show-close="false">
    <el-form label-width="80px">
      <el-form-item v-if="dialog.title === '编辑文件'" label="文件名">
        <el-input v-model="fileName"></el-input>
      </el-form-item>
      <el-form-item v-else label="文件">
        <el-upload style="width: 100%" :data="dialog.mesg?.fileId ? { fileId: dialog.mesg.fileId } : {}" :action="dialog.mesg?.fileId
          ? `${$url}/auth/help/file/editName/${dialog.mesg.fileId}`
          : `${$url}/auth/help/file`
          " v-model:file-list="fileList" :headers="headers" :on-change="handleChange">
          <el-button type="primary">点击上传</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="dialog.value = false">取消</el-button>
      <el-button type="primary" @click="submitUpload">确定</el-button>
    </template>
  </el-dialog>
</template>
<script setup lang="jsx">
import { useDownload } from '@/hooks/useDownload';
import { useHandleData } from '@/components/ProTable/hooks';
import {
  getFileList,
  postFile,
  downloadFile,
  editFile,
  deleteFile
} from '@/api/help/file';
import { ElMessageBox } from 'element-plus';
import { getToken } from '@/utils/auth';
const headers = ref({ Authorization: 'Bearer ' + getToken() });
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
    label: '文件名',
    prop: 'fileName',
    align: 'left',
    form: {
      el: 'text'
    },
    search: { el: 'text', props: {} },
    render: scope => {
      return (
        <>
          <el-link type="primary" onClick={() => downloadFileFun(scope.row)}>
            {scope.row.fileName}
          </el-link>
        </>
      );
    }
  },
  {
    label: '创建日期',
    prop: 'createTime',
    width: 180,
    search: {
      el: 'date-picker',
      // span: 2,
      props: { type: 'daterange', valueFormat: 'YYYY-MM-DD' }
    }
  },
  { prop: 'operation', width: 240, label: '操作', fixed: 'right' }
]);

// 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
// 默认不做操作就直接在 ProTable 组件上绑定	:requestApi="getUserList"
const getTableList = params => {
  let newParams = JSON.parse(JSON.stringify(params));
  newParams.createTime && (newParams.startTime = newParams.createTime[0]);
  newParams.createTime && (newParams.endTime = newParams.createTime[1]);
  delete newParams.createTime;
  return getFileList(newParams);
};
const fileName = ref('');
const fileList = ref([]);
const dialog = reactive({
  value: false,
  title: '',
  width: '60%',
  mesg: null
});
const submitUpload = async () => {
  if (dialog.title === '编辑文件') {
    dialog.mesg.fileName = fileName.value;
    const data = {
      fileBucket: dialog.mesg.fileBucket,
      fileId: dialog.mesg.fileId,
      fileName: dialog.mesg.fileName,
      filePath: dialog.mesg.filePath,
      fileSize: dialog.mesg.fileSize,
      filenewPath: fileName.value
    };
    await editFile(data);
  } else {
  }
  proTable.value?.getTableList();
  dialog.value = false;
};
const handleChange = (uploadFile, uploadFiles) => {
  // console.log(uploadFile, uploadFiles);
  fileList.value = [];
  fileList.value.push(uploadFile);
};
// ProTable 实例
const proTable = ref();

// 删除
const deleteFileFun = async params => {
  await useHandleData(deleteFile, params, `删除【${params.fileName}】`);
  proTable.value?.getTableList();
};

// 下载文件
const downloadFileFun = async row => {
  ElMessageBox.confirm(`确认要下载文件 ${row.fileName} 吗?`, '温馨提示', {
    type: 'warning'
  }).then(() => useDownload(downloadFile, row.fileName, row));
};

// 打开
const openProForm = (title, row = {}) => {
  dialog.title = title;
  dialog.value = true;
  if (title === '编辑文件') {
    dialog.mesg = Object.assign({}, row);
    fileName.value = row.fileName;
  } else if (title === '替换文件') {
    dialog.mesg = Object.assign({}, row);
    fileName.value = row.fileName;
    fileList.value = [
      {
        name: row.fileName
      }
    ];
  }
};
</script>
