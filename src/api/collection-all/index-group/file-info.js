import request from '@/utils/request'
// 藏品信息指标群 附件信息

//  查看
export function getFileInfo(data) {
  return request({
    url: `/heritage/detail/basicAttachmentInfoList`,
    method: 'post',
    data
  })
}

//  添加
export function addFileInfo(data) {
  return request({
    url: `/heritage/relics/edit/basicAttachmentInfo/save`,
    method: 'post',
    data
  })
}

// 修改
export function editFileInfo(data) {
  return request({
    url: `/heritage/relics/edit/basicAttachmentInfo/save`,
    method: 'post',
    data
  })
}

//  删除数据
export function delFileInfo(data) {
  return request({
    url: `/heritage/relics/edit/basicAttachmentInfo/delete`,
    method: 'post',
    data
  })
}

//  审核
export function auditFileInfo(data) {
  return request({
    url: `/heritage/relics/edit/basicAttachmentInfo/approval`,
    method: 'post',
    data
  })
}
