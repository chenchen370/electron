<template>
  <el-dialog :title="`${proFormProps.title}`" v-model="proFormVisible" width="1128px" @close="close" align-center
    :show-close="false">
    <div class="mn-container">
      <el-form ref="formRef" :model="form" :disabled="proFormProps.isView" :rules="rules" label-position="left"
        size="large">
        <el-row :gutter="50">
          <!-- <el-col :span="8" v-if="form.schemeId">
            <el-form-item label="编号" prop="schemeId" class="td-flex column">
              <div class="td-flex full-width items-baseline">
                <el-input v-model="form.schemeId" placeholder="" disabled>
                </el-input>
              </div>
            </el-form-item>
          </el-col> -->
          <el-col :span="8">
            <el-form-item label="方案名称" prop="schemeName" class="td-flex column">
              <el-input v-model="form.schemeName" placeholder="" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="监测类型" prop="monitorType" class="td-flex column">
              <el-select v-model="form.monitorType" placeholder="请选择">
                <el-option v-for="item in monitor_type" :key="item.value" :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="适用环境" prop="suitableEnvironment" class="td-flex column">
              <el-select v-model="form.suitableEnvironment" placeholder="请选择">
                <el-option v-for="item in suitable_environment" :key="item.value" :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="suitableCpTextureDic" label="适用藏品质地" class="td-flex column">
              <cusSelectTree :readOnly="proFormProps.title === '查看'" :modelValue="form.suitableCpTextureDic"
                @update="getCpTexture"></cusSelectTree>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="schemeStatus" label="方案状态" class="td-flex column">
              <el-select v-model="form.schemeStatus" placeholder="请选择">
                <el-option v-for="item in scheme_status" :key="item.value" :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="警报规则">
              <div class="m-btn_add td-flex items-center td-pointer" @click="onRuleAdd(editableTabsValue, 'add')">
                <div class="td-icon icon-add td-ml8 td-mr8"></div>
                <div class="td-add_txt">添加规则</div>
              </div>
            </el-form-item>
            <div v-if="!proFormProps.isView" class="full-width">
              <el-tabs type="border-card" class="demo-tabs" closable v-model="editableTabsValue"
                @tab-remove="removeTab">
                <el-tab-pane v-for="(item, index) in form.ruleList" :key="index" :label="item.ruleName"
                  :name="item.name">
                  <el-form ref="ruleFormRef" :model="item" :rules="ruleFormRules" label-width="120px"
                    label-position="right">
                    <el-form-item label="规则名称" prop="ruleName" style="margin-bottom: 18px">
                      <el-input v-model="item.ruleName" placeholder="" />
                    </el-form-item>
                    <el-form-item label="适用时间设置" prop="suitableTimeFlag" style="margin-bottom: 18px">
                      <div class="td-flex">
                        <div class="td-flex">
                          <el-radio v-model="item.suitableTimeFlag" label="1">全年</el-radio>
                          <el-radio v-model="item.suitableTimeFlag" label="0">自定义</el-radio>
                        </div>
                        <div v-if="item.suitableTimeFlag != 1" class="td-flex items-end td-pl18">
                          <el-date-picker v-model="item.suitableDateArea" value-format="MMDD" type="daterange"
                            range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期"
                            :disabled-date="disabledDate" style="width: 270px"></el-date-picker>
                          <el-select v-model="item.suitableCycle" placeholder="请选择" class="td-ml10" style="width: 80px">
                            <el-option v-for="item in suitable_cycle" :key="item.value" :label="item.label"
                              :value="item.value"></el-option>
                          </el-select>
                          <el-time-picker class="td-ml10" style="width: 280px" v-model="item.suitableTimeArea"
                            value-format="HHmm" is-range />
                        </div>
                      </div>
                    </el-form-item>
                    <!-- <el-form-item label="0分阈值" prop="zeroThreshold" style="margin-bottom: 18px">
                      <div class="td-flex">
                        <div class="td-mr20">T≥</div>
                        <el-input v-model="item.zeroThreshold1" placeholder="" type="number" />
                        <div class="td-ml20 td-mr20">T≤</div>
                        <el-input v-model="item.zeroThreshold2" placeholder="" type="number" />
                      </div>
                    </el-form-item> -->
                    <el-form-item label="适用规则设置" style="margin-bottom: 18px">
                      <el-table class="td-mt10" :data="item.ruleExprArray" border>
                        <el-table-column label="警报状态" prop="expr1" show-overflow-tooltip>
                          <template #default="{ row, $index }">
                            <el-form-item :prop="`ruleExprArray.${$index}.expr1`" :rules="[
                              {
                                required: true,
                                message: '请选择',
                                trigger: 'change'
                              }
                              // {
                              //   required: true,
                              //   validator: (rule, value, callback, type) =>{
                              //     console.log('validator')
                              //     // costValidator(
                              //     //   rule,
                              //     //   value,
                              //     //   callback,
                              //     //   row.expr1
                              //     // )
                              //   }
                              // }
                            ]">
                              <el-select v-model="row.expr1" placeholder="">
                                <el-option v-for="item in warning_status" :key="item.value" :label="item.label"
                                  :value="item.value"></el-option>
                              </el-select>
                            </el-form-item>
                          </template>
                        </el-table-column>
                        <el-table-column label="阚值下限" prop="expr2" show-overflow-tooltip>
                          <template #default="{ row }">
                            <el-input v-model="row.expr2" placeholder="" type="number" />
                          </template>
                        </el-table-column>
                        <el-table-column label="运算符" prop="expr3" show-overflow-tooltip>
                          <template #default="{ row }">
                            <el-select v-model="row.expr3" placeholder="请选择">
                              <el-option v-for="item in operator" :key="item.value" :label="item.label"
                                :value="item.value"></el-option>
                            </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column label="指标类型" prop="expr4" show-overflow-tooltip>
                          <template #default="{ row, $index }">
                            <el-form-item :prop="`ruleExprArray.${$index}.expr4`" :rules="[
                              {
                                required: true,
                                message: '请选择',
                                trigger: 'change'
                              }
                            ]">
                              <el-select v-model="row.expr4" placeholder="请选择">
                                <el-option v-for="item in indicator_type" :key="item.value" :label="item.label"
                                  :value="item.value"></el-option>
                              </el-select>
                            </el-form-item>
                          </template>
                        </el-table-column>
                        <el-table-column label="运算符" prop="expr5" show-overflow-tooltip>
                          <template #default="{ row }">
                            <el-select v-model="row.expr5" placeholder="请选择">
                              <el-option v-for="item in operatorG" :key="item.value" :label="item.label"
                                :value="item.value"></el-option>
                            </el-select>
                          </template>
                        </el-table-column>
                        <el-table-column label="阚值上限" prop="expr6" show-overflow-tooltip>
                          <template #default="{ row }">
                            <el-input v-model="row.expr6" placeholder="" type="number" />
                          </template>
                        </el-table-column>
                        <el-table-column label="操作">
                          <template #default="{ row, $index }">
                            <el-button type="text" @click="onDelete(item.ruleExprArray, $index)">
                              删除
                            </el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                      <div class="m-add_row td-flex center" @click="onAdd(item.ruleExprArray)">
                        <el-icon>
                          <CirclePlus />
                        </el-icon>
                        <span class="td-ml10">添加规则设置</span>
                      </div>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
              </el-tabs>
            </div>
            <el-table class="td-mt20" :data="ruleList" lazy stripe v-else>
              <el-table-column label="序号" type="index" width="70" />
              <el-table-column label="规则名称" prop="ruleName" show-overflow-tooltip>
                <template #default="{ row }">
                  <div>{{ row.ruleName }}</div>
                </template>
              </el-table-column>
              <el-table-column label="适用时间" prop="suitableDateArea" show-overflow-tooltip>
                <template #default="{ row }">
                  {{ suitableDateFormat(row) }}
                </template>
              </el-table-column>
              <el-table-column label="适用规则详情" prop="ruleExprArray" show-overflow-tooltip>
                <template #default="{ row }">
                  <!-- {{ ruleExprFormat(row) }} -->
                  <div class="text-left" v-html="ruleExprFormat(row)"></div>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-form>
      <div class="td-flex center td-mt40">
        <el-button class="button-c-sure" v-show="!proFormProps.isView" type="primary"
          @click="handleSubmit">确定</el-button>
        <!-- <div class="i-button_cancel td-ml10" @click="close">取消</div> -->
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { reactive } from 'vue';
import { ElMessage } from 'element-plus';
const { proxy } = getCurrentInstance();
const {
  monitor_type,
  suitable_environment,
  scheme_status,
  suitable_cycle,
  warning_status,
  indicator_type
} = proxy.useDict(
  'monitor_type',
  'suitable_environment',
  'scheme_status',
  'suitable_cycle',
  'warning_status',
  'indicator_type'
);
import cusSelectTree from '@/views/artifact/displayCabinet/cusSelectTree';
const proFormVisible = ref(false);
const formRef = ref(null);
const ruleFormRef = ref(null);
const ruleList = reactive([]);

