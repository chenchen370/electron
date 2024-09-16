import request from '@/utils/request';

// 监测数据总览监测区域实时数据列表
export function getMonitorDataList(params) {
  return request.get('/warning/monitorData/areaRealTime', { params });
}
// 监测数据总览监测区域历史数据
export function getMonitorDataHis(params) {
  return request.get('/warning/monitorData/areaHis', { params });
}
// 监测数据总览监测点实时数据列表
export function getMonitorPointRealTime(params) {
  return request.get('/warning/monitorData/pointRealTime', { params });
}
// 监测数据总览监测点历史数据
export function getMonitorPointHis(params) {
  return request.get('/warning/monitorData/pointHis', { params });
}
// 编辑
export function editMonitorData(data) {
  return request.post('/warning/monitorData/edit', data);
}

// 新增
export function addMonitorData(data) {
  return request.post('/warning/monitorData/add', data);
}

// 删除
export function removeMonitorData(data) {
  return request.delete(`/warning/monitorData/${data.ids}`);
}
