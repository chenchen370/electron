import { ElNotification } from 'element-plus'

/**
 * @description 接收数据流生成 blob，创建链接，下载文件
 * @param {Function} api 导出文件的api方法 (必传)
 * @param {String} tempName 导出的文件名 (必传)
 * @param {Object} params 导出的参数 (默认{})
 * @param {Boolean} isNotify 是否有导出消息提示 (默认为 false)
 * @param {String} fileType 导出的文件格式 (默认为空)
 * */
export const useDownload = async (api: (param: any) => Promise<any>, tempName: string, params: any = {}, isNotify: boolean = false, fileType: string = '') => {
  if (isNotify) {
    ElNotification({
      title: '温馨提示',
      message: '如果数据庞大会导致下载缓慢哦，请您耐心等待！',
      type: 'info',
      duration: 3000
    })
  }
  try {
    let type = 'application/zip'
    switch (fileType) {
      case '.zip':
        type = 'application/zip'
        break
      case '.xls':
        type = 'tapplication/vnd.ms-excel'
        break
      case '.xlsx':
        type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        break
      default:
        type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        break
    }

    const res = await api(params)
    const blob = new Blob([res], { type })
    // 兼容 edge 不支持 createObjectURL 方法
    if ('msSaveOrOpenBlob' in navigator) {
      // @ts-ignore
      return window.navigator.msSaveOrOpenBlob(blob, tempName + fileType)
    }
    const blobUrl = window.URL.createObjectURL(blob)
    const exportFile = document.createElement('a')
    exportFile.style.display = 'none'
    exportFile.download = `${tempName}${fileType}`
    exportFile.href = blobUrl
    document.body.appendChild(exportFile)
    exportFile.click()
    // 去除下载对 url 的影响
    document.body.removeChild(exportFile)
    window.URL.revokeObjectURL(blobUrl)
  } catch (error) {
    console.log(error)
  }
}
