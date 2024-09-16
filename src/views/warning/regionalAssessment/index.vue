<template>
  <el-row :gutter="20" class="td-mb10">
    <el-col :span="8">
      <div class="m-box_item box1">
        <div class="td-mb24 td-font-20">综合评估</div>
        <div class="td-flex justify-between td-font-18">
          <div v-for="(item, index) in stasticst"
            :class="{ 'monitor-theme_5': index == 1, 'monitor-theme_2': index == 2, }"> {{ item.dictLabel }}： {{
              item.pointCount }}
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="m-box_item box3">
        <div class="td-mb24 td-font-20">洁净度</div>
        <div class="td-flex justify-between td-font-18">
          <div v-for="(item, index) in cleanlinessStastics"
            :class="{ 'monitor-theme_5': index == 1, 'monitor-theme_2': index == 2, }"> {{ item.dictLabel }}： {{
              item.pointCount }}
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="m-box_item box2">
        <div class="td-mb24 td-font-20">有效稳定性</div>
        <div class="td-flex justify-between td-font-18">
          <div v-for="(item, index) in tabilityStastics"
            :class="{ 'monitor-theme_5': index == 1, 'monitor-theme_2': index == 2, }"> {{ item.dictLabel }}：{{
              item.pointCount }}
          </div>
        </div>
      </div>

    </el-col>
  </el-row>

  <ProTable ref="proTable" :request-api="getTableList" :columns="columns">
    <!-- 表格 header 按钮 -->
    <!-- <template #action="scope">
      <el-button type="primary" @click="openProForm('新增')" plain icon="Plus"
        >新增</el-button
      >
    </template> -->
    <!-- 表格操作 -->
    <template #operation="scope">
      <el-icon size="22" color="#38675C" title="更多数据" @click="openHisForm('更多数据', scope.row)" class="td-pointer">
        <View />
      </el-icon>
    </template>
  </ProTable>
  <ProForm :columns="columns" :searchCol="2" width="80%" ref="drawerRef"></ProForm>

  <edit ref="editRef" />
</template>
<script setup lang="jsx">
import { useHandleData } from '@/components/ProTable/hooks';

import { getAssessResultList, getAssessmentStasticst, getAssessCleanlinessStastics, getAssessTabilityStastics } from '@/api/warning/assess';
import Edit from './edit';
import pic from '@/views/warning/monitorPoint/pic';
const { proxy } = getCurrentInstance();
const { warning_location_type, assessment, cleanliness, stability } = proxy.useDict('warning_location_type', 'assessment', 'cleanliness', 'stability');

const area_type = [
  {
    label: '展厅',
    value: '1'
  },
  {
    label: '库房',
    value: '0'
  },
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
    label: '区域名称',
    prop: 'areaName',
    minWidth: 160,
    form: {
      el: 'text'
    }
  },
  {
    label: '区域类型',
    prop: 'areaType',
    minWidth: 160,
    form: {
      el: 'select',
      defaultValue: ''
    },
    search: { el: 'select', props: {} },
    enum: area_type
  },
  {
    label: '综合评估',
    prop: 'assessment',
    minWidth: 160,
    search: { el: 'select', props: {} },
    form: {
      el: 'select',
      defaultValue: ''
    },
    enum: assessment,
    render: props => {
      return <>
        {props.row?.assessmentDic}
      </>
    }
  },
  {
    label: '洁净度',
    prop: 'cleanliness',
    minWidth: 160,
    search: { el: 'select', props: {} },
    enum: cleanliness,
    form: {
      el: 'select',
      defaultValue: ''
    },
    render: props => {
      return <>
        {props.row?.cleanlinessDic}
      </>
    }
  },
  {
    label: '有效稳定性',
    prop: 'stability',
    minWidth: 160,
    search: { el: 'select', props: {} },
    enum: stability,
    form: {
      el: 'select',
      defaultValue: ''
    },
    render: props => {
      return <>
        {props.row?.stabilityDic}
      </>
    }
  },
  {
    label: '最大风险监测点',
    prop: 'monirorPointName',
    minWidth: 160,
    form: {
      el: 'text'
    },
    render: props => {
      return (
        <>
          <pic modelValue={props?.row ? props?.row : {}} />
        </>
      );
    }

  },
  {
    label: '主要风险因素',
    prop: 'monitorElementJson',
    minWidth: 200,
    // form: {
    //   el: 'text',
    //   render: props => {
    //       return (
    //         <>
    //           <el-input
    //             modelValue={props.modelValue ? props.modelValue : ''}
    //             onUpdate:modelValue={value => {
    //               emit('update:modelValue', value);
    //             }}
    //           ></el-input>
    //         </>
    //       );
    //   }
    // },
    render: props => {
      return <>
        <div>
          {props.row?.monitorElementJson?.temperatureAssess ? '温度 ' + props.row?.monitorElementJson?.temperatureAssess : ' '}
          {props.row?.monitorElementJson?.humidity ? '湿度 ' + props.row?.monitorElementJson?.humidity : ' '}
          {props.row?.monitorElementJson?.co2 ? 'co2 ' + props.row?.monitorElementJson?.co2 : ' '}
          {props.row?.monitorElementJson?.voc ? 'VOC ' + props.row?.monitorElementJson?.voc : ' '}
          {props.row?.monitorElementJson?.illumination ? '光照 ' + props.row?.monitorElementJson?.illumination : ' '}
          {props.row?.monitorElementJson?.ultraviolet ? '紫外线 ' + props.row?.monitorElementJson?.ultraviolet : ' '}
        </div>
      </>
    }
  },

  { prop: 'operation', width: 180, label: '操作', fixed: 'right' }
]);
const stasticst = ref([]);
const cleanlinessStastics = ref([]);
const tabilityStastics = ref([]);
const getTableList = params => {
  let newParams = JSON.parse(JSON.stringify(params));
  getAssessmentStasticst().then(res => {
    stasticst.value = res.rows;
  });
  getAssessCleanlinessStastics().then(res => {
    cleanlinessStastics.value = res.rows;
  });
  getAssessTabilityStastics().then(res => {
    tabilityStastics.value = res.rows;
  });
  return getAssessResultList(newParams);
};

// ProTable 实例
const proTable = ref();

const drawerRef = ref(null);
const openProForm = (title, row = {}) => {
  const params = {
    title,
    isView: title === '更多数据',
    row: { ...row },
    api: undefined,
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
</script>
<style scoped>
.m-box_item {
  padding: 21px 34px;
  height: 100%;
  min-height: 130px;
  border-radius: 6px;
  box-sizing: border-box;
  /* font-weight: 600; */
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
</style>