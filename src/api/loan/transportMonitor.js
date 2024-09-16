import request from '@/utils/request';

// 评估方案列表
export function getTransportMonitorList(params) {
  return request.get('/loan/transportMonitor/list', { params });
}

// 编辑
export function editTransportMonitor(data) {
  return request.post('/loan/transportMonitor/edit', data);
}

// 新增
export function addTransportMonitor(data) {
  return request.post('/loan/transportMonitor/add', data);
}

// 删除
export function removeTransportMonitor(data) {
  return request.delete(`/loan/transportMonitor/${data.ids}`);
}
