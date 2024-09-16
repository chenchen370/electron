<template>
  <el-dialog :title="title" v-model="open" width="1000px" append-to-body :before-close="handleCancel" align-center
    :show-close="false">
    <div id="mapDiv"></div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="handleCancel">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>

const props = defineProps({
  title: {
    type: String,
    default: "位置"
  },
  startInfo: {
    type: Object,
    default: () => ({
      lng: 0,
      lat: 0,
    })
  },
  endInfo: {
    type: Object,
    default: () => ({
      lng: 0,
      lat: 0,
    })
  }
})
const open = ref(true)

const emits = defineEmits(["handleCancel", "handleSubmit"])


function handleSubmit() {
  emits("handleSubmit")
}
// 取消按钮
function handleCancel() {
  emits("handleCancel")
}

watch([() => props.startInfo, () => props.endInfo], (newValue) => {
  const startInfo = newValue[0]
  const endInfo = newValue[1]
  if (startInfo && endInfo) {
    nextTick(() => {
      onLoad();
    })
  }
}, {
  immediate: true,
  deep: true
})
const map = ref();
const zoom = ref(13)
const drivingRoute = ref();
const _CarTrack = ref()
const startIcon = ref("http://lbs.tianditu.gov.cn/images/bus/start.png") // 起点图标
const endIcon = ref("http://lbs.tianditu.gov.cn/images/bus/end.png") // 终点图标

function onLoad() {
  map.value = new T.Map('mapDiv');
  map.value.centerAndZoom(new T.LngLat(props.startInfo.lng, props.startInfo.lat), zoom.value);

  const config = {
    policy: 0,	// 驾车策略
    onSearchComplete: searchResult	// 检索完成后的回调函数
  };
  drivingRoute.value = new T.DrivingRoute(map.value, config);
  searchDrivingRoute()
}

// 搜索 驾车路线
function searchDrivingRoute() {
  map.value.clearOverLays();
  const startLngLat = new T.LngLat(props.startInfo.lng, props.startInfo.lat);
  const endLngLat = new T.LngLat(props.endInfo.lng, props.endInfo.lat);
  //驾车路线搜索
  drivingRoute.value.search(startLngLat, endLngLat);
}

function searchResult(result) {
  console.log("searchResult ===> ", result);

  // 添加起始点
  createStartMarker(result);

  // 获取方案个数
  const routes = result.getNumPlans();
  console.log(" 获取方案个数 routes ===> ", routes);
  for (let i = 0; i < routes; i++) {
    // 获得 单条 驾车方案 结果对象
    const plan = result.getPlan(i);
    console.log(" 获得 单条 驾车方案 结果对象 plan ===> ", plan);
    createRoute(plan.getPath());
  }
}

// 添加 起始点
function createStartMarker(result) {
  const startMarker = new T.Marker(result.getStart(), {
    icon: new T.Icon({
      iconUrl: startIcon.value,
      iconSize: new T.Point(44, 34),
      iconAnchor: new T.Point(12, 31)
    })
  });

  map.value.addOverLay(startMarker);

  const endMarker = new T.Marker(result.getEnd(), {
    icon: new T.Icon({
      iconUrl: endIcon.value,
      iconSize: new T.Point(44, 34),
      iconAnchor: new T.Point(12, 31)
    })
  });
  map.value.addOverLay(endMarker);
}


// 创建路线
function createRoute(lnglats, lineColor) {
  console.log("T.CarTrac===>", T.CarTrack);
  _CarTrack.value = new T.CarTrack(map.value, {
    interval: 20,
    speed: 10,
    dynamicLine: true,
    Datas: lnglats,
    polylinestyle: { color: "#a72ca5", width: 5, opacity: 0.9 }
  })
}


</script>

<style lang="scss" scoped>
#mapDiv {
  height: 500px;
  width: 100%;
}
</style>
