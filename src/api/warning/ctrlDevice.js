import request from '@/utils/request';

// 设备调控运行列表
export function getCtrlDeviceRunList(params) {
  return request.get('/warning/ctrlDevice/runList', { params });
}
// 调控设备运行状态历史
export function getCtrlDeviceRunHis(params) {
  return request.get('/warning/ctrlDevice/runHis', { params });
}
// 调控历史
export function getCtrlDeviceCtrlHis(params) {
  return request.get('/warning/ctrlDevice/ctrlHis', { params });
}
// 下发调控指令
export function addCtrlDevice(data) {
  return request.post('/warning/ctrlDevice/ctrl', data);
}

// 查询调控设备列表，默认分页，附带实时监测数据
export function getCtrlDevicelistWithData(params) {
  return request.get('/warning/ctrlDevice/listWithData', { params });
}