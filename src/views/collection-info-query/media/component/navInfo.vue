<template>
  <ProTable ref="proTable" :request-api="getTableList" :columns="columns">
    <!-- 表格 header 按钮 -->
    <template #action="scope">
      <comm-handle-btn :per="['collection:material:list']" title="新增" img-name="add"
        @handle-click="openProForm('新增')" />
      <!--      <el-button type="primary" @click="openProForm('新增')" plain icon="Plus"-->
      <!--        >新增</el-button-->
      <!--      >-->
    </template>
    <!-- 表格操作 -->
    <template #operation="scope">
      <el-button type="primary" link @click="openProForm('查看', scope.row)">查看 </el-button>
      <el-button type="primary" link @click="openProForm('编辑', scope.row)">编辑 </el-button>
      <el-button type="primary" link @click="deleteAccount(scope.row)">删除 </el-button>
    </template>
  </ProTable>
  <ProForm :columns="columns" :searchCol="2" width="80%" ref="drawerRef"></ProForm>
</template>
<script setup lang="jsx">
import { useHandleData } from '@/components/ProTable/hooks'
import { getNavInfo, navigationAdd, update, deletData } from '@/api/collection-info-query/navInfo'
import CommHandleBtn from '@/components/comm-cpns/comm-handle-btn/comm-handle-btn.vue'
import { watch } from 'vue'

import useInitOptions from '@/hooks/use_init_options'
const optionsInfo = useInitOptions({
  // 研究论著类型
  key: 'navigation_version',
  isDict: true,
  dictCode: 'navigation_version'
})

const props = defineProps({
  mediaList: {
    type: Array,
    default() {
      return []
    }
  },
  relicId: {
    type: String,
    default: ''
  }
})
const relicId = ref('')
watch(
  () => [props.mediaList, optionsInfo.navigation_version],
  newValue => {
    if (newValue) {
      let relicIdObj = columns.find(it => it.prop === 'relicId')
      relicIdObj.enum = newValue[0].map(item => {
        return { value: item.relicId, label: item.relicId }
      })
      columns.find(it => it.prop === 'version').enum = newValue[1]
    }
  }
)
const columns = reactive([
  {
    type: 'selection'
  },
  {
    label: '序号',
    width: 60,
    type: 'index'
  },
  {
    label: '藏品登记号',
    prop: 'relicId',
    form: {
      el: 'select',
      defaultValue: ''
    },
    search: {
      el: 'select',
      props: {},
      defaultValue: props.relicId
    },
    enum: []
  },
  {
    label: '版本',
    prop: 'version',
    form: {
      el: 'select',
      defaultValue: ''
    },
    search: { el: 'select', props: {} },
    enum: []
  },
  {
    label: '音频视频',
    prop: 'audioVideo',
    form: {
      el: 'text',
      render: (props, { emit }) => {
        return (
          <>
            <FileUpload
              fileSize={20}
              modelValue={props.modelValue ? props.modelValue : ''}
              fileType={['mp4', 'mp3']}
              upload-url="/heritage/file/upload/navigation"
              onUpdate:modelValue={value => {
                emit('update:modelValue', value[0].url)
              }}
            />
          </>
        )
      }
    },
    search: { el: 'text', props: {} }
  },
  {
    label: '图片',
    prop: 'img',
    form: {
      el: 'text',
      render(props, { emit }) {
        return (
          <>
            <ImageUpload
              limit={1}
              modelValue={props.modelValue ? props.modelValue : ''}
              upload-url="/heritage/file/upload/repair"
              onUpdate:modelValue={value => {
                emit('update:modelValue', value)
              }}
            />
          </>
        )
      }
    },
    search: { el: 'text', props: {} },
    minWidth: 220,
    showOverflowTooltip: false,
    render: props => {
      console.log(props.row)
      return (
        <>
          <img src={props.row.img} alt="" style="width: 50px; height: 50px;" />
        </>
      )
    }
  },
  {
    label: '词',
    prop: 'word',
    form: {
      span: 5,
      el: 'text',
      defaultValue: ''
    },
    search: { el: 'text', props: {} }
  },
  { prop: 'operation', width: 180, label: '操作', fixed: 'right' }
])

// 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
// 默认不做操作就直接在 ProTable 组件上绑定	:requestApi="getUserList"
const getTableList = params => {
  let newParams = JSON.parse(JSON.stringify(params))
  return getNavInfo(newParams)
}
// ProTable 实例
const proTable = ref()
// 删除用户信息
const deleteAccount = async params => {
  await useHandleData(deletData, { ids: [params.id] }, `删除【${params.id}】`)
  proTable.value?.getTableList()
}

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref(null)
const openProForm = (title, row = {}) => {
  const params = {
    title,
    isView: title === '查看',
    row: { ...row },
    api: title === '新增' ? navigationAdd : title === '编辑' ? update : undefined,
    getTableList: proTable.value?.getTableList
  }
  drawerRef.value?.acceptParams(params)
}
</script>
