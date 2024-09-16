import request from '@/utils/request';

// 查询【展厅】列表
export function getExhibitionHallList(params) {
  return request.get('/artifact/exhibitionHall/list', { params });
}

// 编辑
export function editExhibitionHall(data) {
  return request.post('/artifact/exhibitionHall/edit', data);
}

// 新增
export function addExhibitionHall(data) {
  return request.post('/artifact/exhibitionHall/add', data);
}

// 删除
export function removeExhibitionHall(data) {
  return request.delete(`/artifact/exhibitionHall/${data.ids}`);
}

// 生成【展厅】编号
export function createIdExhibitionHall() {
  return request.get(`/artifact/exhibitionHall/createId`);
}

// 获取【展厅】详细信息
export function detailExhibitionHall(data) {
  return request.get(`/artifact/exhibitionHall/${data}}`);
}
export function getExhibitionHallRelics(data) {
  return request.get(`/artifact/exhibitionHall/relics/`+data);
}