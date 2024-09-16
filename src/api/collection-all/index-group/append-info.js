import request from '@/utils/request'
// 藏品信息指标群 附属信息
//  查看
export function getAppendInfo(relicsId) {
  return request({
    url: `/heritage/detail/subsidiaryInfo/${relicsId}`,
    method: 'post'
  })
}

//  添加
export function addAppendInfo(data) {
  return request({
    url: `/heritage/relics/edit/subsidiaryInfo/save`,
    method: 'post',
    data
  })
}

// 修改
export function editAppendInfo(data) {
  return request({
    url: `/heritage/relics/edit/subsidiaryInfo/save`,
    method: 'post',
    data
  })
}

//  删除数据
export function delAppendInfo(id) {
  return request({
    url: `/heritage/detail/subsidiaryInfo/delete/${id}`,
    method: 'post'
  })
}

//  审核
export function auditAppendInfo(data) {
  return request({
    url: `/heritage/relics/edit/subsidiaryInfo/approval`,
    method: 'post',
    data
  })
}
