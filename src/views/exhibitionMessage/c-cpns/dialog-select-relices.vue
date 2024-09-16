<template>
  <el-dialog v-model="open" width="1520px" title="藏品列表编辑" append-to-body :before-close="handleCancel"
    :show-close="false" align-center>
    <div style="position: relative;">
      <el-tabs v-model="activeTabName" style="height: 586px">
        <el-tab-pane name="0" label="待添加藏品">
          <SelectRelices @on-select="handleSelectReLices" v-if="activeTabName == '0'" />
        </el-tab-pane>
        <el-tab-pane name="1" label="选择藏品">
          <SelectRelices @on-select="handleSelectReLices" v-if="activeTabName == '1'" />
        </el-tab-pane>
        <el-tab-pane name="2" label="已添加藏品">
          <RelicesTable :cabinet-id="cabinetId" :exhibition-id="exhibitionId" v-if="activeTabName == '2'" />
        </el-tab-pane>
      </el-tabs>
      <div class="btnBox">
        <CommHandleBtn title="导入馆内藏品" img-name="imp" @handle-click="handleImportA" v-show="activeTabName == '1'" />
        <CommHandleBtn title="导入外借藏品" img-name="imp" @handle-click="handleImportB" v-show="activeTabName == '1'" />
        <CommHandleBtn title="新增" img-name="add" @handle-click="activeTabName = '1'" v-show="activeTabName == '2'" />
      </div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-space :size="40">
          <el-button class="button-p-cancel" @click="handleCancel">返回</el-button>
          <el-button class="button-c-sure" type="primary" @click="handleSave">确认</el-button>
        </el-space>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import CommHandleBtn from '@/components/comm-cpns/comm-handle-btn/comm-handle-btn.vue'

import SelectRelices from '@/components/comm-cpns/select-relices/select-relices.vue'
import RelicesTable from './relices-table.vue'

import { ElMessage } from 'element-plus'

import { addCabinetRelics, delCabinetRelics } from '@/api/exhibition-manage/exhibition'

const props = defineProps({
  cabinetId: {
    type: String,
    default: ''
  },
  exhibitionId: {
    type: String,
    default: ''
  }
})

const open = ref(true)

const activeTabName = ref('0')

const emits = defineEmits(['onClose'])



function handleSave() {
  switch (activeTabName.value) {
    case '0': doAddRelices(); break;
    case '1': doAddRelices(); break;
    default: emits('onClose');
  }
}
function doAddRelices() {
  const params = { cabinetId: props.cabinetId, exhibitionId: props.exhibitionId, relicList: relicesChosen.value }
  addCabinetRelics(params).then(res => {
    ElMessage.success('提交成功')
    activeTabName.value = '2'
  })
}

function handleCancel() {
  emits('onClose')
}

const relicesChosen = ref([])
function handleSelectReLices(arr) {
  relicesChosen.value = arr
}

function handleImportA() { }
function handleImportB() { }
</script>

<style lang="scss" scoped>
.btnBox {
  position: absolute;
  top: 24px;
  right: 0;
  transform: translateY(-50%);
}
</style>
