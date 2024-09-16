<template>
  <div class="keyword-search">
    <el-input
      v-model="keyword"
      placeholder="输入关键字进行搜索"
      class="input-with-select"
    >
      <template #append>
        <el-button :icon="Search" @click="handleSearch"/>
      </template>
    </el-input>
    <ul>
      <li v-for="(item, index) in list" :key="item.id"
          :class="currentId === item.id ? 'li-active':''"
          @click="handleItemClick(item)"
      >
        {{ index + 1 }}、 {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>

import { Search } from '@element-plus/icons-vue';

const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})
const emits = defineEmits(["handleSearch", "handleSearchItemClick"])

const keyword = ref()
function handleSearch() {
  emits("handleSearch", keyword.value)
}


const currentId = ref("")
function handleItemClick(info) {
  currentId.value = info.id
  emits("handleSearchItemClick", info)
}
</script>

<style lang="scss" scoped>
.keyword-search {

  width: 100%;
  ul{
    list-style-type:none;
  }
  li {
    padding: 5px;
    &:hover {
      cursor: pointer;
      border-bottom: 1px solid #00b9fe;
    }

  }

  .li-active {
    background: #00b9fe;
  }
}
</style>
