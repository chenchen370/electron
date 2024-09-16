import request from '@/utils/request';

// 查询文件记录列表
export function getFileList(params) {
  return request.get('/auth/help/file/list', { params });
}

// 编辑文件
export function editFile(data) {
  return request.put('/auth/help/file/rename', data);
}

// 上传文件
export function postFile(data) {
  return request.post('/auth/help/file', data);
}

// 替换文件
export function changeFile(data) {
  return request.get('/auth/help/file/editName/' + data.fileId);
}

// 下载文件
export function downloadFile(data) {
  return request.get('/auth/help/file/download/' + data.fileId);
}

// 删除文件记录
export function deleteFile(data) {
  return request.delete(`/auth/help/file/${data.fileId}`);
}