const form = ref({
  schemeId: '',
  schemeName: '',
  schemeStatus: '',
  suitableCpTextureDic: '',
  suitableCpTexture: '',
  suitableEnvironment: '',
  startDate: '',
  endDate: '',
  monitorType: '',
  ruleList: [
    {
      ruleId: '',
      name: '1',
      schemeId: '',
      ruleExpression: '',
      ruleName: '',
      suitableCycle: '1',
      suitableDateArea: '',
      suitableTimeArea: '',
      suitableTimeFlag: '1',
      zeroThreshold: '',
      zeroThreshold1: '',
      zeroThreshold2: '',
      ruleExprArray: []
    }
  ]
});

const ruleFormRules = reactive({
  ruleName: [{ required: true, trigger: 'blur', message: '请输入' }]
});
const rules = reactive({
  schemeName: [{ required: true, trigger: 'blur', message: '请输入' }]
});

const proFormProps = ref({
  isView: false,
  title: '',
  row: {}
});
const operator = ref([
  { label: '<', value: '<' },
  { label: '<=', value: '<=' }
]);
const operatorG = ref([
  { label: '<', value: '<' },
  { label: '<=', value: '<=' }
]);
// 获取当前年份
const currentYear = new Date().getFullYear();
const disabledDate = time => {
  // 获取本年的开始和结束日期
  // 判断当前日期是否在本年范围之外
  // return (
  //   date.getTime() < new Date(new Date().getFullYear(), 0, 1).getTime() ||
  //   date.getTime() > new Date(new Date().getFullYear(), 11, 31).getTime()
  // );
  if (!time) {
    return false;
  }
  const year = time.getFullYear();
  // 如果不是当前年份，则禁用
  return year !== currentYear;
};
let tabIndex = 1;
const editableTabsValue = ref('1');
const getCpTexture = v => {
  form.value.suitableCpTextureDic = v.label;
  form.value.suitableCpTexture = v.value;
};
// 添加警报规则
const onRuleAdd = (targetName, action) => {
  if (action === 'add') {
    const newTabName = `${++tabIndex}`;
    form.value.ruleList.push({
      ruleId: '',
      name: newTabName,
      schemeId: '',
      ruleExpression: '',
      ruleName: '',
      suitableCycle: '1',
      suitableDateArea: '',
      suitableTimeArea: '',
      suitableTimeFlag: '1',
      zeroThreshold: '',
      zeroThreshold1: '',
      zeroThreshold2: '',
      ruleExprArray: []
    });
    editableTabsValue.value = newTabName;
  } else if (action === 'remove') {
    const tabs = form.value.ruleList;
    let activeName = editableTabsValue.value;
    if (activeName === targetName) {
      tabs.forEach((tab, index) => {
        if (tab.name === targetName) {
          const nextTab = tabs[index + 1] || tabs[index - 1];
          if (nextTab) {
            activeName = nextTab.name;
          }
        }
      });
    }
    editableTabsValue.value = activeName;
    form.value.ruleList = tabs.filter(tab => tab.name !== targetName);
  }
};
const removeTab = (targetName) => {
  const tabs = form.value.ruleList;
  let activeName = editableTabsValue.value;
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1];
        if (nextTab) {
          activeName = nextTab.name;
        }
      }
    });
  }
  editableTabsValue.value = activeName;
  form.value.ruleList = tabs.filter(tab => tab.name !== targetName);
}

