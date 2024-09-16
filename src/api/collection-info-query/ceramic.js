import request from '@/utils/request';

// 查询陶瓷标本列表
export function listCeramic(query) {
  return request({
    url: '/heritage/ceramic/page',
    method: 'get',
    params: query
  });
}

// 查询陶瓷标本详细
export function getCeramic(id) {
  return request({
    url: '/heritage/ceramic/' + id,
    method: 'get'
  });
}

// 新增陶瓷标本
export function addCeramic(data) {
  return request({
    url: '/heritage/ceramic',
    method: 'post',
    data: data
  });
}

// 修改陶瓷标本
export function updateCeramic(data) {
  return request({
    url: '/heritage/ceramic',
    method: 'put',
    data: data
  });
}

// 删除陶瓷标本
export function delCeramic(id) {
  return request({
    url: '/heritage/ceramic/' + id,
    method: 'delete'
  });
}
