import request from '@/utils/request';

// 评估方案列表
export function getRiskAssessList(params) {
  return request.get('/loan/riskAssess/list', { params });
}

// 编辑
export function editRiskAssess(data) {
  return request.post('/loan/riskAssess/edit', data);
}

// 新增
export function addRiskAssess(data) {
  return request.post('/loan/riskAssess/add', data);
}

// 删除
export function removeRiskAssess(data) {
  return request.delete(`/loan/riskAssess/${data.ids}`);
}
