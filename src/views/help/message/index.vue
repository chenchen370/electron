<template>
  <ProTable ref="proTable" :request-api="getTableList" :columns="columns">
    <template #messageCon> aaaa </template>
    <!-- 表格 header 按钮 -->
    <template #action="scope">
      <!-- <el-button type="primary" @click="openProForm('新增')" plain icon="Plus"
        >新增</el-button
      > -->
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
      <el-button type="primary" link @click="openProForm('查看', scope.row)">查看</el-button>
      <el-button type="primary" :disabled="scope.row.messageRead !== '0'" link
        @click="changeStatus(scope.row)">设为已读</el-button>
      <el-button type="primary" link @click="deleteAccount(scope.row)">删除</el-button>
    </template>
  </ProTable>
  <ProForm :columns="columns" width="60%" ref="drawerRef"></ProForm>
</template>
<script setup lang="jsx">
import { useHandleData } from '@/components/ProTable/hooks';
import { getMessageList, editMessage, deleteMessage } from '@/api/help/message';
const enumMessageRead = ref([
  { label: '未读', value: '0' },
  { label: '已读', value: '1' }
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
    label: '消息记录标题',
    prop: 'messageTitle',
    align: 'left',
    form: {
      el: 'text'
    },
    search: { el: 'text', props: {} }
  },
  {
    label: '消息记录内容',
    prop: 'messageContent',
    align: 'left',
    isShow: false,
    form: {
      el: 'text',
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
    render: props => {
      return (
        <>
          <div v-html={props.row.messageContent}></div>
        </>
      );
    }
  },
  {
    label: '是否已读',
    prop: 'messageRead',
    search: { el: 'select', props: {} },
    enum: enumMessageRead.value,
    render: scope => {
      return (
        <>
          <el-tag type={scope.row.messageRead === '0' ? 'danger' : 'info'}>
            {scope.row.messageRead === '0' ? '未读' : '已读'}
          </el-tag>
        </>
      );
    }
  },
  {
    label: '创建日期',
    prop: 'createTime',
    search: {
      el: 'date-picker',
      // span: 2,
      props: { type: 'daterange', valueFormat: 'YYYY-MM-DD' }
    }
  },
  { prop: 'operation', label: '操作', fixed: 'right' }
]);

// 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
// 默认不做操作就直接在 ProTable 组件上绑定	:requestApi="getUserList"
const getTableList = params => {
  let newParams = JSON.parse(JSON.stringify(params));
  newParams.createTime && (newParams.startTime = newParams.createTime[0]);
  newParams.createTime && (newParams.endTime = newParams.createTime[1]);
  delete newParams.createTime;
  return getMessageList(newParams);
};

// ProTable 实例
const proTable = ref();

// 删除用户信息
const deleteAccount = async params => {
  await useHandleData(
    deleteMessage,
    { messageId: [params.messageId] },
    `删除【${params.messageTitle}】`
  );
  proTable.value?.getTableList();
};

// 切换已读状态
const changeStatus = async row => {
  await useHandleData(
    editMessage,
    { messageId: row.messageId },
    `将【${row.messageTitle}】设为已读`
  );
  proTable.value?.getTableList();
};

// 批量删除用户信息
// const batchDelete = async id => {
//   await useHandleData(fetchData, { id }, '删除所选用户信息');
//   proTable.value?.clearSelection();
//   proTable.value?.getTableList();
// };

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref(null);
const openProForm = (title, row = {}) => {
  const params = {
    title,
    isView: title === '查看',
    row: { ...row },
    api:
      title === '新增'
        ? addMessage
        : title === '编辑'
          ? editMessage
          : undefined,
    getTableList: proTable.value?.getTableList
  };
  drawerRef.value?.acceptParams(params);
};
</script>
