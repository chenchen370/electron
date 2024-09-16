import request from '@/utils/request'
import type { IPropsFrom } from '../../views/collection-repair/instrument/type'
import type { TIdList } from '../../type/page-type'

// 查询 文物仪器 列表
export function listInstrument(params?: IPropsFrom) {
  return request({
    url: '/heritage/instrument/page',
    method: 'get',
    params
  })
}

// 查询 文物仪器 详细
export function detailInstrument(id: string | number) {
  return request({
    url: '/heritage/instrument/' + id,
    method: 'get'
  })
}

// 新增 文物仪器
export function addInstrument(data: IPropsFrom) {
  return request({
    url: '/heritage/instrument',
    method: 'post',
    data
  })
}

// 修改 文物仪器
export function updateInstrument(data: IPropsFrom) {
  return request({
    url: '/heritage/instrument',
    method: 'put',
    data
  })
}

// 删除 文物仪器
export function delInstrument(params: TIdList) {
  return request({
    url: `/heritage/instrument?idList=${params}`,
    method: 'delete'
  })
}
