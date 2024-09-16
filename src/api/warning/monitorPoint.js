import request from '@/utils/request';

// 查询
export function getMonitorPointList(params) {
  return request.get('/warning/monitorPoint/list', { params });
}

// 编辑
export function editMonitorPoint(data) {
  return request.post('/warning/monitorPoint/edit', data);
}

// 新增
export function addMonitorPoint(data) {
  return request.post('/warning/monitorPoint/add', data);
}

// 删除
export function removeMonitorPoint(data) {
  return request.delete(`/warning/monitorPoint/${data.ids}`);
}
export function getMonitorPoint(data) {
  return request.get(`/warning/monitorPoint/${data}`);
}