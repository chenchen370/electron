import request from '@/utils/request'
import type { IPropsFrom } from '../../views/collection-repair/process/type'
import type { TIdList } from '../../type/page-type'

// 查询 文物过程 列表
export function listRepairProcess(params?: IPropsFrom) {
  return request({
    url: '/heritage/repairProcess/page',
    method: 'get',
    params
  })
}

// 查询 文物过程 详细
export function detailRepairProcess(id: string | number) {
  return request({
    url: '/heritage/repairProcess/' + id,
    method: 'get'
  })
}

// 新增 文物过程
export function addRepairProcess(data: IPropsFrom) {
  return request({
    url: '/heritage/repairProcess',
    method: 'post',
    data
  })
}

// 修改 文物过程
export function updateRepairProcess(data: IPropsFrom) {
  return request({
    url: '/heritage/repairProcess',
    method: 'put',
    data
  })
}

// 删除 文物过程
export function delRepairProcess(params: TIdList) {
  return request({
    url: `/heritage/repairProcess?idList=${params}`,
    method: 'delete'
  })
}
