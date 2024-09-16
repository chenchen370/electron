<template>
  <div class="app-container">
    <el-card shadow="never" class="mb-10px">
      <div class="tabs-wrap">
        <div class="tab-handle" v-if="isShowMediaKindsList && curtTabIndex == '0'">
          <el-form :model="queryParams" label-width="auto" ref="queryRef" size="large" :inline="true">
            <el-form-item label="审核类型" prop="approvalType">
              <el-select v-model="queryParams.approvalType" placeholder="请选择审核类型" clearable>
                <el-option v-for="dict in options_approval_type" :key="dict.value" :label="dict.label"
                  :value="dict.value" />
              </el-select>
            </el-form-item>
            <el-form-item style="margin-right: 0">
              <div class="td-flex justify-end">
                <el-button class="button-c-primary" type="primary" icon="Search" @click="handleSearch">搜索</el-button>
                <el-button class="button-p-black" icon="Refresh" @click="handleReset">重置</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>

        <el-tabs @tab-change="handleChangeTab">
          <el-tab-pane v-for="(item, index) in tabList" :key="index" :label="item.label"> </el-tab-pane>
        </el-tabs>
      </div>

      <div class="first-level" v-if="!isShowMediaKindsList">
        <await-handle v-if="curtTabIndex === '0'" :proxy="proxy"
          @handle-open-media-kinds-list="handleOpenMediaKindsList"
          @handle-open-collection-all="handleOpenCollectionAll" />
        <finished v-if="curtTabIndex === '1'" :proxy="proxy" @handle-open-media-kinds-list="handleOpenMediaKindsList"
          @handle-open-collection-all="handleOpenCollectionAll" />
      </div>
      <media-kinds-list v-if="isShowMediaKindsList" :curt-collection-row="curtCollectionRow"
        :handle-status="statusMedia" @handle-close-media-kinds-list="handleCloseMediaKindsList" />
    </el-card>

    <dialog-collection-all v-if="isShowDialogCollectionAll" :relics-id="curtCollectionRow.relicsNo" :proxy="proxy"
      :handle-status="statusCollectionAll" :module-label-list="['藏品信息指标群', '藏品管理工作信息', '其他信息']"
      @handle-close-collection-all="handleCloseCollectionAll" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CommHandleBtn from '@/components/comm-cpns/comm-handle-btn/comm-handle-btn.vue'

import AwaitHandle from './await-handle/index.vue'
import Finished from './finished/index.vue'

import MediaKindsList from '@/views/collection-info-manage/media-kinds-list/media-kinds-list.vue'
import DialogCollectionAll from '@/views/collection-dialog/dialog-collection-all/index.vue'
import { options_approval_type } from '@/views/collection-info-manage/dict'
import { detailEditCollection } from '@/api/collection-info-manage'
const { proxy } = getCurrentInstance()

const tabList = [{ label: '等待处理' }, { label: '已完成' }]

// 切换tab
const curtTabIndex = ref('0')

function handleChangeTab(e) {
  isShowMediaKindsList.value = false
  curtTabIndex.value = e
}

const queryParams = reactive({})

const curtCollectionRow = ref({})
// 藏品全部信息 新增 / 编辑
const isShowDialogCollectionAll = ref(false)
const statusCollectionAll = ref('check')
function handleOpenCollectionAll(row, status) {
  curtCollectionRow.value = row
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
  const res = await detailEditCollection(row.relicsNo)
  curtCollectionRow.value = res?.data ?? {}
  curtCollectionRow.value.relicsNo = row.relicsNo
  isShowMediaKindsList.value = true
}
function handleCloseMediaKindsList() {
  isShowMediaKindsList.value = false
}

// handleSearch
function handleSearch() { }
function handleReset() { }
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
}

.add-tab-handle {
  position: absolute;
  right: 58px;
  top: 100px;
  z-index: 1;
}
</style>
