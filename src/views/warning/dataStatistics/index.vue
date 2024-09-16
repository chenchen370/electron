<template>
  <el-row :gutter="15" class="td-mb10">
    <el-col :span="7">
      <div class="m-box_item box1">
        <!-- <div class="td-mb6">区域总数：{{ monitorArea.count }}</div>
        <div class="td-mb6">已监测区域：{{ warehouse.count }}</div> -->
        <div class="td-flex justify-between">
          <div>
            <div class="td-mb24">展厅总数：<span class="td-font-26">{{ warehouse.exhibitionHallCount }}</span></div>
            <div>已监测：{{ monitorArea.monitorHallCount }}</div>
          </div>
          <div>
            <div class="td-mb24">库房总数：<span class="td-font-26">{{ warehouse.warehouseCount }}</span></div>
            <div>已监测：{{ monitorArea.monitorHouseCount }}</div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="7">
      <div class="m-box_item box2">
        <div class="td-mb24">监测点总数：<span class="td-font-26">{{ monitorPoint.count }}</span></div>
        <div class="td-flex justify-between">
          <div>
            <div class="td-mb8">展厅 小环境：{{ monitorPoint.hallSmallEnvirCount }}</div>
            <div>库房 小环境：{{ monitorPoint.houseSmallEnvirCount }}</div>
          </div>
          <div>
            <div class="td-mb8">展柜 微环境：{{ monitorPoint.displayCabinetMicroEnvirCount }}</div>
            <div>储藏柜 微环境：{{ monitorPoint.cabinetMicroEnvirCount }}</div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="10">
      <div class="m-box_item box3">
        <div class="td-flex td-mb24 items-baseline">
          <div>设备总数：<span class="td-font-26">{{ device.count }}</span></div>
          <div class="td-ml30">
            设备状态
            <span class="monitor-theme_1 td-ml36">正常：{{ device.normalCount }}</span>
            <span class="monitor-theme_2 td-ml16">异常：{{ device.exceptionCount }}</span>
          </div>
        </div>
        <div class="td-flex justify-between">
          <div>
            <div class="td-mb6">展厅：
              <span class="monitor-theme_1">正常：{{ device.hallNormalCount }}</span>
              <span class="monitor-theme_2 td-ml14">异常：{{ device.hallExceptionCount }}</span>
            </div>
            <div class="td-mb6">展柜：
              <span class="monitor-theme_1">正常：{{ device.displayNormalCount }}</span>
              <span class="monitor-theme_2 td-ml14">异常：{{ device.displayExceptionCount }}</span>
            </div>
          </div>
          <div>
            <div class="td-mb6">库房：
              <span class="monitor-theme_1">正常：{{ device.houseNormalCount }}</span>
              <span class="monitor-theme_2 td-ml14">异常：{{ device.houseExceptionCount }}</span>
            </div>
            <div>储藏柜：
              <span class="monitor-theme_1">正常：{{ device.cabinetNormalCount }}</span>
              <span class="monitor-theme_2 td-ml14">异常：{{ device.cabinetExceptionCount }}</span>
            </div>
          </div>
        </div>

      </div>
    </el-col>
  </el-row>
  <div class="td-box_yj td-flex items-center">
    <div class="td-mr60">警报状态</div>
    <div class="td-mr32" style="color: #0F9E4A;">正常：{{ warningStatus.normalCount }}</div>
    <div class="td-mr32" style="color: #FF0000;">报警：{{ warningStatus.warningCount }}</div>
    <div class="td-mr32" style="color: #FF6000;">预警：{{ warningStatus.preWarningCount }}</div>
    <div style="color: #6A7371;">数据丢失：{{ warningStatus.dataLossCount }}</div>
  </div>
  <ProTable ref="proTable" :request-api="getTableList" :columns="columns">
    <template #operation="scope">
      <!-- <el-button type="primary" link @click="openHisForm('实时监测数据', scope.row)">实时监测数据</el-button> -->
      <div class="td-icon icon-ctrl_list td-pointer" title="实时监测数据" @click="openHisForm('实时监测数据', scope.row)"></div>
    </template>
  </ProTable>

  <edit ref="editRef" />
