import request from '@/utils/request';

// 查询【展览】列表
export function getExhibitionList(data) {
  // return request.post('/heritage/warehouse/exhibition/manage/page', {exhibitionInfo :data}).then(res => res.data)
  return request.post('/heritage/warehouse/exhibition/manage/page', data).then(res => res.data)
}

// 编辑
export function editExhibition(data) {
  return request.post('/heritage/warehouse/exhibition/manage/update', data).then(res => res.data)
}

// 新增
export function addExhibition(data) {
  return request.post('/heritage/warehouse/exhibition/manage/create', data).then(res => res.data)
}

// 删除
export function removeExhibition(ids) {
  return request.get(`/heritage/warehouse/exhibition/manage/del`, { params: { id: ids } }).then(res => res.data)
}

// 获取【展览】详细信息
export function detailExhibition(id) {
  return request.get(`/heritage/warehouse/exhibition/manage/detail`, { params: { id } }).then(res => res.data)
}
// 获取展览藏品
export function getExhibitionRelics(data) {
  return request.post('/heritage/warehouse/exhibition/manage/exhibitionRelicPage', data).then(res => res.data)
}

//展柜添加藏品
export function addCabinetRelics(data) {
  return request.post('/heritage/warehouse/exhibition/manage/addRelic', data).then(res => res.data)
}
//查询展柜藏品
export function listCabinetRelics(data) {
  return request.post('/heritage/warehouse/exhibition/manage/cabinetRelicPage', data).then(res => res.data)
}
//展柜添加藏品
export function delCabinetRelics(params) {
  return request.get('/heritage/warehouse/exhibition/manage/removeRelic', { params}).then(res => res.data)
}