<template>
  <div class="page-header">
    <!--    <div class="left">-->
    <!--      &lt;!&ndash;      <comm-handle-btn :per="['collection-repair:material:delete']" title="删除" img-name="remove" @handle-click="handleDelete" />&ndash;&gt;-->
    <!--      &lt;!&ndash;      <el-select v-model="mobileReason" clearable placeholder="请选择移动类型" style="width: 350px; height: 36px">&ndash;&gt;-->
    <!--      &lt;!&ndash;        <el-option v-for="item in optionsInfo?.options_reason_withdrawal" :key="item.value" :label="item.label" :value="item.value" />&ndash;&gt;-->
    <!--      &lt;!&ndash;      </el-select>&ndash;&gt;-->
    <!--    </div>-->

    <comm-handle-btn :per="['collection-repair:material:add']" title="新增" img-name="add" @handle-click="handleAdd" />
  </div>
</template>

<script setup>
import CommHandleBtn from '@/components/comm-cpns/comm-handle-btn/comm-handle-btn.vue'
import optionsInfo from '../options'

defineProps({
  single: {
    type: Boolean,
    default: true
  },
  showSearch: {
    type: Boolean,
    default: true
  }
})

const emits = defineEmits(['update:showSearch', 'handleAdd', 'handleUpdate', 'handleDelete', 'handleRefresh'])
// const mobileReason = ref()
function handleAdd() {
  emits('handleAdd')
}

function handleUpdate() {
  emits('handleUpdate')
}

function handleDelete() {
  emits('handleDelete')
}
</script>

<style scoped lang="scss">
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  .left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .el-select {
      margin-left: 20px;
      :deep(.el-input) {
        height: 36px !important;
      }
    }
  }
}
</style>
