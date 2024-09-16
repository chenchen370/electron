import request from '@/utils/request'

export function getRelicsQuery(params) {
  return request.get('/auth/sharing/manage/list', { params })
}

//添加部门共享藏品
export function addShare(params) {
  return request({
    url:`/auth/sharing/manage/addShare?relicsIds=${params}`,
    method:'put',
  })
}

//取消部门共享藏品
export function cancellationShare(params) {
  return request({
    url:`/auth/sharing/manage/cancellationShare?relicsIds=${params}`,
    method:'put',
  })
}

//获取部门藏品共享指标信息
export function indexQuery(params) {
  return request.get('/auth/sharing/manage/indexQuery',params)
}

//查询部门藏品多媒体信息
export function getDeptList() {
  return request.get('/auth/sharing/manage/list')
}

//获取部门藏品信息
export function relicsQuery(params) {
  return request({
    url: '/auth/sharing/manage/relicsQuery',
    method: 'get',
    params
  })
}

//修改部门藏品指标
export function sharingCollectionEdit(data) {
  return request.put('/auth/sharing/manage/sharingCollectionEdit',data)
}
//修改部门藏品指标
export function sharingMultimediaEdit(data) {
  return request.put('/auth/sharing/manage/sharingMultimediaEdit',data)
}
