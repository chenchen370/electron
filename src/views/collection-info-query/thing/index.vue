<template>
  <div class="app-container">
    <el-card shadow="never" class="mb-10px">
      <form-search ref="searchRef" :query-opt="queryOpt" :options-info="options_info" @handle-search="handleSearch"
        @handle-reset="handleRefresh" />

      <el-row :gutter="10" class="mb8">
        <div class="left-toolbar">
          <el-tooltip class="item" effect="dark" content="导出" placement="top" v-if="currentType === 'Menu'">
            <comm-handle-btn :per="['collection:repairTool:list']" title="导出" img-name="exp"
              @handle-click="handleOpenDialogExport" />
          </el-tooltip>
        </div>
        <right-toolbar v-model:showSearch="queryOpt.showSearch" @queryTable="handleRefresh" :columns="columns">
          <template v-for="(item, index) in typeList">
            <el-tooltip v-if="item.isShow" :key="index" class="item" effect="dark" :content="item.label"
              placement="top">
              <el-button :class="{ active: currentType === item.value }" circle :icon="item.value"
                @click="changeType(item.value)" />
            </el-tooltip>
          </template>
        </right-toolbar>
      </el-row>

      <div v-if="currentType === 'Picture'">
        <image-text-list :query-opt="queryOpt" @handle-check-row="handleCheckRow" />
      </div>

      <div v-if="currentType === 'Menu'">
        <table-list ref="tableListRef" :query-opt="queryOpt" @handle-check-row="handleCheckRow" :columns="columns"
          :proxy="proxy" />
      </div>

      <div v-if="currentType === 'Postcard'">
        <waterfall-list :list="queryOpt.thingList" @handle-check-row="handleCheckRow" />
      </div>

      <div class="el-pagination-wrap" v-if="queryOpt.total > 0">
        <pagination :total="queryOpt.total" v-model:page="paginationParams.pageNum"
          v-model:limit="paginationParams.pageSize" @pagination="handleGetList" />
      </div>
    </el-card>

    <dialog-collection-core-index-check-comm v-if="isShowCollectionCoreIndex && currentType !== 'Postcard'"
      :current-row="currentRow" :relics-id="currentRow.id" :options-info="options_info"
      @handle-close-collection-core-index="handleCloseCollectionCoreIndex"
      @handle-check-collection-all="handleCheckCollectionAll" />

    <dialog-collection-core-index-check-waterfall v-if="isShowCollectionCoreIndex && currentType === 'Postcard'"
      :current-row="currentRow" :relics-id="currentRow.id" :options-info="options_info"
      @handle-close-collection-core-index="handleCloseCollectionCoreIndex"
      @handle-check-collection-all="handleCheckCollectionAll" />

    <!--<dialog-collection-all v-if="isShowCollectionAll" :relics-id="currentRow.id" :proxy="proxy"
      @handle-close-collection-all="handleCloseCollectionAll" /> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'

import CommHandleBtn from '@/components/comm-cpns/comm-handle-btn/comm-handle-btn.vue'

import FormSearch from './c-cpns/form-search.vue'

import ImageTextList from './c-cpns/image-text-list.vue'
import TableList from './c-cpns/table-list.vue'
import WaterfallList from './c-cpns/waterfall-list.vue'

import DialogCollectionCoreIndexCheckComm from '@/views/collection-dialog/dialog-collection-core-index-check-comm/index.vue'
import DialogCollectionCoreIndexCheckWaterfall from '@/views/collection-dialog/dialog-collection-core-index-check-waterfall/index.vue'
import DialogCollectionAll from '@/views/collection-dialog/dialog-collection-all/index.vue'

import { getThing, listThing } from '@/api/collection-info-query/thing'
import options_info from './options'
import { HandleTree } from '@/utils/comm-util/handle-tree'

const { proxy } = getCurrentInstance()

const typeList = reactive([
  { label: '图文', value: 'Picture', isShow: true },
  { label: '列表', value: 'Menu', isShow: true },
  { label: '瀑布流', value: 'Postcard', isShow: true }
])
const currentType = ref('Picture')

/** 查询列表 */
const searchRef = ref()
const searchParams = ref({})

const paginationParams = reactive({
  pageNum: 1,
  pageSize: 10
})
const queryOpt = reactive({
  thingList: [],
  total: 0,
  loading: false,
  showSearch: true
})

async function handleGetList() {
  queryOpt.loading = true

  const params = Object.assign({}, searchParams.value, paginationParams)

  params.relicLevel = options_info?.options_artifact_level?.find(item => item.value == params?.relicLevel)?.label ?? ''
  params.relicCategory = options_info?.options_artifact_type?.find(item => item.value == params?.relicCategory)?.label ?? ''
  params.relicYears = HandleTree.getNodeInfoByValue(options_info?.options_years_tree ?? [], 'dictCode', 'children', params?.relicYears)?.dictLabel
  if (params?.deptId && params?.deptId?.length > 0) {
    params.deptId = params.deptId[params.deptId?.length - 1]
  }

  const res = await listThing(params)
  queryOpt.thingList = res.data.records
  queryOpt.total = res.data.total
  queryOpt.loading = false
}

handleGetList()

// page-search 搜索 / 重置
function handleSearch(params) {
  queryOpt.loading = true
  searchParams.value = params
  handleGetList()
}

// 刷新
function handleRefresh() {
  paginationParams.pageNum = 1
  searchRef.value.handleReset?.()
}

// 列显隐信息
const columns = reactive([
  { key: 0, label: `名称`, visible: true, disabled: true },
  { key: 1, label: `藏品编号名称`, visible: true, disabled: true },
  { key: 2, label: `编号`, visible: true },
  { key: 3, label: `文物级别`, visible: true },
  { key: 4, label: `文物类别`, visible: true },
  { key: 5, label: `库房（库区）名称`, visible: true },
  { key: 6, label: `质地子类别`, visible: true },
  { key: 7, label: `完残程度`, visible: true },
  { key: 8, label: `文物来源方式`, visible: true },
  { key: 9, label: `入库时间`, visible: true },
  { key: 10, label: `年代`, visible: true },
  { key: 11, label: `保护优先等级`, visible: true },
  { key: 11, label: `财务审核状态`, visible: true },
  { key: 11, label: `当前状态`, visible: true }
])

// 切换类型
function changeType(val) {
  currentType.value = val
  handleRefresh()
}

// 查看 row 核心指标
const currentRow = ref()
const isShowCollectionCoreIndex = ref(false)

async function handleCheckRow(row) {
  // const res = await getThing(row.id)
  currentRow.value = row
  isShowCollectionCoreIndex.value = true
}

function handleCloseCollectionCoreIndex() {
  isShowCollectionCoreIndex.value = false
}

// 查看所有指标
const isShowCollectionAll = ref(false)

function handleCheckCollectionAll() {
  isShowCollectionAll.value = true
}

function handleCloseCollectionAll() {
  isShowCollectionAll.value = false
}

// 显示导出弹窗
const tableListRef = ref()
function handleOpenDialogExport() {
  tableListRef.value?.handleOpenDialogExport?.()
}
</script>

<style scoped lang="scss">
.active {
  color: var(--el-button-hover-text-color);
  border-color: var(--el-button-hover-border-color);
  background-color: var(--el-button-hover-bg-color);
  outline: 0;
}
</style>
