import request from '@/utils/request';

// 查询
export function getDeviceFeedbackList(params) {
  return request.get('/warning/deviceFeedback/list', { params });
}

// 编辑
export function editDeviceFeedback(data) {
  return request.post('/warning/deviceFeedback/edit', data);
}

// 新增
export function addDeviceFeedback(data) {
  return request.post('/warning/deviceFeedback/add', data);
}

// 删除
export function removeDeviceFeedback(data) {
  return request.delete(`/warning/deviceFeedback/${data.ids}`);
}
