<template>
  <div class="app-container">
    <el-card shadow="never" class="mb-10px">
      <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="auto" size="large">
        <el-form-item label="入馆凭证号" prop="flowNo">
          <el-input v-model="queryParams.flowNo" placeholder="请输入入馆凭证号" clearable style="width: 200px" />
        </el-form-item>
        <el-form-item>
          <el-button class="button-c-primary" type="primary" icon="Search" @click="handleQuery">搜索</el-button>
          <el-button class="button-p-black" icon="Refresh" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <comm-handle-btn :per="['workManage:warehouseIn:add']" title="新增" img-name="add" @handle-click="handleAdd" />
          <!--          <el-button-->
          <!--            type="primary"-->
          <!--            plain-->
          <!--            icon="Plus"-->
          <!--            @click="handleAdd"-->
          <!--            v-hasPermi="['workManage:warehouseIn:add']"-->
          <!--            >新增</el-button-->
          <!--          >-->
        </el-col>
        <el-col :span="1.5">
          <comm-handle-btn :per="['workManage:warehouseIn:query']" title="查看" icon-name="View" :disabled="single" @handle-click="handleView" />
          <!--          <el-button-->
          <!--            type="success"-->
          <!--            plain-->
          <!--            icon="View"-->
          <!--            :disabled="single"-->
          <!--            @click="handleView"-->
          <!--            v-hasPermi="['workManage:warehouseIn:query']"-->
          <!--            >查看</el-button-->
          <!--          >-->
        </el-col>
        <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
      </el-row>

      <el-table style="width: 100%" v-loading="loading" :data="warehouseInList" @selection-change="handleSelectionChange" border>
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="入馆时间" align="center" prop="flowTime">
          <template #default="scope">
            <span>{{ parseTime(scope.row.flowTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="入馆凭证号" align="center" prop="flowNo" />
        <el-table-column label="登记人" align="center" prop="flowPerson" />
        <el-table-column label="藏品数量" align="center" prop="relicsNum" />
        <el-table-column label="审批状态" align="center" prop="flowStatus" />
        <el-table-column label="操作" fixed="right" align="center" width="200" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-button
              link
              type="primary"
              icon="View"
              :size="22"
              title="查看"
              @click="handleView(scope.row)"
              v-hasPermi="['workManage:warehouseIn:query']"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>

    <!-- 添加或查看对话框 -->
    <el-dialog :title="title" v-model="open" width="1200px" append-to-body @close="cancel" align-center :show-close="false">
      <el-form ref="warehouseInRef" :model="form" :rules="rules" label-width="auto" size="large" label-position="top">
        <el-tabs v-model="activeName" class="el-tabs-wrap">
          <el-tab-pane label="基本入藏信息">
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="登记人" prop="flowPerson">
                  <el-input v-model="form.flowPerson" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="登记日期" prop="flowTime">
                  <el-date-picker v-model="form.flowTime" type="date" style="width: 100%" />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="收件人" prop="receipt">
                  <el-input v-model="form.receipt" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="交件人" prop="delivery">
                  <el-input v-model="form.delivery" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="征集人" prop="collectPerson">
                  <el-input v-model="form.collectPerson" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="备注" prop="flowDesc">
              <el-input type="textarea" v-model="form.flowDesc" :rows="4" />
            </el-form-item>
            <el-form-item label="上传附件" prop="flowAttachment">
              <file-upload v-model="form.flowAttachment" :file-type="[]" :is-show-tip="false" />
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="入藏藏品">
            <el-card shadow="never">
              <el-table ref="tbFlowRelics" style="width: 100%" :data="thingList" @selection-change="handleTbFlowRelicsSelectionChange" border>
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

              <pagination
                v-show="thingTotal > 0"
                :total="thingTotal"
                v-model:page="thingQueryParams.pageNum"
                v-model:limit="thingQueryParams.pageSize"
                @pagination="getThingList"
              />
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button v-if="activeName === '0'" type="primary" @click="submitForm" class="button-c-sure">下一步</el-button>
          <el-button v-if="activeName === '1'" type="primary" @click="submitForm" class="button-c-sure">确 定</el-button>
          <!-- <el-button class="button-p-cancel" @click="cancel">取 消</el-button> -->
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="WarehouseIn">
import { listThing } from '@/api/collection-info-query/thing'
import { listWarehouseIn, getWarehouseIn, addWarehouseIn } from '@/api/workManage/warehouseIn'
import CommHandleBtn from '@/components/comm-cpns/comm-handle-btn/comm-handle-btn.vue'

const { proxy } = getCurrentInstance()
const { artifact_level } = proxy.useDict('artifact_level')

const warehouseInList = ref([])
const open = ref(false)
const loading = ref(true)
const showSearch = ref(true)
const ids = ref([])
const single = ref(true)
const multiple = ref(true)
const total = ref(0)
const title = ref('')
const activeName = ref('0')
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
    pageSize: 10
  },
  rules: {
    flowPerson: [{ required: true, message: '请输入登记人', trigger: 'blur' }],
    flowTime: [{ required: true, message: '请选择登记日期', trigger: 'change' }]
  }
})

const { queryParams, form, rules } = toRefs(data)

async function getThingList() {
  const response = await listThing(thingQueryParams.value)

  thingList.value = response.data.records.map(item => {
    return {
      flowType: '1',
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
  listWarehouseIn(queryParams.value).then(response => {
    warehouseInList.value = response.data.records
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
  form.value = {}
  proxy.resetForm('warehouseInRef')
  activeName.value = '0'
  thingList.value = []
  thingQueryParams.value = {
    pageNum: 1,
    pageSize: 10
  }
  thingTotal.value = 0
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1
  getList()
}

/** 重置按钮操作 */
function resetQuery() {
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

/** 查看按钮操作 */
async function handleView(row) {
  reset()

  await getThingList()

  const _id = row.id || ids.value
  getWarehouseIn(_id).then(response => {
    form.value = response.data
    open.value = true
    title.value = '查看'

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
  proxy.$refs['warehouseInRef'].validate(valid => {
    if (valid) {
      if (activeName.value === '0') {
        activeName.value = '1'
        return
      }

      if (form.value.id != null) {
        open.value = false
      } else {
        addWarehouseIn(form.value).then(response => {
          proxy.$modal.msgSuccess('新增成功')
          open.value = false
          getList()
        })
      }
    }
  })
}

getList()

function handleTbFlowRelicsSelectionChange(selection) {
  form.value.tbFlowRelics = selection
}
</script>

<style lang="scss" scoped></style>
