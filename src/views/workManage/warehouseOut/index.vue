<template>
  <div class="app-container">
    <el-card shadow="never" class="mb-10px">
      <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="auto">
        <el-row :span="24">
          <el-col :span="6">
            <el-form-item label="提准字" prop="" style="width: 93%">
              <el-input size="large" placeholder="请输入提准字" clearable style="width: 100%" @keyup.enter="handleQuery" />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="号" prop="" style="width: 93%">
              <el-input size="large" placeholder="请输入号" clearable style="width: 100%" @keyup.enter="handleQuery" />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="提用人" prop="carryPerson" style="width: 93%">
              <el-input size="large" v-model="queryParams.carryPerson" placeholder="请输入提用人" clearable
                style="width: 100%" @keyup.enter="handleQuery" />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="提交时间" style="width: 93%">
              <el-date-picker style="width: 100%" size="large" v-model="dateTimeRange"
                value-format="YYYY-MM-DD HH:mm:ss" type="datetimerange" range-separator="-" start-placeholder="开始时间"
                end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="提用去向" prop="carryLocation" style="width: 93%">
              <el-select size="large" v-model="queryParams.carryLocation" placeholder="请选择提用去向" clearable
                style="width: 100%">
                <el-option v-for="dict in out_type" :key="dict.value" :label="dict.label"
                  :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="提用类型" prop="carryType" style="width: 93%">
              <el-select size="large" v-model="queryParams.carryType" placeholder="请选择提用类型" clearable
                style="width: 100%">
                <el-option v-for="dict in reason_withdrawal" :key="dict.value" :label="dict.label"
                  :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="审批状态" prop="" style="width: 93%">
              <el-select size="large" placeholder="请选择审批状态" clearable style="width: 100%">
                <el-option v-for="dict in flow_status" :key="dict.value" :label="dict.label"
                  :value="dict.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <div class="td-flex">
              <el-button class="button-c-primary" type="primary" icon="Search" @click="handleQuery">搜索</el-button>
              <el-button class="button-p-black" icon="Refresh" @click="resetQuery">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <comm-handle-btn :per="['workManage:warehouseOut:add']" title="新增" img-name="add" @handle-click="handleAdd" />
          <!--          <el-button-->
          <!--            type="primary"-->
          <!--            plain-->
          <!--            icon="Plus"-->
          <!--            @click="handleAdd"-->
          <!--            v-hasPermi="['workManage:warehouseOut:add']"-->
          <!--            >新增</el-button-->
          <!--          >-->
        </el-col>
        <el-col :span="1.5">
          <comm-handle-btn :per="['workManage:warehouseOut:edit']" title="修改" icon-name="edit" :disabled="single"
            @handle-click="handleUpdate" />
          <!--          <el-button-->
          <!--            type="success"-->
          <!--            plain-->
          <!--            icon="Edit"-->
          <!--            :disabled="single"-->
          <!--            @click="handleUpdate"-->
          <!--            v-hasPermi="['workManage:warehouseOut:edit']"-->
          <!--            >修改</el-button-->
          <!--          >-->
        </el-col>
        <el-col :span="1.5">
          <comm-handle-btn :per="['workManage:warehouseOut:remove']" title="删除" icon-name="remove" :disabled="multiple"
            @handle-click="handleDelete" />
          <!--          <el-button-->
          <!--            type="danger"-->
          <!--            plain-->
          <!--            icon="Delete"-->
          <!--            :disabled="multiple"-->
          <!--            @click="handleDelete"-->
          <!--            v-hasPermi="['workManage:warehouseOut:remove']"-->
          <!--            >删除</el-button-->
          <!--          >-->
        </el-col>
        <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
      </el-row>

      <el-table style="width: 100%" v-loading="loading" :data="warehouseOutList"
        @selection-change="handleSelectionChange" border>
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="提用登记号" align="center" prop="flowNo" />
        <el-table-column label="提用人" align="center" prop="carryPerson" />
        <el-table-column label="提交时间" align="center" prop="flowTime">
          <template #default="scope">
            <span>{{ parseTime(scope.row.flowTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="藏品数量" align="center" prop="relicsNum" />
        <el-table-column label="提用去向" align="center" prop="carryLocation" />
        <el-table-column label="提用类型" align="center" prop="carryType" />
        <el-table-column label="审批状态" align="center" prop="approveStatus" />
        <el-table-column label="当前状态" align="center" prop="flowStatus" />
        <el-table-column label="操作" fixed="right" align="center" width="200" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-button link type="primary" icon="EditPen" :size="22" title="编辑" @click="handleUpdate(scope.row)"
              v-hasPermi="['workManage:warehouseOut:edit']"></el-button>
            <el-button link type="primary" icon="Delete" :size="22" title="删除" @click="handleDelete(scope.row)"
              v-hasPermi="['workManage:warehouseOut:remove']"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>

    <!-- 添加或修改对话框 -->
    <el-dialog :title="title" v-model="open" width="1200px" append-to-body @close="cancel" align-center
      :show-close="false">
      <el-form ref="warehouseOutRef" :model="form" :rules="rules" label-width="auto" label-position="top" size="large">
        <el-tabs class="el-tabs-wrap">
          <el-tab-pane label="基本提用信息">
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="提用去向" prop="carryLocation">
                  <el-select size="large" v-model="queryParams.carryLocation" placeholder="请选择提用去向" clearable
                    style="width: 100%">
                    <el-option v-for="dict in out_type" :key="dict.value" :label="dict.label"
                      :value="dict.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="提用类型" prop="carryType">
                  <el-select size="large" v-model="queryParams.carryLocation" placeholder="请选择提用类型" clearable
                    style="width: 100%">
                    <el-option v-for="dict in reason_withdrawal" :key="dict.value" :label="dict.label"
                      :value="dict.value"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="提用登记号" prop="flowNo">
                  <el-input v-model="form.flowNo" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="提用日期" prop="flowTime">
                  <el-date-picker v-model="form.flowTime" type="date" style="width: 100%" />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="提用人" prop="carryPerson">
                  <el-input v-model="form.carryPerson" />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="提用负责人" prop="">
                  <el-input />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="证明人" prop="">
                  <el-input />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="审批单位" prop="">
                  <el-input />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="审批人" prop="">
                  <el-input />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="批准文号" prop="">
                  <el-input />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="合同号" prop="">
                  <el-input />
                </el-form-item>
              </el-col>
            </el-row>

            <el-form-item label="上传附件" prop="">
              <div flex="~ col">
                <file-upload :file-type="[]" :is-show-tip="false" />
                <div>馆外提用请上传藏品借用函、借用单位简介、安保方案、借用协议、省局批复文件等附件用以审批备查。</div>
              </div>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="提用详细信息"></el-tab-pane>
          <el-tab-pane label="选择提用藏品">
            <el-card shadow="never">
              <el-table border ref="tbFlowRelics" style="width: 100%" :data="thingList"
                @selection-change="handleTbFlowRelicsSelectionChange">
                <el-table-column type="selection" width="55" align="center" />
                <el-table-column label="藏品登记号" align="center" prop="relicId" />
                <el-table-column label="藏品名称" align="center" prop="relicName" />
                <el-table-column label="文物类别" align="center" prop="relicCategory" />
                <el-table-column label="文物级别" align="center">
                  <template #default="scope">
                    <dict-tag :options="artifact_level" :value="scope.row.relicLevel" />
                  </template>
                </el-table-column>
                <el-table-column label="文物年代" align="center" prop="relicYears" />
                <el-table-column label="文物图片" align="center">
                  <template #default="scope">
                    <image-preview :width="50" :height="50" :src="scope.row.relicPath" />
                  </template>
                </el-table-column>
              </el-table>

              <pagination v-show="thingTotal > 0" :total="thingTotal" v-model:page="thingQueryParams.pageNum"
                v-model:limit="thingQueryParams.pageSize" @pagination="getThingList" />
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button class="button-c-sure" type="primary" @click="submitForm">确 定</el-button>
          <!-- <el-button class="button-p-cancel" @click="cancel">取 消</el-button> -->
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="WarehouseOut">
import { listWarehouseOut, getWarehouseOut, delWarehouseOut, addWarehouseOut, updateWarehouseOut } from '@/api/workManage/warehouseOut'
import { listThing } from '@/api/collection-info-query/thing'
import CommHandleBtn from '@/components/comm-cpns/comm-handle-btn/comm-handle-btn.vue'

const { proxy } = getCurrentInstance()
const { artifact_level } = proxy.useDict('artifact_level')
const { reason_withdrawal } = proxy.useDict('reason_withdrawal')
const { out_type } = proxy.useDict('out_type')

const warehouseOutList = ref([])
const open = ref(false)
const loading = ref(true)
const showSearch = ref(true)
const ids = ref([])
const single = ref(true)
const multiple = ref(true)
const total = ref(0)
const title = ref('')
const dateTimeRange = ref([])
const thingList = ref([])
const thingQueryParams = ref({
  pageNum: 1,
  pageSize: 10
})
const thingTotal = ref(0)

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    carryPerson: null,
    carryLocation: null,
    carryType: null
  },
  rules: {
    flowNo: [{ required: true, message: '请输入提用登记号', trigger: 'blur' }],
    carryPerson: [{ required: true, message: '请输入提用人', trigger: 'blur' }],
    carryLocation: [{ required: true, message: '请输入提用去向', trigger: 'blur' }],
    carryType: [{ required: true, message: '请输入提用类型', trigger: 'blur' }]
  }
})

