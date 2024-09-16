import request from '@/utils/request';
const baseURL = import.meta.env.VITE_APP_BASE_API
import axios from 'axios'
import { saveAs } from 'file-saver'
import { getToken } from '@/utils/auth'
import errorCode from '@/utils/errorCode'
import { blobValidate } from '@/utils/zhebo'
/**
 * 文件blob数据格式进行下载
 * @description 文件下载
 * @param {String} blob  文件blob数据
 * @param {String} fileName 下载文件名
 */
const downloadBlobUrl = function (blob, fileName = "") {
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
  
  
// 监测设备管理->历史数据
export function getDeviceHisMonitorData(params) {
    // window.open(baseURL + '/warning/excel/deviceHisMonitorData?' + params)
    const url = baseURL + '/warning/excel/deviceHisMonitorData?' + params
    axios({
        method: 'get',
        url: url,
        responseType: 'blob',
        headers: { 'Authorization': 'Bearer ' + getToken() }
      }).then((res) => {
        downloadBlobUrl(res.data)
      })
}
// 监测数据总览->历史数据
export function getPointHisMonitorData(params) {
    let url = baseURL + '/warning/excel/pointHisMonitorData?' + params
    // window.open(url) 

    axios({
        method: 'get',
        url: url,
        responseType: 'blob',
        headers: { 'Authorization': 'Bearer ' + getToken() }
      }).then((res) => {
        downloadBlobUrl(res.data)
        // const isBlob = blobValidate(res.data);
        // if (isBlob) {
        //   const blob = new Blob([res.data])
        //   saveAs(blob, decodeURIComponent(res.headers['download-filename']))
        // } else {
        //   printErrMsg(res.data);
        // }
      })
    // var xhr = new XMLHttpRequest();
    // xhr.open("GET", url, true);
    // xhr.setRequestHeader('Authorization', 'Bearer ' + getToken());
    // xhr.send();
}
// 预警汇总报表->实时监测数据
export function getAreaHisMonitorData(params) {
    // window.open(baseURL + '/warning/excel/areaHisMonitorData?' + params)
    const url = baseURL + '/warning/excel/areaHisMonitorData?' + params
    axios({
        method: 'get',
        url: url,
        responseType: 'blob',
        headers: { 'Authorization': 'Bearer ' + getToken() }
      }).then((res) => {
        downloadBlobUrl(res.data)
      })
}
