<template>
  <div>
    <div :class="['container', showClass]">
      <div
        v-for="(val, index) in pointData"
        class="ml-point"
        :class="{ active: val.isActive }"
        :style="{
          left: val.left + 'px',
          top: val.top + 'px',
          transform: 'rotate(' + val.rotate + 'deg)'
        }"
        :key="index"
      >
        <div class="points"></div>
        <div :class="'ml-point-name ' + val.namePosition">
          {{ val.name }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="jsx">
const showClass = ref('');
const showIndex = ref(-1);
const pointData = ref([
  {
    name: '点位1',
    type: 203,
    sort: 1028,
    id: 98923,
    namePosition: 'bottom',
    valPosition: 'bottom',
    left: 188,
    rotate: 22,
    top: 158,
    status: ''
  },
  {
    name: '点位2',
    type: 203,
    sort: 1029,
    id: 98916,
    namePosition: 'left',
    valPosition: 'bottom',
    left: 336,
    top: 335,
    status: 'alarm'
  },
  {
    name: '点位3',
    type: 203,
    sort: 1020,
    id: 98926,
    namePosition: 'top',
    valPosition: 'top',
    left: 115,
    top: 295,
    status: 'alarm'
  },
  {
    name: '点位4',
    id: 0,
    type: 203,
    sort: 1026,
    namePosition: 'bottom',
    valPosition: 'bottom',
    left: 235,
    top: 468,
    status: 'alarm'
  },
  {
    name: '点位5',
    id: 0,
    type: 203,
    sort: 1031,
    namePosition: 'right',
    valPosition: 'bottom',
    left: 432,
    top: 95,
    status: 'alarm'
  },
  {
    name: '点位6',
    id: 0,
    type: 203,
    sort: 1023,
    namePosition: 'left-top',
    valPosition: 'bottom',
    left: 497,
    top: 222,
    status: 'alarm'
  },
  {
    name: '点位7',
    id: 0,
    type: 203,
    sort: 1001,
    areaId: 400849,
    namePosition: 'bottom',
    valPosition: 'bottom',
    left: 220,
    top: 200,
    status: 'alarm'
  },
  {
    name: '点位8',
    id: 0,
    type: 203,
    sort: 1004,
    areaId: 400859,
    namePosition: 'left',
    valPosition: 'bottom',
    left: 133,
    top: 395,
    status: 'alarm'
  },
]);
</script>
<style lang="scss" scoped>
.container {
  width: 1068px;
  height: 600px;
  margin: 0 auto;
  position: relative;
  background: url('@/assets/images/bg-gh.png') no-repeat 50% 50%;
  .ml-point {
    position: absolute;

    .i-line {
      position: absolute;
    }

    .i-line-1001 {
      left: -150px;
      top: 4px;
    }

    .i-line-1002 {
      left: -6px;
      top: 4px;
    }

    .i-line-1003 {
      left: -4px;
      top: -124px;
    }

    &.active {
      width: 30px;
      height: 30px;
      border-width: 5px;

      .ml-point-name {
        &.top {
          bottom: 40px;
          left: -44px;
        }

        &.left-top {
          bottom: 25px;
          left: -100px;
        }
      }
    }

    .ml-point-name {
      position: absolute;
      width: 108px;
      text-align: center;
      font-size: 16px;
      color: #fff;

      &.left {
        right: 0;
        top: -32px;

        .i-code {
          left: 80px;
          top: 30px;
        }
      }

      &.bottom {
        top: 12px;
        left: -44px;

        .i-code {
          top: 8px;
          left: 42px;
        }
      }

      &.top {
        bottom: 22px;
        left: -44px;

        .i-code {
          top: -2px;
          left: 44px;
        }
      }

      &.right {
        left: 15px;
        top: -30px;

        .i-code {
          right: 80px;
          top: 27px;
        }
      }

      &.left-top {
        bottom: 35px;
        left: -115px;

        .i-code {
          right: 0px;
        }
      }

      &.left-bottom {
        bottom: -34px;
        left: -100px;

        .i-code {
          right: 0px;
        }
      }

      &.right-top {
        bottom: 0;
        left: 10px;

        .i-code {
          right: 0px;
        }
      }

      &.right-bottom {
        bottom: -15px;
        left: 5px;

        .i-code {
          right: 0px;
        }
      }

      .i-code {
        position: absolute;
        width: 20px;
        color: #fff;

        &.active {
          color: #ff0004;
        }

        .ml-point-vals {
          position: absolute;
          box-sizing: border-box;
          min-width: 92px;
          padding: 2px 5px;
          background: #082a48;
          border-radius: 4px;
          color: #00ffae;
          font-size: 16px;

          &.left {
            top: -3px;
            left: -100px;
          }

          &.top {
            top: -26px;
            left: -35px;
          }

          &.right {
            left: 25px;
            top: -3px;
          }

          &.bottom {
            left: -35px;
            top: 25px;
          }

          &.right-bottom {
          }
        }
      }

      .ml-point-val {
        position: absolute;
        box-sizing: border-box;
        min-width: 92px;
        padding: 2px 5px;
        background: #082a48;
        border-radius: 4px;
        color: #00ffae;
        font-size: 16px;
        white-space: nowrap;

        &.bottom {
          top: 24px;
          left: 50%;
          transform: translateX(-50%);
        }

        &.top {
          bottom: 25px;
          left: 50%;
          transform: translateX(-50%);
        }

        &.left {
          right: 80px;
          top: -2px;
        }

        &.right {
          left: 80px;
          top: -2px;
        }

        &.isView {
          display: none;
        }

        .nbsp {
          margin: 0 5px;
        }
      }
    }
  }
  .points {
    height: 20px;
    width: 20px;
    position: absolute;
    left: -4px;
    top: -4px;
    z-index: 9;
    cursor: auto;
    background: #052b4d;
    border: 2px solid #00b9fe;
    border-radius: 50%;
    font-size: 20px;
    color: #fff;
    text-align: center;
    line-height: 20px;
  }
}
</style>
