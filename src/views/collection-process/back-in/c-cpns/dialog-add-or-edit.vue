<template>
  <el-dialog v-model="visible" title="藏品归还退库" width="1280px" append-to-body align-center :show-close="false">
    <el-tabs v-model="activeName" class="el-tabs-wrap">
      <el-tab-pane label="基本信息" :name="1">
        <DetailInfo :data="editData" />
      </el-tab-pane>
      <el-tab-pane label="提用藏品" :name="2">
        <el-form :inline="true" label-width="auto">
          <el-row :span="24" :gutter="18">
            <el-col :span="6">
              <el-form-item label="藏品编号" style="width: 100%">
                <el-input style="width: 100%" v-model="queryParams1.relicsId" placeholder="请输入" clearable
                  @keyup.enter="onSearch" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="藏品名称" style="width: 100%">
                <el-input style="width: 100%" v-model="queryParams1.relicName" placeholder="请输入" clearable
                  @keyup.enter="onSearch" />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <div class="td-flex justify-end">
                <el-button class="button-c-primary" type="primary" icon="Search" @click="onSearch">搜索</el-button>
                <el-button class="button-p-black" icon="Refresh" @click="onReset1">重置</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <el-table ref="relicTableRef" :data="list" v-loading="listLoading" :row-key="getRowKey" border
          @selection-change="onSelectChange">
          <el-table-column type="selection" width="55" align="center" :reserve-selection="true" v-if="isEdit" />
          <el-table-column label="藏品编号" align="center" prop="flowId" />
          <el-table-column label="藏品名称" align="center" prop="relicName" />
          <el-table-column label="文物图片" align="center">
            <template #default="{ row }">
              <image-preview :width="50" :height="50" :src="row.relicPath" />
            </template>
          </el-table-column>
          <el-table-column label="数量" align="center" prop="relicNum" />
          <el-table-column label="单位" align="center" prop="numUnit" />
          <el-table-column label="文物年代" align="center" prop="relicYear" />
          <el-table-column label="质地" align="center" prop="relicMaterial" />
          <el-table-column label="备注" align="center" prop="relicDesc" />
          <!-- <el-table-column label="操作" fixed="right" align="center" width="110" class-name="small-padding fixed-width">
            <template #default="{ row }">
              <el-button link type="primary" icon="Delete" title="删除" @click="onDel(row)" />
            </template>
          </el-table-column> -->
        </el-table>
        <div class="mt-4">
          <pagination v-show="page.total > 0" :total="page.total" v-model:page="page.currentPage"
            v-model:limit="page.pageSize" @pagination="onPageChange" />
        </div>
      </el-tab-pane>
      <el-tab-pane :name="3" v-if="selectedList.length">
        <template #label>
          <div>已选择藏品({{ selectedList.length }})</div>
        </template>
        <el-form :inline="true" label-width="auto">
          <el-row :span="24" :gutter="18">
            <el-col :span="6">
              <el-form-item label="藏品编号" style="width: 100%">
                <el-input style="width: 100%" v-model="queryParams2.relicsId" placeholder="请输入" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="藏品名称" style="width: 100%">
                <el-input style="width: 100%" v-model="queryParams2.relicName" placeholder="请输入" clearable />
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <div class="td-flex justify-end">
                <el-button class="button-c-primary" type="primary" icon="Search">搜索</el-button>
                <el-button class="button-p-black" icon="Refresh" @click="onReset2">重置</el-button>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <el-table :data="showSelectedList" border size="small" height="500px">
          <el-table-column label="序号" type="index" align="center" width="55" />
          <el-table-column label="藏品编号" align="center" prop="relicsId" />
          <el-table-column label="藏品名称" align="center" prop="relicName" />
          <el-table-column label="文物图片" align="center">
            <template #default="{ row }">
              <image-preview :width="50" :height="50" :src="row.relicPath" />
            </template>
          </el-table-column>
          <el-table-column label="数量" align="center" prop="relicNum" />
          <el-table-column label="单位" align="center" prop="numUnit" />
          <el-table-column label="文物年代" align="center" prop="relicYears" />
          <el-table-column label="质地" align="center" prop="relicMaterial" />
          <el-table-column label="备注" align="center" prop="relicDesc" />
          <el-table-column label="操作" fixed="right" align="center" width="110" class-name="small-padding fixed-width">
            <template #default="{ row, index }">
              <el-button link type="primary" icon="Delete" title="删除" @click="onDelete(index, row)" />
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
    <template #footer>
      <div class="dialog-footer" v-if="isEdit">
        <el-space :size="40">
          <el-button class="button-p-cancel" @click="hide"> 取消 </el-button>
          <el-button class="button-c-sure" type="primary" @click="onSubmit">确定</el-button>
        </el-space>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { useDialog } from '@/hooks/useDialog'
