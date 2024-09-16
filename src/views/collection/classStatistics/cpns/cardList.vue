<script setup>
defineProps({
  item: {
    type: Object,
    default() {
      return {}
    }
  }
})
</script>

<template>
  <div class="card_list">
    <div class="item">
      <div v-if="item.type===2" class="content other_L">
        <div class="top">
          <span class="dynasty">{{ item.dynasty }}</span>
          <span class="piece"><span class="piece_num ml20" style="font-size: 20px">{{ item.piece }}</span><i>件</i></span>
        </div>
        <div class="bottom" :style="{height:item.height+'px'}">
          <div v-for="(it,index) in item.otherList" class="other_item">
            <div class="flex">
              <span>{{ it.dynasty }}</span>
              <p>{{ it.year }}</p>
            </div>
            <p class="piece" v-if="it.piece"><span class="piece_num">{{ it.piece }}</span><i>件</i></p>
          </div>
        </div>
      </div>
      <div v-if="item.type===3" :style="{height:item.height+'px'}" class="other_other">
        <div class="top">
          <span class="dynasty">{{ item.dynasty }}</span>
          <span class="piece"><span class="piece_num ml20">{{ item.piece }}</span><i>件</i></span>
        </div>
        <div class="otherDyTitle">
          <p>
            <span class="dynasty">{{ item.otherObj1.dynasty }}</span>
            <span class="piece">{{ item.otherObj1.piece }}<i style="margin-left: 10px">件</i></span>
          </p>
          <p style="margin-left: 6px">
            <span class="dynasty">{{ item.otherObj2.dynasty }}</span>
            <span class="piece">{{ item.otherObj2.piece }}<i style="margin-left: 10px">件</i></span>
          </p>
        </div>
        <div class="bottom">
          <div class="bottomC">
            <div v-for="(it,index) in item.otherObj1.otherList1" class="other_item">
              <div class="flex">
                <span>{{ it.dynasty }}</span>
                <p>{{ it.year }}</p>
              </div>
              <p class="piece" v-if="it.piece"><span class="piece_num">{{ it.piece }}</span><i>件</i></p>
            </div>
          </div>
          <div class="bottomC" style="margin-left: 6px">
            <div v-for="(it,index) in item.otherObj2.otherList2" class="other_item">
              <div class="flex">
                <span>{{ it.dynasty }}</span>
                <p>{{ it.year }}</p>
              </div>
              <p class="piece" v-if="it.piece"><span class="piece_num">{{ it.piece }}</span><i>件</i></p>
            </div>
          </div>
        </div>
      </div>
      <div v-if="item.type===1" class="content basic_c" :style="{height:item.height+'px'}">
        <span>{{ item.dynasty }}</span>
        <p>{{ item.year }}</p>
        <p class="piece" v-if="item.piece"><span class="piece_num">{{ item.piece }}</span><i style="margin-left: 10px;">件</i></p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card_list {
  .item {
    position: relative;
    background-color: white;

    &::before {
      position: absolute;
      content: '';
      top: 0;
      width: 100%;
      height: 6px;
      background: #39685D;
    }

    .basic_c {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .content {
      height: 216px;
      background: #FFFFFF;
      font-weight: 300;

      span {
        font-size: 30px;
        color: #000000;
      }

      p {
        font-size: 16px;
        color: #000000;
      }

      .piece {
        font-weight: 300;

        .piece_num {
          font-size: 30px;
        }

        i {
          font-size: 14px;
          color: #000000;
          font-style: normal;
        }
      }

      .top {
        height: 70px;
        line-height: 70px;
        text-align: center;

        .ml20 {
          margin-left: 20px;
        }

        .dynasty {
          font-size: 30px;
        }
      }

    }

    .other_L {
      font-size: 18px;

      .flex {
        display: flex;
      }

      .other_item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        line-height: 30px;
      }

      span {
        font-size: 18px;
        color: #000000;
      }

      p {
        font-size: 16px;
        color: #000000;
        margin: 0;
      }

      .piece {
        font-weight: 300;

        .piece_num {
          font-size: 16px;
          margin-right: 10px;
        }

        i {
          font-size: 14px;
          color: #000000;
          font-style: normal;
        }
      }

      .bottom {
        background-color: #EAF0EF;
        width: 100%;
        height: 240px;
        padding: 15px 20px;
        box-sizing: border-box;
      }
    }

    .other_other {
      .top {
        height: 70px;
        line-height: 70px;
        text-align: center;
        background: #FFFFFF;

        .dynasty {
          font-size: 30px;
          color: #000000;
          font-weight: 300;
        }

        .piece {
          font-weight: 300;

          .piece_num {
            font-size: 16px;
            margin-right: 10px;
          }

          i {
            font-size: 14px;
            color: #000000;
            font-style: normal;
          }
        }
      }

      .otherDyTitle {
        display: flex;

        p {

          margin: 0;
          width: 50%;
          height: 45px;
          background-color: #F8F8F8;
          text-align: center;
          line-height: 45px;

          .dynasty {
            font-size: 30px;
            color: #000000;
            font-weight: 300;
          }

          .piece {
            font-weight: 300;
            margin-left: 10px;

            .piece_num {
              font-size: 16px;
              margin-right: 10px;
            }

            i {
              font-size: 14px;
              color: #000000;
              font-style: normal;
            }
          }
        }
      }

      .bottom {
        display: flex;
        justify-content: space-between;

        .bottomC {
          width: 100%;
          height: 193px;
          background-color: #EAF0EF;
          padding: 15px;
          overflow: auto;
        }

        .other_item {
          width: 100%;
          // display: flex;
          // justify-content: space-between;
          // line-height: 0;
          font-weight: 300;

          .flex {
            display: flex;
            align-items: center;
            justify-content: space-between;
            span {
              font-size: 12px;
            }
            p {
              margin: 0;
              font-size: 12px;
            }
            .dynasty {
              font-size: 30px;
              color: #000000;
              font-weight: 300;
            }

          }
          .piece {
            font-weight: 300;
            text-align: right;

            .piece_num {
              font-size: 16px;
              margin-right: 10px;
            }

            i {
              font-size: 14px;
              color: #000000;
              font-style: normal;
            }
          }

        }
      }
    }
  }
}
</style>
