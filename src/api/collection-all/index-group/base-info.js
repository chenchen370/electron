import request from '@/utils/request'
// 藏品信息指标群 基本信息
//  查看
export function getBaseInfo(relicsId) {
  return request({
    url: `/heritage/detail/basicInfo/${relicsId}`,
    method: 'get'
  })
}

//  添加
export function addBaseInfo(data) {
  return request({
    url: `/heritage/relics/edit/basicInfo/save`,
    method: 'post',
    data
  })
}

// 修改
export function editBaseInfo(data) {
  return request({
    url: `/heritage/relics/edit/basicInfo/save`,
    method: 'post',
    data
  })
}

//  删除
export function delBaseInfo(id) {
  return request({
    url: `/heritage/detail/basicInfo/delete/${id}`,
    method: 'post'
  })
}

//  审核
export function auditBaseInfo(data) {
  return request({
    url: `/heritage/relics/edit/basicInfo/approval`,
    method: 'post',
    data
  })
}