// 添加适用规则
const onAdd = item => {
  console.log('onAdd', item);
  item.push({
    expr1: '',
    expr2: '',
    expr3: '',
    expr4: '',
    expr5: '',
    expr6: ''
  });
};
// 删除适用规则
const onDelete = (item, index) => {
  item.splice(index, 1);
};

const close = () => {
  reset();
  proFormProps.value = {
    isView: false,
    title: '',
    row: {}
  };
  proFormVisible.value = false;
};
const reset = () => {
  form.value = {
    schemeId: '',
    schemeName: '',
    schemeStatus: '',
    suitableCpTextureDic: '',
    suitableCpTexture: '',
    suitableEnvironment: '',
    startDate: '',
    endDate: '',
    monitorType: '',
    ruleList: [
      {
        ruleId: '',
        name: '1',
        schemeId: '',
        ruleExpression: '',
        ruleName: '',
        suitableCycle: '1',
        suitableDateArea: '',
        suitableTimeArea: '',
        suitableTimeFlag: '1',
        zeroThreshold: '',
        zeroThreshold1: '',
        zeroThreshold2: '',
        ruleExprArray: []
      }
    ]
  };
  ruleList.length = 0;
};
const handleSubmit = () => {
  formRef.value.validate(async valid => {
    if (!valid) return;
    let isNext = true;
    form.value.ruleList?.map((k, j) => {
      ruleFormRef.value[j].validate(async validVol => {
        if (!validVol) {
          isNext = false;
        }
      });
    });
    setTimeout(async () => {
      if (isNext) {
        try {
          if (form.value.ruleList.length == 0) {
            ElMessage.warning({ message: '请添加警报规则' });
            return;
          }
          let formVol = JSON.parse(JSON.stringify(form));
          // let ruleLists = ruleList.map(function (obj) {
          // delete obj.isEdit;
          //   if (
          //     obj.expr1 &&
          //     obj.expr2
          //   ) {
          //     return obj
          //   }
          // })
          // console.log(ruleLists);
          // ruleLists = ruleLists.filter(Boolean);

          formVol._value.ruleList?.map(v => {
            let ruleExprArray = [];
            v.zeroThreshold = `T>=${v.zeroThreshold1},T<=${v.zeroThreshold2}`;
            if (v.suitableDateArea) {
              v.suitableDateArea = v.suitableDateArea?.join('-');
            }
            if (v.suitableTimeArea) {
              v.suitableTimeArea = v.suitableTimeArea?.join('-');
            }
            v.ruleExprArray?.map(v => {
              ruleExprArray.push(
                `${v.expr1},${v.expr2 && v.expr3 ? v.expr2 + v.expr3 : ''}${v.expr4
                }${v.expr5 && v.expr6 ? v.expr5 + v.expr6 : ''}`
              );
            });
            v.ruleExprArray = ruleExprArray;
          });

          await proFormProps.value.api(formVol._value);
          ElMessage.success({ message: `${proFormProps.value.title}成功` });
          proFormProps.value.getTableList();
          proFormVisible.value = false;
        } catch (error) {
          console.log(error);
        }
      }
    }, 500);
  });
};

