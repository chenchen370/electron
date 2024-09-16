import request from '@/utils/request';

// 评估方案列表
export function getLoanRecordList(params) {
  return request.get('/loan/loanRecord/list', { params });
}

// 编辑
export function editLoanRecord(data) {
  return request.post('/loan/loanRecord/edit', data);
}

// 新增
export function addLoanRecord(data) {
  return request.post('/loan/loanRecord/add', data);
}

// 删除
export function removeLoanRecord(data) {
  return request.delete(`/loan/loanRecord/${data.ids}`);
}
