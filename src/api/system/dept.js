import request from '@/utils/request'

// 查询部门列表
export function listDept(query) {
  return request({
    url: '/auth/system/dept/list',
    method: 'get',
    params: query
  })
}

// 查询部门列表（排除节点）
export function listDeptExcludeChild(deptId) {
  return request({
    url: '/auth/system/dept/list/exclude/' + deptId,
    method: 'get'
  })
}

// 查询部门详细
export function getDept(deptId) {
  return request({
    url: '/auth/system/dept/' + deptId,
    method: 'get'
  })
}

// 新增部门
export function addDept(data) {
  return request({
    url: '/auth/system/dept',
    method: 'post',
    data: data
  })
}

// 修改部门
export function updateDept(data) {
  return request({
    url: '/auth/system/dept',
    method: 'put',
    data: data
  })
}

// 删除部门
export function delDept(deptId) {
  return request({
    url: '/auth/system/dept/' + deptId,
    method: 'delete'
  })
}

/**
 * 获取 钉钉 部门 
 * @param {Number} size  
 * @param {Number} offset
 * @returns 
 */
export function dingdingDept(params) {
  return request({
    url: '/auth/system/dept/dingdingDept',
    method: 'get',
    params
  })
}

/**
 * 获取 钉钉 部门 用户
 * @param {Number} size
 * @param {Number} offset   
 * @param {Number} deptId   
 * @returns 
 */
export function dingdingDeptUser(params) {
  return request({
    url: '/auth/system/dept/dingdingDeptUser',
    method: 'get',
    params
  })
}