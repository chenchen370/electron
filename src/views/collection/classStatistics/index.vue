<script setup>

import EchartsBar from '@/components/comm-cpns/echarts/echarts-bar.vue'
import CardList from '@/views/collection/classStatistics/cpns/cardList.vue'
import AntiquTypeList from '@/views/collection/classStatistics/cpns/antiquTypeList.vue'
import TextureCate from '@/views/collection/classStatistics/cpns/textureCate.vue'

const yearList = ref({
  '中国历史学年代:': 60428,
  '地质年代:': 20,
  '考古学年代:': 2409,
  '公历纪年:': 9638,
  '帝王纪年:': 2,
  '其他:': 4798,
  '年代不详:': 2327
})
const cartList = [
  {
    dynasty: '夏',
    year: '（约前2070~前1600）',
    type: 1,
  },
  {
    dynasty: '商',
    year: '（前1600~前1046）',
    piece: 7,
    type: 1
  },
  {
    dynasty: '周',
    piece: 1,
    span: 6,
    height: 150,
    type: 2,
    otherList: [
      {
        dynasty: '西周',
        year: '（前1046~前771）',
        piece: 94
      },
      {
        dynasty: '东周',
        year: '（前770~前256）',
        piece: 172
      },
      {
        dynasty: '春秋时代',
        year: '（前770~前456）',
        piece: 163
      },
      {
        dynasty: '战国时代',
        span: 4,
        piece: 1

      }
    ]
  },
  {
    dynasty: '秦',
    year: '（前221~前206）',
    piece: 80,
    type: 1

  },
  {
    dynasty: '汉',
    piece: 2,
    span: 6,
    height: 150,
    type: 2,
    otherList: [
      {
        dynasty: '西汉',
        year: '（前206~公元25）',
        piece: 299
      },
      {
        dynasty: '东汉',
        year: '（前25~公元220）',
        piece: 429
      }
    ]
  },
  {
    dynasty: '三国',
    piece: 2,
    span: 4,
    type: 2,
    otherList: [
      {
        dynasty: '三国-魏',
        year: '（220-256）',
        piece: 1
      },
      {
        dynasty: '三国-蜀',
        year: '（221-263）',
        piece: 9
      },
      {
        dynasty: '三国-吴',
        year: '（222-280）',
        piece: 5
      }
    ]
  },
  {
    dynasty: '西晋',
    year: '（265~317）',
    piece: 508,
    height: 310,
    type: 1
  },
  {
    dynasty: '东晋十六国',
    piece: 4,
    span: 5,
    height: 289,
    type: 2,
    otherList: [
      {
        dynasty: '东晋',
        year: '（317-420）',
        piece: 299
      },
      {
        dynasty: '十六国',
        year: '（304~439）',
        piece: 4
      }
    ]
  },
  {
    dynasty: '南北朝',
    piece: 306,
    span: 7,
    height: 284,
    type: 3,
    otherObj1: {
      dynasty: '南朝',
      piece: 143,
      otherList1: [
        {
          dynasty: '东晋',
          year: '（317-420）',
          piece: 299
        },
        {
          dynasty: '十六国',
          year: '（304~439）',
          piece: 4
        },
        {
          dynasty: '东晋',
          year: '（317-420）',
          piece: 299
        },
        {
          dynasty: '十六国',
          year: '（304~439）',
          piece: 4
        }
      ]
    },
    otherObj2: {
      dynasty: '北朝',
      piece: 156,
      otherList2: [
        {
          dynasty: '东晋',
          year: '（317-420）',
          piece: 299
        },
        {
          dynasty: '十六国',
          year: '（304~439）',
          piece: 4
        },
        {
          dynasty: '东晋',
          year: '（317-420）',
          piece: 299
        },
        {
          dynasty: '十六国',
          year: '（304~439）',
          piece: 4
        },
        {
          dynasty: '十六国',
          year: '（304~439）',
          piece: 4
        }
      ]
    }
  },
  {
    dynasty: '隋',
    height: 310,
    year: '（约前2070~前1600）',
    piece: 2,
    type: 1
  },
  {
    dynasty: '唐',
    height: 310,
    year: '（约前2070~前1600）',
    piece: 2,
    type: 1
  },
  {
    dynasty: '五代十国',
    piece: 2,
    span: 6,
    type: 2,
    otherList: [
      {
        dynasty: '西汉',
        year: '（前206~公元25）',
        piece: 299
      },
      {
        dynasty: '东汉',
        year: '（前25~公元220）',
        piece: 429
      },
      {
        dynasty: '西汉',
        year: '（前206~公元25）',
        piece: 299
      },
      {
        dynasty: '东汉',
        year: '（前25~公元220）',
        piece: 429
      },
      {
        dynasty: '西汉',
        year: '（前206~公元25）',
        piece: 299
      }
    ]
  },
  {
    dynasty: '宋',
    piece: 2,
    span: 6,
    type: 2,
    otherList: [
      {
        dynasty: '西汉',
        year: '（前206~公元25）',
        piece: 299
      },
      {
        dynasty: '东汉',
        year: '（前25~公元220）',
        piece: 429
      }
    ]
  },
  {
    dynasty: '辽',
    year: '（907-1125）',
    piece: 119,
    type: 1,
    height: 310,
  },
  {
    dynasty: '西夏',
    year: '（907-1125）',
    piece: 119,
    type: 1,
    height: 310,
  },
  {
    dynasty: '金',
    year: '（907-1125）',
    piece: 119,
    type: 1,
  },
  {
    dynasty: '元',
    year: '（907-1125）',
    piece: 119,
    type: 1,
  },
  {
    dynasty: '明',
    year: '（907-1125）',
    piece: 119,
    type: 1,
  },
  {
    dynasty: '清',
    year: '（907-1125）',
    piece: 119,
    type: 1,
  },
  {
    dynasty: '中华民国',
    year: '（907-1125）',
    piece: 119,
    type: 1,
  },
  {
    dynasty: '中华人民共和国',
    year: '1949年10月1日成立',
    piece: 1,
    type: 1,
  }
]
</script>

