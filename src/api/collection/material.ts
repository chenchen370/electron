import request from '@/utils/request'
import type { IPropsFrom } from '../../views/collection-repair/material/type'
import type { TIdList } from '../../type/page-type'

// 查询 文物材料 列表
export function listMaterial(params?: IPropsFrom) {
  return request({
    url: '/heritage/material/page',
    method: 'get',
    params
  })
}

// 查询 文物材料 详细
export function detailMaterial(id: string | number) {
  return request({
    url: '/heritage/material/' + id,
    method: 'get'
  })
}

// 新增 文物材料
export function addMaterial(data: IPropsFrom) {
  return request({
    url: '/heritage/material',
    method: 'post',
    data
  })
}

// 修改 文物材料
export function updateMaterial(data: IPropsFrom) {
  return request({
    url: '/heritage/material',
    method: 'put',
    data
  })
}

// 删除 文物材料
export function delMaterial(params: TIdList) {
  return request({
    url: `/heritage/material?idList=${params}`,
    method: 'delete'
  })
}
