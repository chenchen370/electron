<template>
  <el-row :gutter="10">
    <el-col :span="12">
      <el-card shadow="never" class="mb-10px canvasCard">
        <RelicWorkHours h="400px" :data="options.option_info_1" />
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card shadow="never" class="mb-10px canvasCard">
        <CategoryWorkHours h="400px" :data="options.option_info_2" />
      </el-card>
    </el-col>
  </el-row>
  <el-row :gutter="10">
    <el-col :span="12">
      <el-card shadow="never" class="mb-10px canvasCard">
        <RelicTime h="400px" :data="options.option_info_3" />
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card shadow="never" class="mb-10px canvasCard">
        <RelicsLevel h="400px" :data="options.option_info_4.data" />
      </el-card>
    </el-col>
  </el-row>
</template>

<script setup>

import RelicWorkHours from './components/RelicWorkHours.vue';
import CategoryWorkHours from './components/CategoryWorkHours.vue';
import RelicsLevel from './components/RelicsLevel.vue';
import RelicTime from './components/RelicTime.vue';

import {
  getRelicCycleWorkHoursCount,
  getRepairCategoryCycleWorkHoursCount,
  getRepairCollectionCategory,
  getRepairCollectionCompletionStatus
} from '@/api/collection/statistics.ts'
import useInitOptions from '@/hooks/use_init_options.ts'

const options_info = useInitOptions([
  {
    // 藏品类型
    key: 'options_artifact_type',
    isDict: true,
    dictCode: 'artifact_type'
  },
  {
    key: 'options_relic_state',
    isDict: true,
    dictCode: 'relic_state'
  },
  {
    // 入藏时间范围
    key: 'options_time',
    isDict: true,
    dictCode: 'time_range_tibet'
  },
])

const options = reactive({
  option_info_1: {
    xData: [],
    series: []
  },
  option_info_2: {
    xData: [],
    series: []
  },
  option_info_3: {
    xData: [],
    series: []
  },
  option_info_4: {
    data: []
  }
})

async function initOptions1() {
  try {
    const data = {
      // repairStatisticalAnalysisRep: {
      //   artifactType: '0', endDate: "2024-04-27", startDate: "1700-01-01", relicState: "0"
      // }
    }
    const res = await getRelicCycleWorkHoursCount(data)

    const xData = []
    const listCycle = []
    const listWork = []
    res.data.forEach((item) => {
      xData.push(item.relicName)
      listCycle.push(item.cycleCountNun)
      listWork.push(item.workingHoursCountNun)
    })
    options.option_info_1.xData = xData
    options.option_info_1.series = { cycle: listCycle, work: listWork }
  } catch (e) {
    console.error(e)
  }
}
initOptions1()

async function initOptions2() {
  try {
    const data = {
      // repairStatisticalAnalysisRep: {
      // artifactType: '0', endDate: "2024-04-27", startDate: "1700-01-01", relicState: "0"
      // }
    }
    const res = await getRepairCategoryCycleWorkHoursCount(data)

    const xData = []
    const listCycle = []
    const listWork = []

    res.data.forEach((item) => {
      const name = options_info.options_artifact_type.find((type) => type.value === item.artifactType)?.label
      xData.push(name)
      listCycle.push(item.cycleCountNun)
      listWork.push(item.workingHoursCountNun)
    })
    options.option_info_2.xData = xData
    options.option_info_2.series = { cycle: listCycle, work: listWork }
  } catch (e) {
    console.error(e)
  }
}
initOptions2()

async function initOptions3() {
  try {
    const data = {
      // repairStatisticalAnalysisRep: {
      // artifactType: '0', endDate: "2024-04-27", startDate: "1700-01-01", relicState: "0"
      // }
    }
    const res = await getRepairCollectionCompletionStatus(data)

    const xData = []
    const listType = []

    res.data.forEach((item) => {
      const name = options_info.options_relic_state.find((type) => type.value === item.relicState)?.label
      xData.push(name)
      listType.push(item.relicStateCountNun)
    })

    options.option_info_3.xData = xData
    options.option_info_3.series = listType
  } catch (e) {
    console.error(e)
  }
}
initOptions3()

async function initOptions4() {
  try {
    const data = {
      // repairStatisticalAnalysisRep: {
      // artifactType: '0', endDate: "2024-04-27", startDate: "1700-01-01", relicState: "0"
      // }
    }

    const arr = []

    const res = await getRepairCollectionCategory(data)
    res.data.forEach((item) => {
      // if (item.artifactTypeCountNun > 0) {
      const name = options_info.options_artifact_type.find((type) => type.value === item.artifactType)?.label
      arr.push({
        name,
        value: item.artifactTypeCountNun
      })
      // }
    })

    options.option_info_4.data = arr
  } catch (e) {
    console.error(e)
  }
}
initOptions4()
</script>
<style>
.canvasCard .el-card__body {
  padding: 0 !important;
}
</style>