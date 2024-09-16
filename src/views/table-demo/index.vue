<template>
  <ProTable ref="proTable" :request-api="fetchData" :columns="columns" :data-callback="dataCallback" title="用户信息表">
    <!-- 表格 header 按钮 -->
    <template #action="scope">
      <el-button type="primary" @click="openProForm('新增')" plain icon="Plus">新增</el-button>
      <el-button type="success" :disabled="scope.selectedList.length !== 1" plain icon="Edit">编辑</el-button>
      <el-button type="danger" :disabled="!scope.isSelected" @click="batchDelete(scope.selectedListIds)" plain
        icon="Delete">删除</el-button>
      <el-button type="info" plain icon="Upload">导入</el-button>
      <el-button type="warning" plain icon="Download">导出</el-button>
    </template>
    <template #tools>
      <el-button circle icon="MuteNotification" @click="ElMessage.info('这是工具扩展按钮')"></el-button>
      <el-button circle icon="MuteNotification" @click="ElMessage.info('这是工具扩展按钮')"></el-button>
      <el-button circle icon="MuteNotification" @click="ElMessage.info('这是工具扩展按钮')"></el-button>
    </template>
    <!-- 表格操作 -->
    <template #operation="scope">
      <el-button type="primary" link @click="openProForm('查看', scope.row)">查看</el-button>
      <el-button type="primary" link @click="openProForm('编辑', scope.row)">编辑</el-button>
      <el-button type="primary" link @click="deleteAccount(scope.row)">删除</el-button>
    </template>
  </ProTable>
  <ProForm :columns="columns" :searchCol="2" width="60%" ref="drawerRef"></ProForm>
</template>
<script setup lang="jsx">
import { reactive, ref } from 'vue';
import { ElMessage, dayjs } from 'element-plus';
import { fetchData } from './fetch';
import { useHandleData } from '@/components/ProTable/hooks';
const dataCallback = data => {
  console.log(data);
  data.total = 100;
  return data;
};

const enumGender = ref([
  { label: '男', value: 1 },
  { label: '女', value: 0 }
]);

const getEnum = () => {
  console.log('get enum');

  return {
    data: [
      { label: '男', value: 1 },
      { label: '女', value: 0 }
    ]
  };
};

const columns = reactive([
  {
    type: 'selection'
  },
  {
    label: '用户',
    prop: 'user',
    tip: '用户超级长用户超级长用户超级长用户超级长',
    _children: [
      {
        label: '姓名',
        prop: 'name',
        form: {
          el: 'text',
          rules: [
            {
              required: true,
              message: 'Please input email address',
              trigger: 'blur'
            }
          ]
        },
        search: {
          el: 'text'
        },
        tip() {
          return (
            <el-button link type={'primary'}>
              用户姓名2
            </el-button>
          );
        }
      },
      {
        label: '年龄',
        prop: 'age',
        form: {
          el: 'number',
          rules: [
            {
              required: true,
              message: 'Please input email address',
              trigger: 'blur'
            }
          ]
        },
        search: { el: 'number', props: {} }
      }
    ]
  },
  {
    label: '日期',
    prop: 'date',
    render({ row }) {
      return dayjs(row.date).format('YYYY-MM-DD HH:mm:ss');
    },
    form: {
      el: 'date-picker',
      props: { 'value-format': 'x', format: 'YYYY-MM' },
      order: 2
    },
    search: {
      el: 'date-picker',
      props: { 'value-format': 'x', format: 'YYYY-MM' },
      order: 2
    }
  },
  {
    label: '时间',
    prop: 'time',
    form: {
      el: 'time-picker',
      props: { 'value-format': 'x' },
      order: 1
    },
    search: { el: 'time-picker', props: { 'value-format': 'x' }, order: 1 },
    render(scope) {
      if (scope.row?.time) {
        return new Date(scope.row?.time).toLocaleTimeString();
      }
      return '';
    }
  },
  {
    label: '性别',
    prop: 'gender',
    form: {
      el: 'select',
      defaultValue: 1
    },
    search: { el: 'select', defaultValue: 1, props: { clearable: false } },
    enum: enumGender.value
  },
  {
    label: 'Cascader',
    prop: 'cascader',
    form: {
      el: 'cascader',
      defaultValue: 1
    },
    search: { el: 'cascader', defaultValue: 1 },
    enum: getEnum
  },
  {
    label: '富文本',
    prop: 'editorContent',
    align: 'left',
    form: {
      el: 'text',
      span: 2,
      render: (props, { emit }) => {
        return (
          <>
            <Editor
              height={200}
              readOnly={props.title === '查看'}
              modelValue={props.modelValue ? props.modelValue : ''}
              onUpdate:modelValue={value => {
                emit('update:modelValue', value);
              }}
            />
          </>
        );
      }
    },
    search: { el: 'text', props: {} },
    render: props => {
      return (
        <>
          <div v-html={props.row.editorContent}></div>
        </>
      );
    }
  },
  {
    label: '文件上传',
    prop: 'fileUpload',
    align: 'left',
    form: {
      el: 'text',
      span: 2,
      render: (props, { emit }) => {
        return (
          <>
            <FileUpload
              fileSize={2}
              fileType={['txt', 'pdf']}
              upload-url="/heritage/file/upload/common"

            />
          </>


        );
      }
    }
  },
  {
    label: '图片上传',
    prop: 'ImageUpload',
    align: 'left',
    form: {
      el: 'text',
      span: 2,
      render: (props, { emit }) => {
        return (
          <>
            <ImageUpload />
          </>
        );
      }
    }
  },
  { prop: 'operation', label: '操作', fixed: 'right', width: 200 }
]);

// ProTable 实例
const proTable = ref();

// 删除用户信息
const deleteAccount = async params => {
  await useHandleData(
    fetchData,
    { id: [params.id] },
    `删除【${params.name}】用户`
  );
  proTable.value?.getTableList();
};

// 批量删除用户信息
const batchDelete = async id => {
  await useHandleData(fetchData, { id }, '删除所选用户信息');
  proTable.value?.clearSelection();
  proTable.value?.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref(null);
const openProForm = (title, row = {}) => {
  const params = {
    title,
    isView: title === '查看',
    row: { ...row },
    api:
      title === '新增' ? fetchData : title === '编辑' ? fetchData : undefined,
    getTableList: proTable.value?.getTableList
  };
  drawerRef.value?.acceptParams(params);
};
</script>
