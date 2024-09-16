import request from '@/utils/request';

// 展柜+储藏柜数据统计
export function getDataStatisticsCabinet(params) {
  return request.get('/warning/dataStatistics/cabinet', { params });
}
// 设备数据统计
export function getDataStatisticsDevice(params) {
  return request.get('/warning/dataStatistics/device', { params });
}
// 监测区域数据统计
export function getDataStatisticsMonitorArea(params) {
  return request.get('/warning/dataStatistics/monitorArea', { params });
}
// 展厅+库房数据统计
export function getDataStatisticsMonitorPoint(params) {
  return request.get('/warning/dataStatistics/monitorPoint', { params });
}
// 展厅+库房数据统计
export function getDataStatisticsWarehouse(params) {
  return request.get('/warning/dataStatistics/warehouse', { params });
}
// 监测点预警报表
export function getDataStatisticsForm(params) {
  return request.get('/warning/dataStatistics/warningForm', { params });
}
// 监测点警报状态统计
export function getDataStatisticsStatus(params) {
  return request.get('/warning/dataStatistics/warningStatus', { params });
}
export function getMonitorPointDevices(data) {
  return request.get(`/warning/monitorPoint/devices/${data}`);
}