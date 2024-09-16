<template>
  <ProTable ref="proTable" :request-api="getTableList" :columns="columns" @selectionChange="doSelectionChange">
    <!-- 表格 header 按钮 -->
    <template #action="scope">
      <el-button type="primary" @click="openProForm('新增')" plain icon="Plus">新增</el-button>
      <el-button type="primary" @click="deleteAccount(selectionArr[0])" plain icon="Delete"
        :disabled="selectionArr.length != 1">删除</el-button>
    </template>
    <!-- 表格操作 -->
    <template #operation="scope">
      <!-- <div class="td-icon icon-copy td-mr10 td-pointer" title="复制" @click="onCopy(scope)"></div>
      <div class="td-icon icon-paste td-mr10 td-pointer" title="粘贴" @click="onCopy(scope)"></div> -->
      <div class="td-icon icon-set td-mr22 td-pointer" title="方案分配" @click="setProForm('方案分配', scope.row)"></div>
      <el-icon size="22" color="#38675C" title="编辑" @click="openProForm('编辑', scope.row)" class="td-mr22 td-pointer">
        <EditPen />
      </el-icon>
      <el-icon size="22" color="#38675C" title="删除" @click="deleteAccount(scope.row)" class="td-pointer">
        <Delete />
      </el-icon>
      <!-- <el-icon size="22" color="#38675C" @click="openProForm('查看', scope.row)" class="td-pointer"><View /></el-icon> -->
    </template>
  </ProTable>
  <ProForm :columns="columns" :searchCol="2" width="80%" ref="drawerRef"></ProForm>

  <edit ref="editRef" />
  <setting ref="settingRef" />
</template>
<script setup lang="jsx">
import { useHandleData } from '@/components/ProTable/hooks';
import {
  getAssessList,
  setConfigAssess,
  addAssess,
  editAssess,
  removeAssess
} from '@/api/warning/assess';
import Edit from './edit';
import setting from './setting';

const columns = reactive([
  {
    type: 'selection'
  },
  {
    label: '序号',
    width: 60,
    type: 'index'
  },
  // {
  //   label: '方案编号',
  //   prop: 'schemeId',
  //   width: 100,
  //   form: {
  //     el: 'text'
  //   }
  // },
  {
    label: '方案名称',
    prop: 'schemeName',
    width: 210,
    form: {
      el: 'text',
      rules: [
        {
          required: true,
          message: '请输入方案名称',
          trigger: 'blur'
        }
      ]
    },
    search: { el: 'text', props: {} }
  },
  {
    label: '权重方案',
    prop: 'stabilityScale',
    form: {
      el: 'text'
    },
    render: props => {
      return (
        <>
          <div class="text-left" id={'case' + props.$index}>
            <div>监测点综合评估权重</div>
            <div>
              洁净度：{props.row.cleanlinessScale}
              <span class="td-ml16">
                有效稳定性：{props.row.stabilityScale}
              </span>
            </div>
            <div>洁净度评分权重</div>
            <div>
              CO2：{props.row.co2Scale}
              <span class="td-ml16"></span>VOC：{props.row.vocScale}
              <span class="td-ml16"></span>有机污染物：
              {props.row.ogncContamiScale}
              <span class="td-ml16"></span>无机污染物：
              {props.row.inogncContamiScale}
              <span class="td-ml16"></span>含硫污染物：
              {props.row.sulfurContamiScale}
            </div>
            <div>有效稳定性评分权重</div>
            <div>
              数据稳定性：{props.row.dataStabilityScale}
              <span class="td-ml16"></span>数据偏离程度：
              {props.row.dataOffsetScale}
              <br />
              温度：{props.row.temperatureScale}
              <span class="td-ml16"></span>湿度：{props.row.humidityScale}
              <span class="td-ml16"></span>紫外线：{props.row.ultravioletScale}
              <span class="td-ml16"></span>光照：{props.row.illuminationScale}
            </div>
          </div>
        </>
      );
    }
  },
  { prop: 'operation', width: 230, label: '操作', fixed: 'right' }
]);
const selectionArr = ref([]);
const doSelectionChange = params => {
  selectionArr.value = params
};
const getTableList = params => {
  selectionArr.value = []
  proTable.value?.clearSelection()

  let newParams = JSON.parse(JSON.stringify(params));
  return getAssessList(newParams);
};
const onCopy = scope => {
  const inputEle = document.querySelector('#case' + scope.$index);
  const text = inputEle.textContent || '';
  // 创建一个临时的输入框来存储要复制的文本
  const input = document.createElement('input');
  input.value = text; // 设置要复制的文本
  // 将输入框添加到页面中
  document.body.appendChild(input);
  // 选中输入框中的文本
  input.select();
  // 执行复制操作
  document.execCommand('copy');
  // 移除临时创建的输入框
  document.body.removeChild(input);
};
// ProTable 实例
const proTable = ref();

// 删除用户信息
const deleteAccount = async params => {
  await useHandleData(
    removeAssess,
    { ids: [params.schemeId] },
    `删除方案名称为【${params.schemeName}】的数据项`
  );
  proTable.value?.getTableList();
};

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref(null);
const editRef = ref(null);
const settingRef = ref(null);
const openProForm = (title, row = {}) => {
  const params = {
    title,
    isView: title === '查看',
    row: { ...row },
    api:
      title === '新增' ? addAssess : title === '编辑' ? editAssess : undefined,
    getTableList: proTable.value?.getTableList
  };
  // drawerRef.value?.acceptParams(params);
  editRef.value?.acceptParams(params);
};
const setProForm = (title, row = {}) => {
  const params = {
    title,
    isView: false,
    row: { ...row },
    api: setConfigAssess,
    getTableList: proTable.value?.getTableList
  };
  settingRef.value?.acceptParams(params);
};
</script>
