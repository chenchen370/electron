import request from '@/utils/request'

// 查询文物信息列表
export function listThing(query) {
  return request({
    url: `/heritage/detail/page`,
    method: 'get',
    params: query
  })
}

// 查询文物信息详细
export function getThing(id) {
  return request({
    url: '/heritage/detail/' + id,
    method: 'get'
  })
}

// 新增文物信息
export function addThing(data) {
  return request({
    url: '/heritage/detail',
    method: 'post',
    data: data
  })
}

// 修改文物信息
export function updateThing(data) {
  return request({
    url: '/heritage/detail',
    method: 'put',
    data: data
  })
}

// 删除文物信息
export function delThing(id) {
  return request({
    url: '/heritage/detail/' + id,
    method: 'delete'
  })
}

/**
 * 藏品档案导出
 * @param params idList
 */
export function exportDangAn(params) {
  return request({
    url: `/heritage/detail/cpdagenerate?idList=${params}`,
    method: 'get'
  })
}
export function downloadDangAn() {
  return request({
    url: `/heritage/detail/cpdaexport`,
    method: 'get',
    responseType: 'blob'
  })
}

/**
 * 藏品列表导出
 * @param params idList
 */
export function exportList(params) {
  return request({
    url: `/heritage/detail/cplbgenerate?idList=${params}`,
    method: 'get'
  })
}
export function downloadList() {
  return request({
    url: `/heritage/detail/cplbexport`,
    method: 'get',
    responseType: 'blob'
  })
}
/**
 * 藏品总账数据导出
 * @param params idList
 */
export function exportZongZhang(params) {
  return request({
    url: `/heritage/detail/cpzzsjgenerate?idList=${params}`,
    method: 'get'
  })
}
export function downloadZongZhang() {
  return request({
    url: `/heritage/detail/cpzzsjexport`,
    method: 'get',
    responseType: 'blob'
  })
}

/**
 * 动态藏品列表图片数据导出
 * @param params idList
 */
export function exportDongTaiImage(params) {
  return request({
    url: `/heritage/detail/dtcplbtpsjgenerate?idList=${params}`,
    method: 'get'
  })
}
export function downloadDongTaiImage() {
  return request({
    url: `/heritage/detail/dtcplbtpsjexport`,
    method: 'get',
    responseType: 'blob'
  })
}

/**
 * 文物登记卡导出
 * @param params idList
 */
export function exportDengJiKa(params) {
  return request({
    url: `/heritage/detail/wwdjkgenerate?idList=${params}`,
    method: 'get'
  })
}
export function downloadDengJiKa() {
  return request({
    url: `/heritage/detail/wwdjkexport`,
    method: 'get',
    responseType: 'blob'
  })
}
/**
 * 一普全部数据导出
 * @param params idList
 */
export function exportYiPuAll(params) {
  return request({
    url: `/heritage/detail/ypqbsjgenerate?idList=${params}`,
    method: 'get'
  })
}
export function downloadYiPuAll() {
  return request({
    url: `/heritage/detail/ypqbsjexport`,
    method: 'get',
    responseType: 'blob'
  })
}
/**
 * 一普数据导出
 * @param params idList
 */
export function exportYiPu(params) {
  return request({
    url: `/heritage/detail/ypsjgenerate?idList=${params}`,
    method: 'get'
  })
}
export function downloadYiPu() {
  return request({
    url: `/heritage/detail/ypsjexport`,
    method: 'get',
    responseType: 'blob'
  })
}
