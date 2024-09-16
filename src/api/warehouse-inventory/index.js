import request from '@/utils/request'

// 列表
export function getCountingPage(params) {
    return request.get('/heritage/counting/page', { params })
}
export function doCountingCount(data) {
    return request.post('/heritage/counting/count', data)
}
//   创建盘点单
export function doCountingCreate(data) {
    return request.post('/heritage/counting/create', data)
}
//   分页获取库房藏品
export function getCountingRelics(params) {
    return request.get('/heritage/counting/relics', { params })
}
//   获取所有库房信息
export function getCountingWarehouse() {
    return request.get('/heritage/counting/warehouse')
}