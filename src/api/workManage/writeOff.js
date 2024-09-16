import request from '@/utils/request';

// 查询所有的注销流程列表（总帐）
export function listWirteOffAll(params) {
  return request({
    url: '/heritage/warehouse/cancel/manage/page/all',
    method: 'get',
    params
  }).then(res => res.data)
}

// 查询我的注销流程列表
export function listWirteOffMine(params) {
  return request({
    url: '/heritage/warehouse/cancel/manage/page',
    method: 'get',
    params
  }).then(res => res.data)
}
// 查询我审批的注销流程列表
export function listWirteOffApproval(params) {
  return request({
    url: '/heritage/warehouse/cancel/manage/approval/page',
    method: 'get',
    params
  }).then(res => res.data)
}

// 详细
export function getWirteOff(id) {
  return request({
    url: '/heritage/warehouse/cancel/manage/' + id,
    method: 'get'
  }).then(res => res.data)
}
// 生成注销流程编号
export function getWirteOffNo() {
  return request({
    url: '/heritage/warehouse/cancel/manage/generate/flowNo',
    method: 'post'
  }).then(res => res.data)
}
// 注销流程暂存藏品
export function saveWirteOffRelics(data) {
  return request({
    url: '/heritage/warehouse/cancel/manage/relics/save/' + data.flowId,
    method: 'post',
    data:data.relicsIds
  }).then(res => res.data)
}

// 新增
export function addWirteOff(data) {
  return request({
    url: '/heritage/warehouse/cancel/manage/save',
    method: 'post',
    data: data
  }).then(res => res.data)
}

// 修改
export function updateWirteOff(data) {
  return request({
    url: '/heritage/warehouse/cancel/manage/update',
    method: 'put',
    data: data
  }).then(res => res.data)
}

// 删除
export function delWirteOff(flowNo) {
  return request({
    url: '/heritage/warehouse/cancel/manage/' + flowNo,
    method: 'delete'
  }).then(res => res.data)
}
