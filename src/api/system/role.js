import request from '@/utils/request'

// 查询角色列表
export function listRole(query) {
  return request({
    url: '/auth/system/role/list',
    method: 'get',
    params: query
  })
}

// 查询角色详细
export function getRole(roleId) {
  return request({
    url: '/auth/system/role/' + roleId,
    method: 'get'
  })
}

// 新增角色
export function addRole(data) {
  return request({
    url: '/auth/system/role',
    method: 'post',
    data: data
  })
}

// 修改角色
export function updateRole(data) {
  return request({
    url: '/auth/system/role',
    method: 'put',
    data: data
  })
}

// 角色数据权限
export function dataScope(data) {
  return request({
    url: '/auth/system/role/dataScope',
    method: 'put',
    data: data
  })
}

// 角色状态修改
export function changeRoleStatus(roleId, status) {
  const data = {
    roleId,
    status
  }
  return request({
    url: '/auth/system/role/changeStatus',
    method: 'put',
    data: data
  })
}

// 删除角色
export function delRole(roleId) {
  return request({
    url: '/auth/system/role/' + roleId,
    method: 'delete'
  })
}

// 查询角色已授权用户列表
export function allocatedUserList(query) {
  return request({
    url: '/auth/system/role/authUser/allocatedList',
    method: 'get',
    params: query
  })
}

// 查询角色未授权用户列表
export function unallocatedUserList(query) {
  return request({
    url: '/auth/system/role/authUser/unallocatedList',
    method: 'get',
    params: query
  })
}

// 取消用户授权角色
export function authUserCancel(data) {
  return request({
    url: '/auth/system/role/authUser/cancel',
    method: 'put',
    data: data
  })
}

// 批量取消用户授权角色
export function authUserCancelAll(data) {
  return request({
    url: '/auth/system/role/authUser/cancelAll',
    method: 'put',
    params: data
  })
}

// 授权用户选择
export function authUserSelectAll(data) {
  return request({
    url: '/auth/system/role/authUser/selectAll',
    method: 'put',
    params: data
  })
}

// 根据角色ID查询部门树结构
export function deptTreeSelect(roleId) {
  return request({
    url: '/auth/system/role/deptTree/' + roleId,
    method: 'get'
  })
}



/**
 * 获取 钉钉 角色
 * @param {Number} size  
 * @param {Number} offset   
 * @returns 
 */
export function dingdingRole(params) {
  return request({
    url: '/auth/system/role/dingdingRole',
    method: 'get',
    params
  })
}

/**
 * 获取 钉钉 角色 用户
 * @param {Number} size  
 * @param {Number} offset   
 * @param {Number} roleId   
 * @returns 
 */
export function dingdingRoleUser(params) {
  return request({
    url: '/auth/system/role/dingdingRoleUser',
    method: 'get',
    params
  })
}