import request from '@/utils/request'

// 查询菜单列表
export function createBackManage(data) {
  return request({
    url: '/heritage​/warehouse​/back​/manage​/create',
    method: 'post',
    data
  }).then(res => res.data)
}

export function outManagePage(data) {
  return request({
    url: '/heritage/warehouse/out/manage/page',
    method: 'post',
    data
  }).then(res => res.data)
}

export function outManageRelicsPage(data) {
  return request({
    url: '/heritage/warehouse/out/manage/relicsPage',
    method: 'post',
    data
  }).then(res => res.data)
}

export function outManageDetail(id) {
  return request({
    url: '/heritage/warehouse/out/manage/detail',
    method: 'get',
    params: { id }
  })
}

export function outManageDel(id) {
  return request({
    url: '/heritage/warehouse/out/manage/del',
    method: 'get',
    params: { id }
  })
}

export function generateFlowNo() {
  return request({
    url: '/heritage/warehouse/in/manage/generate/flowNo',
    method: 'post'
  }).then(res => res.msg)
}

export function addInWarehouse(data) {
  return request({
    url: '/heritage/warehouse/in/manage/save',
    method: 'post',
    data
  })
}

export function updateInWarehouse(data) {
  return request({
    url: '/heritage/warehouse/in/manage/update',
    method: 'post',
    data
  })
}

export function deleteInWarehouse(id) {
  return request({
    url: `/heritage/warehouse/in/manage/${id}`,
    method: 'delete'
  })
}

export function inManageDetail(id) {
  return request({
    url: `/heritage/warehouse/in/manage/${id}`,
    method: 'get'
  })
}

export function getUserList(params) {
  return request({
    url: `/heritage/system/user/list`,
    method: 'get',
    params
  })
}
export function getoutManageCode(data) {
  return request({
    url: '/heritage/warehouse/out/manage/generate/flowNo',
    method: 'post',
    data
  })
}
export function outManageCreate(data) {
  return request({
    url: '/heritage/warehouse/out/manage/create',
    method: 'post',
    data
  })
}
export function outManageUpdate(data) {
  return request({
    url: '/heritage/warehouse/out/manage/update',
    method: 'put',
    data
  })
}

export function queryExhibitionListPage(params) {
  return request({
    url: '/heritage/warehouse/exhibition/manage',
    method: 'get',
    params
  })
}

// 直接退库
export function backManageCreate(data) {
  return request({
    url: '/heritage/warehouse/back/manage/backRelics',
    method: 'post',
    data
  })
}

export function inManagePageAll(params) {
  return request({
    url: '/heritage/warehouse/in/manage/page/all',
    method: 'get',
    params
  }).then(res => res.data)
}

// 退库单单详情
export function backManageDetail(id) {
  return request({
    url: '/heritage/warehouse/back/manage/detail',
    method: 'get',
    params: { id }
  })
}

export function outManageSubmit(params) {
  return request({
    url: '/heritage/warehouse/out/manage/submit',
    method: 'get',
    params
  })
}

// export function importRelicsByFlowNo() {
//   // /warehouse/in/manage/import/relics/{flowNo}
// }

export function exhibitionManagePage(data) {
  return request({
    url: '/heritage/warehouse/exhibition/manage/page',
    method: 'post',
    data
  })
}
// 入藏藏品导入下载模板
export function inManageImportTemplate() {
  return request({
    url: '/heritage/warehouse/in/manage/importTemplate',
    method: 'get'
  })
}

// 下载藏品入藏凭证
export function inManageDownloadCert(id) {
  return request({
    url: `/heritage/warehouse/in/manage/downloadCert/${id}`,
    method: 'get'
  })
}

// 下载藏品入藏凭证
export function backManageDownloadCert(id) {
  return request({
    url: `/heritage/warehouse/back/manage/downloadCert/${id}`,
    method: 'get'
  })
}

// 下载藏品提用凭证
export function outManageDownloadCert(id) {
  return request({
    url: `/heritage/warehouse/out/manage/downloadCert/${id}`,
    method: 'get'
  })
}
