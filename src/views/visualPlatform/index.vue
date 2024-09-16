<template>
  <div class="page-visualPlatform">
    <div :class="['mn-container', showClass]" id="page-visualPlatform">
      <!-- 头部 -->
      <div class="m-header flex items-center justify-center flex-col">
        <div class="m-title td-mt22">
          <img class="m-logo" src="../.../../../assets/visualPlatform/logo2.png" />
          <img class="m-logo_name td-ml4 td-mt2" src="../.../../../assets/visualPlatform/logoName.png" />
          <!-- 文物预防性保护监测 -->
        </div>
        <div class="m-sub-title truncate">{{ houseName }}</div>
        <!-- <div class="td-flex td-mt22 items-start justify-end">
          <el-select v-model="exhibitionHall" @change="tplSelectChange" size="large" class="m-select"
            placeholder="选择展厅">
            <el-option v-for="item in cabinet_addr" :key="item.houseId" :label="item.houseName"
              :value="item.houseId"></el-option>
          </el-select>
          <div class="td-flex td-mt8">
            <div class="m-user td-mr8 td-mt4 td-ml18">
              {{ state.user.userName }},欢迎您！
            </div>
            <img :src="exit" class="m-exit td-pointer" @click="logout" />
          </div>
        </div> -->
      </div>
      <!-- 内容区 -->
      <div class="mn-main relative flex">
        <!-- 中心  -->
        <div style="width: 900px;height: 600px;position:relative;margin:auto;background-size: contain;
    background-repeat: no-repeat;"
          :style="{ backgroundImage: `url(${getPic(parseImageUrl(cabinetAddrIdx?.houseGraph))})` }" id="pointsBox">
          <div class="point" :class="`point${item.type}`" :style="{ left: item.left + 'px', top: item.top + 'px' }"
            draggable="true" @mousedown.prevent.stop.self="startDragging($event, item)"
            @mousemove.prevent.stop="dragging($event, item)" @mouseup.prevent.stop="stopDragging($event, item)"
            v-for="item, i in pointData">
            <div class="box">
              <div class="flex justify-between my-2">
                <div style="font-size:16px">{{ item.name.substr(0, 8) }}... {{ item.houseId }}</div>
                <a @click.stop="openDialog3(item)" style="color:rgb(50, 134, 244);font-size:18px">更多数据</a>
              </div>
              <div class="flex justify-start items-center my-2">
                <img src="/src/assets/visualPlatform/tu.png" style="width: 40px;height:40px;margin-right:5px;">
                <div>
                  <div>文物名称：{{ item.tbPointRealTimeData ? item.tbPointRealTimeData.wname : '-' }}</div>
                  <div>文物材质：{{ item.tbPointRealTimeData ? item.tbPointRealTimeData.zhi : '-' }}</div>
                </div>
              </div>
              <div class="flex justify-start items-start my-2">
                <div>温度：</div>
                <div>
                  <div>{{ item.tbPointRealTimeData ? item.tbPointRealTimeData.temperature : '-' }} ℃</div>
                  <div style="font-size:14px;color:#666">{{
                    item.tbPointRealTimeData ? item.tbPointRealTimeData.temperatureTime : '-' }}</div>
                </div>
              </div>
              <div class="flex justify-start items-start my-2">
                <div>湿度：</div>
                <div>
                  <div>{{ item.tbPointRealTimeData ? item.tbPointRealTimeData.humidity : '-' }} %</div>
                  <div style="font-size:14px;color:#666">{{
                    item.tbPointRealTimeData ? item.tbPointRealTimeData.humidityTime : '-' }}</div>
                </div>
              </div>
              <div class="flex justify-between my-2">
                <div style="color:rgb(50, 134, 244);">报警时长：{{
                  item.tbPointRealTimeData ? item.tbPointRealTimeData.warningDuration : '-' }}</div>
                <div style="color:rgb(198, 78, 60)">报警次数：{{
                  item.tbPointRealTimeData ? item.tbPointRealTimeData.warningTimes : '-' }}次</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 左侧 -->
        <div class="m-left absolute top-0 left-8">
          <div class="m-box">
            <div class="flex justify-between items-center relative">
              <div class="i-title">藏品管理</div>
            </div>
            <div class="flex justify-between items-center">
              <div class="flex flex-1 justify-between items-center"
                style="background-image:url(/src/assets//visualPlatform/bg1.png);padding:4px;">
                <img class="m-logo" src="../.../../../assets/visualPlatform/logo2.png" />
                <div>
                  <span style="color: #FFD200;">{{ cabinetStatisticsData.count }}</span> 个<br>展柜数量
                </div>
              </div>
              <el-select v-model="select1" @change="tplSelectChange" size="large" class="m-select flex-1 td-ml12"
                placeholder="选择展厅">
                <el-option v-for="item in cabinet_addr" :key="item.houseId" :label="item.houseName"
                  :value="item.houseId"></el-option>
              </el-select>
            </div>
            <div class="relative" style="height: calc(100% - 84px);">
              <div class="circle" style="transform: scale(1) translate(0px, 0px);">
                <span>{{ exhibitionStatistics.total }}</span><br>藏品数量
              </div>
              <div v-for="(item, idx) in exhibitionStatistics.detail" :key="idx">
                <div class="circle" style="transform: scale(0.5) translate(-230px, 150px); background: #ba1a1a;"
                  v-if="idx == 0">
                  <span>{{ item.relicCount }}</span><br>{{ item.relicCategory }}
                </div>
                <div class="circle" style="transform: scale(0.5) translate(-260px, 0px); background: #05c235;"
                  v-if="idx == 1">
                  <span>{{ item.relicCount }}</span><br>{{ item.relicCategory }}
                </div>
                <div class="circle" style="transform: scale(0.5) translate(-230px, -150px); background: #1750a5;"
                  v-if="idx == 2">
                  <span>{{ item.relicCount }}</span><br>{{ item.relicCategory }}
                </div>
                <div class="circle" style="transform: scale(0.5) translate(230px, 150px); background: #ba1a1a;"
                  v-if="idx == 3">
                  <span>{{ item.relicCount }}</span><br>{{ item.relicCategory }}
                </div>
                <div class="circle" style="transform: scale(0.5) translate(260px, 0px); background: #05c235;"
                  v-if="idx == 4">
                  <span>{{ item.relicCount }}</span><br>{{ item.relicCategory }}
                </div>
                <div class="circle" style="transform: scale(0.5) translate(230px, -150px); background: #1750a5;"
                  v-if="idx == 5">
                  <span>{{ item.relicCount }}</span><br>{{ item.relicCategory }}
                </div>
                <div class="circle" style="transform: scale(0.5) translate(-125px, 260px); background: #1750a5;"
                  v-if="idx == 6">
                  <span>{{ item.relicCount }}</span><br>{{ item.relicCategory }}
                </div>
                <div class="circle" style="transform: scale(0.5) translate(120px, 260px); background: #1750a5;"
                  v-if="idx == 7">
                  <span>{{ item.relicCount }}</span><br>{{ item.relicCategory }}
                </div>
              </div>
            </div>
          </div>
          <!--  -->
          <div class="m-box">
            <div class="flex justify-between items-center relative">
              <div class="i-title">展厅环境监测</div>
              <div class="absolute right-0">
                <span class="filter-btn" :class="oneOrSeven == 7 ? 'active' : ''"
                  @click="oneOrSeven = 7; getpointHis(houseId, {});">过去7日</span>
                <span class="filter-btn" :class="oneOrSeven == 1 ? 'active' : ''"
                  @click="oneOrSeven = 1; getpointHis(houseId, {});">今日</span>
              </div>
            </div>
            <el-select v-model="select2" @change="(e) => { getpointHis(houseId, { pointId: e }) }" size="large"
              class="m-select td-mt12 td-mb10" placeholder="选择展厅">
              <el-option v-for="item in monitorPointListData" :key="item.cabinetId" :label="item.pointDesc"
                :value="item.pointId"></el-option>
            </el-select>
            <!-- <div class="td-flex justify-around td-mb30">
              <div class="td-flex column center">
                <div class="i-z_1">{{ monitor.temperature || '-' }}℃</div>
                <div class="i-z_2">空气温度</div>
              </div>
              <div class="td-flex column center">
                <div class="i-z_1">CO2 {{ monitor.co2 }}</div>
                <div class="i-z_2">二氧化碳</div>
              </div>
              <div class="td-flex column center">
                <div class="i-z_1">{{ monitor.humidity || '-' }} %</div>
                <div class="i-z_2">空气湿度</div>
              </div>
            </div> -->
            <div ref="chart" style="height: calc(50% - 75px / 2);" />
            <div ref="chart1" style="height: calc(50% - 75px / 2);" />
          </div>
        </div>
        <!-- 右侧 -->
        <div class="m-right absolute top-0 right-8">
          <div class="m-box">
            <div class="flex justify-between">
              <div class="i-title">预防性保护</div>
            </div>
            <div class="sub-title">监测点评估</div>
            <div class="flex justify-between">
              <div class="online"><b style="color: #7192e0">{{ deviceStatisticsData.onlineCount }}</b><br>在线设备</div>
              <div class="offline"><b style="color: #317f72">{{ deviceStatisticsData.offlineCount }}</b><br>离线设备</div>
            </div>
            <div class="sub-title">监测点预警信息</div>
            <div class="flex justify-evenly" style="font-size: 18px;line-height: 1;height: 72px">
              <div class="flex items-center justify-center icon-warning"
                style="color:#317f72;padding-left: 40px;position:relative;"><img style="left:0;position: absolute;"
                  src="@/assets/visualPlatform/icon_warning1_1.png" />正常&nbsp;&nbsp;<b>{{
                    pointStatusStatisticsData.normalCount }}</b>
              </div>
              <div class="flex items-center justify-center icon-warning"
                style="color:#c9ad16;padding-left: 40px;position:relative;"><img style="left:0;position: absolute;"
                  src="@/assets/visualPlatform/icon_warning2_2.png" />预警&nbsp;&nbsp;<b>{{
                    pointStatusStatisticsData.preWarningCount }}</b>
              </div>
              <div class="flex items-center justify-center icon-warning"
                style="color:#c64e3c;padding-left: 40px;position:relative;"><img style="left:0;position: absolute;"
                  src="@/assets/visualPlatform/icon_warning3_3.png" />报警&nbsp;&nbsp;<b>{{
                    pointStatusStatisticsData.warningCount }}</b>
              </div>
            </div>
            <div class="sub-title" style="margin: 0;">监测报警趋势</div>
            <div ref="chart2" style="height: calc(100% - 299px);margin-top: 12px;" />
          </div>
          <!--  -->
          <div class="m-box">
            <div class="flex justify-between items-center relative">
              <div class="i-title">监测点预警列表</div>
              <div class="absolute right-0">
                <span class="filter-btn" :class="areaRealTimeDataType == 0 && 'active'"
                  @click="areaRealTimeDataType = 0; getareaRealTime();">库房</span>
                <span class="filter-btn" :class="areaRealTimeDataType == 1 && 'active'"
                  @click="areaRealTimeDataType = 1; getareaRealTime();">展厅</span>
              </div>
            </div>
            <div class="flex justify-between items-center">
              <div class="sub-title flex-1">监测点预警信息</div>
              <el-select v-model="select3" @change="(e) => { getareaRealTime({ warningStatus: e }) }" size="large"
                class="m-select flex-1" placeholder="选择时间">
                <el-option
                  v-for="item in [{ label: '预警', value: 4 }, { label: '报警', value: 2 }, { label: '最新时间', value: 1 }]"
                  :key="item" :label="item.label" :value="item.value"></el-option>
                <!--  -->
              </el-select>
            </div>
            <div style="height:calc(100% - 106px);overflow-y:auto;">
              <table class="table-fixed" style="width: 100%;line-height: 2;text-align: center;">
                <thead>
                  <tr>
                    <th style="width: 33.33%;color: #3286F4">展厅名称</th>
                    <th style="width: 33.33%;color: #3286F4">展柜编号</th>
                    <th style="width: 33.33%;color: #3286F4">报警时间</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in areaRealTimeData">
                    <td><span class="tag tag3 td-mr10">{{ item.warningStatusDic }}</span>{{ item.houseName }}</td>
                    <td>{{ item.areaId }}</td>
                    <td>{{ item.updateTime.substr(0, 10) }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="text-center" style="color: #3286F4;text-decoration: underline;">
              <a @click="openDialog1()">查看更多</a>
            </div>
          </div>
        </div>
        <!-- 底部 -->
        <div class="absolute bottom-10 inset-x-0 mx-auto gundong-box">
          <img class="l" src="/src/assets/visualPlatform/arrow.png" alt="" />
          <scroll-view class="gundong flex shrink-0 " style="width: 600px;overflow:auto">
            <div class="item" v-for="item, i in imgArr" @click="openDialog2(imgPointIdArr[i], i)">
              <img :src="item" alt="">
              <div class="truncate" style="width: 100%;">{{ imgArr1[i] }}</div>
            </div>
          </scroll-view>
          <img class="r" src="/src/assets/visualPlatform/arrow.png" alt="" />
        </div>
      </div>
    </div>
  </div>

  <edit ref="editRef" />
  <!-- dialog1 -->
  <el-dialog v-model="dialogVisible1" title="监测预警列表" width="1120" class="abc" align-center :show-close="false">
    <el-form>
      <el-row :gutter="20">
        <el-col :span="22">
          <el-form-item>
            <el-input v-model="searchParams.name" placeholder="库房名称" class="m-select" clearable>
              <template #prefix>
                <el-icon class="el-input__icon">
                  <search />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item>
            <el-button color="#4393FA" style="color: white"
              @click="getareaRealTime({ houseName: searchParams.name })">搜索</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="areaRealTimeData" size="small">
      <el-table-column property="warningStatusDic" label="报警类型" />
      <el-table-column property="houseName" label="展厅名称" />
      <el-table-column property="cabinetName" label="展柜编号" />
      <el-table-column property="relicMaterial" label="文物材质" />
      <el-table-column property="relicName" label="文物名称" />
      <el-table-column property="???" label="负责人" />
      <el-table-column property="updateTime" label="报警时间" />
      <el-table-column property="warningDuration" label="报警时长" />
      <el-table-column label=""><template #default="scope">
          <!-- {{ scope }} -->
          <img @click="openDialog3(scope.row)" src="@/assets/visualPlatform/icon_chart.png" />
        </template></el-table-column>
    </el-table>
    <div class="flex justify-end" style="margin-top: 20px;">
      <el-pagination layout="prev, pager, next" :total="50" background1 small />
    </div>
  </el-dialog>
  <!-- dialog2 -->
  <el-dialog v-model="dialogVisible2" title="监测点历史数据查询" width="1120" class="abc" align-center :show-close="false">
    <el-row gutter="10">
      <el-col :span="4">
        <div style="margin-top:60px">
          <div class="flex items-center justify-center" @click="() => { carousel.prev() }">
            <img src="/src/assets/visualPlatform/arrow.png" style="transform:rotate(180deg);margin-bottom: 20px" />
          </div>
          <el-carousel height="260px" direction="vertical" :autoplay="false" arrow="always" indicator-position="none"
            :initial-index="imgArrIndex" ref="carousel">
            <el-carousel-item v-for="item, i in imgArr" :key="item">
              <div class="flex items-center justify-center flex-col"
                style="background:url(/src/assets/visualPlatform/juanzhou.png);height: 100%;width:100%;background-size:100% 100%;">
                <img :src="item" alt="" style="width:50%">
                <h3 style="color:white;line-height: 1.4" class="td-px20">{{ imgArr1[i] }}</h3>
              </div>
            </el-carousel-item>
          </el-carousel>
          <div class="flex items-center justify-center" @click="() => { carousel.next() }">
            <img src="/src/assets/visualPlatform/arrow.png" />
          </div>
        </div>
      </el-col>
      <el-col :span="20">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="传感器类型">
            <el-select style="width: 173px" v-model="formInline.region" placeholder="传感器类型" clearable
              @change="handleChangeType">
              <el-option label="温度" value="1" />
              <el-option label="湿度" value="2" />
              <el-option label="CO2" value="3" />
              <el-option label="VOC" value="4" />
              <el-option label="光照" value="5" />
              <el-option label="紫外线" value="6" />
            </el-select>
          </el-form-item>
          <el-form-item label="自定义时间">
            <el-date-picker style="width: 180px" v-model="formInline.date" type="daterange" unlink-panels
              @change="handleChangeDate" range-separator="To" start-placeholder="Start date" end-placeholder="End date"
              :shortcuts="shortcuts" />
          </el-form-item>
          <el-form-item>
            <el-button color="#4393FA" style="color: white" @click="handleChangeDate(1)">当日</el-button>
            <el-button color="#4393FA" style="color: white" @click="handleChangeDate(7)">近7日数据</el-button>
            <el-button color="#4393FA" style="color: white" @click="handleChangeDate(30)">近1月数据</el-button>
            <el-button color="#4393FA" style="color: white" @click="handleChangeDate(60)">近2月数据</el-button>
            <el-button color="#4393FA" style="color: white" @click="handleChangeDate(90)">近3月数据</el-button>
          </el-form-item>
        </el-form>
        <div ref="chart3" style="height: 340px;" />
      </el-col>
    </el-row>
  </el-dialog>
  <!-- dialog3 -->
  <el-dialog v-model="dialogVisible3" :title="`${dialog3Title ? '<' + dialog3Title + '>' : ''}监测点历史数据查询`" width="1120"
    class="abc" align-center :show-close="false">
    <el-row>
      <el-col :span="24">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="传感器类型">
            <el-select style="width: 173px" v-model="formInline.region" placeholder="传感器类型" clearable
              @change="handleChangeType">
              <el-option label="温度" value="1" />
              <el-option label="湿度" value="2" />
              <el-option label="CO2" value="3" />
              <el-option label="VOC" value="4" />
              <el-option label="光照" value="5" />
              <el-option label="紫外线" value="6" />
            </el-select>
          </el-form-item>
          <el-form-item label="自定义时间">
            <el-date-picker style="width: 230px" v-model="formInline.date" type="daterange" unlink-panels
              @change="handleChangeDate" range-separator="至" start-placeholder="" end-placeholder=""
              :shortcuts="shortcuts" />
          </el-form-item>
          <el-form-item>
            <el-button color="#4393FA" style="color: white" @click="handleChangeDate(1)">当日</el-button>
            <el-button color="#4393FA" style="color: white" @click="handleChangeDate(7)">近7日数据</el-button>
            <el-button color="#4393FA" style="color: white" @click="handleChangeDate(30)">近1月数据</el-button>
            <el-button color="#4393FA" style="color: white" @click="handleChangeDate(60)">近2月数据</el-button>
            <el-button color="#4393FA" style="color: white" @click="handleChangeDate(90)">近3月数据</el-button>
          </el-form-item>
        </el-form>
        <div ref="chart4" style="height: 340px;" />
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script setup lang="jsx">
import { getUserProfile } from '@/api/system/user';
import { getWarehouseAllList } from '@/api/artifact/warehouse';
import { ElMessageBox } from 'element-plus';
import scrollView from './scrollView.vue';
import useUserStore from '@/store/modules/user';
import {
  getVirsualPlatformList,
  deviceStatistics,
  pointStatusStatistics,
  microPointRealTime,
  monitorPointList,
  getVirsualPlatformDataHis,
  pointHis,
  cabinetStatistics,
  trend,

  getMonitorDataList,
  getWarningList,
  getWarningTypeStatstics,
} from '@/api/warning/virsualPlatform';
import {
  editMonitorPoint,
} from '@/api/warning/monitorPoint';
import Edit from './edit';
import logo from '@/assets/visualPlatform/logo.png';
import exit from '@/assets/visualPlatform/btn-exit.png';
import * as echarts from 'echarts';
import { getMonitorPointList } from '@/api/warning/monitorPoint';
import { options1, options2, options3, tableData } from './options'
import { formatDate } from '@/utils';
import { partialRight } from 'lodash-es';
import { getExhibitionStatistics } from "@/api/collection-statistics/total-statistics"

import pic1 from '@/assets/visualPlatform/zgzb/1.d629abe2.png';
import pic2 from '@/assets/visualPlatform/zgzb/2.b074b586.png';
import pic3 from '@/assets/visualPlatform/zgzb/3.f9f08519.png';
import pic4 from '@/assets/visualPlatform/zgzb/4.89d0f9b1.png';
import pic5 from '@/assets/visualPlatform/zgzb/5.fbcbe490.png';
import pic6 from '@/assets/visualPlatform/zgzb/6.956bbb3e.png';
import pic7 from '@/assets/visualPlatform/zgzb/7.e97c04e2.png';
import pic8 from '@/assets/visualPlatform/zgzb/8.b20bd700.png';
import pic9 from '@/assets/visualPlatform/zgzb/9.8c342239.png';
import pic10 from '@/assets/visualPlatform/zgzb/10.7d61123f.png';

const showClass = ref('');
const showIndex = ref(-1);
const pointData = reactive([]);

const earlyWarningType = reactive([]);
const warningList = reactive([]);
const tableData1 = reactive(tableData);
// 初始化请求
onMounted(() => {
  // resizeScanl();
  // window.onresize = function () {
  //   resizeScanl();
  // }
});
const state = reactive({
  user: {},
  roleGroup: {},
  postGroup: {}
});
const dialogVisible1 = ref(false)
const dialogVisible2 = ref(false)
const dialogVisible3 = ref(false)
const dialog3Title = ref('')

const formInline = ref({})
const select1 = ref('');
const select2 = ref('');
const select3 = ref('');
const cabinetStatisticsData = ref({});
const houseId = ref('');
const houseName = ref('');
const housePic = ref('');
const monitor = ref('');
const cabinet_addr = ref([]);
const monitorPointListData = ref([]);
const areaRealTimeData = ref([]);
const areaRealTimeDataType = ref(0); // 1-展厅 0-库房
const oneOrSeven = ref(1); // 今日 或者 近7日

const deviceStatisticsData = ref({});
const pointStatusStatisticsData = ref({});
const searchParams = ref({
  id: '',
  name: '',
  startTime: '',
  endTime: '',
});

const chart = ref(null);
const chart1 = ref(null);
const chart2 = ref(null);
const chart3 = ref(null);
const chart4 = ref(null);
const carousel = ref(null);
// const aa = import('@/assets/visualPlatform/zgzb/1.d629abe2.png')
const imgArr = ref([
  pic1,
  pic2,
  pic3,
  pic4,
  pic5,
  pic6,
  pic7,
  pic8,
  pic9,
  pic10,
]);
// const imgArr = ref([
//   'http://10.1.72.113:9090/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL3pnemIvMS5kNjI5YWJlMi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD04TDI1SUNBUzhBQ1MzVUcxMDlLVSUyRjIwMjQwNzMwJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDczMFQwNzE5NDJaJlgtQW16LUV4cGlyZXM9NDMxOTkmWC1BbXotU2VjdXJpdHktVG9rZW49ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmhZMk5sYzNOTFpYa2lPaUk0VERJMVNVTkJVemhCUTFNelZVY3hNRGxMVlNJc0ltVjRjQ0k2TVRjeU1qTTJOekF3TWl3aWNHRnlaVzUwSWpvaWNtOXZkQ0o5LlRZTWNuVkFpNHZIY3JPbnpyUGktYmVUc1JMS2Jac1FzM3BhRDRBNjNBSUlsbENYNkkzY2todWUtcVpSU0lHeUt5NzBoamZPYmdId1FzOFh1YzdzVERRJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZ2ZXJzaW9uSWQ9bnVsbCZYLUFtei1TaWduYXR1cmU9YTk4NWQ4OWE4YjQyNjVmYzBiOTE5ZDhkNWQ5NGNmM2M1ZmRlZjAzMWUwNGI0YzA1MzJjNDAwN2EzNzJjMDlmMA',
//   'http://10.1.72.113:9090/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL3pnemIvMi5iMDc0YjU4Ni5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD04TDI1SUNBUzhBQ1MzVUcxMDlLVSUyRjIwMjQwNzMwJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDczMFQwNzIxMjRaJlgtQW16LUV4cGlyZXM9NDMyMDAmWC1BbXotU2VjdXJpdHktVG9rZW49ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmhZMk5sYzNOTFpYa2lPaUk0VERJMVNVTkJVemhCUTFNelZVY3hNRGxMVlNJc0ltVjRjQ0k2TVRjeU1qTTJOekF3TWl3aWNHRnlaVzUwSWpvaWNtOXZkQ0o5LlRZTWNuVkFpNHZIY3JPbnpyUGktYmVUc1JMS2Jac1FzM3BhRDRBNjNBSUlsbENYNkkzY2todWUtcVpSU0lHeUt5NzBoamZPYmdId1FzOFh1YzdzVERRJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZ2ZXJzaW9uSWQ9bnVsbCZYLUFtei1TaWduYXR1cmU9NjI1Zjg3ZDgxZWQ2ZTYzZDdlODAzZmI4NGJjYjBlYmJiYTc2YzhiMGIzNGI1NGEyNDVkMDc1YTUyOWVmN2ZmYQ',
//   'http://10.1.72.113:9090/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL3pnemIvMy5mOWYwODUxOS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD04TDI1SUNBUzhBQ1MzVUcxMDlLVSUyRjIwMjQwNzMwJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDczMFQwNzIxNDBaJlgtQW16LUV4cGlyZXM9NDMxOTkmWC1BbXotU2VjdXJpdHktVG9rZW49ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmhZMk5sYzNOTFpYa2lPaUk0VERJMVNVTkJVemhCUTFNelZVY3hNRGxMVlNJc0ltVjRjQ0k2TVRjeU1qTTJOekF3TWl3aWNHRnlaVzUwSWpvaWNtOXZkQ0o5LlRZTWNuVkFpNHZIY3JPbnpyUGktYmVUc1JMS2Jac1FzM3BhRDRBNjNBSUlsbENYNkkzY2todWUtcVpSU0lHeUt5NzBoamZPYmdId1FzOFh1YzdzVERRJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZ2ZXJzaW9uSWQ9bnVsbCZYLUFtei1TaWduYXR1cmU9MTc4ZDI1NDZhNWY2MmQzM2IyM2ZlNDI1MDY3NTRhNjRmZDQ1ZDllZTVlNmMyMGZiOTIyYzZhYzE1NGYyMWZiNg',
//   'http://10.1.72.113:9090/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL3pnemIvNC44OWQwZjliMS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD04TDI1SUNBUzhBQ1MzVUcxMDlLVSUyRjIwMjQwNzMwJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDczMFQwNzIyMDNaJlgtQW16LUV4cGlyZXM9NDMyMDAmWC1BbXotU2VjdXJpdHktVG9rZW49ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmhZMk5sYzNOTFpYa2lPaUk0VERJMVNVTkJVemhCUTFNelZVY3hNRGxMVlNJc0ltVjRjQ0k2TVRjeU1qTTJOekF3TWl3aWNHRnlaVzUwSWpvaWNtOXZkQ0o5LlRZTWNuVkFpNHZIY3JPbnpyUGktYmVUc1JMS2Jac1FzM3BhRDRBNjNBSUlsbENYNkkzY2todWUtcVpSU0lHeUt5NzBoamZPYmdId1FzOFh1YzdzVERRJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZ2ZXJzaW9uSWQ9bnVsbCZYLUFtei1TaWduYXR1cmU9NjExMjMyNTc3OWRmZjViMWIzNWM3NTNhODcwYTNhZjMzNWQzZWI1MGE5MzUzYjA5MDBiN2FlMzM4ZDQzMDg5OA',
//   'http://10.1.72.113:9090/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL3pnemIvNS5mYmNiZTQ5MC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD04TDI1SUNBUzhBQ1MzVUcxMDlLVSUyRjIwMjQwNzMwJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDczMFQwNzIyMThaJlgtQW16LUV4cGlyZXM9NDMyMDAmWC1BbXotU2VjdXJpdHktVG9rZW49ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmhZMk5sYzNOTFpYa2lPaUk0VERJMVNVTkJVemhCUTFNelZVY3hNRGxMVlNJc0ltVjRjQ0k2TVRjeU1qTTJOekF3TWl3aWNHRnlaVzUwSWpvaWNtOXZkQ0o5LlRZTWNuVkFpNHZIY3JPbnpyUGktYmVUc1JMS2Jac1FzM3BhRDRBNjNBSUlsbENYNkkzY2todWUtcVpSU0lHeUt5NzBoamZPYmdId1FzOFh1YzdzVERRJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZ2ZXJzaW9uSWQ9bnVsbCZYLUFtei1TaWduYXR1cmU9MTFmNmY1MDY1OWEzNTk1YjQ1NTRkM2VlMDcwM2JhZjlmNzIxZWMxZGU3OTIyYWE2ODBjZDdiYWNjNjFhMjhhZA',
//   'http://10.1.72.113:9090/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL3pnemIvNi45NTZiYmIzZS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD04TDI1SUNBUzhBQ1MzVUcxMDlLVSUyRjIwMjQwNzMwJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDczMFQwNzIyNDlaJlgtQW16LUV4cGlyZXM9NDMxOTkmWC1BbXotU2VjdXJpdHktVG9rZW49ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmhZMk5sYzNOTFpYa2lPaUk0VERJMVNVTkJVemhCUTFNelZVY3hNRGxMVlNJc0ltVjRjQ0k2TVRjeU1qTTJOekF3TWl3aWNHRnlaVzUwSWpvaWNtOXZkQ0o5LlRZTWNuVkFpNHZIY3JPbnpyUGktYmVUc1JMS2Jac1FzM3BhRDRBNjNBSUlsbENYNkkzY2todWUtcVpSU0lHeUt5NzBoamZPYmdId1FzOFh1YzdzVERRJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZ2ZXJzaW9uSWQ9bnVsbCZYLUFtei1TaWduYXR1cmU9ZjU2NGNlNDdkM2NjYzBjZWZiMmViMDIyYzg0MDJjZTRiNThlMzEyYjU4MDZlZDRmMTA1NDYxNjg4NTYzYzFiMw',
//   'http://10.1.72.113:9090/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL3pnemIvNy5lOTdjMDRlMi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD04TDI1SUNBUzhBQ1MzVUcxMDlLVSUyRjIwMjQwNzMwJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDczMFQwNzIzMDdaJlgtQW16LUV4cGlyZXM9NDMyMDAmWC1BbXotU2VjdXJpdHktVG9rZW49ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmhZMk5sYzNOTFpYa2lPaUk0VERJMVNVTkJVemhCUTFNelZVY3hNRGxMVlNJc0ltVjRjQ0k2TVRjeU1qTTJOekF3TWl3aWNHRnlaVzUwSWpvaWNtOXZkQ0o5LlRZTWNuVkFpNHZIY3JPbnpyUGktYmVUc1JMS2Jac1FzM3BhRDRBNjNBSUlsbENYNkkzY2todWUtcVpSU0lHeUt5NzBoamZPYmdId1FzOFh1YzdzVERRJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZ2ZXJzaW9uSWQ9bnVsbCZYLUFtei1TaWduYXR1cmU9ODk5ZTcyNWIzODE4MzE5MzNiOWRlNjNmNjM2YWRiYzMzNDgxZWJiMzIwYmRjOWY5Yjk1ZGFiZWYwMGNlNDUwMw',
//   'http://10.1.72.113:9090/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL3pnemIvOC5iMjBiZDcwMC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD04TDI1SUNBUzhBQ1MzVUcxMDlLVSUyRjIwMjQwNzMwJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDczMFQwNzIzMjNaJlgtQW16LUV4cGlyZXM9NDMyMDAmWC1BbXotU2VjdXJpdHktVG9rZW49ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmhZMk5sYzNOTFpYa2lPaUk0VERJMVNVTkJVemhCUTFNelZVY3hNRGxMVlNJc0ltVjRjQ0k2TVRjeU1qTTJOekF3TWl3aWNHRnlaVzUwSWpvaWNtOXZkQ0o5LlRZTWNuVkFpNHZIY3JPbnpyUGktYmVUc1JMS2Jac1FzM3BhRDRBNjNBSUlsbENYNkkzY2todWUtcVpSU0lHeUt5NzBoamZPYmdId1FzOFh1YzdzVERRJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZ2ZXJzaW9uSWQ9bnVsbCZYLUFtei1TaWduYXR1cmU9YWM1OTI5MjAyOWM3MTkwMmJkYWY1M2Q0ZTJkNjYyNzM5MGVhYzhhZWFjN2E3ZTNlZmE0NWJiZTJiYmE1M2NhOQ',
//   'http://10.1.72.113:9090/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL3pnemIvOS44YzM0MjIzOS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD04TDI1SUNBUzhBQ1MzVUcxMDlLVSUyRjIwMjQwNzMwJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDczMFQwNzIzNDBaJlgtQW16LUV4cGlyZXM9NDMyMDAmWC1BbXotU2VjdXJpdHktVG9rZW49ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmhZMk5sYzNOTFpYa2lPaUk0VERJMVNVTkJVemhCUTFNelZVY3hNRGxMVlNJc0ltVjRjQ0k2TVRjeU1qTTJOekF3TWl3aWNHRnlaVzUwSWpvaWNtOXZkQ0o5LlRZTWNuVkFpNHZIY3JPbnpyUGktYmVUc1JMS2Jac1FzM3BhRDRBNjNBSUlsbENYNkkzY2todWUtcVpSU0lHeUt5NzBoamZPYmdId1FzOFh1YzdzVERRJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZ2ZXJzaW9uSWQ9bnVsbCZYLUFtei1TaWduYXR1cmU9ZGVhMzBkNzdmZjcxZjhhZDU2ZWMyNzVjZGMwZDZkOGIzNzE4ZTQ3YjA1OTIzZjM3YWM4OWJjNGIwZGJiY2ZiZg',
//   'http://10.1.72.113:9090/api/v1/download-shared-object/aHR0cDovLzEyNy4wLjAuMTo5MDAwL3pnemIvMTAuN2Q2MTEyM2YucG5nP1gtQW16LUFsZ29yaXRobT1BV1M0LUhNQUMtU0hBMjU2JlgtQW16LUNyZWRlbnRpYWw9OEwyNUlDQVM4QUNTM1VHMTA5S1UlMkYyMDI0MDczMCUyRnVzLWVhc3QtMSUyRnMzJTJGYXdzNF9yZXF1ZXN0JlgtQW16LURhdGU9MjAyNDA3MzBUMDcyMzU4WiZYLUFtei1FeHBpcmVzPTQzMjAwJlgtQW16LVNlY3VyaXR5LVRva2VuPWV5SmhiR2NpT2lKSVV6VXhNaUlzSW5SNWNDSTZJa3BYVkNKOS5leUpoWTJObGMzTkxaWGtpT2lJNFRESTFTVU5CVXpoQlExTXpWVWN4TURsTFZTSXNJbVY0Y0NJNk1UY3lNak0yTnpBd01pd2ljR0Z5Wlc1MElqb2ljbTl2ZENKOS5UWU1jblZBaTR2SGNyT256clBpLWJlVHNSTEtiWnNRczNwYUQ0QTYzQUlJbGxDWDZJM2NraHVlLXFaUlNJR3lLeTcwaGpmT2JnSHdRczhYdWM3c1REUSZYLUFtei1TaWduZWRIZWFkZXJzPWhvc3QmdmVyc2lvbklkPW51bGwmWC1BbXotU2lnbmF0dXJlPTg1NTAwNjU2OGM2OTFjZjNiYTk0NzI2NGI5ZmZjOWUyZmVhYTE1Y2JjZjljY2U4NDRjNGQzZTExYTkzZjQyYTQ',
// ]);
const imgPointIdArr = ref([
  '111',
  '111',
  '111',
  '111',
  '111',
  '111',
  '111',
  '111',
  '111',
  '111',
]);
const imgArr1 = ref([
  '唐“彩凤鸣岐”七弦琴',
  '新石器时代良渚文化玉琮',
  '元龙泉窑青瓷舟形砚滴',
  '五代十国吴越国鎏金纯银阿育王塔',
  '元黄公望富春山居图卷',
  '新石器时代河姆渡文化双鸟朝阳纹牙雕',
  ' 清金箔贴花花轿',
  '战国伎乐铜房屋模型',
  '战国越王者旨於睗剑 ',
  '北宋泥塑彩绘观音立像',
]);
const imgArrIndex = ref(0);
const exhibitionStatistics = ref({});

const openDialog1 = () => {
  dialogVisible1.value = true
  getareaRealTime();
};
const openDialog2 = (houseId, index) => {
  imgArrIndex.value = index;
  searchParams.value.id = houseId;
  dialogVisible2.value = true;
  getVirsualPlatformDataHis(houseId).then(res => {
    initChartData3(res.rows);
  });
}
const openDialog3 = (data) => {
  searchParams.value.id = data.areaId || data.houseId;
  dialogVisible3.value = true
  dialog3Title.value = data.cabinetName;

  // getVirsualPlatformDataHis(searchParams.value.id).then(res => {
  //   initChartData4(res.rows);
  // });
  handleChangeDate(1)
};
const handleChangeType = (value) => {
  getVirsualPlatformDataHis(searchParams.value.id, { warningType: value }).then(res => {
    initChartData4(res.rows);
  });
}
const handleChangeDate = (value) => {
  let startTime, endTime;
  if (Array.isArray(value)) {
    startTime = formatDate(value[0])
    endTime = formatDate(value[1])
    endTime = endTime.substr(0, 11) + '23:59:59';
    formInline.value.date = [startTime, endTime]
  } else {
    const today = formatDate(new Date()).substr(0, 11) + '23:59:59';
    const end = new Date().getTime() - (value * 24 * 60 * 60 * 1000);

    startTime = formatDate(end).substr(0, 11) + '00:00:00'
    endTime = today

    formInline.value.date = [startTime, endTime]
  }

  getVirsualPlatformDataHis(searchParams.value.id, { startTime, endTime }).then(res => {
    initChartData4(res.rows);
  });
}

function getUser() {
  getUserProfile().then(response => {
    state.user = response.data;
    state.roleGroup = response.roleGroup;
    state.postGroup = response.postGroup;
  });
}
getUser();

const cabinetAddrIdx = ref({});
const getWarehouseAllLists = async () => {
  const { rows } = await getWarehouseAllList();
  cabinet_addr.value = rows;
  select1.value = rows?.[0].houseId;
  cabinetAddrIdx.value = rows[0];
  rows?.[0] && getDatas(cabinetAddrIdx.value);
};
getWarehouseAllLists();

const tplSelectChange = houseId => {
  const index = cabinet_addr.value.findIndex(v => houseId == v.houseId);
  cabinetAddrIdx.value = cabinet_addr.value[index];

  getDatas(cabinetAddrIdx.value);
};

const getDatas = async data => {
  houseId.value = data.houseId;
  houseName.value = data.houseName;
  housePic.value = data.houseGraph;

  cabinetStatistics(houseId.value).then(res => {
    cabinetStatisticsData.value = res.data
  })
  deviceStatistics(houseId.value).then(res => {
    deviceStatisticsData.value = res.data;
  })
  pointStatusStatistics(houseId.value).then(res => {
    pointStatusStatisticsData.value = res.data;
  })
  monitorPointList(houseId.value).then(res => {
    monitorPointListData.value = res.rows;
    select2.value = monitorPointListData.value?.[0]?.pointId || ''

    getpointHis(houseId.value, { pointId: monitorPointListData?.value?.[0]?.pointId || '' });
  })
  getVirsualPlatformList({ pageOpen: false, houseId: houseId.value }).then(res => {
    pointData.length = 0;
    res.rows.map(v => {
      let pos = v.pointLocation?.split(',');
      pointData.push({
        ...v,
        name: v.pointDesc || '-',
        type: 1,
        sort: 1,
        id: 1,
        namePosition: 'bottom',
        valPosition: 'bottom',
        left: pos?.[0] || 0,
        top: pos?.[1] || 0,
        status: v.monitingStatus,
        updateTime: v.updateTime,
        rotate: 22
      });
    });
  });

  getExhibitionStatistics(houseId.value).then(res => {

    exhibitionStatistics.value = {
      total: res.data?.total || 0,
      detail: res.data.detail || []
    }
  })
  trend(formatDate(new Date()).substr(0, 11)).then(res => {
    initChartData2(res.rows);
  })
  getareaRealTime();

  warningList.length = 0;
  // getWarningList(value).then(res => {
  //   res.rows?.map(v => {
  //     warningList.push(v);
  //   });
  // });
  earlyWarningType.length = 0;
  // getWarningTypeStatstics(value).then(res => {
  //   res.rows?.map(v => {
  //     earlyWarningType.push({
  //       name: v.warningTypeDic,
  //       value: v.warningPointCount
  //     });
  //   });
  // });
  // getMonitorDataList(value).then(res => {
  //   monitor.value = res.data || {};
  // });
  // getMonitorPointList({ areaId: value }).then(res => { });
};

const isDragging = ref(false)
const startDragging = async (e, item) => {
  console.log('startDragging', e)
  isDragging.value = true;

  item.left = e.clientX - pointsBox.offsetLeft - 15
  item.top = e.clientY - pointsBox.offsetTop - 100
}
const debounce = (fn, wait) => {
  let timer = null;
  return function () {
    let context = this,
      args = [...arguments];
    // 如果此时存在定时器的话，则取消之前的定时器重新记时
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    // 设置定时器，使事件间隔指定事件后执行
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}
const dragging = async (e, item) => {
  console.log('dragging', e)
  if (!isDragging.value) {
    return;
  }

  const pointsBox = document.getElementById('pointsBox')
  console.log(e.clientX, pointsBox.offsetLeft)
  console.log(e.clientY, pointsBox.offsetTop)
  item.left = e.clientX - pointsBox.offsetLeft - 15
  item.top = e.clientY - pointsBox.offsetTop - 100
  item.pointLocation = item.left + "," + item.top
  // debounce(DragPoints(item), 500)
}
const stopDragging = (e, item) => {
  console.log('stopDragging', e)
  isDragging.value = false;
  // DragPoints(item)
  debounce(DragPoints(item), 500)
}

const DragPoints = async data => {
  editMonitorPoint(data)
}
const pointId = ref('')
const getpointHis = (houseId, params = {}) => {
  if (params.pointId) pointId.value = params.pointId;
  let startTime, endTime;
  const today = formatDate(new Date()).substr(0, 11);
  const end = new Date().getTime() - (oneOrSeven.value * 24 * 60 * 60 * 1000);
  startTime = formatDate(end).substr(0, 11);
  endTime = today;

  params = { houseId, isAsc: 'isAsc', pageOpen: false, ...params, pointId: pointId.value, startDate: startTime, endDate: endTime }
  pointHis(houseId, params).then(res => {
    // pointHisData.value = res.rows;
    initChartData(res.rows)
  })
}
const getareaRealTime = async params => {
  if (areaRealTimeDataType.value == 1) {
    params = { ...params, qryType: 'ZG' }
  } else {
    params = { ...params, qryType: 'CCG' }
  }
  microPointRealTime(params).then(res => {
    areaRealTimeData.value = res.rows;
  })
}
const initChartData = (rows = []) => {
  // rows = rows.splice(0,10);
  const chartInstance = echarts.init(chart.value, 'macarons');
  const chartInstance1 = echarts.init(chart1.value, 'macarons');

  options1.series[0].name = 'temperature';
  options1.series[0].data = rows.map(v => Number(v.temperature));
  options1.xAxis.data = rows.map(v => formatDate(v.temperatureTime));
  options1.dataZoom = [{
    type: 'inside',
    start: 0,
    end: 10
  }, {
    start: 0,
    end: 10,
  }];

  let seriesDataOne = []
  seriesDataOne.push({
    name: 'CO2',
    type: 'line',
    smooth: true,
    symbolSize: 2,
    data: rows.map(v => Number(v.co2)),
    showSymbol: false,
    yAxisIndex: 1,
    itemStyle: {
      normal: {
        color: 'rgba(240, 130, 7, 1)',
        lineStyle: {
          type: 'dashed',
          color: 'rgba(240, 130, 7, 1)',
          width: 2,
        }
      }
    },
  });
  seriesDataOne.push({
    name: 'VOC浓度',
    type: 'line',
    smooth: true,
    symbolSize: 2,
    data: rows.map(v => Number(v.voc)),
    showSymbol: false,
    itemStyle: {
      normal: {
        color: 'rgba(19, 108, 165, 1)',
        lineStyle: {
          type: 'dashed',
          color: 'rgba(19, 108, 165, 1)',
          width: 2,
        }
      }
    },
  });
  let optionOne = {
    // backgroundColor:'#1C2129',
    tooltip: {
      trigger: 'axis',
      borderColor: '#006EFD',
      padding: 10,
      textStyle: {
        color: '#fff'
      },
      backgroundColor: 'rgba(18, 51, 128, .6)'
    },
    xAxis: {
      type: 'category',
      data: rows.map(v => v.updateTime.replace('T', ' ').slice(0, 19)),
      axisTick: {
        show: false
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#D4E9FF'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: 'rgba(255, 255, 255, .3)'
        }
      },
      axisLabel: {
        formatter: function (params) {
          if (params.length > 10) {
            return params.slice(10, 16)
          } else {
            return params
          }
        }
      }
    },
    legend: {
      // x: '30%',
      // top: '10%',
      textStyle: {
        color: '#FFFFFF'
      },
      data: ['VOC浓度', 'CO2']
    },
    yAxis: [
      {
        type: 'value',
        name: 'VOC浓度：ppm',
        nameTextStyle: {
          color: '#8EBAFF',
          fontSize: 12,
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#D4E9FF'
          }
        },
        splitLine: {
          show: false,
          lineStyle: {
            type: 'dashed',
          }
        },
        axisLabel: {
          color: "#9BA3B1",
        }
      },
      {
        type: 'value',
        name: 'CO2：ppm',
        position: 'right',
        nameTextStyle: {
          color: '#8EBAFF',
          fontSize: 12,
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: '#D4E9FF'
          }
        },
        splitLine: {
          show: false,
          lineStyle: {
            type: 'dashed'
          }
        },
        axisLabel: {
          color: "#9BA3B1",
        }
      }
    ],
    grid: {
      left: '3%',
      right: '3%',
      bottom: '2%',
      top: '25%',
      containLabel: true
    },
    series: seriesDataOne,
  }
  chartInstance.setOption(optionOne);

  options1.series[0].data = rows.map(v => v.humidity);
  options1.series[0].name = 'humidity';
  options1.xAxis.data = rows.map(v => v.humidityTime);
  options1.dataZoom = null

  let seriesDataTwo = []
  seriesDataTwo.push({
    name: '温度',
    type: 'line',
    // smooth: true,
    // symbolSize: 2,
    data: rows.map(v => Number(v.temperature)),
    showSymbol: false,
    yAxisIndex: 1,
    itemStyle: {
      normal: {
        color: 'rgba(240, 130, 7, 1)',
        lineStyle: {
          color: 'rgba(240, 130, 7, 1)',
          width: 2,
        }
      }
    },
    emphasis: {
      disabled: true,
    },
    areaStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "rgba(240, 130, 7, 1)" },
          { offset: 0.8, color: "rgba(240, 130, 7, 0)" },
        ])
      }
    },
  });
  seriesDataTwo.push({
    name: '湿度',
    type: 'line',
    // smooth: true,
    // symbolSize: 2,
    data: rows.map(v => Number(v.humidity)),
    showSymbol: false,
    itemStyle: {
      normal: {
        color: 'rgba(19, 108, 165, 1)',
        lineStyle: {
          color: 'rgba(19, 108, 165, 1)',
          width: 2,
        }
      }
    },
    emphasis: {
      disabled: true,
    },
    areaStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: "rgba(19, 108, 165, 1)" },
          { offset: 0.6, color: "rgba(19, 108, 165, 0)" },
        ])
      }
    },
  });
  let optionTwo = {
    tooltip: {
      // show:false,
      trigger: 'axis',
      borderColor: '#006EFD',
      padding: 10,
      textStyle: {
        color: '#fff'
      },
      backgroundColor: 'rgba(18, 51, 128, .6)',
      // axisPointer: {
      //   type: 'line',
      //   label: {
      //     show: true,
      //     color: '#fff',
      //     backgroundColor: 'rgba(18, 51, 128, .6)',
      //   },
      //   lineStyle: {
      //     color: '#006EFD', // 设置指示线的颜色
      //     width: 2, // 设置指示线的宽度
      //     type: 'dashed',
      //     shadowColor: 'rgba(18, 230, 255, 1)'
      //   }
      // },

    },
    xAxis: {
      type: 'category',
      data: rows.map(v => v.updateTime.replace('T', ' ').slice(0, 19)),
      axisTick: {
        //去除刻度线
        show: false
      },
      axisLine: {
        //轴线样式
        lineStyle: {
          color: 'rgba(255, 255, 255, .3)'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: 'rgba(255, 255, 255, .3)'
        }
      },
      axisLabel: {
        formatter: function (params) {
          if (params.length > 10) {
            // return params.slice(0, 10) + "\n" + params.slice(-8)
            return params.slice(10, 16)
          } else {
            return params
          }
        }
      }
    },
    legend: {
      // x: '30%',
      // top: '10%',
      textStyle: {
        color: '#FFFFFF'
      },
      data: ['湿度', '温度']
    },
    yAxis: [
      {
        type: 'value',
        name: '湿度：%',
        nameTextStyle: {
          color: '#8EBAFF',
          fontSize: 12,
          // lineHeight: 40
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: 'rgba(255, 255, 255, .3)'
          }
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: 'rgba(255, 255, 255, .3)'
          }
        },
        axisLabel: {
          color: "#9BA3B1",
        }
      },
      {
        type: 'value',
        name: '温度：℃',
        position: 'right',
        nameTextStyle: {
          color: '#8EBAFF',
          fontSize: 12,
          // lineHeight: 40
        },
        axisTick: {
          //去除刻度线
          show: false
        },
        axisLine: {
          show: false,
          //轴线样式
          lineStyle: {
            color: 'rgba(255, 255, 255, .3)'
          }
        },
        splitLine: {
          show: false,
          lineStyle: {
            type: 'dashed'
          }
        },
        axisLabel: {
          color: "#9BA3B1",
        }
      }
    ],
    grid: {
      left: '3%',
      right: '3%',
      bottom: '2%',
      top: '25%',
      containLabel: true
    },
    series: seriesDataTwo,
    dataZoom: {
      show: false, // 为true 滚动条出现
      realtime: true,
      type: 'slider', // 有type这个属性，滚动条在最下面，也可以不行，写y：36，这表示距离顶端36px，一般就是在图上面。
      height: 20, // 表示滚动条的高度，也就是粗细
      start: 0, // 表示默认展示20%～80%这一段。
      end: 100
    }
  }
  chartInstance1.setOption(optionTwo);
};
const initChartData2 = (rows = []) => {
  const chartInstance2 = echarts.init(chart2.value, 'macarons');
  options2.series[0].data = rows.map(v => v.warningTimesKF + Math.random() * 10);
  options2.xAxis.data = rows.map(v => v.time);

  let seriesDataOne = []
  let gap = "20%"
  let BarWidth = "25"
  seriesDataOne.push(
    {
      name: 'maxdata',
      type: 'custom',
      itemStyle: {
        color: 'rgba(255, 255, 255, .2)'
      },
      renderItem: function (params, api) {
        //获取对应类目的axisTick中心点坐标
        var start = api.coord([api.value(0)])
        //通过坐标系的宽度和类目数，计算单个类目的背景
        var width = (params.coordSys.width / 7) * 0.7
        return {
          type: 'rect',
          shape: {
            // 相对左上角坐标
            x: start[0] - width / 2,
            y: params.coordSys.y,
            width: width,
            height: params.coordSys.height
          },
          style: api.style()
        }
      },
      data: rows.map(() => 0),
    }
  )
  seriesDataOne.push({
    // 背景色
    type: 'pictorialBar',
    name: '',
    symbol: 'fixed',
    symbolSize: [18, 3],
    symbolMargin: 2,
    symbolRepeat: 'repeat',
    symbolBoundingData: 300,
    data: rows.map(v => Number(v.totalTimes)),
    itemStyle: {
      color: {
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: '#828DEB' // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#C2C9FD' // 100% 处的颜色
          }
        ]
      }
    },
    emphasis: {
      itemStyle: {
        color: {
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#828DEB' // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#C2C9FD' // 100% 处的颜色
            }
          ]
        }
      }
    },
    zlevel: 1
  },
  );
  // seriesDataOne.push({
  //   // 背景色
  //   type: 'pictorialBar',
  //   name: '库房报警次数',
  //   symbol: 'fixed',
  //   symbolSize: [18, 3],
  //   symbolMargin: 2,
  //   symbolRepeat: 'repeat',
  //   symbolBoundingData: 300,
  //   data: rows.map(v => Number(20 || v.warningTimesKF)),
  //   itemStyle: {
  //     color: {
  //       x: 0,
  //       y: 0,
  //       x2: 0,
  //       y2: 1,
  //       colorStops: [
  //         {
  //           offset: 0,
  //           color: '#fff' // 0% 处的颜色
  //         },
  //         {
  //           offset: 1,
  //           color: '#3286F4' // 100% 处的颜色
  //         }
  //       ]
  //     }
  //   },
  //   emphasis: {
  //     itemStyle: {
  //       color: {
  //         x: 0,
  //         y: 0,
  //         x2: 0,
  //         y2: 1,
  //         colorStops: [
  //           {
  //             offset: 0,
  //             color: '#fff' // 0% 处的颜色
  //           },
  //           {
  //             offset: 1,
  //             color: '#3286F4' // 100% 处的颜色
  //           }
  //         ]
  //       }
  //     }
  //   },
  //   zlevel: 1
  // },
  // );

  let optionOne = {
    tooltip: {
      trigger: 'axis',
      borderColor: '#006EFD',
      padding: 10,
      textStyle: {
        color: '#fff'
      },
      backgroundColor: 'rgba(18, 51, 128, .6)',
      className: 'my-tooltip-box',
      formatter: function (params) {
        var str = '<div class="my-tooltip">'
        params.forEach((el) => {
          if (el.value == 100 || el.seriesName == 'maxdata') return
          str += `<div>${el.name}</div><div>展厅报警次数：${rows[el.dataIndex].warningTimesZT}</div>
          <div>库房报警次数：${rows[el.dataIndex].warningTimesKF}</div>
          `
        })
        str += '</div>'
        return str
      }
    },
    xAxis: {
      type: 'category',
      data: rows.map(v => v.time),
      axisTick: {
        show: false
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#D4E9FF'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
          color: 'rgba(255, 255, 255, .3)'
        }
      },
    },
    yAxis: {
      type: 'value',
      name: '次数',
      nameTextStyle: {
        color: '#8EBAFF',
        fontSize: 12,
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#D4E9FF'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
        }
      },
      axisLabel: {
        color: "#9BA3B1",
      }
    },
    grid: {
      left: '3%',
      right: '3%',
      bottom: '2%',
      top: '25%',
      containLabel: true
    },
    series: seriesDataOne,
    dataZoom: {
      realtime: true,
      type: 'slider', // 有type这个属性，滚动条在最下面，也可以不行，写y：36，这表示距离顶端36px，一般就是在图上面。
      height: 10, // 表示滚动条的高度，也就是粗细
      start: 0, // 表示默认展示20%～80%这一段。
      end: 20
    }
  }

  chartInstance2.setOption(optionOne);
};
const initChartData3 = (rows = []) => {
  options3.series[0].data = rows.map(v => v.temperature);
  options3.series[1].data = rows.map(v => v.humidity);
  options3.xAxis.data = rows.map(v => v.updateTime);
  nextTick(() => {
    const chartInstance3 = echarts.init(chart3.value, 'macarons');
    chartInstance3.setOption(options3);
  })
};
const initChartData4 = (rows = []) => {
  options3.series[0].data = rows.map(v => v.temperature);
  options3.series[1].data = rows.map(v => v.humidity);
  options3.xAxis.data = rows.map(v => v.updateTime);
  console.log('--------', options3)
  nextTick(() => {
    const chartInstance4 = echarts.init(chart4.value, 'macarons');
    chartInstance4.setOption(options3);
  })
};
const editRef = ref(null);
const openProForm = (title, row = {}) => {
  const params = {
    title: houseName.value + ' ' + title,
    row: { ...row }
  };
  editRef.value?.acceptParams(params);
};
const formatStatus = status => {
  if (status == 1) {
    return '正常';
  } else if (status == 2) {
    return '报警';
  } else if (status == 3) {
    return '数据丢失';
  } else if (status == 4) {
    return '预警';
  } else {
    return '';
  }
};
const userStore = useUserStore();
function logout() {
  ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      userStore.logOut().then(() => {
        // location.href = '/index';
        window.close();
      });
    })
    .catch(() => { });
}
const formatterDuration = value => {
  let days = Math.floor(value / (1000 * 60 * 60 * 24));
  let hours = Math.floor((value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((value % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.round((value % (1000 * 60)) / 1000);
  return (
    (0 === days ? '' : days + '天') +
    (0 === hours ? '' : hours + '小时') +
    (0 === minutes ? '' : minutes + '分钟') +
    (0 === seconds ? '' : seconds + '秒')
  );
};
const isExistence = (obj = '', v) => {
  return obj?.split(',')?.indexOf(v) > -1;
};
const resizeScanl = () => {
  let _height = window.innerHeight;
  let _width = window.innerWidth;
  let _scanlheight = _height / 1080;
  let _scanlwidth = _width / 1920;

  let reSetImgDiv = document.getElementById('page-visualPlatform');
  if (_scanlheight < _scanlwidth) {
    reSetImgDiv.style.transform = 'scale(' + _scanlheight + ')';
    reSetImgDiv.style.marginTop = (-(1 - _scanlheight) * 1080) / 2 + 'px';
    reSetImgDiv.style.marginLeft = (-(1 - _scanlwidth) * 1920) / 2 + 'px';
  } else {
    reSetImgDiv.style.transform = 'scale(' + _scanlwidth + ')';
    reSetImgDiv.style.marginTop = (-(1 - _scanlheight) * 1080) / 2 + 'px';
    reSetImgDiv.style.marginLeft = (-(1 - _scanlwidth) * 1920) / 2 + 'px';
  }
};
const getPic = v => {
  return import.meta.env.VITE_APP_FILES_API + v;
};
const parseImageUrl = str => {
  return str?.split(',')[0]
} 
</script>
<style lang="scss" scoped>
.page-visualPlatform {
  width: 100vw;
  height: 100%;
  overflow: hidden;
  background: #c0d2cf;
}

.mn-container {
  --blue: rgb(50, 134, 244);
  --red: rgb(198, 78, 60);
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  background-color: #0F2D62;
  font-family: '微软雅黑', 'Microsoft YaHei';

  .m-header {
    padding: 0 15px;
    height: 85px;
    background-image: url(/src/assets/visualPlatform/bg_header.png);
    background-size: 100% 100%;
    position: relative;

    .m-title {
      font-size: 28px;
      color: white;
      letter-spacing: 6px;
      text-align: center;
      display: flex;
    }

    .m-sub-title {
      position: absolute;
      bottom: -56px;
      min-width: 288px;
      height: 61px;
      background: url(/src/assets/visualPlatform/bg_subtitle.png) no-repeat;
      background-size: 100% 100%;
      text-align: center;
      line-height: 61px;
      color: white;
      font-size: 28px;
      padding: 0 40px;
    }

    .m-logo {
      width: 100px;
      height: 45px;
    }

    .m-logo_name {
      width: 293px;
      height: 36px;
    }

    .m-exit {
      width: 27px;
      height: 27px;
    }

    .m-user {
      color: #222c3b;
      font-size: 16px;
    }

  }

  .m-select {
    width: 100%;
    // border: 1px solid;
    border-image: radial-gradient(circle, rgba(18, 230, 255, 1), rgba(255, 255, 255, 1)) 1 1;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 4px
  }

  .mn-main {
    height: calc(100vh - 85px);
    background-image: url(/src/assets/visualPlatform/bg_footer.png);
    background-repeat: no-repeat;
    background-position: bottom center;
    background-size: contain;

    .m-left,
    .m-right {
      width: 455px;
      height: 96%;
      // overflow-x: hidden;
      // overflow-y: scroll;
      // border: 1px solid red;
    }

    .m-box {
      width: 100%;
      height: calc(50% - 10px);
      padding: 15px;
      margin-bottom: 10px;
      background-size: 25px 25px, 25px 25px;
      background-position: 1% 1%, 99% 99%;
      // background: #04193F;
      border-radius: 8px 8px 8px 8px;
      opacity: 0.8;
      color: white;

      .i-title {
        display: inline-block;
        font-size: 16px;
        font-weight: bold;
        padding: 0 36px;
        background-image: url(@/assets/visualPlatform/bg_title.png);
        background-size: contain;
        background-repeat: no-repeat;
        flex: 1;
        height: 31px;
        line-height: 31px;
      }

      .filter-btn {
        cursor: pointer;
        display: inline-flex;
        width: 86px;
        height: 27px;
        align-items: center;
        justify-content: center;
        background-image: url(@/assets/visualPlatform/bg_btn1.png);
        background-size: 100% 100%;
        margin-left: 8px;

        &.active {
          background-image: url(@/assets/visualPlatform/bg_btn2.png);
        }
      }

      .sub-title {
        width: 240px;
        font-size: 20px;
        position: relative;
        margin: 14px 0;
        color: #97C4FF;

        &::before {
          content: '';
          width: 100%;
          height: 40%;
          position: absolute;
          background: linear-gradient(90deg, #004db3, rgba(0, 0, 0, 0));
          // background-color: red;
          bottom: 0;
          left: 0;
          z-index: -1;
        }
      }
    }
  }

  // 
  .circle {
    width: 115px;
    height: 115px;
    border-radius: 50%;
    // background: #0099ff;
    background-image: linear-gradient(180deg,
        #0099ff,
        #0099ff24,
      );
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 0.8;
    font-size: 14px;
    color: white;
    position: absolute;
    inset: 0;
    margin: auto;

    span {
      font-size: 1.5em;
    }

    &::before {
      content: '';
      width: 120%;
      height: 120%;
      border-radius: 50%;
      background: inherit;
      opacity: 0.5;
      position: absolute;
      z-index: -1
    }
  }

  .online,
  .offline {
    width: 193px;
    height: 72px;
    background-image: url(/src/assets/visualPlatform/bg_online.png);
    background-size: contain;
    text-align: right;
    padding-right: 16px;
    padding-top: 16px;
  }

  .offline {
    background-image: url(/src/assets/visualPlatform/bg_offline.png);
  }

  .tag {
    color: white;
    border-radius: 4px;
    font-size: 10px;
    padding: 2px 4px;
    vertical-align: center;

    &.tag1 {
      background-color: #317f72
    }

    &.tag2 {
      background-color: #c9ad16
    }

    &.tag3 {
      background-color: #c64e3c
    }
  }

  .gundong-box {
    padding: 25px 51px;
    background-image: url(/src/assets/visualPlatform/bg_gundong.png);
    background-size: 100% 100%;
    // width: calc(100% - 1300px);
    width: 700px;
    color: #eee;
    user-select: none;
    /* 标准语法 */

    &>img.l,
    &>img.r {
      height: 26px;
      position: absolute;
      top: 50%;
    }

    &>img.l {
      left: 18px;
      transform: rotate(90deg) translate(-50%, 0);
    }

    &>img.r {
      right: 18px;
      transform: rotate(-90deg) translate(50%, 0);
    }

    .item {
      width: 105px;
      min-width: 75px;
      height: 103px;
      background-image: url(/src/assets/visualPlatform/juanzhou.png);
      background-size: 100% 100%;
      margin: 5px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      img {
        width: 50px;
        height: 50px;
        margin-bottom: 5px;
      }
    }

    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }

  .point {
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-size: 100% 100%;
    cursor: pointer;

    &.point1 {
      background-image: url(/src/assets/visualPlatform/icon_warning1.png);
    }

    &.point2 {
      background-image: url(/src/assets/visualPlatform/icon_warning2.png);
    }

    &.point3 {
      background-image: url(/src/assets/visualPlatform/icon_warning3.png);
    }

    .box {
      display: none;
      position: absolute;
      left: 30px;
      top: 0px;
      width: 359px;
      height: 256px;
      background-image: url(/src/assets/visualPlatform/bg_box.png);
      background-size: 100% 100%;
      padding: 10px 20px;
      color: white;
      z-index: 9;
      font-size: 14px;
    }

    &:hover .box {
      display: block;
    }
  }
}

// .el-carousel__item h3 {
//   color: #475669;
//   opacity: 0.75;
//   line-height: 200px;
//   margin: 0;
//   text-align: center;
// }

// .el-carousel__item:nth-child(2n) {
//   background-color: #181b23;
// }

// .el-carousel__item:nth-child(2n + 1) {
//   background-color: #181b23;
// }
// .el-carousel__mask{
//   background-color: #181b23 !important;
// }</style>
<style lang='scss'>
.abc {

  &.el-dialog {
    display: flex;
    flex-direction: column;
    margin: 0 !important;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &.el-dialog .el-dialog__body {
    flex: 1;
    overflow: auto;
  }

  &.el-dialog {
    background: #181B23 !important;
    border: 1px solid #00AEFF;
    border-radius: 10px;
  }

  .el-dialog__headerbtn {
    top: -26px;
    right: -62px;
    background-color: transparent;
  }

  .el-table,
  .el-table tr,
  .el-table__empty-block,
  .el-table th.el-table__cell,
  .el-table td.el-table__cell {
    padding: 5px 0;
    background-color: transparent !important;
    color: white;
  }

  .el-table th.el-table__cell {
    color: #87BAFC !important;
  }

  .el-table td.el-table__cell,
  .el-table th.el-table__cell.is-leaf {
    border-bottom: 1px solid transparent;
  }

  .el-table--border .el-table__inner-wrapper::after,
  .el-table--border::after,
  .el-table--border::before,
  .el-table__inner-wrapper::before {
    background-color: transparent;
  }

  &.el-dialog .el-dialog__header {
    text-align: left;
    color: white !important;
    background-image: url(@/assets/visualPlatform/bg_title.png);
    background-size: contain;
    background-repeat: no-repeat;
    padding-left: 41px;
    line-height: 38px;
    margin-bottom: 20px;
  }

  &.el-dialog .el-dialog__header .el-dialog__title {
    color: white;
  }

  &.el-dialog .el-input__wrapper {
    background-color: transparent;
  }

  .el-pagination button.is-disabled,
  .el-pagination button:disabled,
  .el-pager li,
  .el-pagination button {
    background-color: transparent;
    color: white;
  }

  .el-form .el-form-item__label {
    color: white
  }
}
</style>
