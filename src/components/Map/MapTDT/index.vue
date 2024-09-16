<template>
  <el-dialog :title="title" v-model="open" width="1000px" append-to-body :before-close="handleCancel" align-center
    :show-close="false">
    <div class="map-wrap">
      <div class="left">
        <div id="mapDiv"></div>
        <h2>{{ position }}</h2>
      </div>
      <div class="right">
        <keyword-search :list="searchResList" @handle-search="handleSearch"
          @handle-search-item-click="handleSearchItemClick" />
      </div>

    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="handleCancel">取 消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>

import KeywordSearch from '@/components/Map/MapTDT/keyword-search.vue';






const props = defineProps({
  title: {
    type: String,
    default: "位置"
  },
  lng: {
    type: Number,
    default: 0
  },
  lat: {
    type: Number,
    default: 0
  }
})
const emits = defineEmits(["handleCancel", "handleSubmit"])


function handleSubmit() {
  emits("handleSubmit", currentInfo)
}
// 取消按钮
function handleCancel() {
  emits("handleCancel")
}


watch([() => props.lng, () => props.lat], (newValue) => {
  const lng = newValue[0]
  const lat = newValue[1]
  console.log("lng ", lng);
  console.log("lat ", lat);
  if (lng && lat) {
    nextTick(() => {
      onLoad();
      if (map && geocode) {

        creatPoint(lng, lat);
      }
    })
  } else {

    nextTick(() => {
      onLoad();
      console.log("66666");
    })
  }
}, {
  immediate: true,
  deep: true
})

const open = ref(true)

const position = ref()
const currentInfo = reactive({
  province: "",
  city: "",
  county: "",
  lng: "", // 经度
  lat: "", // 纬度
  address: "",
})

let map, marker, geocode, localsearch;
let zoom = 12;


var T=window.T;

function onLoad() {
 
  map = new T.Map('mapDiv');
  map.centerAndZoom(new T.LngLat(116.40769, 39.89945), zoom);

  //创建对象
  geocode = new T.Geocoder();
  if (map && geocode) {
    addMapClick();
  }

  // 搜索配置项
  const searchConfig = {
    pageCapacity: 10,	//每页显示的数量
    onSearchComplete: localSearchResult	//接收数据的回调函数
  };
  //创建搜索对象
  localsearch = new T.LocalSearch(map, searchConfig);
}


function addMapClick() {
  removeMapClick();
  map.addEventListener("click", MapClick);
}

function removeMapClick() {
  map.removeEventListener("click", MapClick);
}

function MapClick(e) {
  map.clearOverLays();
  console.log("e ===> ", e);
  const { lng, lat } = e.lnglat
  creatPoint(lng, lat)
  // alert(`${e.lnglat.getLng()}---${e.lnglat.getLat()}`);

}

function creatPoint(lng, lat) {
  addPoint(lng, lat)
  const t = new T.LngLat(lng, lat)
  geocode.getLocation(t, searchResult);
}

function addPoint(lng, lat) {
  let point = new T.LngLat(lng, lat);
  marker = new T.Marker(point);// 创建标注
  console.log("marker", marker);
  map.addOverLay(marker);             // 将标注添加到地图中
  marker.enableDragging();
  addMarkerMouseup();
}

function searchResult(result) {
  if (result.getStatus() == 0) {
    console.log("result ===> ", result);
    const { addressComponent, formatted_address, location } = result?.resultObj
    currentInfo.province = addressComponent.province;
    currentInfo.city = addressComponent.city ? addressComponent.city : addressComponent.province;
    currentInfo.county = addressComponent.county;
    currentInfo.lng = location.lon; // 经度
    currentInfo.lat = location.lat; // 纬度
    currentInfo.address = formatted_address;
    console.log("currentInfo ===> ", currentInfo);
    position.value = result.getAddress();
    console.log("position ===> ", position.value);
  }
}

function addMarkerMouseup() {
  marker.addEventListener("mouseup", markerMouseup);
}
function markerMouseup(e) {
  geocode.getLocation(e.lnglat, searchResult);
}


// 搜索地图点位
function handleSearch(keyword) {
  localsearch.search(keyword)
}

const searchResList = ref([])
function localSearchResult(result) {
  console.log("localSearchResult ===> ", result);
  searchResList.value = []
  // 添加提示词
  // prompt(result);
  const obj = result.getPois()
  obj.forEach(el => {
    const lnglatArr = el.lonlat.split(",")
    const info = {
      name: el.name,
      address: el.address,
      lnglatArr,
      lnglat: new T.LngLat(lnglatArr[0], lnglatArr[1]),
      id: el.hotPointID
      // winHtml: "名称:" + el.name + "<br/>地址:" + el.address
    }
    searchResList.value.push(info);
  })
  console.log("searchResList.value ==> ", searchResList.value);

  // if (obj) {
  //   //显示搜索列表
  //   var divMarker = document.createElement("div");
  //   //坐标数组，设置最佳比例尺时会用到
  //   var zoomArr = [];
  //   for (var i = 0; i < obj.length; i++) {
  //     //闭包
  //     (function (i) {
  //       //名称
  //       var name = obj[i].name;
  //       //地址
  //       var address = obj[i].address;
  //       //坐标
  //       var lnglatArr = obj[i].lonlat.split(",");
  //       var lnglat = new T.LngLat(lnglatArr[0], lnglatArr[1]);
  //
  //       var winHtml = "名称:" + name + "<br/>地址:" + address;
  //
  //       //创建标注对象
  //       var marker = new T.Marker(lnglat);
  //       //地图上添加标注点
  //       map.addOverLay(marker);
  //       //注册标注点的点击事件
  //       var markerInfoWin = new T.InfoWindow(winHtml, {autoPan: true});
  //       marker.addEventListener("click", function () {
  //         marker.openInfoWindow(markerInfoWin);
  //       });
  //
  //       zoomArr.push(lnglat);
  //
  //       //在页面上显示搜索的列表
  //       var a = document.createElement("a");
  //       a.href = "javascript://";
  //       a.innerHTML = name;
  //       a.onclick = function () {
  //         showPosition(marker, winHtml);
  //       }
  //       divMarker.appendChild(document.createTextNode((i + 1) + "."));
  //       divMarker.appendChild(a);
  //       divMarker.appendChild(document.createElement("br"));
  //     })(i);
  //   }
  // //显示地图的最佳级别
  // map.setViewport(zoomArr);
  // //显示搜索结果
  // divMarker.appendChild(document.createTextNode('共' + localsearch.getCountNumber() + '条记录，分' + localsearch.getCountPage() + '页,当前第' + localsearch.getPageIndex() + '页'));
  // document.getElementById("searchDiv").appendChild(divMarker);
  // document.getElementById("resultDiv").style.display = "block";
  // }
}


function handleSearchItemClick(obj) {
  map?.clearOverLays();
  creatPoint(obj.lnglatArr[0], obj.lnglatArr[1]);

  map.centerAndZoom(new T.LngLat(obj.lnglatArr[0], obj.lnglatArr[1]), zoom);
}


</script>

<style lang="scss" scoped>
.left {
  width: 70%;

  #mapDiv {
    width: 100%;
    height: 400px;
  }
}

.map-wrap {
  display: flex;
  width: 100%;
}
</style>
