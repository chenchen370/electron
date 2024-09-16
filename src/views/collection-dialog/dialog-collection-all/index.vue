<template>
  <el-dialog class="coder-wang-dialog" v-model="open" width="1280px" append-to-body :before-close="handleCancel"
    align-center :show-close="false">
    <div class="kind-wrap">
      <span v-for="(item, index) in moduleRealList" :key="index" @click="handleClickKindItem(index)"
        :class="currentKindIndex === index ? 'kind-item-active' : ''" :style="{
          borderRight: index != moduleRealList.length - 1 ? 'none' : '1px solid #064235'
        }">{{ item.label }}
      </span>
    </div>

    <div class="cpn-content">
      <component :is="moduleRealList[currentKindIndex].component" :ref="el => handleSetRefMap(el)" :relics-id="relicsId"
        :proxy="proxy" :optionsInfo="optionsInfo" :handle-status="handleStatus" />
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button class="button-c-sure" type="primary" @click="handleCancel" v-if="handleStatus === 'check'"> 关闭
        </el-button>
        <el-button class="button-c-sure" type="primary" @click="handleAudit" v-if="handleStatus !== 'check'"> 提交审核
        </el-button>
        <el-button class="button-p-cancel" type="primary" @click="handleSure" v-if="handleStatus !== 'check'"> 保存
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import IndexGroup from './index-group/index.vue'
import ManageWork from './manage-work/index.vue'
import Other from './other/index.vue'
import SampleLibrary from './sample-library/index.vue'
import Multimedia from './multimedia/index.vue'

const props = defineProps({
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
  moduleLabelList: {
    type: Array,
    default: ['藏品信息指标群', '藏品管理工作信息', '多媒体文档信息', '其他信息']
  },
  optionsInfo: {
    type: Object,
    default: () => ({})
  }
})

const emits = defineEmits(['handleSureCheckAll', 'handleCloseCollectionAll'])

const moduleList = [
  {
    label: '藏品信息指标群',
    component: IndexGroup
  },
  {
    label: '藏品管理工作信息',
    component: ManageWork
  },
  {
    label: '其他信息',
    component: Other
  },
  {
    label: '标本库指标',
    component: SampleLibrary
  },
  {
    label: '多媒体文档信息',
    component: Multimedia
  }
]

const open = ref(true)
const moduleRealList = computed(() => {
  return props.moduleLabelList.map(label => {
    return {
      label,
      component: moduleList.find(item => item.label === label)?.component
    }
  })
})

const currentKindIndex = ref(0)
function handleClickKindItem(index) {
  currentKindIndex.value = index
}

const currentKindRef = ref({})
function handleSetRefMap(el) {
  nextTick(() => {
    currentKindRef.value[`ref_${currentKindIndex.value}`] = el
  })
}

function handleSure() {
  // emits('handleCloseCollectionAll')
  nextTick(() => {
    currentKindRef.value[`ref_${currentKindIndex.value}`]?.handleTabSubmit?.()
  })
}

function handleCancel() {
  emits('handleCloseCollectionAll')
}

function handleAudit() {
  nextTick(() => {
    currentKindRef.value[`ref_${currentKindIndex.value}`]?.audit?.()
  })
}
</script>

<style lang="scss" scoped>
.kind-wrap {
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 40px;

  span {
    font-family:
      Source Han Serif CN,
      Source Han Serif CN;
    font-size: 18px;
    color: #848484;
    line-height: 26px;
    text-align: center;
    font-style: normal;
    text-transform: none;
    padding: 10px 25px;
    border: 1px solid #8bada6;
  }

  .kind-item-active {
    background: #38675c;
    border: none;
    color: #fff;
  }
}

.button-back {
  width: 160px;
  height: 50px;
  background: #38675c;
  border-radius: 4px 4px 4px 4px;
  font-family:
    Source Han Serif CN,
    Source Han Serif CN;
  font-weight: 400;
  font-size: 20px;
  color: #ffffff;
  line-height: 29px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}
</style>
