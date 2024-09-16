import request from '@/utils/request'
import type { IPropsFrom } from '../../views/collection-repair/category/type'
import type { TIdList } from '../../type/page-type'

// 查询 文物分类 列表
export function listRepair(params?: IPropsFrom) {
  return request({
    url: '/heritage/repair/page',
    method: 'get',
    params
  })
}

// 查询 文物分类 详细
export function detailRepair(id: string | number) {
  return request({
    url: '/heritage/repair/' + id,
    method: 'get'
  })
}

// 新增 文物分类
export function addRepair(data: IPropsFrom) {
  return request({
    url: '/heritage/repair/add',
    method: 'post',
    data
  })
}

// 修改 文物分类
export function updateRepair(data: IPropsFrom) {
  return request({
    url: '/heritage/repair',
    method: 'put',
    data
  })
}

// 删除 文物分类
export function delRepair(params: TIdList) {
  return request({
    url: `/heritage/repair?idList=${params}`,
    method: 'delete'
  })
}
