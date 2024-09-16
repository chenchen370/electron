<template>
  <div class="manage">
    <p class="title_desc">贵单位已成为平台“共享会员”,请在以下页面中配置单位共享的藏品相关信息。</p>
    <el-divider />
    <ol class="out_list">
      <li>
        <h3>配置不参与共享的藏品</h3>
        <p class="colorS">未保证信息共享公平,未配置的情况下默认全部共享。<span class="colorRed">(建议全部共享)</span></p>
        <el-button type="primary" link @click="deptConfigInfoVisable = true">添加不参与共享的藏品</el-button>
      </li>
      <li>
        <h3>配置不参与共享的藏品指标</h3>
        <p class="colorS">未保证信息共享公平,未配置的情况下默认全部共享。<span class="colorRed">(建议全部共享)</span></p>
        <el-button type="primary" link @click="handleInfo('配置部门指标')">添加不参与共享的藏品指标</el-button>
      </li>
      <li>
        <h3>配置共享会员可以查阅并下载的多媒体资源。<span class="colorS">(注意：下载功能暂时未开放)</span></h3>
        <el-button type="primary" link @click="handleInfo('配置多媒体指标')">修改配置</el-button>
        <ol class="media_list">
          <li>
            <span>图片资料</span>
            <span class="ml20">{{ imgTypeList[shareObj.imgType] }}</span>
            <el-checkbox label="添加水印" size="large" class="ml20" disabled v-model="shareObj.watermark" />
            <span class="ml20 colorS">水印为单位名称全程</span>
          </li>
          <li v-for="(item, index) in mediaData">
            <p>
              <span>{{ item.desc }}</span>
              <span>{{ item.download == 0 ? '准予下载' : '不准予下载' }}</span>
            </p>
          </li>
          <li>准予下载用户可查阅并下载文件</li>
        </ol>
      </li>
    </ol>
    <el-dialog title="选择不参与共享的藏品" v-model="deptConfigInfoVisable" width="1500px" append-to-body align-center
      :show-close="false">
      <ProTable ref="proTable" :request-api="getTableList" :columns="columns">
        <!-- 表格 header 按钮 -->
        <!--    <template #action="scope">-->
        <!--      &lt;!&ndash;      <el-button type="primary" @click="openProForm('新增')" plain :icon="'@/assets/images/handle-btn-icon/add.png'"&ndash;&gt;-->
        <!--      &lt;!&ndash;        >新增</el-button&ndash;&gt;-->
        <!--      &lt;!&ndash;      >&ndash;&gt;-->
        <!--      <comm-handle-btn title="新增" img-name="add" @handle-click="openProForm('新增')" />-->
        <!--    </template>-->
        <!-- 表格操作 -->
        <template #operation="scope">
          <el-button type="primary" link @click="share(1, scope.row)">共享
          </el-button>
          <el-button type="primary" link @click="share(2, scope.row)">取消共享
          </el-button>
        </template>
      </ProTable>
    </el-dialog>
    <el-dialog title="选择不参与共享的藏品指标" v-model="deptNormConfigInfoVisable" width="800px" append-to-body align-center
      :show-close="false">
      <div>
        <el-transfer v-model="valueE" :props="{
          key: 'value',
          label: 'desc'
        }" :titles="['当前列表', '共享列表']" :data="indexData">
        </el-transfer>
      </div>
      <div style="margin-top: 20px;text-align: center">
        <el-button type="primary" class="button-c-sure" @click="confimShare">确 定</el-button>
        <!-- <el-button @click="deptConfigInfoVisable=false">取消</el-button> -->
      </div>
    </el-dialog>
    <el-dialog title="配置多媒体共享权限" v-model="multimediaSharingVisable" width="1000px" append-to-body align-center
      :show-close="false">
      <ol class="config_media_list">
        <li>
          <span>图片资料</span>
          <el-select v-model="state.imgType" class="m-2" placeholder="请选择" size="small" style="width: 150px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-checkbox label="添加水印" size="large" class="ml20" v-model="state.watermark" />
          <span class="ml20 colorS">水印为单位名称全程</span>
        </li>
        <li>
          <p>
            <span>影像资料</span>
            <el-radio-group v-model="state.indexMovies" class="ml-4">
              <el-radio :label="0" size="large"> 准予下载</el-radio>
              <el-radio :label="1" size="large">不准予下载</el-radio>
            </el-radio-group>
          </p>
          <p>
            <span>研究论著资料</span>
            <el-radio-group v-model="state.indexResearch" class="ml-4">
              <el-radio :label="0" size="large"> 准予下载</el-radio>
              <el-radio :label="1" size="large">不准予下载</el-radio>
            </el-radio-group>
          </p>
        </li>
        <li>
          <p>
            <span>音频资料</span>
            <el-radio-group v-model="state.indexAudioFrequency" class="ml-4">
              <el-radio :label="0" size="large"> 准予下载</el-radio>
              <el-radio :label="1" size="large">不准予下载</el-radio>
            </el-radio-group>
          </p>
          <p>
            <span>动画资料</span>
            <el-radio-group v-model="state.indexAnimation" class="ml-4">
              <el-radio :label="0" size="large"> 准予下载</el-radio>
              <el-radio :label="1" size="large">不准予下载</el-radio>
            </el-radio-group>
          </p>
        </li>
        <li>
          <p>
            <span>3D文件</span>
            <el-radio-group v-model="state.index3d" class="ml-4">
              <el-radio :label="0" size="large"> 准予下载</el-radio>
              <el-radio :label="1" size="large">不准予下载</el-radio>
            </el-radio-group>
          </p>
          <p>
            <span>电子出版物</span>
            <el-radio-group v-model="state.indexElectronicPublications" class="ml-4">
              <el-radio :label="0" size="large"> 准予下载</el-radio>
              <el-radio :label="1" size="large">不准予下载</el-radio>
            </el-radio-group>
          </p>
        </li>
        <li>
          <p>
            <span>其他</span>
            <el-radio-group v-model="state.indexOther" class="ml-4">
              <el-radio :label="0" size="large"> 准予下载</el-radio>
              <el-radio :label="1" size="large">不准予下载</el-radio>
            </el-radio-group>
          </p>
        </li>
        <li>准予下载用户可查阅并下载文件</li>
      </ol>
      <div style="margin-top: 20px;text-align: center">
        <el-button type="primary" class="button-c-sure" @click="confimMedaiShare">确 定</el-button>
        <!-- <el-button @click="deptConfigInfoVisable=false">取消</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>