const { queryParams, form, rules } = toRefs(data)

async function getThingList() {
  const response = await listThing(thingQueryParams.value)

  thingList.value = response.data.records.map(item => {
    return {
      flowType: '2',
      relicId: item.relicId,
      relicName: item.relicName,
      relicCategory: item.relicCategory,
      relicLevel: item.relicLevel,
      relicYears: item.relicYears,
      relicPath: item.relicPath
    }
  })
  thingTotal.value = response.data.total
}

/** 查询列表 */
function getList() {
  loading.value = true
  listWarehouseOut(proxy.addDateRange(queryParams.value, dateTimeRange.value)).then(response => {
    warehouseOutList.value = response.data.records
    total.value = response.data.total
    loading.value = false
  })
}

// 取消按钮
function cancel() {
  open.value = false
  reset()
}

// 表单重置
function reset() {
  form.value = {
    id: null
  }
  proxy.resetForm('warehouseOutRef')
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1
  getList()
}

/** 重置按钮操作 */
function resetQuery() {
  dateTimeRange.value = []
  proxy.resetForm('queryRef')
  handleQuery()
}

// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.id)
  single.value = selection.length != 1
  multiple.value = !selection.length
}

/** 新增按钮操作 */
async function handleAdd() {
  reset()

  await getThingList()

  open.value = true
  title.value = '添加'
}

