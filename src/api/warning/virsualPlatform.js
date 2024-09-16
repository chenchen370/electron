import request from '@/utils/request';

// 所有监测点列表
export function getVirsualPlatformList(params) {
  return request.get('/warning/virsualPlatform/list', { params });
}
export function cabinetStatistics(houseId) {
  return request.get(`warning/virsualPlatform/cabinetStatistics/${houseId}`);
}
export function trend(startDate) {
  return request.get(`/warning/virsualPlatform/trend?startDate=${startDate}`);
}

// 环境监测-监测区域历史数据列表（折线图）
export function getVirsualPlatformDataHis(data,params) {
  return request.get(`/warning/virsualPlatform/monitorHis/${data}`, { params });
}
// 环境监测-监测区域实时数据
export function getMonitorDataList(data) {
  return request.get(`/warning/virsualPlatform/realTimeData/${data}`);
}
export function getWarningList(data) {
  return request.get(`/warning/virsualPlatform/warningList/${data}`);
}
export function getWarningTypeStatstics(data) {
  return request.get(`/warning/virsualPlatform/warningType/statstics/${data}`);
}

export function pointStatusStatistics(houseId) {
  return request.get(`warning/virsualPlatform/pointStatusStatistics?houseId=${houseId}`);
}
export function getAssessPointList(params) {
  return request.get('/warning/assess/pointList', { params });
}
export function warehouseList(params) {
  return request.get('/artifact/warehouse/getAllList', { params });
}

export function deviceStatistics(houseId) {
  return request.get(`/warning/virsualPlatform/deviceStatistics/${houseId}`);
}
export function microPointRealTime(params) {
  return request.get(`/warning/virsualPlatform/microPointRealTime`, { params });
}
export function monitorPointList(houseId) {
  return request.get(`/warning/monitorPoint/list?houseId=${houseId}&pointType=1`);
}
export function pointHis(houseId, params) {
  return request.get(`/warning/virsualPlatform/pointHis`, {params});
}