const acceptParams = params => {
  proFormProps.value = params;
  if (params.title == '新增') {
    editableTabsValue.value = '1';
  } else {
    let formVol = JSON.parse(JSON.stringify(params.row));
    form.value = formVol;
    form.value?.['ruleList'].map((v, i) => {
      let ruleExprArray = [];
      if (v.zeroThreshold) {
        let arr = v.zeroThreshold.split(',');
        v.zeroThreshold1 = arr[0].slice(3);
        v.zeroThreshold2 = arr[1].slice(3);
      }
      if (v.suitableDateArea) {
        v.suitableDateArea = v.suitableDateArea.split('-');
      }
      if (v.suitableTimeArea) {
        v.suitableTimeArea = v.suitableTimeArea.split('-');
      }
      v.name = String(i + 1);
      v.ruleExprArray?.map(item => {
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

          // if (v1[1]?.indexOf('<=') > -1) {
          //   v2 = v1[1].split('<=');
          //   expr3 = '<=';
          // } else if (v1[1]?.indexOf('<') > -1) {
          //   v2 = v1[1].split('<');
          //   expr3 = '<';
          // } else {
          //   v2 = ['', v1[1]];
          //   expr3 = '';
          // }
          // if (v2[1]?.indexOf('<=') > -1) {
          //   expr4 = v2[1]?.slice(0, v2[1].indexOf('<='));
          //   expr5 = '<=';
          //   expr6 = v2[1]?.slice(v2[1].indexOf('<=') + 2);
          // } else if (v2[1]?.indexOf('<') > -1) {
          //   expr4 = v2[1]?.slice(0, v2[1].indexOf('<'));
          //   expr5 = '<';
          //   expr6 = v2[1]?.slice(v2[1].indexOf('<') + 1);
          // } else {
          //   expr4 = v2[1];
          //   expr5 = '';
          //   expr6 = '';
          // }
          ruleExprArray.push({
            expr1: v1[0],
            expr2,
            expr3,
            expr4,
            expr5,
            expr6
          });
        } else {
        }
      });
      v.ruleExprArray = ruleExprArray;
    });
    editableTabsValue.value = String(form.value?.['ruleList'].length);
    tabIndex = form.value?.['ruleList'].length;
    ruleList.length = 0;
    ruleList.push(...form.value['ruleList']);
  }
  proFormVisible.value = true;
};

