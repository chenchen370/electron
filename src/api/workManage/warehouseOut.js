import request from '@/utils/request';

// 查询出库流程列表
export function listWarehouseOut(query) {
  return request({
    url: '/heritage/warehouse/out/manage',
    method: 'get',
    params: query
  });
}

// 查询出库流程详细
export function getWarehouseOut(id) {
  return request({
    url: '/heritage/warehouse/out/manage/' + id,
    method: 'get'
  });
}

// 新增出库流程
export function addWarehouseOut(data) {
  return request({
    url: '/heritage/warehouse/out/manage/create',
    method: 'post',
    data: data
  });
}

// 修改出库流程
export function updateWarehouseOut(data) {
  return request({
    url: '/heritage/warehouse/out/manage/update',
    method: 'put',
    data: data
  });
}

// 删除出库流程
export function delWarehouseOut(id) {
  return request({
    url: '/heritage/warehouse/out/manage/' + id,
    method: 'delete'
  });
}
