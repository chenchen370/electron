
// 查询/media/navigationPage
import request from '@/utils/request'

export function getNavInfo(params) {
  return request({
    url: '/heritage/media/navigationPage',
    method: 'get',
    params:params
  });
}
//导览详情信息查询
export function navigationDetail(id) {
  return request({
    url: `/heritage/media/navigation/${id}`,
    method: 'get',
  });
}

//导览信息删除数据
export function deletData(ids) {
  return request({
    url: `/heritage/media/navigation/${ids}`,
    method: 'delete',
  });
}


//导览信息新增数据
export function navigationAdd(data) {
  return request({
    url: `/heritage/media/navigation/add`,
    method: 'post',
    data:data
  });
}


//导览信息修改数据
export function update(data) {
  return request({
    url: `/heritage/media/navigation/update`,
    method: 'put',
    data:data
  });
}

