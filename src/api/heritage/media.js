import request from '@/utils/request';

// 列表
export function getMediaList(params) {
  return request.get('/heritage/media/page', { params });
}

// 编辑
export function editMedia(data) {
  return request.put('/heritage/media', data);
}

// 新增
export function addMedia(data) {
  return request.post('/heritage/media', data);
}

// 删除
export function removeMedia(data) {
  return request.delete(`/heritage/media/${data.ids}`);
}
