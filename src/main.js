import { createApp } from 'vue'

import Cookies from 'js-cookie'

import ElementPlus from 'element-plus'
import locale from 'element-plus/dist/locale/zh-cn.mjs' // 中文语言
import 'element-plus/theme-chalk/index.css'

import { VueMasonryPlugin } from 'vue-masonry' // 瀑布流

import '@/assets/styles/index.scss' // global css
import 'uno.css'
import App from './App'
import store from './store'
import router from './router'
import directive from './directive' // directive

// 注册指令
import plugins from './plugins' // plugins
import { download, downloadComm } from '@/utils/request'

// svg图标
import 'virtual:svg-icons-register'
import SvgIcon from '@/components/SvgIcon'
import elementIcons from '@/components/SvgIcon/svgicon'

import './permission' // permission control

import { useDict } from '@/utils/dict'
import { parseTime, resetForm, addDateRange, handleTree, selectDictLabel, selectDictLabels } from '@/utils/zhebo'

// 分页组件
import Pagination from '@/components/Pagination'
// 自定义表格工具组件
import RightToolbar from '@/components/RightToolbar'
// 富文本组件
import Editor from '@/components/Editor'
// 文件上传组件
import FileUpload from '@/components/FileUpload'
// 文件上传组件2
import ProFileUpload from '@/components/ProFileUpload'
// 图片上传组件
import ImageUpload from '@/components/ImageUpload'
// 图片预览组件
import ImagePreview from '@/components/ImagePreview'
// 自定义树选择组件
import TreeSelect from '@/components/TreeSelect'
// 字典标签组件
import DictTag from '@/components/DictTag'

// 表格查询组件
import ProTable from '@/components/ProTable'
import ProForm from '@/components/ProTable/components/ProForm'

const app = createApp(App)

// 全局方法挂载
app.config.globalProperties.$url = import.meta.env.VITE_APP_BASE_API
app.config.globalProperties.useDict = useDict
app.config.globalProperties.download = download
app.config.globalProperties.downloadComm = downloadComm
app.config.globalProperties.parseTime = parseTime
app.config.globalProperties.resetForm = resetForm
app.config.globalProperties.handleTree = handleTree
app.config.globalProperties.addDateRange = addDateRange
app.config.globalProperties.selectDictLabel = selectDictLabel
app.config.globalProperties.selectDictLabels = selectDictLabels

// 全局组件挂载
app.component('DictTag', DictTag)
app.component('Pagination', Pagination)
app.component('TreeSelect', TreeSelect)
app.component('FileUpload', FileUpload)
app.component('ProFileUpload', ProFileUpload)
app.component('ImageUpload', ImageUpload)
app.component('ImagePreview', ImagePreview)
app.component('RightToolbar', RightToolbar)
app.component('Editor', Editor)
app.component('ProTable', ProTable)
app.component('ProForm', ProForm)

app.use(router)
app.use(store)
app.use(plugins)
app.use(elementIcons)
app.use(VueMasonryPlugin)
app.component('svg-icon', SvgIcon)

directive(app)

// 使用element-plus 并且设置全局的大小
app.use(ElementPlus, {
  locale: locale,
  // 支持 large、default、small
  size: Cookies.get('size') || 'default'
})

app.mount('#app')