<template>
  <div class="classStatistics">
    <div class="title_d">
      <span>年代</span>
      <div class="year">未配置年代：<span class="num">462</span></div>
    </div>
    <div class="year_list">
      <el-row :gutter="10">
        <el-col :span="4" class="td-mb10" v-for="(item, index) in Object.keys(yearList)" :key="index">
          {{ item }} <span>{{ yearList[item] }}</span>
        </el-col>
      </el-row>
    </div>
    <el-row :gutter="5">
      <el-col :xs="8" :sm="6" :md="4" :lg="6" :xl="item.span ?? 4" v-for="item in cartList" :key="index">
        <card-list :item="item" />
      </el-col>
    </el-row>
    <div class="title_d mtd50">
      <span>文物类别</span>
      <div class="year">未配置文物类别：<span class="num">462</span></div>
    </div>
    <antiqu-type-list />
    <div class="title_d mtd50">
      <span>质地类别</span>
      <div class="year">未配置质地类别：<span class="num">130</span></div>
    </div>
    <div class="title_d" style="margin-bottom: 20px">
      <span>单一质地：78559</span>
      <span style="margin-left: 30px">复合或组合质地：1771</span>
    </div>
    <texture-cate />
  </div>
</template>

<style scoped lang="scss">
.classStatistics {
  // padding: 0 4px;
  min-width: 1198px;
  overflow: auto;

  .title_d {
    font-size: 18px;
    color: #000000;
    display: flex;
    align-items: center;

    .num {
      color: #FF0012;
    }

    .year {
      margin-left: 64px;
    }
  }

  .year_list {
    margin: 28px 0 18px 0;

    .el-row {
      .el-col {
        font-size: 18px;

        span {
          color: #72938A;
        }
      }
    }


  }

  .mtd50 {
    margin: 50px 0 18px 0;
  }
}
</style>
