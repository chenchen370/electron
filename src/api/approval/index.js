import request from '@/utils/request'

// 添加审批意见
export function approvalProcess(data) {
  return request({
    url: '/heritage/approval/approvalProcess',
    method: 'post',
    data
  })
}

// 撤销审批
export function terminateProcess(data) {
  return request({
    url: '/heritage/approval/terminateProcess',
    method: 'post',
    data
  })
}
