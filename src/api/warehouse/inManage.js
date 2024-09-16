import request from '@/utils/request'

// 查询我的入馆入库流程
export function inManageList(params) {
  return request({
    url: '/heritage/warehouse/in/manage/page',
    method: 'get',
    params
  }).then(res => res.data)
}
// 查询我的入馆入库流程审批列表
export function inManageApprovalList(params) {
  return request({
    url: '/heritage/warehouse/in/manage/approval/page',
    method: 'get',
    params
  }).then(res => res.data)
}
//详情
export function inManageDetail(id) {
  return request({
    url: '/heritage/warehouse/in/manage/' + id,
    method: 'get',
  }).then(res => res.data)
}

// 新增入库单
export function inManageAdd(data) {
  return request({
    url: '/heritage/warehouse/in/manage/doc',
    method: 'post',
    data
  }).then(res => res.data)
}
//模板生成
export function inManageAdd2(data) {
  return request({
    url: '/heritage/warehouse/in/manage/docA',
    method: 'post',
    data
  }).then(res => res.data)
}
//删除
export function inManageDel(ids) {
  return request({
    url: '/heritage/warehouse/in/manage',
    method: 'delete',
    params: { idList: ids }
  }).then(res => res.data)
}
//修改
export function inManageEdit(data) {
  return request({
    url: '/heritage/warehouse/in/manage',
    method: 'put',
    data
  }).then(res => res.data)
}