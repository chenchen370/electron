import request from '@/utils/request';

const downloadBlobUrl = function (blob, fileName = "信息报表") {
    if (!blob) return;
    if ("download" in document.createElement("a")) {
        // 非IE下载
        let link = document.createElement("a");
        if (window.URL) {
            link.href = window.URL.createObjectURL(blob);
        } else {
            link.href = window.webkitURL.createObjectURL(blob);
        }
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
    } else {
        // IE10+下载
        navigator.msSaveBlob(blob, fileName);
    }
};
// 储藏柜导出
export function getCabinetExport(params) {
    return request({
        url: '/artifact/cabinet/export',
        method: 'get',
        responseType: 'blob',
        params
    }).then((res) => {
        downloadBlobUrl(res, '储藏柜信息报表')
    })
}
// 导入
export function getCabinetImport(data) {
    return request({
        url: '/artifact/cabinet/import',
        method: 'post',
        data
    })
}

// 展柜导出
export function displayCabinetExport(params) {
    return request({
        url: '/artifact/displayCabinet/export',
        method: 'get',
        responseType: 'blob',
        params
    }).then((res) => {
        downloadBlobUrl(res, '展柜信息报表')
    })
}
// 导入
export function displayCabinetImport(data) {
    return request({
        url: '/artifact/displayCabinet/import',
        method: 'post',
        data
    })
}
// 展厅导出
export function exhibitionHallExport(params) {
    return request({
        url: '/artifact/exhibitionHall/export',
        method: 'get',
        responseType: 'blob',
        params
    }).then((res) => {
        downloadBlobUrl(res, '展厅信息报表')
    })
}
// 导入
export function exhibitionHallImport(data) {
    return request({
        url: '/artifact/exhibitionHall/import',
        method: 'post',
        data
    })
}
// 库房导出
export function warehouseExport(params) {
    return request({
        url: '/artifact/warehouse/export',
        method: 'get',
        responseType: 'blob',
        params
    }).then((res) => {
        downloadBlobUrl(res, '库房信息报表')
    })
}
// 导入
export function warehouseImport(data) {
    return request({
        url: '/artifact/warehouse/import',
        method: 'post',
        data
    })
}
// 导出
export function deviceExport(params) {
    return request({
        url: '/warning/device/export',
        method: 'get',
        responseType: 'blob',
        params
    }).then((res) => {
        downloadBlobUrl(res, '设备信息报表')
    })
}
// 导入
export function deviceImport(data, params) {
    return request({
        url: '/warning/device/import',
        method: 'post',
        params,
        data
    })
}
// 展厅藏品导出
export function exhibitionHallRelicExport(data) {
    return request({
        url: '/artifact/displayCabinet/exportCabinetRelics',
        method: 'post',
        responseType: 'blob',
        data
    }).then((res) => {
        downloadBlobUrl(res, '藏品信息报表')
    })
}
// 库房藏品导出
export function warehouseRelicExport(data) {
    return request({
        url: '/artifact/cabinet/exportCabinetRelics',
        method: 'post',
        responseType: 'blob',
        data
    }).then((res) => {
        if(res.code ==200) downloadBlobUrl(res, '藏品信息报表')
    })
}