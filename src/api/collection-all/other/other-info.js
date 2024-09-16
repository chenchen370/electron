import request from '@/utils/request'
// 其他信息

//  查看
export function getOtherInfo(data) {
  return request({
    url: `/heritage/detail/otherInfoList`,
    method: 'post',
    data
  })
}

//  添加
export function addOtherInfo(data) {
  return request({
    url: `/heritage/relics/edit/otherInfo/save`,
    method: 'post',
    data
  })
}

// 修改
export function editOtherInfo(data) {
  return request({
    url: `/heritage/relics/edit/otherInfo/save`,
    method: 'post',
    data
  })
}

//  删除
export function delOtherInfo(data) {
  return request({
    url: `/heritage/relics/edit/otherInfo/delete`,
    method: 'post',
    data
  })
}

// 审核
export function auditOtherInfo(data) {
  return request({
    url: `/heritage/relics/edit/otherInfo/approval`,
    method: 'post',
    data
  })
}
