import request from '@/utils/request'
// 藏品管理工作信息 考古发掘信息

//  查看
export function getArchaeologicalFindInfo(relicsId) {
  return request({
    url: `/heritage/detail/archaeologicalExcavationInfo/${relicsId}`,
    method: 'post'
  })
}

//  添加
export function addArchaeologicalFindInfo(data) {
  return request({
    url: `/heritage/relics/edit/archaeologicalExcavationInfo/save`,
    method: 'post',
    data
  })
}

// 修改
export function editArchaeologicalFindInfo(data) {
  return request({
    url: `/heritage/relics/edit/archaeologicalExcavationInfo/save`,
    method: 'post',
    data
  })
}

//  删除数据
export function delArchaeologicalFindInfo(id) {
  return request({
    url: `/heritage/detail/archaeologicalExcavationInfo/delete/${id}`,
    method: 'post'
  })
}

// 审核
export function auditArchaeologicalFindInfo(data) {
  return request({
    url: `/heritage/relics/edit/archaeologicalExcavationInfo/approval`,
    method: 'post',
    data
  })
}
