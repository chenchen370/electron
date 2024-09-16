<template>
  <div class="image-text-list-wrap">
    <el-empty v-if="queryOpt.thingList.length === 0" />
    <div v-else flex="~ col">
      <div
        class="cultural-item"
        v-for="(item, index) in queryOpt.thingList"
        :key="item.id"
        :style="{
          marginBottom: index !== queryOpt.thingList.length - 1 && '20px'
        }"
      >
        <div flex items-center class="img-wrap">
          <image-preview :width="158" :height="136" :src="item.relicPath" />
        </div>

        <div class="right">
          <el-row :span="24" class="title-wrap">
            <div class="title-cont">
              <span class="title line-1">{{ item.relicName }}</span>
              <!--              <span class="yi-pu">一普</span>-->
              <!--              <span class="zhen">珍</span>-->
              <!--              <span class="zai-ku">在库</span>-->
            </div>
            <span class="detail" @click="handleCheckRow(item)">已录入指标</span>
          </el-row>

          <el-row :span="24" class="border-bottom">
            <el-col :span="8" class="desc-item border-right">
              <span class="label">文物级别：</span>
              <span class="value">
                {{ item.relicLevel }}
              </span>
            </el-col>

            <el-col :span="8" class="desc-item border-right">
              <span class="label label-2">质地子类别：</span>
              <span class="value">
                {{ item.relicCategory }}
              </span>
            </el-col>

            <el-col :span="8" class="desc-item">
              <span class="label label-3">库房（库区）名称：</span>
              <span class="value">
                {{ item.relicWarehouse }}
              </span>
            </el-col>
          </el-row>

          <el-row :span="24" class="border-bottom">
            <el-col :span="8" class="desc-item border-right">
              <span class="label">文物类别：</span>
              <span class="value">
                {{ item.relicCategory }}
              </span>
            </el-col>

            <el-col :span="8" class="desc-item border-right">
              <span class="label label-2">入库时间：</span>
              <span class="value">
                {{ item.relicTime }}
              </span>
            </el-col>

            <el-col :span="8" class="desc-item">
              <span class="label label-3">文物来源方式：</span>
              <span class="value">
                {{ item.relicFrom }}
              </span>
            </el-col>
          </el-row>

          <el-row :span="24">
            <el-col :span="8" class="desc-item border-right">
              <span class="label">完残程度：</span>
              <span class="value">
                {{ item.relicCompleteness }}
              </span>
            </el-col>

            <el-col :span="8" class="desc-item border-right">
              <span class="label label-2">年代：</span>
              <span class="value">
                {{ item.relicYears }}
              </span>
            </el-col>

            <el-col :span="8" class="desc-item">
              <span class="label label-3">保护优先等级：</span>
              <span class="value"> </span>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  queryOpt: {
    type: Object,
    default: () => ({})
  }
})

const emits = defineEmits(['handleCheckRow'])

function handleCheckRow(item) {
  emits('handleCheckRow', item)
}
</script>

<style lang="scss" scoped>
.cultural-item {
  display: flex;
  border: 1px solid #8ca29d;

  .img-wrap {
    padding: 10px;
    border-right: 1px solid #8ca29d;
  }

  .right {
    width: calc(100% - 179px);
    .el-row {
      height: 40px;
    }
  }

  .title-wrap {
    width: 100%;
    padding: 0px 30px;
    border-bottom: 1px solid #8ca29d;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .title-cont {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: calc(100% - 100px);
      .title {
        max-width: calc(100% - 200px);
        //border: 1px solid red;
        font-family:
          Source Han Serif CN,
          Source Han Serif CN;
        font-weight: 600 !important;
        font-size: 18px !important;
        color: #000000;
        line-height: 40px !important;
        text-align: left !important;
        font-style: normal !important;
        text-transform: none !important;
        cursor: pointer;
        margin-right: 11px;
      }

      .yi-pu,
      .zhen,
      .zai-ku {
        font-family: Source Han Serif CN;
        font-size: 14px;
        font-weight: normal;
        line-height: 14px;
        font-variation-settings: 'opsz';
        font-feature-settings: 'kern';
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 90px;
        padding: 5px 8px;
      }

      .yi-pu {
        background: #b6a117;
        margin-right: 11px;
      }
      .zhen {
        background: #9e3f3f;
        margin-right: 11px;
      }
      .zai-ku {
        background: #38675c;
      }
    }

    .detail {
      cursor: pointer;
      font-family:
        Source Han Serif CN,
        Source Han Serif CN;
      font-weight: 400;
      font-size: 16px;
      color: #38675c;
      line-height: 16px;
      text-align: left;
      font-style: normal;
      text-decoration-line: underline;
      text-transform: none;

      text-decoration: underline;
      text-underline-offset: 3px; /* 文字与下划线之间的间距 */
    }
  }

  .desc-item {
    display: flex;
    padding: 9px 0 9px 30px;
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

      overflow: hidden; /* 规定超出内容宽度的元素隐藏 */
      white-space: nowrap; /* 规定文本是否折行 */
      text-overflow: ellipsis !important;
    }
    .label-2 {
      width: 100px;
      text-align: right;
    }

    .label-3 {
      width: 146px;
      text-align: right;
    }

    .value {
      //width: calc(100% - 146px);
      color: #8ca29d;
      //border: 1px solid red;
      display: inline-block;
      overflow: hidden; /* 规定超出内容宽度的元素隐藏 */
      white-space: nowrap; /* 规定文本是否折行 */
      text-overflow: ellipsis !important;
    }
  }

  .border-right {
    border-right: 1px solid #8ca29d;
  }

  .border-bottom {
    border-bottom: 1px solid #8ca29d;
  }
}
</style>
