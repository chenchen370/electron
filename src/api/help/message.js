import request from '@/utils/request';

export function getMessageList(params) {
  return request.get('/auth/help/message/list', { params });
}

// export function addMessage(data) {
//   return request.post('/auth/help/message', data);
// }

export function editMessage(data) {
  return request.put(`/auth/help/message/${data.messageId}`);
}

export function deleteMessage(data) {
  return request.delete(`/auth/help/message/${data.messageId}`);
}
