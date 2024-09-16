import request from '@/utils/request'
// 藏品管理工作信息 入馆保管信息

//  查看
export function getInTheLibraryStoreInfo(relicsId) {
  return request({
    url: `/heritage/detail/entryStorageInfo/${relicsId}`,
    method: 'post'
  })
}

//  添加
export function addInTheLibraryStoreInfo(data) {
  return request({
    url: `/heritage/relics/edit/entryStorageInfo/save`,
    method: 'post',
    data
  })
}

// 修改
export function editInTheLibraryStoreInfo(data) {
  return request({
    url: `/heritage/relics/edit/entryStorageInfo/save`,
    method: 'post',
    data
  })
}

//  删除
export function delInTheLibraryStoreInfo(id) {
  return request({
    url: `/heritage/detail/entryStorageInfo/delete/${id}`,
    method: 'post'
  })
}

// 审核
export function auditInTheLibraryStoreInfo(data) {
  return request({
    url: `/heritage/relics/edit/entryStorageInfo/approval`,
    method: 'post',
    data
  })
}
