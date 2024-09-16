import request from '@/utils/request';

// 查询设备每日巡检列表
export function getDatecheckList(params) {
  return request.get('/warning/datecheck/list', { params });
}

// 编辑
export function editDatecheck(data) {
  return request.post('/warning/datecheck/edit', data);
}

// 新增
export function addDatecheck(data) {
  return request.post('/warning/datecheck/add', data);
}

// 删除
export function removeDatecheck(data) {
  return request.delete(`/warning/datecheck/${data.ids}`);
}
// 设备每日巡检
export function setDatecheck(data) {
  return request.post('/warning/datecheck/check', data);
}