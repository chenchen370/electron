<template>
  <div class="app-container">
    <el-form class="coder-wang-form" :model="queryParams" ref="queryRef" :inline="true" v-show="queryOpt.showSearch"
      label-width="auto" size="large">
      <el-row :span="24">
        <el-col :span="18">
          <el-form-item label="查询条件" prop="searchValue">
            <el-input v-model="queryParams.searchValue" placeholder="请输入查询条件，如藏品编号、藏品名称、文件名称，多个以空格隔开" clearable
              style="width: 500px" />
          </el-form-item>
        </el-col>

        <el-col :span="6" justify="end">
          <div class="td-flex justify-end" style="width: 100%">
            <el-button class="button-c-primary" type="primary" icon="Search" @click="handleSearch">搜索</el-button>
            <el-button class="button-p-black" icon="Refresh" @click="handleRefresh">重置</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>

    <el-row class="handle-wrap" justify="space-between">
      <div class="left">
        <comm-handle-btn title="导出" img-name="exp" @handle-click="" />
        <span class="tip">当前您的预览与下载权限为：原始版本、原始版本（JPG）、高清版本（1920*1080）、标清版本（1024*768）、缩略版本（210*210）。</span>
      </div>
      <div class="right">共{{ queryOpt.total }} 条</div>
    </el-row>

    <el-space wrap :size="35">
      <div class="img-item" v-for="(item, index) in queryOpt.tableData" :key="index">
        <image-preview :width="259" :height="159" :src="item.relicPath" />
        <span>藏品总登记号：{{ item.relicId }}</span>
      </div>
    </el-space>
  </div>
</template>

<script setup>
import { listMedia } from '@/api/collection-info-query/media'
import CommHandleBtn from '@/components/comm-cpns/comm-handle-btn/comm-handle-btn.vue'

const props = defineProps({
  mediaType: {
    type: String,
    default: ''
  }
})

/** 查询列表 */
const queryRef = ref()

const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  searchValue: undefined
})
const queryOpt = reactive({
  tableData: [],
  total: 0,
  loading: false,
  showSearch: true
})

async function handleGetList() {
  queryOpt.loading = true

  const res = await listMedia({ ...queryParams, mediaType: props.mediaType })
  queryOpt.tableData = res.data.records
  queryOpt.total = res.data.total
  queryOpt.loading = false
}

handleGetList()

// page-search 搜索 / 重置
function handleSearch() {
  queryOpt.loading = true
  queryParams.pageNum = 1
  handleGetList()
}

// 刷新
function handleRefresh() {
  queryParams.pageNum = 1
  queryRef.value?.resetFields?.()
  handleSearch()
}

// 多选框选中数据
const ids = ref([])
const single = ref(true)
const multiple = ref(true)

function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.id)
  single.value = selection.length != 1
  multiple.value = !selection.length
}
</script>

<style scoped lang="scss">
.tab-el-form {
  margin-top: 30px;
}

.handle-wrap {
  margin-bottom: 21px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex: 1;

    .tip {
      font-family: Source Han Serif CN;
      font-size: 16px;
      font-weight: normal;
      line-height: normal;

      font-variation-settings: 'opsz';
      font-feature-settings: 'kern';
      color: #848484;
      margin-left: 28px;
    }
  }

  .right {
    font-family: Source Han Serif CN;
    font-size: 16px;
    font-weight: normal;
    line-height: normal;
    display: flex;
    align-items: center;
    letter-spacing: 0em;

    font-variation-settings: 'opsz' auto;
    font-feature-settings: 'kern' on;
    color: #38675c;
  }
}

.img-item {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 32px;

  span {
    font-family: Source Han Serif CN;
    font-size: 16px;
    font-weight: normal;
    line-height: normal;

    font-variation-settings: 'opsz';
    font-feature-settings: 'kern';
    color: #666666;
    margin-top: 9px;
  }
}
</style>
