import request from '@/utils/request'
// 藏品管理工作信息 来源信息

//  查看
export function getSourceInfo(relicsId) {
  return request({
    url: `/heritage/detail/sourceInfo/${relicsId}`,
    method: 'post'
  })
}

//  添加
export function addSourceInfo(data) {
  return request({
    url: `/heritage/relics/edit/sourceInfo/save`,
    method: 'post',
    data
  })
}

// 修改
export function editSourceInfo(data) {
  return request({
    url: `/heritage/relics/edit/sourceInfo/save`,
    method: 'post',
    data
  })
}

//  删除
export function delSourceInfo(id) {
  return request({
    url: `/heritage/detail/sourceInfo/delete/${id}`,
    method: 'post'
  })
}

// 审核
export function auditSourceInfo(data) {
  return request({
    url: `/heritage/relics/edit/sourceInfo/approval`,
    method: 'post',
    data
  })
}
