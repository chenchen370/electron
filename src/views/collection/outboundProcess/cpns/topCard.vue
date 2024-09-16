<script setup>
const list = [
  {
    bgColor: '#39685D',
    text: '库',
    name: '在库',
    num: 79804
  },
  {
    bgColor: '#7440B6',
    text: '不',
    name: '不在库',
    num: 647
  },
  {
    bgColor: '#F9215E',
    text: '馆',
    name: '本馆在展',
    oText: '（不含外借藏品）',
    num: 0
  },
  {
    bgColor: '#7CBC16',
    text: '藏',
    name: '本馆藏品',
    num: 647
  },
  {
    bgColor: '#FF9000',
    text: '借',
    name: '外借藏品',
    num: 0,
    width:'29%',
  },
  {
    bgColor: '#FFB412',
    text: '提',
    name: '提用',
    num: 2,
    width:'32%',
  },
  {
    bgColor: '#F159E1',
    text: '展',
    name: '在展',
    name1:'其中外借藏品',
    num1:0,
    num: 645,
    width:'35%',
  },
  {
    bgColor: '#40B699',
    text: '其',
    name: '其他原因',
    num: 0,
    width:'32%',
  }
]
</script>

<template>
  <div class="topCard">
    <div v-for="(item,index) in list" :key="index+item.name" class="item" :style="{'width':item.width?item.width:'20%'}" >
      <span class="text" :style="{'background':item.bgColor}">{{ item.text }}</span>
      <div class="con">
        <h2>{{ item.name }}</h2>
        <h3>{{ item.oText }}</h3>
        <p :style="{'margin-top':index===2?'15px':'27px'}">{{ item.num }}<i>件</i></p>
      </div>
      <div class="con" v-if="item.name1">
        <h2>{{ item.name1 }}</h2>
        <p :style="{'margin-top':index===2?'15px':'27px'}">{{ item.num1 }}<i>件</i></p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.topCard {
  display: flex;
  flex-wrap: wrap;

  .item {
    height: 131px;
    margin-bottom: 30px;
    background: #FFFFFF;
    border-radius: 10px 10px 10px 10px;
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    margin-right: 20px;
    padding-top: 20px;
    //padding: 20px 45px 32px 24px;
    position: relative;
    .text {
      position: absolute;
      top: 20px;
      left: 25px;
      display: block;
      border-radius: 50%;
      width: 35px;
      height: 35px;
      background: #39685D;
      color: #FFFFFF;
      text-align: center;
      line-height: 35px;
      font-family: REEJI-Top, REEJI-Top;
      font-weight: normal;
    }

    .con {
      text-align: center;

      h2 {
        font-size: 30px;
        color: #000000;
        margin: 0;
        font-weight: 300;
      }

      h3 {
        font-size: 12px;
        color: #000000;
        margin: 0;
        padding-top: 5px;
      }

      p {

        font-size: 30px;
        color: #000000;
        font-weight: 300;

        i {
          font-size: 14px;
          color: #000000;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
