import request from '@/utils/request'
import { IPropsStatistics } from '../../views/collection-repair/statistics/type'

// 藏品修复 周期、工时的 工作量 统计
export function getRelicCycleWorkHoursCount(data?: any) {
  return request({
    url: '/heritage/repair/relicCycleWorkHoursCount',
    method: 'post',
    data
  })
}

// 文物类别修复 周期 或 工时 统计
export function getRepairCategoryCycleWorkHoursCount(data?: IPropsStatistics) {
  return request({
    url: '/heritage/repair/repairCategoryCycleWorkHoursCount',
    method: 'post',
    data
  })
}

// 修复项目 文物类别 统计
export function getRepairCollectionCategory(data?: IPropsStatistics) {
  return request({
    url: '/heritage/repair/repairCollectionCategory',
    method: 'post',
    data
  })
}
// 修复项目 完成情况 统计
export function getRepairCollectionCompletionStatus(data?: IPropsStatistics) {
  return request({
    url: '/heritage/repair/repairCollectionCompletionStatus',
    method: 'post',
    data
  })
}
