<template>
  <el-tabs class="el-tabs-wrap" @tabChange="handleTableChange">
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
import SourceInfo from './source-info/index.vue'
import ArchaeologicalFindInfo from './archaeological-find-info/index.vue'
import PassOnExperience from './pass-on-experience/index.vue'
import InTheLibraryStoreInfo from './in-the-library-store-info/index.vue'
import AuthenticateInfo from './authenticate-info/index.vue'
import ProtectInfo from './protect-info/index.vue'
import RepairRecord from './repair-record/index.vue'
import MoveRecord from './move-record/index.vue'
import AccidentDamageOccurredRecord from './accident-damage-occurred-record/index.vue'
import BackOut from './back-out/index.vue'

defineProps({
  handleStatus: {
    type: String,
    default: 'check' // submit （新增 + 修改 + 提交审核）check（查看）
  },
  relicsId: {
    type: [String, Number],
    default: null
  },
  proxy: {
    type: Object,
    default: () => ({})
  },
  optionsInfo: {
    type: Object,
    default: () => ({})
  }
})

const list = [
  {
    label: '来源信息',
    component: SourceInfo
  },
  {
    label: '考古发掘信息',
    component: ArchaeologicalFindInfo
  },
  {
    label: '流传经历',
    component: PassOnExperience
  },
  {
    label: '入馆保管信息',
    component: InTheLibraryStoreInfo
  },
  {
    label: '鉴定信息',
    component: AuthenticateInfo
  },
  {
    label: '保护信息',
    component: ProtectInfo
  },
  {
    label: '修复记录',
    component: RepairRecord
  },

  {
    label: '移动记录',
    component: MoveRecord
  },

  {
    label: '事故损坏发生记录',
    component: AccidentDamageOccurredRecord
  },

  {
    label: '核销',
    component: BackOut
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
