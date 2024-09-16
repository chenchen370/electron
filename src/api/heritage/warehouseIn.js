import request from '@/utils/request';

// 列表
export function getMediaList(params) {
  return request.get('/heritage/warehouse/in/relics/page', { params });
}

// 编辑
export function editMedia(data) {
  return request.post('/heritage/media/edit', data);
}

// 新增
export function addMedia(data) {
  return request.post('/heritage/media/add', data);
}

// 删除
export function removeMedia(data) {
  return request.delete(`/heritage/media/${data.ids}`);
}
