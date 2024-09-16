import request from '@/utils/request'
// 藏品信息指标群 基本情况描述
//  查看
export function getBaseCaseDesc(relicsId) {
  return request({
    url: `/heritage/detail/basicDescribe/${relicsId}`,
    method: 'post'
  })
}

//  添加
export function addBaseCaseDesc(data) {
  return request({
    url: `/heritage/relics/edit/basicDescribe/save`,
    method: 'post',
    data
  })
}

// 修改
export function editBaseCaseDesc(data) {
  return request({
    url: `/heritage/relics/edit/basicDescribe/save`,
    method: 'post',
    data
  })
}

//  删除数据
export function delBaseCaseDesc(id) {
  return request({
    url: `/heritage/detail/basicDescribe/delete/${id}`,
    method: 'post'
  })
}

//  审核
export function auditBaseCaseDesc(data) {
  return request({
    url: `/heritage/relics/edit/basicDescribe/approval`,
    method: 'post',
    data
  })
}
