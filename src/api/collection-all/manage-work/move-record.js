import request from '@/utils/request'
// 藏品管理工作信息 移动记录

//  查看
export function getMoveRecord(data) {
  return request({
    url: `/heritage/detail/withdrawalMobileInfoList`,
    method: 'post',
    data
  })
}

//  添加
export function addMoveRecord(data) {
  return request({
    url: `/heritage/relics/edit/withdrawalMobileInfo/save`,
    method: 'post',
    data
  })
}

// 修改
export function editMoveRecord(data) {
  return request({
    url: `/heritage/relics/edit/withdrawalMobileInfo/save`,
    method: 'post',
    data
  })
}

//  删除
export function delMoveRecord(data) {
  return request({
    url: `/heritage/relics/edit/withdrawalMobileInfo/delete`,
    method: 'post',
    data
  })
}

// 审核
export function auditMoveRecord(data) {
  return request({
    url: `/heritage/relics/edit/withdrawalRepairInfo/approval`,
    method: 'post',
    data
  })
}
