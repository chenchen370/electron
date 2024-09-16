<script setup>

import TopCard from '@/views/collection/outboundProcess/cpns/topCard.vue'
import BottomList from '@/views/collection/outboundProcess/cpns/bottomList.vue'
import SearchNav from '@/views/collection/outboundProcess/cpns/searchNav.vue'
import * as echarts from 'echarts';
onMounted(()=>{
  init()
})
const echartsRef=ref(null)
const init=()=>{
  var myChart = echarts.init(echartsRef.value);
// 指定图表的配置项和数据
  var option = {
    title: {
      text: '库房藏品统计'
    },
    grid:{
      left: '80',
      bottom:'40',
      right:'30'
    },
    tooltip: {},
    xAxis: {
      data: ['历史库', '书画库', '陶瓷库', '工艺库', '工艺部专库', '其他','未配置'],
      axisLabel: {
        color:'#BCBCBC'
      },
      color:'#000000'
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [6013, 18056, 3279, 1367, 2123, 12312,121,3333],
        label: {
          show:true,
          position: 'top',
          color:'#39685D',
        },
        itemStyle: {
          borderRadius: [2, 2, 0, 0], //柱体圆角
          color: new echarts.graphic.LinearGradient(
            //前四个参数用于配置渐变色的起止位置，这四个参数依次对应 右下左上 四个方位。也就是从右边开始顺时针方向。
            //通过修改前4个参数，可以实现不同的渐变方向
            /*第五个参数则是一个数组，用于配置颜色的渐变过程。
              每项为一个对象，包含offset和color两个参数
            */
            0, 1, 0, 0,
            [
              {//代表渐变色从正上方开始
                offset: 0, //offset范围是0~1，用于表示位置，0是指0%处的颜色
                color: 'rgba(246, 255, 8, 0)'
              }, //柱图渐变色
              {
                offset: 1, //指100%处的颜色
                color: 'rgba(114, 147, 138, 1)'
              }
            ]
          ),
        },
        // markPoint: {
        //   data: [
        //     // 使用标记的coord 系列的每个数据点的坐标
        //     { type: 'max', name: '最大值', symbol: 'rect' },
        //     { type: 'min', name: '最小值', symbol: 'rect' }
        //   ],
        //   symbolSize: [145, 20], // 标记的大小，宽度和高度
        //   label: {
        //     show: false
        //   },
        //   itemStyle: {
        //     color: '#72938A' // 标记的颜色
        //   },
        //   // 标记的位置调整
        //   position: function (points) {
        //     return [points[0].coord[0] - points[0].symbolSize[0] / 2, points[0].coord[1]];
        //   }
        // }
      }
    ]
  };

// 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
}
</script>

<template>
  <div class="outboundProcess">
    <top-card/>
    <bottom-list/>
    <search-nav/>
    <div class="echarts">
      <div ref="echartsRef" style="width: 100%;height:500px;"></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.echarts{
  margin-top: 30px;
}
</style>
