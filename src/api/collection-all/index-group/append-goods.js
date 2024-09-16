import request from '@/utils/request'
// 藏品信息指标群 附属物

//  查看
export function getAppendGoods(data) {
  return request({
    url: `/heritage/detail/basicAccessoriesList`,
    method: 'post',
    data
  })
}

//  添加
export function addAppendGoods(data) {
  return request({
    url: `/heritage/relics/edit/basicAccessories/save`,
    method: 'post',
    data
  })
}

// 修改
export function editAppendGoods(data) {
  return request({
    url: `/heritage/relics/edit/basicAccessories/save`,
    method: 'post',
    data
  })
}

//  删除数据
export function delAppendGoods(data) {
  return request({
    url: `/heritage/relics/edit/basicAccessories/delete`,
    method: 'post',
    data
  })
}

//  审核
export function auditAppendGoods(data) {
  return request({
    url: `/heritage/relics/edit/basicAccessories/approval`,
    method: 'post',
    data
  })
}
