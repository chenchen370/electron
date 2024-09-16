// 查询 文物仪器 列表
import request from '@/utils/request';

// 外借统计分析查询
export function loanStatisticsList(data) {
  return request({
    url: '/loan/statistics/list',
    method: 'post',
    data
  });
}


// 藏品类别统计
export function loanStatisticsCollectionCategory(data) {
  return request({
    url: '/loan/statistics/statisticsCollectionCategory',
    method: 'post',
    data
  });
}


// 外借藏品总数统计
export function loanStatisticsCollectionTotal(data) {
  return request({
    url: '/loan/statistics/statisticsCollectionTotal',
    method: 'post',
    data
  });
}


// 级别统计
export function loanStatisticsLevel(data) {
  return request({
    url: '/loan/statistics/statisticsLevel',
    method: 'post',
    data
  });
}


// 外借事由统计
export function loanStatisticsReason(data) {
  return request({
    url: '/loan/statistics/statisticsReason',
    method: 'post',
    data
  });
}


// 记录总量统计
export function loanStatisticsTotal(data) {
  return request({
    url: '/loan/statistics/statisticsTotal',
    method: 'post',
    data
  });
}
