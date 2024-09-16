import request from '@/utils/request'
// 多媒体文档信息 图片、视频影片资料、音频资料、动画资料、3D建模、电子出版物、其他

//  查看
export function getMultimedia(params) {
  return request({
    url: `/heritage/media/page`,
    method: 'get',
    params
  })
}

//  添加
export function addMultimedia(data) {
  return request({
    url: `/heritage/media/save`,
    method: 'post',
    data
  })
}

// 修改
export function editMultimedia(data) {
  return request({
    url: `/heritage/media/update`,
    method: 'post',
    data
  })
}
//
// //  删除
// export function delMultimedia(ids) {
//   return request({
//     url: `/heritage/media/delete/${ids}`,
//     method: 'delete'
//   })
// }

//  删除
export function delMultimedia(params) {
  return request({
    url: `/heritage/media/delete`,
    method: 'delete',
    params
  })
}
