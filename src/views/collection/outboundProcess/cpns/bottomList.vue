<script setup>
const list = [
  {
    name: '展览',
    num: 0
  },
  {
    name: '修复',
    num: 0
  },
  {
    name: '照相',
    num: 1
  },
  {
    name: '复制',
    num: 1
  },
  {
    name: '建档',
    num: 0
  },
  {
    name: '鉴定',
    num: 0
  },
  {
    name: '观摩',
    num: 0
  },
  {
    name: '移库',
    num: 0
  },
  {
    name: '其他',
    num: 0
  }
]
</script>

<template>
  <div class="bottomList">
    <span></span>
    <div class="flex">
      <div v-for="item in  list" :key="item" class="rowL">
        <h2>{{ item.name }}</h2>
        <p>{{ item.num }}<i>件</i></p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.bottomList {
  width: 98%;
  height: 158px;
  background: #FFFFFF;
  border-radius: 10px 10px 10px 10px;
  position: relative;

  span {
    position: absolute;
    left: 0;
    top: -30px;
    width: 32.5%;
    height: 46px;
    background: #FFFFFF;

    &::before {
      position: absolute;
      content: '提用类型';
      width: 190px;
      height: 46px;
      text-align: center;
      line-height: 46px;
      background: #EEF3EF;
      border-radius: 0 10px 10px 0;
      font-size: 14px;
    }
  }

  .flex {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .rowL {
      padding-top: 40px;

      h2 {
        font-size: 18px;
        color: #000000;
      }

      p {
        margin: 0;
        font-size: 30px;
        color: #000000;

        i {
          font-weight: 300;
          font-size: 14px;
          color: #000000;
          margin-left: 5px;
        }
      }
    }
  }
}
</style>
