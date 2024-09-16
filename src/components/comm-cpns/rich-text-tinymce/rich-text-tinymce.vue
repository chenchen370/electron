<template>
  <Editor :id="tinymceId" v-model="currentFormData[prop]" :init="init"></Editor>
</template>

<script setup>
import { computed, reactive, onMounted, ref } from 'vue'
import { uploadFile } from '@/api/upload/upload.js'

import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'

//JS部分
//在js中引入所需的主题和组件
import 'tinymce/skins/content/default/content.css'
import 'tinymce/themes/silver'
import 'tinymce/themes/silver/theme' // 主题文件
import 'tinymce/icons/default' //引入编辑器图标icon，不引入则不显示对应图标
import 'tinymce/models/dom/index.js' // 这里是个坑 一定要引入

//在TinyMce.vue中接着引入相关插件
import 'tinymce/icons/default/icons'
import 'tinymce/plugins/image' // 插入上传图片插件
import 'tinymce/plugins/media' // 插入视频插件
import 'tinymce/plugins/table' // 插入表格插件
import 'tinymce/plugins/lists' // 列表插件
import 'tinymce/plugins/wordcount' // 字数统计插件
import 'tinymce/plugins/code' // 源码
import 'tinymce/plugins/fullscreen' //全屏
import 'tinymce/plugins/preview' //预览
import 'tinymce/plugins/pagebreak' //插入分页符

import 'tinymce/plugins/codesample'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/link'

import 'tinymce/plugins/autosave'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/emoticons'
import 'tinymce/plugins/insertdatetime'

//接下来定义编辑器所需要的插件数据
//这里我选择将数据定义在props里面，方便在不同的页面也可以配置出不同的编辑器，当然也可以直接在组件中直接定义
const tinymceId = ref(`vue-tinymce-${new Date().getTime()}${(Math.random() * 1000).toFixed(0)}`)
const props = defineProps({
  formData: {
    type: Object,
    default: () => ({})
  },
  prop: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: '请输入内容'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

//定义一个对象 init初始化
const init = reactive({
  selector: `#${tinymceId.value}`,
  promotion: false, // 去掉高级功能升级的促销按钮
  // inline: true,
  language_url: `/tinymce/langs/zh-Hans.js`, // 语言包的路径，具体路径看自己的项目，文档后面附上中文js文件
  language: 'zh-Hans', //语言
  skin_url: `/tinymce/skins/ui/oxide`, // skin路径，具体路径看自己的项目
  // content_css: false, //以css文件方式自定义可编辑区域的css样式，css文件需自己创建并引入
  content_css: `/tinymce/skins/content/default/content.min.css`,
  height: 500, //编辑器高度
  branding: false, //是否禁用“Powered by TinyMCE”
  menubar: true, //顶部菜单栏显示
  image_dimensions: false, //去除宽高属性

  plugins: 'link lists image codesample code table wordcount media table fullscreen preview pagebreak insertdatetime searchreplace autosave anchor autolink', // 插件
  toolbar:
    'codesample image bold italic underline alignleft aligncenter alignright alignjustify | forecolor backcolor | fontselect | fontsizeselect | formatselect |  bullist numlist | outdent indent blockquote | removeformat| undo redo | link unlink media insertdatetime table  hr pagebreak | fullscreen preview | strikethrough', // 工具条
  font_formats: 'Arial=arial,helvetica,sans-serif; 宋体=SimSun;  微软雅黑=Microsoft Yahei; Impact=impact,chicago;', // 字体
  fontsize_formats: '11px 12px 14px 16px 18px 24px 36px 48px 64px 72px', // 文字大小
  paste_data_images: false, //图片是否可粘贴
  paste_webkit_styles: 'all',
  paste_merge_formats: true,
  nonbreaking_force_tab: false,
  paste_auto_cleanup_on_paste: false,
  convert_urls: false,
  relative_urls: false,
  file_picker_types: 'file image media',

  //图片上传
  images_upload_handler: (blobInfo, progress) =>
    new Promise((resolve, reject) => {
      if (blobInfo.blob().size / 1024 / 1024 > 2) {
        reject({ message: '上传失败，图片大小请控制在 2M 以内', remove: true })
      } else {
        let params = new FormData()
        params.append('file', blobInfo.blob())
        //
        // let config = {
        //   headers: {
        //     "Content-Type": "multipart/form-data"
        //   }
        // };

        uploadFile(params).then(res => {
          console.log('res ', res)
          if (res.code == 200) {
            resolve(res.data.link) //上传成功，在成功函数里填入图片路径
          } else {
            reject('HTTP Error: 上传失败')
          }
        })
      }
    }),

  // 文件上传
  file_picker_callback: (callback, value, meta) => {
    console.log('value', value)
    console.log('meta', meta)

    let fileUrl
    let posterUrl
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.click()
    input.onchange = function () {
      const file = this.files[0]
      const formData = new FormData()
      formData.append('file', file)
      uploadFile(formData).then(res => {
        console.log('res', res)
        if (res.code == 200) {
          if (meta.fieldname == 'poster') {
            posterUrl = res.data.link
          } else {
            fileUrl = res.data.link
          }

          if (meta.filetype == 'media' && meta.fieldname == 'altsource') {
            if (posterUrl) {
              callback(fileUrl, { poster: posterUrl }) //上传成功，在成功函数里填入图片路径
            } else {
              callback(fileUrl) //上传成功，在成功函数里填入图片路径
            }
          } else if (meta.filetype == 'image' && meta.fieldname == 'poster') {
            if (fileUrl) {
              callback(fileUrl, { poster: posterUrl }) //上传成功，在成功函数里填入图片路径
            } else {
              callback('', { poster: posterUrl }) //上传成功，在成功函数里填入图片路径
            }
          } else {
            callback(fileUrl) //上传成功，在成功函数里填入图片路径
          }
        }
      })
    }
  }
})

//用于接收外部传递进来的富文本

const emits = defineEmits(['update:formData'])
// 内容 HTML
const currentFormData = computed({
  get: () => props.formData,
  set: value => {
    console.log(value)
    emits('update:formData', value)
  }
})

tinymce.dom.Event.domLoaded = true
//在onMounted中初始化编辑器
onMounted(() => {
  tinymce.init({})
})
</script>

<style scoped lang="scss">
// 不展示右侧升级链接
:deep(.tox-promotion) {
  display: none !important;
}

:global(.tox-statusbar__path) {
  display: none !important;
}
:global(.tox-tinymce-aux) {
  z-index: 99999 !important;
}
</style>
