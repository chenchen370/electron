import request from '@/utils/request';

// 评估方案列表
export function getAssessList(params) {
  return request.get('/warning/assess/list', { params });
}
// 监测点评估方案配置列表
export function getAssessConfList(params) {
  return request.get('/warning/assess/confList', { params });
}
// 根据编号评估方案配置
export function setConfigAssess(data) {
  return request.post('/warning/assess/conf', data);
}
// 编辑
export function editAssess(data) {
  return request.post('/warning/assess/edit', data);
}

// 新增
export function addAssess(data) {
  return request.post('/warning/assess/add', data);
}

// 删除
export function removeAssess(data) {
  return request.delete(`/warning/assess/${data.ids}`);
}

// 综合评估统计
export function getAssessmentStasticst(params) {
  return request.get('/warning/assess/assessmentStastics', { params });
}
// 洁净度统计
export function getAssessCleanlinessStastics(params) {
  return request.get('/warning/assess/cleanlinessStastics', { params });
}

// 风险评估结果列表查询
export function getAssessResultList(params) {
  return request.get('/warning/assess/resultList', { params });
}

export function getAssessTabilityStastics(params) {
  return request.get('/warning/assess/stabilityStastics', { params });
}

