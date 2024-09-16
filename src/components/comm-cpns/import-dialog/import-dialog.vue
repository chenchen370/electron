<template>
  <dialog-wrap :title="importConfig?.title ?? '导入数据'" :width="importConfig?.width ?? '50%'"
    :close-on-click-modal="false" :close-on-press-escape="false" :is-show-sure-btn="false"
    @handleCancelClick="() => handleCancelClick(0)">
    <template #dialogContent>
      <div class="import_content">
        <div class="title">1、准备{{ importConfig?.title }}信息</div>

        <div class="desc">
          1.1、使用数据模板文件，录入
          {{ importConfig?.title }}
          信息。为了保证成功，请根据表格中批注的数据格式并按照字段顺序进行录入。
        </div>

        <div class="btns">
          <el-button link type="primary" @click="downloadImportFile">1.2、下载导入模板</el-button>
        </div>
      </div>

      <el-upload ref="uploadRef" class="el_upl" action="#" :auto-upload="true" :headers="headers"
        accept=".xlsx, .xls, .excel" :limit="1" :file-list="fileList" :http-request="httpRequestHandle"
        :before-upload="beforeUploadHandle" :on-change="changeHandle" :on-progress="progressHandle"
        :on-success="successHandle" :on-error="errorHandle" :disabled="upload.isUploading" drag>
        <i class="el-icon-upload" style="width: 100%"></i>
        <div class="el-upload__text">
          <div class="title">2、将文件拖到此处，或<em>点击上传</em></div>
          <div></div>
        </div>

        <div class="el-upload__tip tip">提示：仅允许导入“xls”或“xlsx”或“excel”格式文件！</div>
      </el-upload>
    </template>
  </dialog-wrap>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { IImportConfig } from './import-config-type.ts'
import DialogWrap from '@/components/comm-cpns/dialog-wrap/dialog-wrap.vue'
const { proxy } = getCurrentInstance() as any

// 1.props
interface IProp {
  importConfig: IImportConfig
}

const props = withDefaults(defineProps<IProp>(), {})

// 2.emits
const emits = defineEmits(['importDialogCancel'])

// 3. 本地定义
const uploadRef = ref()

const headers = {
  Authorization: 'Bearer ',
  'Content-Type': 'multipart/form-data'
}

const upload = reactive({
  // 是否禁用上传
  isUploading: false
})

const uploadFileName = ref<string>('')
const fileList = ref<any[]>([])

// 4. 操作函数
async function httpRequestHandle(f: any) {
  try {
    const formData = new FormData() // 创建form对象
    formData.append('file', f.file) // 通过append向form对象添加数据
    console.log(formData)
    const res: any = await props!.importConfig?.api(formData)
    console.log('res', res)
    if (res?.code == '200') {
      f.onSuccess(res)
    }
  } catch (e) {
    f.onSuccess(e)
  }
}

function beforeUploadHandle(file: any) {
  const extension = file.name.substring(file.name.lastIndexOf('.') + 1)
  if (extension.toLowerCase() != 'excel' && extension.toLowerCase() != 'xlsx' && extension.toLowerCase() != 'xls') {
    proxy.$modal.msgError('只能上传（即后缀是.excel或者.xlsx或者.xls）的excel')
    return false
  }
}

// 监听文件内容
function changeHandle(file: any, fileList: any) {
  uploadFileName.value = file.name
}

// 文件上传中处理
function progressHandle(event: any, file: any, fileList: any) {
  upload.isUploading = true
}

function successHandle(res: any, file: any, fileList: any) {
  console.log(res)
  if (res?.code == '200') {
    upload.isUploading = false
    uploadRef.value.clearFiles()
    proxy.$modal.msgSuccess('文件上传成功')
    handleCancelClick(1, res)
  } else {
    proxy.$modal.msgError("'导入失败，请重新导入'")
  }
}

function errorHandle() {
  proxy.$modal.msgError('操作失败')
}

function handleCancelClick(status: number, resInfo?: any) {
  emits('importDialogCancel', status, resInfo)
}

function downloadImportFile() {
  if (props?.importConfig?.downloadTemplateUrl) {
    const a = document.createElement('a')
    document.body.appendChild(a)
    a.href = props?.importConfig?.downloadTemplateUrl
    a.setAttribute('download', `${props?.importConfig?.downloadTemplateName}.xls`)
    // 第二个参数是自定义的名字,根据自己需要, 特别注意一下，苹果本上这个下载下来是没有后缀名的，但是可以打开，如果需要就带着后缀名.xsl。
    a.style.display = 'none'
    a.click()
    document.body.removeChild(a)
  }
}
</script>

<style lang="scss" scoped>
.el_upl {
  :deep(.el-upload-dragger) {
    width: 100% !important;
  }

  :deep(.el-upload) {
    width: 100% !important;
  }
}

.import_content {
  background-color: #f9fafc;
  padding: 0 24px;
  margin-bottom: 24px;
  border: 1px solid #ccc;

  .title {
    font-size: 14px;
    font-weight: 500;
    color: #666666;
    line-height: 14px;
    padding: 12px 0;
  }

  .desc {
    font-size: 14px;
    font-weight: 400;
    color: #333333;
    line-height: 22px;
    margin-left: 14px;
  }

  .btns {
    padding: 12px 0;
    margin-left: 14px;
  }
}

.tip {
  font-size: 16px;
  color: grey;
  margin-top: 15px;
}
</style>
