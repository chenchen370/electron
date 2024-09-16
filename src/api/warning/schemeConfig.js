import request from '@/utils/request';

// 评估方案列表
export function getSchemeConfigList(params) {
  return request.get('/warning/schemeConfig/list', { params });
}
// 报警方案自动配置
export function setAutoConfig(data) {
  return request.get(`/warning/schemeConfig/autoConfig/${data}`);
}
// 报警方案配置
export function setSchemeConfig(data) {
  return request.post('/warning/schemeConfig/config', data);
}
// 删除
export function removeSchemeConfig(data) {
  return request.delete(`/warning/schemeConfig/${data.ids}`);
}