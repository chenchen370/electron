import request from '@/utils/request'
import type { IPropsFrom } from '../../views/collection-repair/tool/type'
import type { TIdList } from '../../type/page-type'

// 查询 文物工具 列表
export function listRepairTool(params?: IPropsFrom) {
  return request({
    url: '/heritage/repairTool/page',
    method: 'get',
    params
  })
}

// 查询 文物工具 详细
export function detailRepairTool(id: number | string) {
  return request({
    url: '/heritage/repairTool/' + id,
    method: 'get'
  })
}

// 新增 文物工具
export function addRepairTool(data: IPropsFrom) {
  return request({
    url: '/heritage/repairTool',
    method: 'post',
    data
  })
}

// 修改 文物工具
export function updateRepairTool(data: IPropsFrom) {
  return request({
    url: '/heritage/repairTool',
    method: 'put',
    data
  })
}

// 删除 文物工具
export function delRepairTool(params: TIdList) {
  return request({
    url: `/heritage/repairTool?idList=${params}`,
    method: 'delete'
  })
}