</template>
<script setup lang="jsx">
import { useHandleData } from '@/components/ProTable/hooks';
import {
  getDataStatisticsForm,
  getDataStatisticsCabinet,
  getDataStatisticsDevice,
  getDataStatisticsMonitorPoint,
  getDataStatisticsWarehouse,
  getDataStatisticsMonitorArea,
  getDataStatisticsStatus
} from '@/api/warning/dataStatistics';
import Edit from './edit';

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
    label: '区域名称',
    prop: 'houseName',
    minWidth: 160,
    form: {
      el: 'text'
    }
  },
  {
    label: '区域类型',
    prop: 'isShow',
    minWidth: 160,
    render: props => {
      return <>{props.row.isShow == 1 ? '展厅' : '库房'}</>;
    }
  },
  {
    label: '监测类型',
    prop: 'monitorType',
    width: 160,
    render: props => {
      return <>
        <div class={'full-width break-spaces'}>
          {props.row.monitorType?.split(',').indexOf('1') > -1 ? '温度、' : ''}
          {props.row.monitorType?.split(',').indexOf('2') > -1 ? '湿度、' : ''}
          {props.row.monitorType?.split(',').indexOf('3') > -1 ? 'co2、' : ''}
          {props.row.monitorType?.split(',').indexOf('4') > -1 ? 'VOC、' : ''}
          {props.row.monitorType?.split(',').indexOf('5') > -1 ? '光照、' : ''}
          {props.row.monitorType?.split(',').indexOf('6') > -1 ? '紫外线' : ''}
        </div>
      </>
    }
  },
  {
    label: '警报状态',
    prop: 'warningStatusStastics',
    width: 200,
    render: props => {
      let txt = props.row.warningStatusStastics.map(v => {
        return <>
          <div class={'td-mr10 monitor-theme_' + v.warningStatus}>
            {v.warningStatusDic}：{v.warningStatusCount}
          </div>
        </>
      })
      return <><div class={'td-flex justify-center wrap'}>{txt}</div></>
    }
  },
  {
    label: '监测点总数',
    prop: 'pointCount',
    minWidth: 160,
    render: props => {
      return <>{props.row.pointTypeStastics?.pointCount}</>;
    }
  },
  {
    label: '小环境监测点',
    prop: 'pointTypeStastics',
    minWidth: 160,
    render: props => {
      return <>{props.row.pointTypeStastics?.smallEnvirPointCount}</>;
    }
  },
  {
    label: '微环境监测点',
    prop: 'pointTypeStastics',
    minWidth: 160,
    render: props => {
      return <>{props.row.pointTypeStastics?.microEnvirPointCount}</>;
    }
  },
  {
    label: '展柜/储藏柜总数 \n 已监测，未监测',
    prop: 'cabinetMonitorStastics',
    minWidth: 160,
    width: 160,
    render: props => {
      return (
        <>
          <div>{props.row.cabinetMonitorStastics?.cabinetCount}</div>
          <div>
            （{props.row.cabinetMonitorStastics?.monitorCabinetCount}{' '}，
            {props.row.cabinetMonitorStastics?.noMonitorCabinetCount}）
          </div>
        </>
      );
    }
  },
  {
    label: '设备总数 \n 正常，异常',
    prop: 'deviceRunStatusStastics',
    width: 200,
    render: props => {
      return (
        <>
          <div>{props.row.deviceRunStatusStastics?.deviceCount}</div>
          <div>
            （{props.row.deviceRunStatusStastics?.normalDeviceCount}{' '}，
            <span class="monitor-theme_2">{props.row.deviceRunStatusStastics?.exceptionDeviceCount}</span>
            ）
          </div>
        </>
      );
    }
  },

  { prop: 'operation', width: 180, label: '操作', fixed: 'right' }
]);
const cabinet = ref({});
const device = ref({});
const monitorPoint = ref({});
const warehouse = ref({});
const warningStatus = ref({});
const monitorArea = ref({});
const getTableList = params => {
  let newParams = JSON.parse(JSON.stringify(params));
  getDataStatisticsMonitorArea().then(res => {
    monitorArea.value = res.data;
  });
  getDataStatisticsCabinet().then(res => {
    cabinet.value = res.data;
  });
  getDataStatisticsDevice().then(res => {
    device.value = res.data;
  });
  getDataStatisticsMonitorPoint().then(res => {
    monitorPoint.value = res.data;
  });
  getDataStatisticsWarehouse().then(res => {
    warehouse.value = res.data;
  });
  getDataStatisticsStatus().then(res => {
    warningStatus.value = res.data;
  });
  return getDataStatisticsForm(newParams);
};

// ProTable 实例
const proTable = ref();

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
</script>
<style scoped lang="scss">
.m-box_item {
  padding: 14px 16px;
  height: 100%;
  min-height: 148px;
  border-radius: 6px;
  box-sizing: border-box;
  // font-weight: 600;
  color: #064235;

  &.box1 {
    border: 1px solid #AEC2BD;
    background: #F2FBF4;
  }

  &.box2 {
    background: #F5FBFF;
    border: 1px solid #D1DCEB;
  }

  &.box3 {
    background: #FFFCEE;
    border: 1px solid #E1DAC0;
  }
}

.td-box_yj {
  width: 100%;
  height: 56px;
  border-radius: 6px;
  background: #FFF5F6;
  box-sizing: border-box;
  border: 1px solid #EBD1D1;
  padding: 13px 35px
}

:deep(.el-pagination) {
  display: none !important;
}
</style>