import { useTable } from '@/hooks/useTable'
import { getFlowRelics, delRelics } from '@/api/flow'
import { backManageCreate, outManageDetail } from '@/api/warehouse/index'
import DetailInfo from './detail-info.vue'
import { approvalProcess } from '@/api/approval/index'

const { visible, hide, submitLoading, isEdit } = useDialog()
const { list, page, listLoading, queryList, onPageChange, onSearch } = useTable({
  queryAction
})
const activeName = ref(2)

const getRowKey = row => row.id
const selectedList = ref([])
const relicTableRef = ref()
const { proxy } = getCurrentInstance()
const { artifact_level } = proxy.useDict('artifact_level')
let editData = ref({})

const queryParams1 = reactive({
  relicsId: undefined,
  relicName: undefined,
})

const queryParams2 = reactive({
  relicsId: undefined,
  relicName: undefined,
})
function onReset2() {
  queryParams2.relicsId = undefined
  queryParams2.relicName = undefined
}


function onReset1() {
  queryParams1.relicsId = undefined
  queryParams1.relicName = undefined
  onSearch();
}

const show = async (data = {}, isEditMode = false) => {
  editData.value = data
  isEdit.value = isEditMode
  activeName.value = isEdit.value ? 2 : 1;
  visible.value = true
  selectedList.value = []
  // 获取详情
  await getDetail(data.id)
  // 列表更新
  queryList()
  await nextTick();
  relicTableRef.value.clearSelection();
}


async function getDetail(id) {
  const res = await outManageDetail(id)
  editData.value = res.data
}

const props = defineProps({
  isReview: {
    type: Boolean,
    default: false,
  }
})

const onSelectChange = v => {
  selectedList.value = v
}

const showSelectedList = computed(() => {
  return selectedList.value.filter(v => {
    if (queryParams2.relicsId) return v.relicsId.includes(queryParams2.relicsId)
    if (queryParams2.relicName) return v.relicName.includes(queryParams2.relicName)
    return true;
  })
})

async function queryAction(page) {
  const data = {
    flowId: editData.value.id,
    pageNum: page.currentPage,
    pageSize: page.pageSize,
    ...queryParams1,
    status: 0,
  }
  console.log(queryParams1)
  console.log(data)
  return getFlowRelics(data).then(res => {
    return {
      list: res.records,
      total: res.total
    }
  })
}

function onDelete(index, row) {
  relicTableRef.value.toggleRowSelection(row, false);
  if (selectedList.value.length === 0) {
    activeName.value = 2
  }
}
const emits = defineEmits(['ok'])

const onSubmit = () => {
  if (selectedList.value.length === 0) {
    return proxy.$modal.msgWarning('请至少选择1个藏品归还退库')
  }
  submitLoading.value = true
  backManageCreate({
    outId: editData.value.id,
    tbFlowRelics: selectedList.value
  })
    .then(res => {
      proxy.$modal.msgSuccess('操作成功')
      emits('ok')
      hide()
    })
    .catch(err => {
      proxy.$modal.msgError('操作失败')
    })
    .finally(() => {
      submitLoading.value = false
    })
}

defineExpose({
  show,
  hide
})
</script>