<script setup lang="jsx">
import { useHandleData } from '@/components/ProTable/hooks'
import {
  addShare,
  cancellationShare,
  getDeptList,
  getRelicsQuery,
  indexQuery,
  relicsQuery, sharingCollectionEdit,
  sharingMultimediaEdit
} from '@/api/sharing/manage'
import CommHandleBtn from '@/components/comm-cpns/comm-handle-btn/comm-handle-btn.vue'
import { addProblem, editProblem } from '@/api/help/problem'
import { ElMessage } from 'element-plus'

const { proxy } = getCurrentInstance()
const { sys_normal_disable, sys_dept_type, artifact_level } = proxy.useDict(
  'sys_normal_disable',
  'sys_dept_type',
  'artifact_level'
)
const deptNormConfigInfoVisable = ref(false)
const multimediaSharingVisable = ref(false)
const options = [
  {
    value: 0,
    label: '原始版本',
  },
  {
    value: 1,
    label: '原始版本JPG',
  },
  {
    value: 2,
    label: '高清图',
  },
  {
    value: 3,
    label: '标清图',
  },
  {
    value: 4,
    label: '缩略图',
  },
]
const imgTypeList = ['原始版本', '原始版本JPG', '高清图', '标清图', '缩略图']
const state = reactive({
  watermark: true,
  imgType: 0,
  indexMovies: 0,
  indexResearch: 0,
  indexAudioFrequency: 0,
  indexAnimation: 0,
  index3d: 0,
  indexElectronicPublications: 0,
  indexOther: 0
})
onMounted(() => {
  getMediaList()
})
function getMediaList() {
  getDeptList().then(response => {
    const dataObj = response.data
    shareObj.value = {
      ...dataObj,
      watermark: dataObj.watermark == 0
    }
    mediaData.value = mediaData.value.map((item, index) => {
      if (response.data[item.prop] !== '')
        return {
          download: response.data[item.prop],
          value: index + 1,
          status: 1,
          desc: item.desc,
          prop: item.prop
        }
    })
  })
}
// const columns = reactive([
//   {
//     type: 'selection'
//   },
//   {
//     label: '序号',
//     width: 60,
//     type: 'index'
//   },
//   {
//     label: '部门ID',
//     prop: 'deptId',
//     form: {
//       el: 'text'
//     }
//   },
//   {
//     label: '部门名称',
//     prop: 'deptName',
//     form: {
//       el: 'text'
//     }
//   },
//   {
//     label: '图片状态',
//     prop: 'imglype',
//     form: {
//       el: 'text'
//     }
//   },
//   {
//     label: '3D状态',
//     prop: 'index3d',
//     form: {
//       el: 'text'
//     }
//   },
//   {
//     label: '动画状态',
//     prop: 'indexhnimation',
//     form: {
//       el: 'text'
//     }
//   },
//   {
//     label: '音频状态',
//     prop: 'indexhudioFrequency',
//     form: {
//       el: 'text'
//     }
//   },
//   {
//     label: '电子出版物状态',
//     prop: 'indexElectronicPublications',
//     width: 140,
//     form: {
//       el: 'text'
//     }
//   },
//   {
//     label: '影视状态',
//     prop: 'indexMlovies',
//     form: {
//       el: 'text'
//     }
//   },
//   {
//     label: '其他状态',
//     prop: 'indexOther',
//     form: {
//       el: 'text'
//     }
//   },
//   {
//     label: '研究论普状态',
//     prop: 'indexResearch',
//     width: 140,
//     form: {
//       el: 'text'
//     }
//   },
//   {
//     label: '共享ID',
//     prop: 'sharingId',
//     form: {
//       el: 'text'
//     }
//   },
//   {
//     label: '水印状态',
//     prop: 'watermark',
//     form: {
//       el: 'text'
//     }
//   },
//   {
//     label: '创建日期',
//     prop: 'createTime',
//     search: {
//       el: 'date-picker',
//       // span: 2,
//       props: { type: 'daterange', valueFormat: 'YYYY-MM-DD' }
//     }
//   },
//   { prop: 'operation', label: '操作', fixed: 'right' }
// ])
const columns = reactive([
  {
    type: 'selection'
  },

  {
    label: '部门ID', prop: 'deptId'
  },

  {
    label: '藏品类别',
    prop: 'relicCategory'
  },
  {
    label: '完残程度',
    prop: 'relicCompleteness'
  },
  {
    label: '文物级别',
    prop: 'version',
    search: { el: 'select', props: {} },
    enum: artifact_level.value
  },
  {
    label: '藏品来源',
    prop: 'relicFrom'
  },
  {
    label: '藏品级别',
    prop: 'relicLevel'
  },
  {
    label: '藏品名称',
    prop: 'relicName',
    search: { el: 'text', props: {} }
  },
  {
    label: '藏品是否共享',
    prop: 'relicShare',
    search: { el: 'text', props: {} }
  },
  {
    label: '文物保存状态',
    prop: 'relicState'
  },
  {
    label: '入藏时间',
    prop: 'relicTime'
  },
  {
    label: '藏品存储库房',
    prop: 'relicWarehouse'
  },
  {
    label: '藏品年代',
    prop: 'relicYears'
  },
  {
    label: '更新者',
    prop: 'updateBy'
  },
  {
    label: '藏品ID',
    prop: 'relicsId',
    search: { el: 'text', props: {} }
  },
  { prop: 'operation', width: 300, label: '操作', fixed: 'right' }
])
// 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
// 默认不做操作就直接在 ProTable 组件上绑定	:requestApi="getUserList"
const getTableList = params => {
  let newParams = JSON.parse(JSON.stringify(params))
  newParams.createTime && (newParams.startTime = newParams.createTime[0])
  newParams.createTime && (newParams.endTime = newParams.createTime[1])
  delete newParams.createTime
  return relicsQuery(newParams)
}
const valueE = ref([])
const rowObj = ref({})
const shareObj = ref({})
const configTitele = ref('')
const deptConfigInfoVisable = ref(false)
const indexData = ref([
  {
    desc: '保存位置（拒/架）状态',
    prop: 'indexPosition'
  }, {
    desc: '存位置（拒/架）编号状态',
    prop: 'indexPositionNum'
  }, {
    desc: '完残程度',
    prop: 'indexRelicCompleteness'
  }, {
    desc: '藏品来源',
    prop: 'indexRelicFrom'
  },
  {
    desc: '藏品级别',
    prop: 'indexRelicLevel'
  }, {
    desc: '藏品名称',
    prop: 'indexRelicName'
  },
  {
    desc: '文物保存状态 ',
    prop: 'indexRelicState'
  },
  {
    desc: '入藏时间',
    prop: 'indexRelicTime'
  },
  {
    desc: '藏品年代',
    prop: 'indexRelicYears'
  },
  {
    desc: '版本状态',
    prop: 'indexVersion'
  },
  {
    desc: '藏品类别',
    prop: 'relicCategory'
  }])
