<template>
  <ProTable ref="proTable" :request-api="getTableList" :columns="columns" @reset="reset">
    <template #operation="scope">
      <!-- <el-button type="primary" link @click="openProForm('查看', scope.row)"
        >查看</el-button
      >
      <el-button type="primary" link @click="openProForm('编辑', scope.row)"
        >编辑</el-button
      >
      <el-button type="primary" link @click="deleteAccount(scope.row)"
        >删除</el-button
      > -->
      <el-icon size="22" color="#38675C" title="历史数据" @click="openHisForm('历史数据', scope.row)" class="td-pointer">
        <View />
      </el-icon>
    </template>
  </ProTable>
  <ProForm :columns="columns" :searchCol="2" width="80%" ref="drawerRef">
  </ProForm>

  <edit ref="editRef" />
</template>
<script setup lang="jsx">
import { useHandleData } from '@/components/ProTable/hooks';
import {
  getMonitorDataList,
  addMonitorData,
  editMonitorData,
  removeMonitorData,
  getMonitorPointRealTime,
} from '@/api/warning/monitorData';
import Edit from './edit';
import pic from '@/views/warning/monitorPoint/pic';
import cusSelectTree from '@/views/artifact/device/cusSelectTree';
const { proxy } = getCurrentInstance();
const {
  artifact_type,
  warning_status,
  func_type,
  monitor_type,
  warning_location_type,
  point_type
} = proxy.useDict(
  'artifact_type',
  'warning_status',
  'func_type',
  'monitor_type',
  'warning_location_type',
  'point_type'
);
const area_type = [
  {
    label: '展厅',
    value: '1'
  },
  {
    label: '库房',
    value: '2'
  },
  {
    label: '展柜',
    value: '3'
  },
  {
    label: '储藏柜',
    value: '4'
  }
];
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
    label: '监测点位置描述(图)',
    prop: 'pointDesc',
    minWidth: 220,
    search: { el: 'text', props: {}, order: 1 },
    render: props => {
      return (
        <>
          <pic modelValue={props?.row ? props?.row : {}} />
        </>
      );
    }
  },
  {
    label: '文物类别',
    prop: 'artifactType',
    width: 130,
    form: {
      el: 'select',
      defaultValue: ''
    },
    search: { el: 'select', props: {}, order: 9 },
    enum: artifact_type
  },
  {
    label: '监测类型',
    isShow: false,
    prop: 'monitorType',
    search: { el: 'select', props: {}, order: 10 },
    enum: monitor_type
  },
  {
    label: '监测范围',
    isShow: false,
    prop: 'pointType',
    search: { el: 'select', props: {}, order: 3 },
    enum: point_type
  },
  {
    label: '监测区域类型',
    isShow: false,
    prop: 'warningLocationType',
    search: {
      el: 'select',
      props: {},
      order: 2,
      render: (props, { emit }) => {
        return (
          <>
            <cusSelectTree
              modelValue={props.modelValue ? props.modelValue : ''}
              onUpdate:modelValue={value => {
                const arr = value?.split(',')
                if (arr?.[1]) {
                  proTable.value.searchParam.areaId = arr?.[1] || '';
                } else {
                  proTable.value.searchParam.areaId = arr?.[0] || '';
                }
                emit('update:modelValue', value);
              }}
            />
          </>
        );
      }
    }
  },
  {
    label: '展柜/储藏柜功能类型',
    isShow: false,
    prop: 'funcType',
    search: { el: 'select', props: {} },
    enum: func_type
  },
  {
    label: '警报状态',
    prop: 'warningStatus',
    width: 130,
    form: {
      el: 'select',
      defaultValue: ''
    },
    search: { el: 'select', props: {} },
    enum: warning_status,
    render: props => {
      return (
        <>
          <div class={'monitor-theme_' + props.row.warningStatus}>
            {props.row.warningStatusDic}
          </div>
        </>
      );
    }
  },
  {
    label: '温度',
    width: 120,
    prop: 'temperature',
    render: props => {
      return (
        <>
          <div
            class={monitorStyle(props.row, '1', props.row.temperature)}
          >
            <div>
              {checkMissData(props.row, '1', props.row.temperature) ? '数据丢失' : props.row.temperature}
            </div>
            <div>
              {checkMissData(props.row, '1', props.row.temperature) ? '' : formatDate(props.row.temperatureTime)}
            </div>
          </div>
        </>
      );
    }
  },
  {
    label: '湿度',
    width: 120,
    prop: 'humidity',
    render: props => {
      return (
        <>
          <div
            class={monitorStyle(props.row, '2', props.row.humidity)}
          >
            <div>
              {checkMissData(props.row, '2', props.row.humidity) ? '数据丢失' : props.row.humidity}
            </div>
            <div>
              {checkMissData(props.row, '2', props.row.humidity) ? '' : formatDate(props.row.humidityTime)}
            </div>
          </div>
        </>
      );
    }
  },
  {
    label: 'CO2(ppm)',
    width: 120,
    prop: 'co2',
    render: props => {
      return (
        <>
          <div
            class={monitorStyle(props.row, '3', props.row.co2)}
          >
            <div>
              {checkMissData(props.row, '3', props.row.co2) ? '数据丢失' : props.row.co2}
            </div>
            <div>
              {checkMissData(props.row, '3', props.row.co2) ? '' : formatDate(props.row.co2Time)}
            </div>
          </div>
        </>
      );
    }
  },
  {
    label: '光照（lx）',
    width: 120,
    prop: 'illumination',
    render: props => {
      return (
        <>
          <div
            class={monitorStyle(props.row, '5', props.row.illumination)}
          >
            <div>
              {checkMissData(props.row, '5', props.row.illumination) ? '数据丢失' : props.row.illumination}
            </div>
            <div>
              {checkMissData(props.row, '5', props.row.illumination) ? '' : formatDate(props.row.illuminationTime)}
            </div>
          </div>
        </>
      );
    }
  },
  {
    label: '紫外线（uW/cm2）',
    prop: 'ultraviolet',
    width: 180,
    render: props => {
      return (
        <>
          <div
            class={monitorStyle(props.row, '6', props.row.ultraviolet)}
          >
            <div>
              {checkMissData(props.row, '6', props.row.ultraviolet) ? '数据丢失' : props.row.ultraviolet}
            </div>
            <div>
              {checkMissData(props.row, '6', props.row.ultraviolet) ? '' : formatDate(props.row.ultravioletTime)}
            </div>
          </div>
        </>
      );
    }
  },
  {
    label: 'VOC(ppm)',
    prop: 'voc',
    width: 130,
    render: props => {
      return (
        <>
          <div
            class={monitorStyle(props.row, '4', props.row.voc)}
          >
            <div>
              {checkMissData(props.row, '4', props.row.voc) ? '数据丢失' : props.row.voc}
            </div>
            <div>
              {checkMissData(props.row, '4', props.row.voc) ? '' : formatDate(props.row.vocTime)}
            </div>
          </div>
        </>
      );
    }
  },
  {
    label: '有机污染物',
    prop: 'ogncContami',
    width: 130,
    form: {
      el: 'text'
    }
  },
  {
    label: '无机污染物',
    prop: 'inogncContami',
    width: 130,
    form: {
      el: 'text'
    }
  },
  {
    label: '含硫污染物',
    prop: 'sulfurContami',
    width: 130,
    form: {
      el: 'text'
    }
  },

  { prop: 'operation', width: 180, label: '操作', fixed: 'right' }
]);

