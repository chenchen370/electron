import request from '@/utils/request';

// 查询常见问题记录列表
export function getProblemList(params) {
  return request.get('/auth/help/problem/list', { params });
}

// 新增常见问题
export function addProblem(data) {
  return request.post('/auth/help/problem', data);
}

// 修改常见问题
export function editProblem(data) {
  return request.put('/auth/help/problem', data);
}

// 删除常见问题
export function deleteProblem(data) {
  return request.delete(`/auth/help/problem/${data.problemId}`);
}
