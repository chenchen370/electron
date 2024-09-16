import request from '@/utils/request'
// 查询字典数据列表（不分页）
export function dataTree(query) {
  return request({
    url: '/auth/system/dict/data/dataList',
    method: 'get',
    params: query
  })
}

// 查询字典数据列表
export function listData(query) {
  return request({
    url: '/auth/system/dict/data/list',
    method: 'get',
    params: query
  })
}

// 查询字典数据详细
export function getData(dictCode) {
  return request({
    url: '/auth/system/dict/data/' + dictCode,
    method: 'get'
  })
}

// 根据字典类型查询字典数据信息
export function getDicts(dictType,params) {
  return request({
    url: '/auth/system/dict/data/type/' + dictType,
    method: 'get',
    params
  })
}

// 新增字典数据
export function addData(data) {
  return request({
    url: '/auth/system/dict/data',
    method: 'post',
    data: data
  })
}

// 修改字典数据
export function updateData(data) {
  return request({
    url: '/auth/system/dict/data',
    method: 'put',
    data: data
  })
}

// 删除字典数据
export function delData(dictCode) {
  return request({
    url: '/auth/system/dict/data/' + dictCode,
    method: 'delete'
  })
}
// 根据字典类型查询字典数据信息
export function getCacheDicts(dictType,params) {
  return request({
    url: '/auth/system/dict/data/cache/' + dictType,
    method: 'get',
    params
  })
}