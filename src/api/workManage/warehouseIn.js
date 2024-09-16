import request from '@/utils/request';

// 查询入库流程列表
export function listWarehouseIn(query) {
  return request({
    url: '/heritage/warehouse/in/manage/page',
    method: 'get',
    params: query
  });
}

// 查询入库流程详细
export function getWarehouseIn(id) {
  return request({
    url: '/heritage/warehouse/in/manage/' + id,
    method: 'get'
  });
}

// 新增入库流程
export function addWarehouseIn(data) {
  return request({
    url: '/heritage/warehouse/in/manage/doc',
    method: 'post',
    data: data
  });
}

// 修改入库流程
export function updateWarehouseIn(data) {
  return request({
    url: '/heritage/warehouse/in/manage',
    method: 'put',
    data: data
  });
}

// 删除入库流程
export function delWarehouseIn(id) {
  return request({
    url: '/heritage/warehouse/in/manage/' + id,
    method: 'delete'
  });
}
