import request from '@/utils/request';

// 查询藏品媒体统计
export function getMediaStatistics(data) {
  return request.get('/heritage/statistics/multimediaStatistics', data).then(res => res.data)
}

// 查询藏品来源统计
export function getFromStatistics(data) {
  return request.get('/heritage/statistics/relicFromStatistics', data).then(res => res.data)
}

// 查询藏品级别统计
export function getLevelStatistics(data) {
  return request.get('/heritage/statistics/relicLevelStatistics', data).then(res => res.data)
}

// 查询入藏时间统计
export function getTimeStatistics(data) {
  return request.get('/heritage/statistics/relicTimeStatistics', data).then(res => res.data)
}

// 查询库房藏品统计
export function getHouseStatistics(data) {
  return request.get('/heritage/statistics/warehouseStatistics', data).then(res => res.data)
}

// 查询藏品年代统计
export function getAgeStatistics(data) {
  return request.get('/heritage/statistics/age', data).then(res => res.data)
}

// 查询出入库总账
export function getOutboundStatistics(data) {
  return request.get('/heritage/statistics/outboundProcess', data).then(res => res.data)
}
// 获取
export function getExhibitionStatistics(data) {
  return request.get(`/heritage/statistics/exhibitionStatistics/`+data)
}