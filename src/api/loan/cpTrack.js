import request from '@/utils/request';

// 评估方案列表
export function getcpTrackList(params) {
  return request.get('/loan/cpTrack/list', { params });
}

// 编辑
export function editcpTrack(data) {
  return request.post('/loan/cpTrack/edit', data);
}

// 新增
export function addcpTrack(data) {
  return request.post('/loan/cpTrack/add', data);
}

// 删除
export function removecpTrack(data) {
  return request.delete(`/loan/cpTrack/${data.ids}`);
}
