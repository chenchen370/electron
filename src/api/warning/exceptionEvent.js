import request from '@/utils/request';

// 异常事件-列表
export function getExceptionEventList(params) {
  return request.get('/warning/exceptionEvent/list', { params });
}

// 处理
export function editExceptionEvent(data) {
  return request.post('/warning/exceptionEvent/deal', data);
}
