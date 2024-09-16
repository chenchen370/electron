<script setup>
const list = new Array(
  4
).fill([{
  name: '玉石器、宝石：',
  piece: 2137
}, {
  name: '陶器：',
  piece: 2137
}, {
  name: '瓷器：',
  piece: 2137
}, {
  name: '铜器：',
  piece: 2137
}, {
  name: '金银器：',
  piece: 2137
}, {
  name: '铁器，其他金属器：',
  piece: 2137
}, {
  name: '漆器：',
  piece: 2137
}, {
  name: '雕塑、造像：',
  piece: 2137
}, {
  name: '石器、石刻、砖瓦：',
  piece: 2137
}])
console.log(list)
</script>

<template>
  <div class="antiquTypeList">
    <ul>
      <li v-for="item in  list">
        <template v-for="ite in item">
          <div class="flex">
            <p>{{ ite.name }}</p>
            <p>{{ ite.piece }}<i style="margin-left: 10px">件</i></p>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.antiquTypeList {
  ul {
    display: flex;
    padding-left: 0;
    list-style: none;

    li {
      flex: 1;
      width: 25%;
      height: 412px;
      background: #FFFFFF;
      position: relative;
      margin-right: 7px;
      display: flex;
      flex-direction: column;
      padding: 25px 12px;
      line-height: 35px;
      box-sizing: border-box;


      &::before {
        position: absolute;
        top: -8px;
        left: 0;
        content: '';
        width: 100%;
        height: 6px;
        background: #F6BB3D;
      }

      .flex {
        display: flex;
        justify-content: space-between;

        p {
          margin: 0;
        }

        p:first-child {
          font-size: 16px;
          color: #000000;
        }

        p:last-child {
          font-size: 30px;
          color: #000000;

          i {
            font-size: 14px;
            color: #000000;
          }
        }
      }
    }
  }
}
</style>
