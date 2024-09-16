import request from '@/utils/request';

// 查询
export function getDeviceList(params) {
  return request.get('/warning/device/list', { params });
}
// 查询设备历史数据
export function getDeviceHisList(params) {
  return request.get('/warning/device/hisList', {params});
}
// 查询设备历史状态数据
export function getDeviceStatusAnalyzeList(params) {
  return request.get('/warning/device/statusAnalyze', { params });
}
// 编辑
export function editDevice(data) {
  return request.post('/warning/device/edit', data);
}

// 新增
export function addDevice(data) {
  return request.post('/warning/device/add', data);
}

// 删除
export function removeDevice(data) {
  return request.delete(`/warning/device/${data.ids}`);
}
// 设备状态信息列表
export function getStatusList(data) {
  return request.delete(`/warning/device/statusList`);
}
// 设备状态信息
export function getDeviceStatusList(params) {
  return request.get('/warning/deviceStatus/list', { params });
}
