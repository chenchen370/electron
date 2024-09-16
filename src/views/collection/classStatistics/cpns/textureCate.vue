<script setup>
const list = new Array(2).fill(
  [
    {
      name: '木：',
      piece: 680
    },
    {
      name: '竹：',
      piece: 680
    },
    {
      name: '纸：',
      piece: 680
    },{
    name:'毛',
    piece: 900
  },
    {
      name:'丝',
      piece: 1
    },
    {
      name:'皮革',
      piece: 1
    },
    {
      name:'骨角牙',
      piece: 1
    },
    {
      name:'棉麻纤维',
      piece: 1
    },
    {
      name:'其他植物质：',
      piece:75
    },
    {
      name:'其他有机质：',
      piece:87
    }
  ]
)
console.log(list)
</script>

<template>
  <div class="textureCate">
    <div>
      <p class="nav">有机质<span>55630</span><i>件</i></p>
      <ul>
        <li v-for="item in list[0]">
          <span>{{ item.name }}</span>
          <p>{{ item.piece }}<i>件</i></p>
        </li>
      </ul>
    </div>
    <div style="margin-left: 10px">
      <p class="nav">无机质<span>22917</span><i>件</i></p>
      <ul>
        <li v-for="item in list[1]">
          <span>{{ item.name }}</span>
          <p>{{ item.piece }}<i>件</i></p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.textureCate {
  display: flex;

  div {
    width: 50%;
    position: relative;

    &::before {
      position: absolute;
      top: -8px;
      content: '';
      left: 0;
      width: 100%;
      height: 6px;
      background: #855DAA;
    }

    .nav {
      height: 87px;
      line-height: 87px;
      text-align: center;
      background: #FFFFFF;
      margin: 0;
      font-size: 30px;
      color: #000000;
      font-weight: 300;

      span {
        font-size: 30px;
        color: #000000;
        margin-left: 10px;
      }

      i {
        font-size: 14px;
        color: #000000;
        margin-left: 10px;
      }
    }

    ul {
      background: #EDECEE;
      margin: 0;
      list-style: none;
      padding: 22px   206px 83px;
      box-sizing: border-box;

      li {
        line-height: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span{
          font-size: 16px;
          color: #000000;
        }
        p{
          font-size: 20px;
          color: #000000;
          i{
            margin-left: 10px;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
