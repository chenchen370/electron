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
        <span class="tip">注意：下载操作只下载记录中的附件。</span>
        <span class="tip" style="margin-left: 61px">当前您的预览与下载权限为：准予下载。</span>
      </div>
    </el-row>

    <el-table style="width: 100%" v-loading="queryOpt.loading" :data="queryOpt.tableData"
      @selection-change="handleSelectionChange" border>
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="序号" type="index" width="60" />
      <el-table-column label="藏品编号" align="center" prop="relicId" />
      <el-table-column label="藏品名称" align="center" prop="relicName" />
      <el-table-column label="著录出版时间" align="center" prop="recordPublishTime">
        <template #default="scope">
          {{ formatDate(scope.row.createTime) }}
        </template>
      </el-table-column>
      <el-table-column label="研究论著类型" align="center" prop="typesResearchPapers" />
      <el-table-column label="研究论著类型" align="center" prop="typesResearchPapers">
        <template #default="scope">
          {{ getLabel(optionsInfo.options_research_papers_type, scope.row.typesResearchPapers) }}
        </template> </el-table-column>`
      <el-table-column label="研究论著提名" align="center" prop="titleResearchPapers" />
      <el-table-column label="作者" align="center" prop="author" />
      <el-table-column label="出版机构及书名" align="center" prop="articlePageNumber" />
      <!--      <el-table-column label="操作" align="center" width="150" fixed="right" class-name="small-padding fixed-width"> </el-table-column>-->
      <!--      <el-table-column label="操作" fixed="right" align="center" width="200" class-name="small-padding fixed-width">-->
      <!--        <template #default="scope">-->
      <!--          <el-button link type="primary" icon="View" @click="handleView(scope.row)" v-hasPermi="['collection-info-query:media:query']">查看</el-button>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
    </el-table>

    <div class="el-pagination-wrap">
      <pagination :total="queryOpt.total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize"
        @pagination="handleGetList" />
    </div>
  </div>
</template>

<script setup>
import { getStudy } from '@/api/collection-all/multimedia/study'
import CommHandleBtn from '@/components/comm-cpns/comm-handle-btn/comm-handle-btn.vue'
import { formatDate } from '@/utils'
import { getLabel } from '@/utils/comm-util/getLabel'

import useInitOptions from '@/hooks/use_init_options'
const optionsInfo = useInitOptions({
  // 研究论著类型
  key: 'options_research_papers_type',
  isDict: true,
  dictCode: 'research_papers_type'
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

  const res = await getStudy(queryParams)
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
}
</style>
