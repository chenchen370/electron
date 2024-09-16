import request from '@/utils/request';

// 列表
export function getDetailList(params) {
  return request.get('/heritage/detail/page', { params });
}

// 编辑
export function editDetail(data) {
  return request.put('/heritage/detail', data);
}

// 新增
export function addDetail(data) {
  return request.post('/heritage/detail', data);
}

// 删除
export function removeDetail(data) {
  return request.delete(`/heritage/detail/${data.ids}`);
}
