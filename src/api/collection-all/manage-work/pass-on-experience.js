import request from '@/utils/request'
// 藏品管理工作信息 流传经历

//  查看
export function getPassOnExperience(data) {
  return request({
    url: `/heritage/detail/transmissionExperienceInfoList`,
    method: 'post',
    data
  })
}

//  添加
export function addPassOnExperience(data) {
  return request({
    url: `/heritage/relics/edit/transmissionExperienceInfo/save`,
    method: 'post',
    data
  })
}

// 修改
export function editPassOnExperience(data) {
  return request({
    url: `/heritage/relics/edit/transmissionExperienceInfo/save`,
    method: 'post',
    data
  })
}

//  删除
export function delPassOnExperience(data) {
  return request({
    url: `/heritage/relics/edit/transmissionExperienceInfo/delete`,
    method: 'post',
    data
  })
}

//  审核
export function auditPassOnExperience(data) {
  return request({
    url: `/heritage/relics/edit/transmissionExperienceInfo/approval`,
    method: 'post',
    data
  })
}