const getTableList = params => {
  let newParams = JSON.parse(JSON.stringify(params));
  return getMonitorPointRealTime(newParams);
};

// ProTable 实例
const proTable = ref();

// 删除用户信息
const deleteAccount = async params => {
  await useHandleData(
    removeMonitorData,
    { ids: [params.monitorDataId] },
    `删除【${params.monitorDataId}】`
  );
  proTable.value?.getTableList();
};
const reset = params => {
  console.log('reset', params);
};
// 打开 drawer(新增、查看、编辑)
const drawerRef = ref(null);
const openProForm = (title, row = {}) => {
  const params = {
    title,
    isView: title === '查看',
    row: { ...row },
    api:
      title === '新增'
        ? addMonitorData
        : title === '编辑'
          ? editMonitorData
          : undefined,
    getTableList: proTable.value?.getTableList
  };
  drawerRef.value?.acceptParams(params);
};

const editRef = ref(null);
const openHisForm = (title, row = {}) => {
  const params = {
    title,
    isView: false,
    row: { ...row },
    api: undefined,
    getTableList: proTable.value?.getTableList
  };
  editRef.value?.acceptParams(params);
};

const monitorStyle = (row, key, row_value) => {
  return checkMissData(row, key, row_value)
    ? 'monitor-theme_3'
    : (row.warningType?.split(',').indexOf(key) > -1
      ? 'monitor-theme_' + row.warningStatus
      : 'monitor-theme_1');
}
const checkMissData = (row, key, row_value) => {
  return row.monitorType?.split(',').indexOf(key) > -1 && !row_value;
}

const monitorValue = (row, key, row_value) => {
  return checkMissData(row, key, row_value) ? '数据丢失' : row_value;
}
const formatDate = (cellValue) => {
  if (cellValue == null || cellValue == '') return '';
  var date = new Date(cellValue);
  var hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
  var minutes =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
  return `(${hours}: ${minutes})`
}
</script>
