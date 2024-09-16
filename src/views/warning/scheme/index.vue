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
      <el-icon size="22" color="#38675C" title="编辑" @click="openProForm('编辑', scope.row)" class="td-mr20 td-pointer">
        <EditPen />
      </el-icon>
      <el-icon size="22" color="#38675C" title="删除" @click="deleteAccount(scope.row)" class="td-mr20 td-pointer">
        <Delete />
      </el-icon>
      <el-icon size="22" color="#38675C" title="查看" @click="openProForm('查看', scope.row)" class="td-pointer">
        <View />
      </el-icon>
    </template>
  </ProTable>

  <edit ref="editRef" />
</template>
<script setup lang="jsx">
import { useHandleData } from '@/components/ProTable/hooks';
import {
  getSchemeList,
  addScheme,
  editScheme,
  removeScheme
} from '@/api/warning/scheme';
import Edit from './edit';
import cusSelectTree from '@/views/artifact/displayCabinet/cusSelectTree';

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
  // {
  //   label: '编号',
  //   prop: 'schemeId',
  //   minWidth: 100,
  //   form: {
  //     el: 'text'
  //   }
  // },
  {
    label: '方案名称',
    prop: 'schemeName',
    minWidth: 180,
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
    minWidth: 130,
    form: {
      el: 'select',
      defaultValue: ''
    },
    search: { el: 'select', props: {} },
    enum: suitable_environment
  },
  {
    label: '适用藏品质地',
    prop: 'suitableCpTexture',
    minWidth: 130,
    form: {
      el: 'select',
      defaultValue: ''
    },
    // search: { el: 'select', props: {} },
    // enum: suitable_cp_texture,
    search: {
      el: 'select',
      props: {},
      render: (props, { emit }) => {
        return (
          <>
            <cusSelectTree
              modelValue={props.modelValue ? props.modelValue : ''}
              onUpdate:modelLabel={value => {
                emit('update:modelValue', value);
              }}
            />
            {/* <cusSelectTree
              modelValue={props.modelValue ? props.modelValue : ''}
              updateParent:modelValue={value => {
                debugger
                emit('updateValue:modelValue', value);
              }}
            /> */}
          </>
        );
      }
    },
    render: props => {
      return <div>{props.row.suitableCpTextureDic}</div>;
    }
  },
  {
    label: '警报规则',
    prop: 'ruleList',
    width: 350,
    align: 'left',
    form: {
      el: 'text'
    },
    render: props => {
      let txt = props.row?.ruleList?.map(v => {
        return (
          <>
            <div class={'text-left'}>{v.ruleName + '  (' + suitableDateFormat(v) + ')'}</div>
            <div class={'text-left'}>{ruleExprFormat(v).map(ite => {
              return <div> {`${ite.expr1 == 1 ? ' 警报 ' : ' 正常 '}：${ite.expr2} ${ite.expr3} ${ite.expr4} ${ite.expr5} ${ite.expr6} `}</div>
            })}
            </div>
          </>
        );
      });
      return <><div style="width:100%; overflow: auto">{txt}</div></>;
    }
  },
  {
    label: '状态',
    prop: 'schemeStatus',
    minWidth: 100,
    form: {
      el: 'select',
      defaultValue: ''
    },
    search: { el: 'select', props: {} },
    enum: scheme_status
  },

  { prop: 'operation', width: 180, label: '操作', fixed: 'right' }
]);
const selectionArr = ref([]);
const doSelectionChange = params => {
  selectionArr.value = params
};
const getTableList = params => {
  selectionArr.value = []
  proTable.value?.clearSelection()
  
  let newParams = JSON.parse(JSON.stringify(params));
  return getSchemeList(newParams);
};

