import request from '@/utils/request';

// 评估方案列表
export function getSchemeList(params) {
  return request.get('/warning/scheme/list', { params });
}

// 编辑
export function editScheme(data) {
  return request.post('/warning/scheme/edit', data);
}

// 新增
export function addScheme(data) {
  return request.post('/warning/scheme/add', data);
}

// 删除
export function removeScheme(data) {
  return request.delete(`/warning/scheme/${data.ids}`);
}
