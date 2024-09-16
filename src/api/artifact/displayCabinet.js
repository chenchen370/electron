import request from '@/utils/request';

// 查询【展柜】列表
export function getDisplayCabinetList(params) {
  return request.get('/artifact/displayCabinet/list', { params });
}

// 编辑
export function editDisplayCabinet(data) {
  return request.post('/artifact/displayCabinet/edit', data);
}

// 新增
export function addDisplayCabinet(data) {
  return request.post('/artifact/displayCabinet/add', data);
}

// 删除
export function removeDisplayCabinet(data) {
  return request.delete(`/artifact/displayCabinet/${data.ids}`);
}

// 生成【展柜】编号
export function createIdDisplayCabinet() {
  return request.get(`/artifact/displayCabinet/createId`);
}

// 获取【展柜】详细信息
export function detailDisplayCabinet(data) {
  return request.get(`/artifact/displayCabinet/${data}}`);
}
