import request from '@/utils/request';

// 查询多媒体信息列表
export function listMedia(query) {
  return request({
    url: '/heritage/media/page',
    method: 'get',
    params: query
  });
}

// 查询多媒体信息详细
export function getMedia(id) {
  return request({
    url: '/heritage/media/' + id,
    method: 'get'
  });
}

// 新增多媒体信息
export function addMedia(data) {
  return request({
    url: '/heritage/media',
    method: 'post',
    data: data
  });
}

// 修改多媒体信息
export function updateMedia(data) {
  return request({
    url: '/heritage/media',
    method: 'put',
    data: data
  });
}

// 删除多媒体信息
export function delMedia(id) {
  return request({
    url: '/heritage/media/' + id,
    method: 'delete'
  });
}