const suitableDateFormat = row => {
  if (row.suitableTimeFlag == '1') {
    return '全年';
  } else {
    let txt1 = '';
    let txt2 = '';
    if (row.suitableDateArea) {
      let txt = row.suitableDateArea?.join('-');
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
      let txt = row.suitableTimeArea?.join('-');
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
const ruleExprFormat = row => {
  let txt1 = '';
  row.ruleExprArray?.map(v => {
    txt1 += `<div>${v.expr1 == 1 ? '警报' : '正常'}：${v.expr2} ${v.expr3} 监测值（T） ${v.expr5} ${v.expr6} </div>`;
  });
  return txt1;
};

defineExpose({
  acceptParams
});
</script>
<style lang="scss" scoped>
.m-add_row {
  width: 100%;
  height: 40px;
  border-radius: 0px 0px 0px 0px;
  border: 1px solid #8CA29D;
  border-top: none;
  font-size: 14px;
  color: #3D3D3D;
  cursor: pointer;
}

.m-box_card {
  background: #F8F9F4;
  border-radius: 2px 2px 2px 2px;
  border: 1px solid #AEC2BD;
  padding: 20px
}

.m-btn_add {
  width: 106px;
  height: 26px;
  border-radius: 2px 2px 2px 2px;
  border: 1px solid #38675C;
  font-size: 14px;
  color: #064235;

  .td-add_txt {
    height: 100%;
    padding-left: 8px;
    border-left: 1px solid #38675C;
    line-height: 26px;
  }
}

:deep(.el-tabs--border-card > .el-tabs__header) {
  background-color: #edf3ea;
}

:deep(.el-tabs--border-card) {
  background-color: #F8F9F4
}

:deep(.el-range-editor.el-input__wrapper) {
  box-shadow: 0 0 0 1px #aec2bd inset;
}
</style>