const mediaData = ref([
  {
    desc: '3D状态',
    prop: 'index3d'
  },
  {
    desc: '动画状态',
    prop: 'indexAnimation'
  },
  {
    desc: '音频状态',
    prop: 'indexAudioFrequency'
  },
  {
    desc: '电子出版物状态',
    prop: 'indexElectronicPublications'
  },
  {
    desc: '影视状态',
    prop: 'indexMovies'
  },
  {
    desc: '其他状态',
    prop: 'indexOther'
  },
  {
    desc: '研究论著状态',
    prop: 'indexResearch'
  },
  {
    desc: '水印状态',
    prop: 'watermark'
  }
])
const handleInfo = (title) => {
  if (title === '配置部门指标') {
    deptNormConfigInfoVisable.value = true
    valueE.value = []
    indexQuery().then(response => {

      indexData.value = indexData.value.map((item, index) => {
        return {
          value: index + 1,
          status: response.data[item.prop],
          disabled: response.data[item.prop] === '2',
          desc: item.desc,
          prop: item.prop
        }
      })
      valueE.value = indexData.value.map(item => {
        if (item.status === '2') {
          return item.value
        }
      })
    })
  } else {
    multimediaSharingVisable.value = true
    getDeptList().then(response => {
      shareObj.value = response.data
      Object.keys(response.data).forEach((key) => {
        if (!['deptId', 'deptName', 'sharingId', 'updateBy'].includes(key)) {
          if (key === 'watermark') {
            state[key] = response.data[key] == 0
          } else {
            state[key] = response.data[key] * 1
          }
        }
      })
    })
  }


}

