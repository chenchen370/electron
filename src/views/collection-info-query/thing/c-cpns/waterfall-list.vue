<template>
  <div v-masonry class="container" transition-duration="0.2s" :options="state.masonryOptions" :gutter="20">
    <template v-if="props.list.length > 0">
      <div
        v-masonry-tile
        v-for="(item, index) in props.list"
        :key="index"
        class="item"
        :style="{
          width: `${100 / state.imagePerRow - 7}%`
        }"
        @click="handleCheckRow(item)"
      >
        <div class="img-wrap">
          <!--          <img :src="state.items[getRandomNumber(1, 3)]" alt="" srcset="" style="width: 100%; height: 100%" />-->
          <img :src="item?.relicPath ?? ''" alt="" srcset="" style="width: 100%; height: 100%" />
          <div class="img-tip">
            <span class="img-tip-1">已录</span>
            <span class="img-tip-2">核心指标</span>
          </div>
        </div>

        <div class="text-wrap">
          <h2 class="ellipsis title">{{ item.relicName }}</h2>

          <div class="text-item">
            <span class="label">藏品总登记号：</span>
            <span class="value">{{ item.relicId }}</span>
          </div>

          <div class="text-item">
            <span class="label">文物级别：</span>
            <span class="value status">{{ item.relicLevel }}</span>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { defineProps, reactive } from 'vue'
import cultural from '@/assets/images/pic1.png'
import img from '@/assets/images/pic2.png'
import img3 from '@/assets/images/pic3.png'

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})
watch(
  () => props.list,
  value => {
    console.log('value', value)
  },
  {
    immediate: true,
    deep: true
  }
)
const state = reactive({
  items: [
    cultural,
    img,
    img3,
    cultural,
    img,
    img3,
    cultural,
    img,
    img3,
    cultural,
    img,
    img3,
    cultural,
    img,
    img3
    // 你的项目数据
  ],
  imagePerRow: 4, // 设置每行显示的图片数量，可以根据需要更改
  masonryOptions: {
    // 可以在此添加其他配置选项
    fixedSpacing: 10
  }
})

const emits = defineEmits(['handleCheckRow'])
function handleCheckRow(item) {
  emits('handleCheckRow', item)
}
</script>
<style lang="scss" scoped>
.container {
  padding: 0 20px;

  .item {
    margin-bottom: 10px;
    cursor: pointer;
    &:hover {
      transition: all 0.3s ease;
      padding: 10px;
      border: 2px solid #8ca29d;
    }

    .img-wrap {
      position: relative;

      img {
        min-height: 50px;
        border-radius: 9px 9px 9px 9px;
      }
      .img-tip {
        position: absolute;
        right: 13px;
        bottom: 8px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
      .img-tip-1,
      .img-tip-2 {
        border-radius: 90px;
        padding: 5px 7px;
        font-family:
          Source Han Serif CN,
          Source Han Serif CN;
        font-weight: 400;
        font-size: 12px;
        color: #ffffff;
        line-height: 12px;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }
      .img-tip-1 {
        background-color: #61d49f;
      }

      .img-tip-2 {
        margin-left: 5px;
        background-color: #ff6000;
      }
    }

    .text-wrap {
      .title {
        margin: 11px 0;
        font-family:
          Source Han Serif CN,
          Source Han Serif CN;
        font-weight: 600;
        font-size: 18px;
        color: #000000;
        line-height: 26px;
        text-align: left;
        font-style: normal;
        text-transform: none;
      }

      .text-item {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .label,
        .value {
          font-family:
            Source Han Serif CN,
            Source Han Serif CN;
          font-weight: 400;
          font-size: 16px;
          color: #666666;
          line-height: 23px;
          text-align: left;
          font-style: normal;
          text-transform: none;
        }

        .status {
          color: #064235 !important;
        }
      }
    }
  }

  .ellipsis {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
