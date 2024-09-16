<template>
  <div>
    <h2> 路线方案 </h2>
    <ul>
      <li  v-for="(item, index) in props?.planList" :key="index">
        <strong>总时间：" {{ item.getDuration() }}} "秒，总距离："{{Math.round(item.getDistance())}}"公里</strong>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface IProps {
  planList?: any[]
}
const props = defineProps<IProps>()
</script>

<style lang="scss" scoped>

</style>
