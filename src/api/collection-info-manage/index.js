import request from '@/utils/request'

// 藏品信息编辑 ---》 列表 审核
export function getCollectionEditList(params) {
  return request({
    url: '/heritage/relics/edit/page',
    method: 'get',
    params
  })
}

// 藏品信息编辑 ---》 列表 藏品信息
export function getCollectionList(params) {
  return request({
    url: '/heritage/relics/edit/relics/page',
    method: 'get',
    params
  })
}

// 藏品信息编辑 ---》 新增 藏品数据
export function addCollection(data) {
  return request({
    url: '/heritage/relics/edit/special/save',
    method: 'post',
    data
  })
}

// 藏品信息编辑 ---》 编辑 藏品数据
export function editCollection(data) {
  return request({
    url: '/heritage/relics/edit/relicsInfo/save',
    method: 'post',
    data
  })
}

// 藏品信息编辑 ---》 详情（藏品） 藏品数据
export function detailCollection(id) {
  return request({
    url: `/heritage/detail/${id}`,
    method: 'get'
  })
}

// 藏品信息编辑 ---》 详情（审批）藏品数据
export function detailEditCollection(id) {
  return request({
    url: `/heritage/relics/edit/info/${id}`,
    method: 'get'
  })
}

// 藏品信息编辑 ---》 审核列表（删除） 藏品编辑序号逗号隔开
export function delCollectionEditList(ids) {
  return request({
    url: `/heritage/relics/edit/${ids}`,
    method: 'delete'
  })
}

// 藏品信息编辑 ---》 审批 藏品信息
export function auditCollection(ids) {
  return request({
    url: `/heritage/relics/edit/approval?ids=${ids}`,
    method: 'post'
  })
}

// 藏品信息编辑 ---》 审批（批量） 藏品信息
export function auditBatchCollection(data) {
  return request({
    url: `/heritage/relics/edit/approval/batch`,
    method: 'post',
    data
  })
}

// 藏品信息编辑 ---》 基本文物信息修改
export function editRelicsInfo(data) {
  return request({
    url: `/heritage/relics/edit/relicsInfo/save`,
    method: 'post',
    data
  })
}

// 藏品信息编辑总账 ---》 审核列表
export function getCollectionEditBillList(params) {
  return request({
    url: '/heritage/relics/edit/page/all',
    method: 'get',
    params
  })
}

// 藏品信息审核 ---》 审核列表
export function getCollectionAuditList(params) {
  return request({
    url: '/heritage/relics/edit/approval/page',
    method: 'get',
    params
  })
}

// 藏品信息审核总账 ---》 审核列表
export function getCollectionAuditBillList(params) {
  return request({
    url: '/heritage/relics/edit/approval/page/all',
    method: 'get',
    params
  })
}
