<template>
  <el-dialog class="coder-wang-dialog" v-model="open" width="640px" append-to-body :before-close="handleCancel"
    align-center :show-close="false">
    <template #header="{ titleId, titleClass }">
      <span class="detail-title">请选择新增的多媒体类型</span>
    </template>
    <el-form class="coder-wang-form" :model="formData" :rules="rules" label-width="auto" label-position="top"
      size="large">
      <el-form-item label="" prop="relicName">
        <el-row :span="24" style="margin-top: 20px">
          <el-radio-group v-model="formData.mediaType">
            <el-col :span="8" :offset="4" v-for="(item, index) in mediaList">
              <el-radio :label="item.value" size="large">
                {{ item.name }}
              </el-radio>
            </el-col>
          </el-radio-group>
        </el-row>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-space :size="29">
          <el-button class="button-p-cancel" @click="handleCancel">关闭</el-button>
          <el-button class="button-c-sure" type="primary" @click="handleSure">确定</el-button>
        </el-space>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
const props = defineProps({
  rowObj: {
    type: Object,
    default: () => ({})
  }
})

const open = ref(true)
const isReadonly = ref(true)
const formData = reactive({
  mediaType: undefined
})

const mediaList = [
  { name: '图片资料', value: '0' },
  { name: '视频资料', value: '1' },
  { name: '研究论著资料', value: '999' },
  { name: '音频资料', value: '2' },
  { name: '动画资料', value: '3' },
  { name: '3D文件', value: '4' },
  { name: '电子出版', value: '5' },
  { name: '其他', value: '6' }
]

const rules = {}

const emits = defineEmits(['handleCloseMediaSelect'])

function handleSure() {
  emits('handleCloseMediaSelect', formData.mediaType)
}

function handleCancel() {
  emits('handleCloseMediaSelect')
}
</script>

<style lang="scss" scoped>
.detail-title {
  font-family: Source Han Serif CN;
  font-size: 16px;
  font-weight: normal;
  line-height: normal;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 0em;
  color: #333333;
}
</style>
