<script setup>
import EchartsBar from '@/components/comm-cpns/echarts/echarts-bar.vue'
import { ref } from 'vue'
const pickerOptions = {
  shortcuts: [{
    text: '最近一周',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }]
}
const value2 = ref(new Date())

</script>

<template>
  <div class="searchNav">
    <div class="chu_ru">
      <div class="crItem">
        <span>出</span>
        <h2>出库</h2>
        <p>5<i>件</i></p>
      </div>
      <div class="crItem">
        <span>入</span>
        <h2>入库</h2>
        <p>53<i>件</i></p>
      </div>
    </div>
    <div class="search_date">
      <el-date-picker
        v-model="value2"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="|"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions">
      </el-date-picker>
      <div class="search">查询</div>
    </div>

  </div>
</template>

<style scoped lang="scss">
.searchNav {
  margin-top: 20px;
  display: flex;

  .chu_ru {
    display: flex;

    .crItem {
      width: 317px;
      height: 85px;
      line-height: 85px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      background: #39685D;
      border-radius: 10px 10px 10px 10px;
      margin-right: 20px;

      span {
        display: block;
        width: 35px;
        height: 35px;
        background: #fff;
        text-align: center;
        line-height: 35px;
        color: #39685D;
        border-radius: 50%;
        font-size: 20px;
        font-family: REEJI-Top, REEJI-Top;
      }

      h2 {
        font-size: 30px;
        color: #FEFEFE;
        text-align: center;
      }

      p {
        font-weight: 300;
        font-size: 30px;
        color: #FEFEFE;
        display: flex;
        align-items: center;
        vertical-align: center;

        i {
          font-size: 14px;
          color: #FEFEFE;
          margin-left: 5px;
        }
      }
    }
  }

  .search_date {
    display: flex;
    align-items: center;
    width: 56%;
    height: 85px;
    background: #FFFFFF;
    border-radius: 10px 10px 10px 10px;
    border: 2px solid #39685D;

    :deep(.el-input__wrapper) {
      box-shadow: none;
      height: 100%;
      width: 500px;
      border-radius: 10px;
      justify-content: flex-start;
      padding: 0 40px;

      .el-range-input {
        font-size: 18px;
        color: #BDBDBD;
        width: 250px;
      }
      .el-icon{
        font-size: 20px;
      }
      .el-range-separator {
        flex: none;
      }
    }

    .search {
      width: 100px;
      height: 49px;
      line-height: 49px;
      text-align: center;
      color: white;
      background: #39685D;
      margin-right: 25px;
    }
  }
}
</style>
