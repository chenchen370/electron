import request from '@/utils/request'
// 藏品管理工作信息 修复记录

//  查看
export function getRepairRecord(data) {
  return request({
    url: `/heritage/detail/withdrawalRepairInfoList`,
    method: 'post',
    data
  })
}

//  添加
export function addRepairRecord(data) {
  return request({
    url: `/heritage/relics/edit/withdrawalRepairInfo/save`,
    method: 'post',
    data
  })
}

// 修改
export function editRepairRecord(data) {
  return request({
    url: `/heritage/relics/edit/withdrawalRepairInfo/save`,
    method: 'post',
    data
  })
}

//  删除
export function delRepairRecord(data) {
  return request({
    url: `/heritage/relics/edit/withdrawalRepairInfo/delete`,
    method: 'post',
    data
  })
}

//  添加
export function auditRepairRecord(data) {
  return request({
    url: `/heritage/relics/edit/withdrawalRepairInfo/approval`,
    method: 'post',
    data
  })
}
