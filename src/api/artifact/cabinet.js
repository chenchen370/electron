import request from '@/utils/request'

// 查询【储藏柜】列表
export function getCabinetList(params) {
  return request.get('/artifact/cabinet/list', { params })
}

// 编辑
export function editCabinet(data) {
  return request.post('/artifact/cabinet/edit', data)
}

// 新增
export function addCabinet(data) {
  return request.post('/artifact/cabinet/add', data)
}

// 删除
export function removeCabinet(data) {
  return request.delete(`/artifact/cabinet/${data.ids}`)
}

// 生成【储藏柜】编号
export function createIdCabinet() {
  return request.get(`/artifact/cabinet/createId`)
}

// 获取【储藏柜】详细信息
export function detailCabinet(data) {
  return request.get(`/artifact/cabinet/${data}}`)
}
// 查询库房/展厅名下所有展柜&储藏柜
export function getAllByHouseId(data) {
  return request.get('/artifact/cabinet/getAllByHouseId/' + encodeURIComponent(data))
}
// 查询库房/展厅名下所有展柜&储藏柜(附带监测数据)
export function getAllWithMonitor(data) {
  return request.get('/artifact/cabinet/allWithMonitor/' + encodeURIComponent(data))
}
