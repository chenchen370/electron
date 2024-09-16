import request from '@/utils/request';

// 监测计划配置列表查询
export function getMonitorPlanList(params) {
  return request.get('/loan/monitorPlan/list', { params });
}

// 编辑
export function editMonitorPlan(data) {
  return request.post('/loan/monitorPlan/update', data);
}

// 新增
export function addMonitorPlan(data) {
  return request.post('/loan/monitorPlan/add', data);
}

// 删除
export function removeMonitorPlan(data) {
  return request.delete(`/loan/monitorPlan/${data.ids}`);
}
