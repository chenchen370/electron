import request from '@/utils/request';

// 查询
export function getReportAreaHisList(params) {
  return request.get('/warning/report/areaHisList', { params });
}