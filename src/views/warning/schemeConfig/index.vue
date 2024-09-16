<template>
  <!-- <el-radio-group v-model="type" class="td-mb10" @change="typeChange">
    <el-radio-button label="1">展厅</el-radio-button>/>
    <el-radio-button label="2">展柜</el-radio-button> />
    <el-radio-button label="3">库房</el-radio-button> />
    <el-radio-button label="4">储藏柜</el-radio-button> />
  </el-radio-group> -->
  <el-tabs v-model="type" @tabChange="typeChange">
    <el-tab-pane label="展厅" name="1">展厅</el-tab-pane>
    <el-tab-pane label="展柜" name="2">展柜</el-tab-pane>
    <el-tab-pane label="库房" name="3">库房</el-tab-pane>
    <el-tab-pane label="储藏柜" name="4">储藏柜</el-tab-pane>
  </el-tabs>
  <ProTable ref="proTable" :request-api="getTableList" :noHasTab="false" :columns="columns" v-if="type == 1 || type == 3"
    @selection-change="handleSelectionChange">
    <template #action="scope">
      <el-button type="primary" @click="doAutoConfig" plain icon="Connection">自动配置</el-button>
    </template>
    <template #operation="scope">
      <div class="td-icon icon-set td-pointer" title="预警方案配置" @click="openProForm('预警方案配置', scope.row)"></div>
    </template>
  </ProTable>
  <ProTable ref="proTable" :request-api="getTableList" :columns="columnsG" @selection-change="handleSelectionChange"
    v-else>
    <template #action="scope">
      <el-button type="primary" @click="doAutoConfig" plain>自动配置</el-button>
    </template>
    <!-- 表格操作 -->
    <template #operation="scope">
      <div class="td-icon icon-set td-pointer" title="预警方案配置" @click="openProForm('预警方案配置', scope.row)"></div>
    </template>
  </ProTable>

  <edit ref="editRef" />
