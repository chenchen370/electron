import request from '@/utils/request'
// 多媒体文档信息 研究论著信息

//  查看
export function getStudy(data) {
  return request({
    url: `/heritage/detail/researchWorksInfoList`,
    method: 'post',
    data
  })
}

//  添加
export function addStudy(data) {
  return request({
    url: `/heritage/media/researchWorksInfo/save`,
    method: 'post',
    data
  })
}

// 修改
export function editStudy(data) {
  return request({
    url: `/heritage/media/researchWorksInfo/update`,
    method: 'post',
    data
  })
}

//  删除
export function delStudy(id) {
  return request({
    url: `/heritage/media/researchWorksInfo/delete/${id}`,
    method: 'post'
  })
}
