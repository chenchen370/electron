<template>
  <el-dialog v-model="open" width="1280px" title="监测数据查询" append-to-body :before-close="handleCancel"
    :show-close="false" align-center>
    <el-form :model="queryParams" ref="queryRef" size="large" label-position="top">
      <el-row :span="24" :gutter="50">
        <el-col :span="5">
          <el-form-item label="展览名称" prop="exhibitionName" style="width: 100%">
            <el-input v-model="queryParams.exhibitionName" placeholder="请输入" clearable @keyup.enter="getData" />
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="展厅名称" prop="exhibitionType" style="width: 100%">
            <el-select placeholder="请选择" v-model="queryParams.exhibitionType" clearable style="width: 100%">
              <!-- <el-option v-for="dict in options.exhibition_type" :key="dict.value" :label="dict.label"
                :value="dict.value" /> -->
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="10">
          <el-form-item label="时间" prop="createTime" style="width: 100%">
            <el-date-picker v-model="dateRange" value-format="YYYY-MM-DD" type="daterange" range-separator="-"
              start-placeholder="开始时间" end-placeholder="结束时间" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <div class="td-flex justify-end" style="margin-top: 32px">
            <el-button class="button-c-primary" type="primary" @click="getData">查询</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <el-table style="width: 100%" :data="dataList" border>
      <el-table-column label="监测类型" align="center" prop="exhibitionName" />
      <el-table-column label="极大值（时间）" align="center" prop="exhibitionType">
        <template #default="{ row }">
          {{ row.max }}
        </template>
      </el-table-column>
      <el-table-column label="极小值（时间）" align="center" prop="exhibitionType">
        <template #default="{ row }">
          {{ row.max }}
        </template>
      </el-table-column>
      <el-table-column label="均值" align="center" prop="exhibitionName" />
    </el-table>

    <div style="position: relative;">
      <el-tabs v-model="activeTabName">
        <el-tab-pane label="曲线图" name="0">
          <EchartsLine h="300px" :data="lineData"></EchartsLine>
          <div class="td-ml20">
            <el-button :type="btnType == 'temperature' ? 'primary' : ''" @click="btnType = 'temperature'" size="small">
              温度/湿度
            </el-button>
            <el-button :type="btnType == 'co2' ? 'primary' : ''" @click="btnType = 'co2'" size="small">
              co2/voc
            </el-button>
            <el-button :type="btnType == 'illumination' ? 'primary' : ''" @click="btnType = 'illumination'"
              size="small">
              光照/紫外线
            </el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="数据表" name="1">
          <el-table height="324" :data="additionalList" border>
            <el-table-column label="采集时间" prop="collectTime" width="120" />
            <el-table-column label="温度" prop="temperature" show-overflow-tooltip />
            <el-table-column label="湿度" prop="humidity" show-overflow-tooltip />
            <el-table-column label="co2" prop="co2" show-overflow-tooltip />
            <el-table-column label="voc" prop="voc" show-overflow-tooltip />
            <el-table-column label="光照" prop="illumination" show-overflow-tooltip />
            <el-table-column label="紫外线" prop="ultraviolet" show-overflow-tooltip />
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-space :size="40">
          <el-button class="button-p-cancel" @click="handleCancel">关闭</el-button>
        </el-space>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import CommHandleBtn from '@/components/comm-cpns/comm-handle-btn/comm-handle-btn.vue'
import EchartsLine from '@/components/comm-cpns/echarts/echarts-line.vue';

import { ElMessage } from 'element-plus'

import { addCabinetRelics, delCabinetRelics } from '@/api/exhibition-manage/exhibition'

const props = defineProps({
  searchName: {
    type: String,
    default: ''
  }
})

const open = ref(true)

const activeTabName = ref('0')

const queryParams = reactive({
  exhibitionName: props.searchName
})
const additionalList = ref([])
const dataList = ref([])

const lineData = reactive({ xData: [], seriesData: [] })
function getData() {
  setTimeout(() => {
    lineData.xData = [1, 2, 3, 4, 5, 6]
    lineData.seriesData = [26.5, 26.8, 25.5, 26.3, 26.5, 25.6]
  }, 500)
}
getData()

const btnType = ref('temperature')


const emits = defineEmits(['onClose'])
function handleCancel() {
  emits('onClose')
}

</script>

<style lang="scss" scoped></style>