const confimShare = () => {
  const data = {
    deptId: shareObj.value.deptId,
    sharingId: shareObj.value.sharingId,
    deptName: shareObj.value.deptName,
  }
  indexData.value.map(item => {
    if (valueE.value.includes(item.value)) {
      data[item.prop] = item.status === '2' ? '0' : '0'
    }
  })
  sharingCollectionEdit(data).then(response => {
    ElMessage.success({ message: `共享成功` })
    deptNormConfigInfoVisable.value = false
  })

}
const confimMedaiShare = () => {
  const data = {
    deptId: shareObj.value.deptId,
    sharingId: shareObj.value.sharingId,
    deptName: shareObj.value.deptName,
    ...state,
    watermark: state.watermark ? 0 : 1,
  }
  sharingMultimediaEdit(data).then(response => {
    ElMessage.success({ message: `共享成功` })
    getMediaList()
    multimediaSharingVisable.value = false
  })
}
const share = (type, row) => {
  const urlFun = type === 1 ? addShare : cancellationShare
  urlFun(row.relicsId).then((res) => {
    if (res.code === 200) {
      proxy.$modal.msgSuccess(type === 1 ? '共享成功' : '取消共享')
      getTableList()
    }
  })
}
// ProTable 实例
const proTable = ref()

// 打开 drawer(新增、查看、编辑)
const drawerRef = ref(null)
const openProForm = (title, row = {}) => {
  const params = {
    title,
    isView: title === '查看',
    row: { ...row },
    api:
      title === '新增'
        ? addProblem
        : title === '编辑'
          ? editProblem
          : undefined,
    getTableList: proTable.value?.getTableList
  }
  drawerRef.value?.acceptParams(params)
}
</script>

<style lang="scss">
.title_desc {
  font-weight: bold;
}

.config_media_list {
  padding-left: 0;

  li {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    p {
      width: 50%;
    }
  }
}

.out_list {
  .colorS {
    color: #999999;
  }

  .el-button {
    color: #1c84c6;
    text-decoration: underline;
  }

  .colorRed {
    color: red;
  }

  .media_list {
    padding-left: 0;

    li {
      display: flex;
      align-items: center;

      .ml20 {
        margin-left: 50px;
      }

      p {
        width: 30%;

        span:first-child {
          margin-right: 20px;
        }
      }

      p:first-child {
        margin-right: 200px;
      }
    }
  }
}
</style>