</template>
<script setup lang="jsx">
import { useHandleData } from '@/components/ProTable/hooks';
import {
  getSchemeConfigList,
  setAutoConfig,
  setSchemeConfig
} from '@/api/warning/schemeConfig';
import { reactive, ref } from 'vue';
import Edit from './edit';
import { ElMessage } from 'element-plus';
const { proxy } = getCurrentInstance();
const {
  monitor_type,
} = proxy.useDict(
  'monitor_type',
);
const type = ref('1');
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
    prop: 'houseId',
    minWidth: 130,
    form: {
      el: 'text'
    },
    search: { el: 'text', props: {} }
  },
  {
    label: '名称',
    prop: 'houseName',
    minWidth: 180,
    form: {
      el: 'text'
    }
  },
  {
    label: '所在区域',
    prop: 'houseAddrDic',
    width: 120,
    form: {
      el: 'text'
    }
  },
  {
    label: '监测点位置描述',
    prop: 'houseAddrDetail',
    width: 200,
    form: {
      el: 'text'
    }
  },
  {
    label: '监测类型',
    prop: 'monitorType',
    width: 120,
    form: {
      el: 'select',
      defaultValue: ''
    },
    enum: monitor_type
  },
  {
    label: '配置状态',
    prop: 'configStatus',
    width: 120,
    form: {
      el: 'select',
      defaultValue: ''
    },
    search: { el: 'select', props: {} },
    enum: [
      { label: '配置', value: '1' },
      { label: '未配置', value: '0' }
    ]
  },
  {
    label: '警报方案名称',
    prop: 'warningRules',
    width: 220,
    render: props => {
      let txt = props.row?.warningRules?.map(v => {
        return (
          <>
            <div>{v.ruleName}</div>
          </>
        );
      });
      return txt;
    }
  },
  {
    label: '警报规则',
    prop: 'warningRules',
    width: 350,
    align: 'left',
    form: {
      el: 'text'
    },
    render: props => {
      let txt = props.row?.warningRules?.map(v => {
        return (
          <>
            <div class={'text-left'}>{suitableDateFormat(v)}</div>
            {/* <div class={'text-left'}>{ruleExprFormat(v)}</div> */}
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
  { prop: 'operation', width: 180, label: '操作', fixed: 'right' }
]);
const columnsG = reactive([
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
    minWidth: 160,
    form: {
      el: 'text'
    },
    search: { el: 'text', props: {} }
  },
  {
    label: '名称',
    prop: 'cabinetName',
    minWidth: 180,
    form: {
      el: 'text'
    },
    search: { el: 'text', props: {} }
  },
  {
    label: '监测点位置描述',
    prop: 'cabinetAddrDetail',
    width: 200,
    form: {
      el: 'text'
    }
  },
  {
    label: '监测类型',
    prop: 'monitorType',
    width: 120,
    form: {
      el: 'select',
      defaultValue: ''
    },
    enum: monitor_type
  },
  {
    label: '配置状态',
    prop: 'configStatus',
    width: 120,
    form: {
      el: 'select',
      defaultValue: ''
    },
    search: { el: 'select', props: {} },
    enum: [
      { label: '配置', value: '1' },
      { label: '未配置', value: '0' }
    ]
  },
  {
    label: '警报方案名称',
    prop: 'warningRules',
    width: 220,
    render: props => {
      let txt = props.row?.warningRules?.map(v => {
        return (
          <>
            <div>{v.ruleName}</div>
          </>
        );
      });
      return txt;
    }
  },
  {
    label: '警报规则',
    prop: 'warningRules',
    width: 250,
    align: 'left',
    form: {
      el: 'text'
    },
    render: props => {
      let txt = props.row?.warningRules?.map(v => {
        return (
          <>
            <div class={'text-left'}>{v.ruleName + '  (' + suitableDateFormat(v) + ')'}</div>
            {/* <div class={'text-left'}>{ruleExprFormat(v)}</div> */}
            <div class={'text-left'}>{ruleExprFormat(v).map(ite => {
              return <div> {`${ite.expr1 == 1 ? ' 警报 ' : ' 正常 '}：${ite.expr2} ${ite.expr3} ${ite.expr4} ${ite.expr5} ${ite.expr6} `}</div>
            })}
            </div>
          </>
        );
      });
      return txt;
    }
  },
  { prop: 'operation', width: 180, label: '操作', fixed: 'right' }
]);
const selection = ref();
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
        // expr4,
        expr4: '监测值（T）',
        expr5,
        expr6
      });
    } else {
    }
  });

  // ruleExprArray?.map(v => {
  //   txt1 += `${v.expr1 == 1 ? ' 警报 ' : ' 正常 '}：${v.expr2} ${v.expr3} ${v.expr4
  //     } ${v.expr5} ${v.expr6}`;
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
    txt += v.ruleName + ' ' + suitableDateFormat(v) + ruleExprFormat(v);
  });
  return txt;
};
const handleSelectionChange = v => {
  selection.value = v;
};
const doAutoConfig = v => {
  if (!selection.value) {
    ElMessage.warning({ message: '请选择' });
    return;
  }

  let arr = [];
  selection.value.map(v => {
    arr.push(v.houseId || v.cabinetId);
  });
  setAutoConfig(arr.join(',')).then(res => {
    if (res.code == 200) {
      ElMessage.success({ message: res.msg });
      proTable.value?.getTableList();
    }
  })
};
const typeChange = v => {
  proTable.value?.getTableList();
};
const getTableList = params => {
  let newParams = JSON.parse(JSON.stringify(params));
  newParams.type = type.value;
  return getSchemeConfigList(newParams);
};

// ProTable 实例
const proTable = ref();

// 删除用户信息
const deleteAccount = async params => {
  await useHandleData(
    removeSchemeConfig,
    { ids: [params.dcId] },
    `删除【${params.dcId}】`
  );
  proTable.value?.getTableList();
};

const editRef = ref(null);
const openProForm = (title, row = {}) => {
  const params = {
    title,
    isView: false,
    type: type.value,
    row: { ...row },
    api: setSchemeConfig,
    getTableList: proTable.value?.getTableList
  };
  editRef.value?.acceptParams(params);
};
</script>
<style scoped lang="scss">
:deep(.el-tabs__content) {
  display: none;
}
</style>