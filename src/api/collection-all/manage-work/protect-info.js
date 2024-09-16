import request from '@/utils/request'
// 藏品管理工作信息 保护信息

//  查看
export function getProtectInfo(data) {
  return request({
    url: `/heritage/detail/protectInfoList`,
    method: 'post',
    data
  })
}

//  添加
export function addProtectInfo(data) {
  return request({
    url: `/heritage/relics/edit/protectInfo/save`,
    method: 'post',
    data
  })
}

// 修改
export function editProtectInfo(data) {
  return request({
    url: `/heritage/relics/edit/protectInfo/save`,
    method: 'post',
    data
  })
}

//  删除
export function delProtectInfo(data) {
  return request({
    url: `/heritage/relics/edit/protectInfo/delete`,
    method: 'post',
    data
  })
}

// 审核
export function auditProtectInfo(data) {
  return request({
    url: `/heritage/relics/edit/protectInfo/approval`,
    method: 'post',
    data
  })
}
