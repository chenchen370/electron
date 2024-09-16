<script setup>

import DateList from '@/views/collection/outboundProcess2/cpns/dateList.vue'
</script>

<template>
  <div class="outboundProcess2">
    <p>
      本页业务统计结果默认为<i>本年度-2023年累计数据统计</i>,如需其他时间段统计结果，请选择相应的时间。选择“全部”。
    </p>
    <date-list />
  </div>
</template>

<style scoped lang="scss">
.outboundProcess2 {
  p {
    font-size: 18px;
    color: #000000;
    font-weight: bold;

    i {
      color: #FF0B0B;
    }
  }
}
</style>
