import request from '@/utils/request'
// 藏品管理工作信息 核销

//  查看
export function getBackOut(relicsId) {
  return request({
    url: `/heritage/detail/writeOffInfo/${relicsId}`,
    method: 'post'
  })
}

//  添加
export function addBackOut(data) {
  return request({
    url: `/heritage/relics/edit/writeOffInfo/save`,
    method: 'post',
    data
  })
}

// 修改
export function editBackOut(data) {
  return request({
    url: `/heritage/relics/edit/writeOffInfo/save`,
    method: 'post',
    data
  })
}

//  删除
export function delBackOut(id) {
  return request({
    url: `/heritage/detail/writeOffInfo/delete/${id}`,
    method: 'post'
  })
}

// 审核
export function auditBackOut(data) {
  return request({
    url: `/heritage/relics/edit/writeOffInfo/approval`,
    method: 'post',
    data
  })
}
