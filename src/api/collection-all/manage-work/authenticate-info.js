import request from '@/utils/request'
// 藏品管理工作信息 鉴定信息

//  查看
export function getAuthenticate(data) {
  return request({
    url: `/heritage/detail/appraisalInformationInfoList`,
    method: 'post',
    data
  })
}

//  添加
export function addAuthenticate(data) {
  return request({
    url: `/heritage/relics/edit/appraisalInformationInfo/save`,
    method: 'post',
    data
  })
}

// 修改
export function editAuthenticate(data) {
  return request({
    url: `/heritage/relics/edit/appraisalInformationInfo/save`,
    method: 'post',
    data
  })
}

//  删除数据
export function delAuthenticate(data) {
  return request({
    url: `/heritage/relics/edit/appraisalInformationInfo/delete`,
    method: 'post',
    data
  })
}

//  删除数据
export function auditAuthenticate(data) {
  return request({
    url: `/heritage/relics/edit/appraisalInformationInfo/approval`,
    method: 'post',
    data
  })
}
