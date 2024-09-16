<template>
  <div class="app-container">
    <el-card shadow="never" class="mb-10px">
      <div class="tabs-wrap">
        <div class="tab-handle">
          <comm-handle-btn v-if="isShowMediaKindsList" title="新增藏品" img-name="add"
            @handle-click="handleOpenCollectionCoreIndex({}, 'submit')" />
        </div>

        <el-tabs @tab-change="handleChangeTab">
          <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.label"> </el-tab-pane>
        </el-tabs>
      </div>

      <div class="first-level" v-if="!isShowMediaKindsList">
        <await-handle v-if="curtTabIndex === '0'" ref="awaitHandleRef" :proxy="proxy"
          @handle-open-collection-core-index="handleOpenCollectionCoreIndex"
          @handle-open-collection-all="handleOpenCollectionAll"
          @handle-open-media-kinds-list="handleOpenMediaKindsList" />
        <await-audit v-if="curtTabIndex === '1'" ref="awaitAuditRef" :proxy="proxy"
          @handle-open-collection-core-index="handleOpenCollectionCoreIndex"
          @handle-open-collection-all="handleOpenCollectionAll"
          @handle-open-media-kinds-list="handleOpenMediaKindsList" />
        <finished v-if="curtTabIndex === '2'" ref="finishedRef" :proxy="proxy"
          @handle-open-collection-core-index="handleOpenCollectionCoreIndex"
          @handle-open-collection-all="handleOpenCollectionAll"
          @handle-open-media-kinds-list="handleOpenMediaKindsList" />
        <collection-info v-if="curtTabIndex === '3'" ref="collectionInfoRef" :proxy="proxy" :options-info="optionsInfo"
          @handle-open-collection-core-index="handleOpenCollectionCoreIndex"
          @handle-open-collection-all="handleOpenCollectionAll"
          @handle-open-media-kinds-list="handleOpenMediaKindsList" />
      </div>
      <media-kinds-list v-if="isShowMediaKindsList" :curt-collection-row="curtCollectionRow"
        :handle-status="statusMedia" @handle-close-media-kinds-list="handleCloseMediaKindsList" />
    </el-card>

    <dialog-collection-core-index v-if="isShowDialogCollectionCoreIndex" :current-row="curtCollectionRow" :proxy="proxy"
      :optionsInfo="optionsInfo" :api-detail="curtTabIndex == 3 ? 'collection' : 'edit'"
      @handle-close-collection-core-index="handleCloseCollectionCoreIndex" />

    <dialog-collection-all v-if="isShowDialogCollectionAll" :relics-id="curtCollectionRow.relicsNo" :proxy="proxy"
      :optionsInfo="optionsInfo" :handle-status="statusCollectionAll"
      :module-label-list="['藏品信息指标群', '藏品管理工作信息', '其他信息', '标本库指标']"
      @handle-close-collection-all="handleCloseCollectionAll" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CommHandleBtn from '@/components/comm-cpns/comm-handle-btn/comm-handle-btn.vue'

import AwaitHandle from './await-handle/index.vue'
import AwaitAudit from './await-audit/index.vue'
import Finished from './finished/index.vue'
import CollectionInfo from './collection-info/index.vue'

import MediaKindsList from '@/views/collection-info-manage/media-kinds-list/media-kinds-list.vue'
import DialogCollectionCoreIndex from '@/views/collection-dialog/dialog-collection-core-index/index.vue'
import DialogCollectionAll from '@/views/collection-dialog/dialog-collection-all/index.vue'

import { detailEditCollection } from '@/api/collection-info-manage'

import optionsInfo from '../options'

const { proxy } = getCurrentInstance()

const tabList = [{ label: '等待处理' }, { label: '等待审核' }, { label: '已完成' }, { label: '藏品信息' }]
const awaitHandleRef = ref()
const awaitAuditRef = ref()
const finishedRef = ref()
const collectionInfoRef = ref()

// 切换tab
const curtTabIndex = ref('0')

function handleChangeTab(e) {
  isShowMediaKindsList.value = false
  curtTabIndex.value = e
}

const curtCollectionRow = ref({})
// 藏品核心指标详情 新增 / 编辑
const isShowDialogCollectionCoreIndex = ref(false)
function handleOpenCollectionCoreIndex(row) {
  console.log('-----handleOpenCollectionCoreIndex')
  curtCollectionRow.value = row
  isShowDialogCollectionCoreIndex.value = true
}

function handleCloseCollectionCoreIndex() {
  curtCollectionRow.value = {}
  isShowDialogCollectionCoreIndex.value = false
  switch (curtTabIndex.value) {
    case '0':
      awaitHandleRef.value?.handleRefresh?.()
      break
    case '1':
      awaitAuditRef.value?.handleRefresh?.()
      break
    case '2':
      finishedRef.value?.handleRefresh?.()
      break
    case '3':
      collectionInfoRef.value?.handleRefresh?.()
      break
  }
}

// 藏品全部信息 新增 / 编辑
const isShowDialogCollectionAll = ref(false)
const statusCollectionAll = ref('check')
function handleOpenCollectionAll(row, status) {
  curtCollectionRow.value = row
  if (!row.relicsNo) {
    curtCollectionRow.value.relicsNo = row.id
  }
  statusCollectionAll.value = status ?? 'check'
  isShowDialogCollectionAll.value = true
}
function handleCloseCollectionAll() {
  curtCollectionRow.value = {}
  isShowDialogCollectionAll.value = false
}

// 去媒体页~
const isShowMediaKindsList = ref(false)
const statusMedia = ref('check')
async function handleOpenMediaKindsList(row, status) {
  statusMedia.value = status
  if (row.relicsNo) {
    const res = await detailEditCollection(row.relicsNo)
    curtCollectionRow.value = res?.data ?? {}
    curtCollectionRow.value.relicsNo = row.relicsNo
    isShowMediaKindsList.value = true
  } else {
    curtCollectionRow.value = row
    curtCollectionRow.value.relicsNo = row.id
    isShowMediaKindsList.value = true
  }
}
function handleCloseMediaKindsList() {
  isShowMediaKindsList.value = false
}
</script>

<style scoped lang="scss">
.active {
  color: var(--el-button-hover-text-color);
  border-color: var(--el-button-hover-border-color);
  background-color: var(--el-button-hover-bg-color);
  outline: 0;
}

.tabs-wrap {
  position: relative;
}

.tab-handle {
  position: absolute;
  right: 0;
  top: 8px;
  z-index: 2;
  //border: 2px solid red;
}
</style>
