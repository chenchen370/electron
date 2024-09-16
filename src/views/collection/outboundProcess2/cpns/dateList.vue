<template>
  <div style="display: flex;flex-wrap: wrap;justify-content: space-between;" >
    <div class="test"  v-for="item in 10" >
      <div class="search">
        <el-date-picker
          v-model="value1"
          type="daterange"
          range-separator="|"
          start-placeholder="开始时间"
          end-placeholder="结束时间">
        </el-date-picker>
        <el-radio v-model="allValue" label="1">全部</el-radio>
        <p class="btn">查询</p>
      </div>
      <div class="list">
        <h2>审核工作统计</h2>
        <ul>
          <li>
            <p>
              藏品提用次数：<span>2</span>
            </p>
            <p>
              藏品提用总量（件/套）：<span>69</span>
            </p>
          </li>
          <li>
            <p>
              注销流程次数：<span>0</span>
            </p>
            <p>
              视频增量总计（个）：<span>69</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const allValue = ref(false)
</script>

<style lang="scss" scoped>
.test {
  width: 32%;
  display: flex;
  flex-direction: column;
  // margin-right: 16px;
  margin-bottom: 16px;
}

:deep(.search) {
  display: flex;
  align-items: center;
  width: 100%;
  height: 65px;
  line-height: 85px;
  background: #EEF3EF;
  padding: 10px;
  box-sizing: border-box;
  p{
    margin: 0;
  }

  .ant-picker {
    width: 65%;
  }
  .el-radio{
    margin:0 20px;
  }
  .ant-radio-wrapper {
    text-align: right;
    display: flex;
    justify-content: flex-end;
    width: 25%;
    margin-right: 30px;
    line-height: 45px;
  }
  .el-date-editor{
    background-color: transparent;
    box-shadow: none;
  }
  .suffix-prefix .ant-picker-range {
    display: flex;
    flex-direction: row-reverse; /* 将子元素顺序颠倒 */
  }
  .el-radio{
    .el-radio__inner{
      border-color:#39685D;
    }
  }

  /* 将后缀元素的顺序再次颠倒以保持内部结构的正常 */
  .suffix-prefix .ant-picker-range .ant-picker-input {
    direction: ltr; /* 确保文本方向正确 */
  }

  .btn {
    width: 100px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background-color: #39685D;
    color: #ffffff;
  }
}

.list {
  background: #FFFFFF;
  width: 100%;
  padding: 20px;

  h2 {
    font-size: 18px;
    color: #000000;
  }

  ul {
    padding-left: 0;
    margin-top: 30px;
    margin-bottom: 0;

    li {
      display: flex;
      justify-content: space-between;
      font-size: 18px;
      color: #000000;
      line-height: 25px;

      p {
        width: 50%;
        text-align: left;
      }
    }
  }
}

</style>