const ruleExprFormat = row => {
  let txt1 = '';
  let ruleExprArray = [];
  row.ruleExprArray?.map(item => {
    if (typeof item == 'string') {
      let v1 = item.split(',');
      let v2 = [];
      let v3 = [];
      let expr2 = '';
      let expr3 = '';
      let expr4 = '';
      let expr5 = '';
      let expr6 = '';
      v2 = v1[1].split('<=');
      if (v2.length == 3) {
        expr2 = v2[0];
        expr3 = '<=';
        expr4 = v2[1];
        expr5 = '<=';
        expr6 = v2[2];
      } else if (v2.length == 2) {
        if (v2[0]?.indexOf('<') > -1) {
          let val = v2[0].split('<');
          expr2 = val[0];
          expr3 = '<';
          expr4 = val[1];
          expr5 = '<=';
          expr6 = v2[1];
        } else if (v2[1]?.indexOf('<') > -1) {
          let val = v2[1].split('<');
          expr2 = v2[0];
          expr3 = '<=';
          expr4 = val[0];
          expr5 = '<';
          expr6 = val[1];
        } else {
          if (String(Number(v2[0])) === 'NaN') {
            expr2 = v2[1];
            expr3 = '<=';
            expr4 = v2[0];
          } else {
            expr4 = v2[0];
            expr5 = '<=';
            expr6 = v2[1];
          }
        }
      } else {
        let val = v1[1].split('<');
        if (val.length == 3) {
          expr2 = val[0];
          expr3 = '<';
          expr4 = val[1];
          expr5 = '<';
          expr6 = val[2];
        } else {
          if (String(Number(val[0])) === 'NaN') {
            expr4 = val[0];
            expr5 = '<';
            expr6 = val[1];
          } else {
            expr2 = val[0];
            expr3 = '<';
            expr4 = val[1];
          }
        }
      }

      ruleExprArray.push({
        expr1: v1[0],
        expr2,
        expr3,
        expr4: '监测值（T）',
        expr5,
        expr6
      });
    } else {
    }
  });

  // ruleExprArray?.map(v => {
  //   txt1 += `${v.expr1 == 1 ? ' 警报 ' : ' 正常 '}：${v.expr2} ${v.expr3} ${
  //     v.expr4
  //   } ${v.expr5} ${v.expr6} `;
  // });
  // return txt1;
  return ruleExprArray;
};
const suitableDateFormat = row => {
  if (row.suitableTimeFlag == '1') {
    return '全年';
  } else {
    let txt1 = '';
    let txt2 = '';
    if (row.suitableDateArea) {
      let txt = row.suitableDateArea
      txt1 =
        txt.slice(0, 2) +
        '月' +
        txt.slice(2, 4) +
        '日-' +
        txt.slice(5, 7) +
        '月' +
        txt.slice(7, 9) +
        '日';
    }
    if (row.suitableTimeArea) {
      let txt = row.suitableTimeArea
      txt2 =
        txt.slice(0, 2) +
        ':' +
        txt.slice(2, 4) +
        '-' +
        txt.slice(5, 7) +
        ':' +
        txt.slice(7, 9);
    }
    return `${txt1 ? txt1 + ',' : ''}${row.suitableCycle == '1' ? '每天' : row.suitableCycle
      }${txt2 ? ',' + txt2 : ''}`;
  }
};
const setWarningRules = (row = []) => {
  let txt = '';
  row?.map(v => {
    txt += v.ruleName + ' ' + suitableDateFormat(v) + ' ' + ruleExprFormat(v);
  });
  return txt;
};
// ProTable 实例
const proTable = ref();

// 删除用户信息
const deleteAccount = async params => {
  await useHandleData(
    removeScheme,
    { ids: [params.schemeId] },
    `删除编号为【${params.schemeId}】的数据项`
  );
  proTable.value?.getTableList();
};

const editRef = ref(null);
const openProForm = (title, row = {}) => {
  const params = {
    title,
    isView: title === '查看',
    row: { ...row },
    api:
      title === '新增' ? addScheme : title === '编辑' ? editScheme : undefined,
    getTableList: proTable.value?.getTableList
  };
  editRef.value?.acceptParams(params);
};
</script>
