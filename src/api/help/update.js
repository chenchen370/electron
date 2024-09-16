import request from '@/utils/request';

// 查询常见问题记录列表
export function getUpdateList(params) {
  return request.get('/auth/help/update/list', { params });
}

// 新增常见问题
export function addUpdate(data) {
  return request.post('/auth/help/update', data);
}

// 修改常见问题
export function editUpdate(data) {
  return request.put('/auth/help/update', data);
}

// 删除常见问题
export function deleteUpdate(data) {
  return request.delete(`/auth/help/update/${data.updateId}`);
}
