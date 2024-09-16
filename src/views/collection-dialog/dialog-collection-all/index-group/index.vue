<template>
  <el-tabs class="coder-wang-tabs" @tabChange="handleTableChange">
    <el-tab-pane v-for="(item, index) in list" :label="item.label" class="info_lv_2">
      <template v-if="currentTabIndex == index">
        <el-scrollbar :height="`calc(100vh - 440px)`">
          <component :is="item.component" :ref="el => handleSetRefMap(el, index)" :relics-id="relicsId" :proxy="proxy"
            :optionsInfo="optionsInfo" :handle-status="handleStatus" />
        </el-scrollbar>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup>
import BaseInfo from './base-info/index.vue'
import AppendInfo from './append-info/index.vue'
import BaseCaseDesc from './base-case-desc/index.vue'
import FileInfo from './file-info/index.vue'
import AppendGoods from './append-goods/index.vue'
import OtherInfo from './other-info/index.vue'

defineProps({
  relicsId: {
    type: [String, Number],
    default: null
  },
  proxy: {
    type: Object,
    default: () => ({})
  },
  handleStatus: {
    type: String,
    default: 'check' // submit （新增 + 修改 + 提交审核）check（查看）
  },
  optionsInfo: {
    type: Object,
    default: () => ({})
  }
})

const list = [
  {
    label: '基本信息',
    component: BaseInfo
  },
  {
    label: '附属信息',
    component: AppendInfo
  },
  {
    label: '基本情况描述',
    component: BaseCaseDesc
  },
  {
    label: '附件信息',
    component: FileInfo
  },
  {
    label: '附属物',
    component: AppendGoods
  },
  {
    label: '其他信息',
    component: OtherInfo
  }
]
const currentTabIndex = ref(0)
function handleTableChange(e) {
  currentTabIndex.value = e
}

const currentTabRef = ref({})
function handleSetRefMap(el, index) {
  currentTabRef.value[`ref_${index}`] = el
}

function handleTabSubmit() {
  nextTick(() => {
    currentTabRef.value[`ref_${currentTabIndex.value}`]?.submit?.()
  })
}
function audit() {
  nextTick(() => {
    currentTabRef.value[`ref_${currentTabIndex.value}`]?.audit?.()
  })
}

defineExpose({ handleTabSubmit, audit })
</script>

<style lang="scss" scoped>
.el-scrollbar {

  //box-sizing: border-box;
  :deep(.el-scrollbar__bar.is-horizontal) {
    height: 0;
    width: 0;
  }
}
</style>
