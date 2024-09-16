import request from '@/utils/request'
import type { IPropsFrom } from '../../views/collection-repair/tool/type'
import type { TIdList } from '../../type/page-type'

// 查询博物馆信息列表
export function getList(params?: IPropsFrom) {
  return request({
    url: '/heritage/museum/page',
    method: 'get',
    params
  })
}

// 查询博物馆详情信息查询
export function getListDetail(id: number | string) {
  return request({
    url: `/heritage/museum/${id}`,
    method: 'get'
  })
}

// 博物馆信息新增
export function addMuseum(data: IPropsFrom) {
  return request({
    url: '/heritage/museum',
    method: 'post',
    data
  })
}

//博物馆信息修改
export function updateMuseum(data: IPropsFrom) {
  return request({
    url: '/heritage/museum',
    method: 'put',
    data
  })
}

// 博物馆信息删除
export function delMuseum(params: TIdList) {
  return request({
    url: `/heritage/museum?idList=${params}`,
    method: 'delete'
  })
}
