<template>
  <el-dialog class="coder-wang-dialog" :title="title" v-model="open" width="1200px" append-to-body :before-close="handleCancel" align-center :show-close="false">
    <el-table border :data="tableList">
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="导出类型" align="center" prop="code" :formatter="formatterCode" />
      <el-table-column label="下载类型" align="center" prop="downloadType" />
      <el-table-column label="文件类型" align="center" prop="fileType" />
      <el-table-column label="模板" align="center" prop="templateBucket" />
      <el-table-column label="模板名称" align="center" prop="templateName" />
      <el-table-column label="模板路径" align="center" prop="templatePath" />
      <el-table-column label="上传类型" align="center" prop="uploadType" />
      <el-table-column label="操作" align="center" width="150" fixed="right" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" icon="Download" title="下载" @click="handleDownload(scope.row.code)" />
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <div class="dialog-footer">
        <el-button class="button-c-sure" type="primary" @click="handleCancel">返 回</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import {
  downloadDangAn,
  downloadDengJiKa,
  downloadDongTaiImage,
  downloadList,
  downloadYiPu,
  downloadYiPuAll,
  downloadZongZhang
} from '@/api/collection-info-query/thing'
import { useDownload } from '@/hooks/useDownload'
import { parseTime } from '@/utils/zhebo'

const title = ref('导出列表')
const open = ref(true)

defineProps({
  tableList: {
    type: Array,
    default: () => []
  }
})

const emits = defineEmits(['handleCloseDialogExportTable'])

function formatterCode(row) {
  switch (row?.code) {
    case 'dang-an':
      return '藏品档案'
    case 'list':
      return '藏品列表'
    case 'zong-zhang':
      return '藏品总账数据'
    case 'dong-tai-image':
      return '动态藏品列表图片'
    case 'deng-ji-ka':
      return '文物登记卡'
    case 'yi-pu-all':
      return '一普全部数据'
    case 'yi-pu':
      return '一普数据'
    default:
      return ''
  }
}

async function handleDownload(code) {
  switch (code) {
    case 'dang-an':
      await useDownload(downloadDangAn, `藏品档案-${parseTime(new Date())}`, {}, true, '.zip')
      break
    case 'list':
      await useDownload(downloadList, `藏品列表-${parseTime(new Date())}`, {}, true, '.zip')
      break
    case 'zong-zhang':
      await useDownload(downloadZongZhang, `藏品总账数据-${parseTime(new Date())}`, {}, true, '.zip')
      break
    case 'dong-tai-image':
      await useDownload(downloadDongTaiImage, `动态藏品列表图片-${parseTime(new Date())}`, {}, true, '.zip')
      break
    case 'deng-ji-ka':
      await useDownload(downloadDengJiKa, `文物登记卡-${parseTime(new Date())}`, {}, true, '.zip')
      break
    case 'yi-pu-all':
      await useDownload(downloadYiPuAll, `一普全部数据-${parseTime(new Date())}`, {}, true, '.zip')
      break
    case 'yi-pu':
      await useDownload(downloadYiPu, `一普数据-${parseTime(new Date())}`, {}, true, '.zip')
      break
  }
}

// 取消按钮
function handleCancel() {
  emits('handleCloseDialogExportTable')
}
</script>

<style lang="scss" scoped></style>
