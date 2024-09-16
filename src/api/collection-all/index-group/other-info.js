import request from '@/utils/request'
// 藏品信息指标群 其他信息
export function getOtherInfo(relicsId) {
  return request({
    url: `/heritage/detail/basicOther/${relicsId}`,
    method: 'post'
  })
}

//  添加
export function addOtherInfo(data) {
  return request({
    url: `/heritage/relics/edit/basicOther/save`,
    method: 'post',
    data
  })
}

// 修改
export function editOtherInfo(data) {
  return request({
    url: `/heritage/relics/edit/basicOther/save`,
    method: 'post',
    data
  })
}

//  删除数据
export function delOtherInfo(id) {
  return request({
    url: `/heritage/detail/basicOther/delete/${id}`,
    method: 'post'
  })
}

//  审核
export function auditOtherInfo(data) {
  return request({
    url: `/heritage/relics/edit/basicOther/approval`,
    method: 'post',
    data
  })
}
