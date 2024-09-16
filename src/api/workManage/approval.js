import request from '@/utils/request';

// 添加审批意见
export function confirmApproval(data) {
  return request({
    url: '/heritage/approval/terminateProcess',
    method: 'post',
    data
  });
}
// 撤销审批
export function cancelApproval(data) {
  return request({
    url: '/heritage/approval/terminateProcess',
    method: 'post',
    data
  });
}
