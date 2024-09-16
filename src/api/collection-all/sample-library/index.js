import request from '@/utils/request'
// 藏品信息指标群 附属信息
//  查看
export function getSampleLibrary(relicsId) {
  return request({
    url: `/heritage/detail/sampleIndex`,
    method: 'post',
    data: {relicsId}
  })
}

//  添加
export function addSampleLibrary(data) {
  return request({
    url: `/heritage/relics/edit/sampleIndex/save`,
    method: 'post',
    data
  })
}

// 修改
export function editSampleLibrary(data) {
  return request({
    url: `/heritage/relics/edit/sampleIndex/save`,
    method: 'post',
    data
  })
}

//  删除数据
export function delSampleLibrary(id) {
  return request({
    url: `/heritage/detail/sampleIndex/delete/${id}`,
    method: 'post'
  })
}

//  审核
export function auditSampleLibrary(data) {
  return request({
    url: `/heritage/relics/edit/sampleIndex/approval`,
    method: 'post',
    data
  })
}
