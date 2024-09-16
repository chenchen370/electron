import request from '@/utils/request'

// 查询菜单列表
export function getFlowRelics(params) {
  return request({
    url: '/heritage/flow/relics',
    method: 'get',
    params
  }).then(res => res.data)
}

export function addRelic(data) {
  return request({
    url: '/heritage/flow/relics/add',
    method: 'post',
    data
  })
}

export function updateRelic(data) {
  return request({
    url: '/heritage/flow/relics',
    method: 'put',
    data
  })
}

// idList
export function delRelics(id) {
  return request({
    url: `/heritage/flow/relics/${id}`,
    method: 'delete'
  })
}