/** 修改按钮操作 */
async function handleUpdate(row) {
  reset()

  await getThingList()

  const _id = row.id || ids.value
  getWarehouseOut(_id).then(response => {
    form.value = response.data
    open.value = true
    title.value = '修改'

    proxy.$nextTick(() => {
      proxy.$refs['tbFlowRelics'].clearSelection()
      thingList.value.forEach(item => {
        response.data.tbFlowRelics.forEach(subItem => {
          if (item.relicId === subItem.relicId) {
            proxy.$nextTick(() => {
              proxy.$refs['tbFlowRelics'].toggleRowSelection(item, true)
            })
          }
        })
      })
    })
  })
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs['warehouseOutRef'].validate(valid => {
    if (valid) {
      if (form.value.id != null) {
        updateWarehouseOut(form.value).then(response => {
          proxy.$modal.msgSuccess('修改成功')
          open.value = false
          getList()
        })
      } else {
        addWarehouseOut(form.value).then(response => {
          proxy.$modal.msgSuccess('新增成功')
          open.value = false
          getList()
        })
      }
    }
  })
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _ids = row.id || ids.value
  proxy.$modal
    .confirm('是否确认删除编号为"' + _ids + '"的数据项？')
    .then(function () {
      return delWarehouseOut(_ids)
    })
    .then(() => {
      getList()
      proxy.$modal.msgSuccess('删除成功')
    })
    .catch(() => { })
}

getList()

function handleTbFlowRelicsSelectionChange(selection) {
  form.value.tbFlowRelics = selection
}
</script>
<style lang="scss" scoped>
//tabs wrap</style>
