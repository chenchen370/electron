import request from '@/utils/request'
// 藏品管理工作信息 事故损坏发生记录

//  查看
export function getAccDamOccRecord(data) {
  return request({
    url: `/heritage/detail/accidentDamageOccurrenceInfoList`,
    method: 'post',
    data
  })
}

//  添加
export function addAccDamOccRecord(data) {
  return request({
    url: `/heritage/relics/edit/accidentDamageOccurrenceInfo/save`,
    method: 'post',
    data
  })
}

// 修改
export function editAccDamOccRecord(data) {
  return request({
    url: `/heritage/relics/edit/accidentDamageOccurrenceInfo/save`,
    method: 'post',
    data
  })
}

//  删除
export function delAccDamOccRecord(data) {
  return request({
    url: `/heritage/relics/edit/accidentDamageOccurrenceInfo/delete`,
    method: 'post',
    data
  })
}

// 审核
export function auditAccDamOccRecord(data) {
  return request({
    url: `/heritage/relics/edit/accidentDamageOccurrenceInfo/approval`,
    method: 'post',
    data
  })
}
