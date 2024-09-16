import request from '@/utils/request'

// 列表
export function getLoanRecordList(params) {
  return request.get('/loan/loanRecord/list', { params })
}

// 详情
export function detailLoanRecordWithCp(id) {
  return request.post(`/loan/loanRecord/withCp/${id}`)
}
// 新增
export function addLoanRecordWithCp(data) {
  return request.post('/loan/loanRecord/addWithCp', data)
}

// 编辑
export function editLoanRecordWithCp(data) {
  return request.post('/loan/loanRecord/editWithCp', data)
}

// 删除
export function removeLoanRecord(data) {
  return request.delete(`/loan/loanRecord/del/${data.ids}`)
}

// 导出cp
export function exportLoanRecordWithCp(params) {
  return request.get(`/loan/loanRecord/exportCp`, { params, responseType: 'blob' })
}

// 导入cp
export function importLoanRecordWithCp(data) {
  return request.post(`/loan/loanRecord/importCp`, data)
}
