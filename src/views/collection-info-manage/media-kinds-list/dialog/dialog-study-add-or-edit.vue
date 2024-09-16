<template>
  <el-dialog class="coder-wang-dialog" v-model="open" width="1280px" append-to-body :before-close="handleCancel"
    align-center :show-close="false">
    <template #header="{ titleId, titleClass }">
      <span class="detail-title">多媒体文档信息 - {{ title }}</span>
    </template>

    <el-form class="coder-wang-form" ref="formRef" :model="form" :rules="rules" label-width="auto" label-position="top"
      size="large">
      <el-row :gutter="75">
        <el-col :span="8">
          <el-form-item label="著录出版时间" prop="recordPublishTime">
            <el-date-picker style="width: 100%" v-model="form.recordPublishTime" type="datetime"
              format="YYYY-MM-DD HH:mm:ss" clearable :disabled="isDisabled"
              :placeholder="isDisabled ? '' : '请选择著录出版时间'" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="出版机构及书名" prop="publishInstitutionBookTitle">
            <el-input v-model="form.publishInstitutionBookTitle" clearable :disabled="isDisabled"
              placeholder="请输入出版机构及书名" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="研究论著类型" prop="typesResearchPapers">
            <el-select v-model="form.typesResearchPapers" clearable :disabled="isDisabled" placeholder="请选择研究论著类型"
              style="width: 100%">
              <el-option v-for="item in optionsInfo.options_research_papers_type" :key="item.value" :label="item.label"
                :value="item.value" />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="研究论著题名" prop="titleResearchPapers">
            <el-input v-model="form.titleResearchPapers" clearable :disabled="isDisabled" placeholder="请输入研究论著题名" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="作者" prop="author">
            <el-input v-model="form.author" clearable :disabled="isDisabled" placeholder="请输入作者" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="文章（章节）及页码" prop="articlePageNumber">
            <el-input v-model="form.articlePageNumber" clearable :disabled="isDisabled" placeholder="请输入文章（章节）及页码" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="研究论著情况" prop="researchLiteratureStatus">
            <el-input v-model="form.researchLiteratureStatus" clearable :disabled="isDisabled"
              placeholder="请输入研究论著情况" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="研究论著主要内容" prop="mainContentResearchPapers">
            <el-input v-model="form.mainContentResearchPapers" clearable :disabled="isDisabled"
              placeholder="请输入研究论著主要内容" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="备注" prop="remarks">
            <el-input v-model="form.remarks" clearable :disabled="isDisabled" placeholder="请输入备注" />
          </el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item label="附件信息" prop="attachment">
            <comm-upload-fle v-model="form.attachment" :file-type="['doc', 'xls', 'ppt', 'txt', 'pdf', 'jpg', 'jpeg', 'png']" :limit="1" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-space :size="29">
          <el-button class="button-c-sure" type="primary" @click="handleCancel" v-if="handleStatus === 'check'"> 关闭
          </el-button>
          <el-button class="button-p-cancel" type="primary" @click="handleSure" v-if="handleStatus !== 'check'"> 保存
          </el-button>
        </el-space>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { addStudy, editStudy } from '@/api/collection-all/multimedia/study'
import optionsInfo from './options-study.js'
import CommUploadFle from '@/components/comm-cpns/comm-upload-file/comm-upload-fle.vue'

const props = defineProps({
  curtCollectionRow: {
    type: Object,
    default: () => ({})
  },
  title: {
    type: String,
    default: '标题'
  },
  currentRow: {
    type: Object,
    default: () => ({})
  },
  proxy: {
    type: Object,
    default: () => ({})
  },
  handleStatus: {
    type: String,
    default: 'submit' // submit （新增 + 修改 + 提交审核）check（查看）
  }
})

const emits = defineEmits(['handleCloseStudyAddOrEdit'])

const isDisabled = computed(() => {
  return props.handleStatus === 'check'
})

const open = true

const select = ref()
const form = reactive({
  id: undefined,
  recordPublishTime: undefined, // 著录出版时间
  publishInstitutionBookTitle: undefined, // 出版机构及书名
  typesResearchPapers: undefined, // 研究论著类型
  titleResearchPapers: undefined, // 研究论著题名
  author: undefined, // 作者
  articlePageNumber: undefined, // 文章（章节）及页码
  researchLiteratureStatus: undefined, // 研究论著情况
  mainContentResearchPapers: undefined, // 研究论著主要内容
  remarks: undefined, // 备注
  attachment: undefined // 附件
})
const rules = {}
// 数据回屯
watch(
  () => props.currentRow,
  val => {
    if (val) {
      Object?.keys(val).forEach(key => {
        form[key] = val[key]
      })
    }
  },
  {
    deep: true,
    immediate: true
  }
)

const formRef = ref()
async function handleSure() {
  if (!formRef.value) return
  await formRef.value.validate(async (valid, fields) => {
    if (valid) {
      form.relicsId = props.curtCollectionRow.relicsNo
      if (!form.id) {
        await addStudy(form)
        props?.proxy?.$modal?.msgSuccess('新增成功')
      } else {
        await editStudy(form)
        props?.proxy?.$modal?.msgSuccess('修改成功')
      }
      emits('handleCloseStudyAddOrEdit', 1)
    } else {
      console.log('error submit!', fields)
    }
  })
}

function handleCancel() {
  emits('handleCloseStudyAddOrEdit')
}
</script>

<style lang="scss" scoped></style>
