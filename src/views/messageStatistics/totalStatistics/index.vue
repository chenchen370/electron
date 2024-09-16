<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-card shadow="never" class="mb-10px canvasCard">
          <MediaFiles h="400px" :data="mediaData" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="never" class="mb-10px canvasCard">
          <RelicFrom h="400px" :data="fromData" />
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <el-card shadow="never" class="mb-10px canvasCard">
          <RelicsLevel h="400px" :data="levelData" />
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="never" class="mb-10px canvasCard">
          <RelicTime h="400px" :data="timeData" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import MediaFiles from './components/MediaFiles.vue';
import RelicFrom from './components/RelicFrom.vue';
import RelicsLevel from './components/RelicsLevel.vue';
import RelicTime from './components/RelicTime.vue';

import { getMediaStatistics, getFromStatistics, getLevelStatistics, getTimeStatistics } from "@/api/collection-statistics/total-statistics"

import useInitOptions from '@/hooks/use_init_options.ts'

const options_info = useInitOptions([
  {
    // 文物级别
    key: 'options_artifact_level',
    isDict: true,
    dictCode: 'artifact_level'
  },
  {
    // 文物来源
    key: 'options_from_type',
    isDict: true,
    dictCode: 'source_cultural_relics'
  },
  {
    // 入藏时间范围
    key: 'options_time',
    isDict: true,
    dictCode: 'time_range_tibet'
  },
])

const mediaData = ref([])
const fromData = reactive({ xData: [], seriesData: [] })
const levelData = ref([])
const timeData = reactive({ xData: [], seriesData: [] })

// 多媒体文件类型（0-图片，1-视频，2-音频，3-动画，4-3D ，5-电子出版，6-其他）
const mediaType = [
  { label: '图片', value: '0' },
  { label: '视频', value: '1' },
  { label: '音频', value: '2' },
  { label: '动画', value: '3' },
  { label: '3D文件', value: '4' },
  { label: '电子出版物', value: '5' },
  { label: '其他', value: '6' },
  { label: '研究论著', value: '999' },
]

function getData() {
  getMediaStatistics().then(data => {
    if (data) {
      let arr1 = []
      data.forEach(item => {
        let name = mediaType.find(a => a.value == item.outbound)?.label
        arr1.push({ value: item.count, name })
      });
      mediaData.value = arr1
    }
  })
  getFromStatistics().then(data => {
    let arr1 = []
    let arr2 = []
    if (data) {
      data.forEach(item => {
        let name = options_info.options_from_type.find(a => a.value == item.relic_from)?.label
        arr1.push(name || item.relic_from || '未配置')
        arr2.push(item.count)
      });
    }
    fromData.xData = arr1
    fromData.seriesData = arr2
  })
  getLevelStatistics().then(data => {
    let arr1 = []
    if (data) {
      data.forEach(item => {
        let name = options_info.options_artifact_level.find(a => a.value == item.relic_level)?.label
        arr1.push({ value: item.count, name: name || item.relic_level || '未配置' })
      });
    }
    levelData.value = arr1
  })
  getTimeStatistics().then(data => {
    let arr1 = []
    let arr2 = []
    if (data) {
      data.forEach(item => {
        let name = options_info.options_time.find(a => a.value == item.relic_time)?.label
        arr1.push(name || item.relic_time || '未配置')
        arr2.push(item.count)
      });
    }
    timeData.xData = arr1
    timeData.seriesData = arr2
  })
}
getData()
</script>
<style>
.canvasCard .el-card__body {
  padding: 0 !important;
}
</style>