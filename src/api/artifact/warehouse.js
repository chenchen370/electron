import request from '@/utils/request';

// 查询【库房】列表
export function getWarehouseList(params) {
  return request.get('/artifact/warehouse/list', { params });
}

export function getWarehouseAllList(params) {
  return request.get('/artifact/warehouse/getAllList', { params });
}
// 编辑
export function editWarehouse(data) {
  return request.post('/artifact/warehouse/edit', data);
}

// 新增
export function addWarehouse(data) {
  return request.post('/artifact/warehouse/add', data);
}

// 删除
export function removeWarehouse(data) {
  return request.delete(`/artifact/warehouse/${data.ids}`);
}

// 生成【库房】编号
export function createIdWarehouse() {
  return request.get(`/artifact/warehouse/createId`);
}

// 获取【库房】详细信息
export function detailWarehouse(data) {
  return request.get(`/artifact/warehouse/${data}}`);
}
export function getWarehouseTree(params) {
  return request.get('/artifact/warehouse/getTree', { params });
}