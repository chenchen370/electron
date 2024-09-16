<template>
  <el-dialog class="coder-wang-dialog" v-model="open" :title="props.title" :width="props.width" append-to-body
    :before-close="handleCancel" align-center :show-close="false">
    <div class="dashboard-editor-container">
      <div id="mapDiv" style="position: absolute; width: 96%; height: 80%"></div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">

import { ref } from 'vue'

import { TDetailList } from '@/components/comm-cpns/dialog-detail/type.ts'
import MapTDT from '@/components/Map/MapTDT/index.vue'
import MapTrack from '@/components/Map/MapTDT/map-track.vue'
import { formatDate } from '@/utils'

//////////////////////////////
const dataMap = ref({})
// 响应式数据  
const data_info = ref([]);
const init = () => {

  //这里T指向天地图对象
  var T = window.T;
  //初始化地图，创建一个新的地图实例
  //其中 `T.Map` 接收的第一个参数是在html中天地图标签的ID
  //第二个参数是天地图的参考系，我这里设置的是 `EPSG:4326`，也就是WGS84 坐标参考系。
  //map = new T.Map("mapDiv","EPSG:4326");
  map = new T.Map("mapDiv");
  //这一步调用了天地图的setMapType方法，用来设置天地图的图层类型，我这里设置的是卫星图图层
  map.setMapType(window.TMAP_HYBRID_MAP);
  //这一步设置的是地图的初始化后的中心点坐标以及缩放级别
  //做完这一步，天地图就以及能在地图上显示出来了
  map.centerAndZoom(new T.LngLat(105.28501, 27.301693), zoom);

  //创建缩放平移控件对象(H5)
  control = new T.Control.Zoom();
  // //添加缩放平移控件(H5)
  map.addControl(control);

  // //这里我创建了一个手动选址的实例，以后再讲
  // var cb = new T.CoordinatePickup(map, {callback: handChoose})
  // cb.addEvent();
  //这里我创建了一个地址搜索的实例
  //第一个参数固定为你的天地图实例，也就是上面的map
  //第二个参数是每页显示的最大内容数量，我这里设置的是显示10个地名搜索结果
  //locateSearch = new T.LocalSearch(map,{pageCapacity:10})
  //这里是我自己写的一个显示行政区划边界范围的组件,以后在讲
  //var YT = totianjson(yantian,"red",0.5)
  //map.addOverLay(YT)

  //创建图片对象
  // var icon = new T.Icon({
  //   iconUrl:"http://api.tianditu.gov.cn/img/map/markerA.png",
  //   iconSize:new T.Point(19,27),
  //   iconAnchor:new T.Point(10,25)
  // })
  // //向地图上添加自定义标
  // var marker = new T.Marker(new T.LngLat(116.411794, 39.9068), {icon: icon});
  // map.addOverLay(marker);

  // //设置显示地图的中心点和级别
  // map.centerAndZoom(new T.LngLat(116.40969, 39.89945), zoom);
  // var latlng = new T.LngLat(116.420837,39.902395);
  // var label = new T.Label({
  //     text: "天地图：<a href='https://www.tianditu.gov.cn'  target='_blank'>https://www.tianditu.gov.cn </a>",
  //     position: latlng,
  //     offset: new T.Point(-9, 0)
  // });
  // //创建地图文本对象
  // map.addOverLay(label);


  // var definedOverlay = T.Overlay.extend({
  //             initialize: function (lnglat, text, text2, options) {
  //                 this.lnglat = lnglat;
  //                 this.setOptions(options);
  //                 this._text = text;
  //                 this._overText = text2;
  //             },

  //             onAdd: function (map) {
  //                 this.map = map;
  //                 var div = this._div = document.createElement("div");
  //                 div.style.position = "absolute";
  //                 div.style.backgroundColor = "#EE5D5B";
  //                 div.style.border = "1px solid #BC3B3A";
  //                 div.style.color = "white";
  //                 div.style.height = "18px";
  //                 div.style.padding = "2px";
  //                 div.style.lineHeight = "18px";
  //                 div.style.whiteSpace = "nowrap";
  //                 div.style.MozUserSelect = "none";
  //                 div.style.fontSize = "12px";
  //                 var span = this._span = document.createElement("span");
  //                 div.appendChild(span);
  //                 span.appendChild(document.createTextNode(this._text));
  //                 var that = this;

  //                 var arrow = this._arrow = document.createElement("div");
  //                 arrow.style.background = "url(http://map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png) no-repeat";
  //                 arrow.style.position = "absolute";
  //                 arrow.style.width = "11px";
  //                 arrow.style.height = "10px";
  //                 arrow.style.top = "22px";
  //                 arrow.style.left = "10px";
  //                 arrow.style.overflow = "hidden";
  //                 div.appendChild(arrow);

  //                 div.onmouseover = function () {
  //                     this.style.backgroundColor = "#6BADCA";
  //                     this.style.borderColor = "#0000ff";
  //                     this.getElementsByTagName("span")[0].innerHTML = that._overText;
  //                     arrow.style.backgroundPosition = "0px -20px";
  //                 }

  //                 div.onmouseout = function () {
  //                     this.style.backgroundColor = "#EE5D5B";
  //                     this.style.borderColor = "#BC3B3A";
  //                     this.getElementsByTagName("span")[0].innerHTML = that._text;
  //                     arrow.style.backgroundPosition = "0px 0px";
  //                 }

  //                 map.getPanes().overlayPane.appendChild(this._div);
  //                 this.update(this.lnglat);
  //             },

  //             onRemove: function () {
  //                 var parent = this.div.parentNode;
  //                 if (parent) {
  //                     parent.removeChild(this.div);
  //                     this.map = null;
  //                     this.div = null;
  //                 }
  //             },

  //             setLnglat: function (lnglat) {
  //                 this.lnglat = lnglat;
  //                 this.update();
  //             },
  //             getLnglat: function () {
  //                 return this.lnglat;
  //             },
  //             setPos: function (pos) {
  //                 this.lnglat = this.map.layerPointToLngLat(pos);
  //                 this.update();
  //             },
  //             /**
  //              * 更新位置
  //              */
  //             update: function () {
  //                 var pos = this.map.lngLatToLayerPoint(this.lnglat);
  //                 this._div.style.top = ( pos.y - 36) + "px";
  //                 this._div.style.left = (pos.x - 11) + "px";

  //             }
  //         });

  //         var point = new T.LngLat(116.40438, 39.87877);
  //         var pdefinedOverlay = new definedOverlay(point, "天坛公园", "北京市东城区天坛东路甲1号", {});
  //         map.addOverLay(pdefinedOverlay);

  // var data_info = [[116.417854,39.921988,"地址：北京市东城区王府井大街88号乐天银泰百货八层"],
  //     [116.406605,39.921585,"地址：北京市东城区东华门大街"],
  //     [116.412222,39.912345,"地址：北京市东城区正义路甲5号"]
  // ];
  // 从接口获取坐标数据并更新地图  
  getIndexData().then(data_info => {
    // 假设 data 是一个包含坐标的数组  
    // 你可以在这里添加标记、绘制路径等  
    // 例如，添加一个标记  
    for (var i = 0; i < data_info.length; i++) {
      //var marker = new T.Marker(new T.LngLat(data_info[i][0],data_info[i][1]));  // 创建标注
      var content = data_info[i][2];
      //map.addOverLay(marker);               // 将标注添加到地图中
      //创建图片对象
      var icon = new T.Icon({
        //iconUrl:"http://api.tianditu.gov.cn/img/map/markerA.png",
        iconUrl: iconUrl,
        iconSize: new T.Point(19, 19),
        iconAnchor: new T.Point(10, 25)
      })
      //向地图上添加自定义标
      var marker = new T.Marker(new T.LngLat(data_info[i][0], data_info[i][1]), { icon: icon });
      map.addOverLay(marker);
      addClickHandler(content, marker);
    }
  });


  function addClickHandler(content, marker) {
    marker.addEventListener("click", function (e) {
      openInfo(content, e)
    }
    );
  }
  function openInfo(content, e) {
    var point = e.lnglat;
    var marker = new T.Marker(point);// 创建标注
    var markerInfoWin = new T.InfoWindow(content, { offset: new T.Point(0, -30) }); // 创建信息窗口对象
    map.openInfoWindow(markerInfoWin, point); //开启信息窗口
  }
}


///////////////////////////
interface IProps {
  title?: string
  width?: string
  list?: TDetailList
  column?: number
}
const props = withDefaults(defineProps<IProps>(), {
  column: 2,
  title: '查看',
  width: '1280px',
  list: () => []
})

const emit = defineEmits(['handleCloseDetail'])

const open = ref<boolean>(true)

function handleCancel() {
  emit('handleCloseDetail')
}
</script>

<style scoped lang="scss">
:global(.dialog-detail) {
  --el-dialog-padding-primary: 0px;
}
</style>
