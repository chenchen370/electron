import request from '@/utils/request';

// 查询
export function getControlHistoryList(params) {
  return request.get('/warning/controlHistory/list', { params });
}

// 编辑
export function editControlHistory(data) {
  return request.post('/warning/controlHistory/edit', data);
}

// 新增
export function addControlHistory(data) {
  return request.post('/warning/controlHistory/add', data);
}

// 删除
export function removeControlHistory(data) {
  return request.delete(`/warning/controlHistory/${data.ids}`);
}
