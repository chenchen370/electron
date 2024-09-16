<template>
  <div class="app-container">
    <el-card shadow="never" class="mb-10px">
      <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="auto" size="large">
        <el-row :span="24">
          <el-col :span="6">
            <el-form-item label="提准字" prop="" style="width: 93%;">
              <el-input size="large" placeholder="请输入提准字" clearable style="width: 100%;" @keyup.enter="handleQuery" />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="号" prop="" style="width: 93%;">
              <el-input size="large" placeholder="请输入号" clearable style="width: 100%;" @keyup.enter="handleQuery" />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="提用人" prop="" style="width: 93%;">
              <el-input size="large" placeholder="请输入提用人" clearable style="width: 100%;" @keyup.enter="handleQuery" />
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="提交时间" style="width: 93%;">
              <el-date-picker size="large" style="width: 100%;" v-model="dateTimeRange"
                value-format="YYYY-MM-DD HH:mm:ss" type="datetimerange" range-separator="-" start-placeholder="开始时间"
                end-placeholder="结束时间"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="提用去向" prop="" style="width: 93%;">
              <el-select size="large" placeholder="请选择提用去向" clearable style="width: 100%;">
                <!-- <el-option
                  v-for="dict in artifact_level"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                ></el-option> -->
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="提用类型" prop="" style="width: 93%;">
              <el-select size="large" placeholder="请选择提用类型" clearable style="width: 100%;">
                <!-- <el-option
                  v-for="dict in artifact_level"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                ></el-option> -->
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="退库状态" prop="" style="width: 93%;">
              <el-select size="large" placeholder="请选择退库状态" clearable style="width: 100%;">
                <!-- <el-option
                  v-for="dict in artifact_level"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                ></el-option> -->
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
          <comm-handle-btn :per="['workManage:warehouseReturnBill:add']" title="新增" img-name="add"
            @handle-click="handleAdd" />

          <!--          <el-button-->
          <!--            type="primary"-->
          <!--            plain-->
          <!--            icon="Plus"-->
          <!--            @click="handleAdd"-->
          <!--            v-hasPermi="['workManage:warehouseReturnBill:add']"-->
          <!--            >新增</el-button-->
          <!--          >-->
        </el-col>
        <el-col :span="1.5">
          <comm-handle-btn :per="['workManage:warehouseReturnBill:edit']" title="修改" icon-name="edit" :disabled="single"
            @handle-click="handleUpdate" />

          <!--          <el-button-->
          <!--            type="success"-->
          <!--            plain-->
          <!--            icon="Edit"-->
          <!--            :disabled="single"-->
          <!--            @click="handleUpdate"-->
          <!--            v-hasPermi="['workManage:warehouseReturnBill:edit']"-->
          <!--            >修改</el-button-->
          <!--          >-->
        </el-col>
        <el-col :span="1.5">
          <comm-handle-btn :per="['workManage:warehouseReturnBill:remove']" title="删除" icon-name="remove"
            :disabled="multiple" @handle-click="handleDelete" />

          <!--          <el-button-->
          <!--            type="danger"-->
          <!--            plain-->
          <!--            icon="Delete"-->
          <!--            :disabled="multiple"-->
          <!--            @click="handleDelete"-->
          <!--            v-hasPermi="['workManage:warehouseReturnBill:remove']"-->
          <!--            >删除</el-button-->
          <!--          >-->
        </el-col>
        <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
      </el-row>

      <el-table style="width: 100%" v-loading="loading" :data="warehouseReturnBillList"
        @selection-change="handleSelectionChange" border>
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="提用登记号" align="center" prop="" />
        <el-table-column label="提用人" align="center" prop="" />
        <el-table-column label="提交时间" align="center" prop="" />
        <el-table-column label="提用去向" align="center" prop="" />
        <el-table-column label="提用类型" align="center" prop="" />
        <el-table-column label="藏品数量" align="center" prop="" />
        <el-table-column label="状态" align="center" prop="" />
        <el-table-column label="退库统计" align="center" prop="" />
        <el-table-column label="操作" fixed="right" align="center" width="200" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-button link type="primary" icon="EditPen" :size="22" title="编辑" @click="handleUpdate(scope.row)"
              v-hasPermi="['workManage:warehouseReturnBill:edit']"></el-button>
            <el-button link type="primary" icon="Delete" :size="22" title="删除" @click="handleDelete(scope.row)"
              v-hasPermi="['workManage:warehouseReturnBill:remove']"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>

    <!-- 添加或修改对话框 -->
    <el-dialog :title="title" v-model="open" width="1200px" append-to-body @close="cancel" align-center
      :show-close="false">
      <el-form ref="warehouseReturnBillRef" :model="form" :rules="rules" label-width="auto" size="large"
        label-position="top">
        <el-tabs>
          <el-tab-pane label="基本提用信息">
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="提用去向" prop="" :rules="[
                  {
                    required: true,
                    message: '请输入提用去向',
                    trigger: 'blur'
                  }
                ]">
                  <el-input />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="提用类型" prop="" :rules="[
                  {
                    required: true,
                    message: '请输入提用类型',
                    trigger: 'blur'
                  }
                ]">
                  <el-input />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="提用登记号" prop="" :rules="[
                  {
                    required: true,
                    message: '请输入提用登记号',
                    trigger: 'blur'
                  }
                ]">
                  <el-input />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="提用日期" prop="">
                  <el-date-picker type="date" style="width: 100%" />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="提用人" prop="" :rules="[
                  {
                    required: true,
                    message: '请输入提用人',
                    trigger: 'blur'
                  }
                ]">
                  <el-input />
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
              <file-upload :file-type="[]" :is-show-tip="false" />
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="提用详细信息">
            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="展览类型" prop="">
                  <el-input />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="展览名称" prop="">
                  <el-input />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="展览开始时间" prop="">
                  <el-input />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="40">

              <el-col :span="8">
                <el-form-item label="展览截止时间" prop="">
                  <el-input />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="展览组织机构" prop="">
                  <el-input />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="展览举办地点" prop="">
                  <el-input />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="40">
              <el-col :span="8">
                <el-form-item label="借展单位" prop="">
                  <el-input />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="批准机构" prop="">
                  <el-input />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="批文号" prop="">
                  <el-input />
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="备注" prop="">
              <el-input />
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="选择提用藏品">
            <el-table style="width: 100%" :data="[]" border>
              <el-table-column label="序号" align="center" prop="" />
              <el-table-column label="藏品编号" align="center" prop="" />
              <el-table-column label="藏品名称" align="center" prop="" />
              <el-table-column label="文物类别" align="center" prop="" />
              <el-table-column label="数量单位" align="center" prop="" />
              <el-table-column label="文物级别" align="center" prop="" />
              <el-table-column label="完残程度" align="center" prop="" />
              <el-table-column label="所在库房" align="center" prop="" />
              <el-table-column label="库房负责人" align="center" prop="" width="120" />
              <el-table-column label="退库人" align="center" prop="" />
              <el-table-column label="退库时间" align="center" prop="" />
              <el-table-column label="状态" align="center" prop="" />
              <!--              <el-table-column-->
              <!--                label="操作"-->
              <!--                fixed="right"-->
              <!--                align="center"-->
              <!--                width="200"-->
              <!--                class-name="small-padding fixed-width"-->
              <!--              >-->
              <!--              </el-table-column>-->
            </el-table>
            <p>当前共 0 条</p>
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

<script setup name="WarehouseReturnBill">
// import {
//   listWarehouseReturnBill,
//   getWarehouseReturnBill,
//   delWarehouseReturnBill,
//   addWarehouseReturnBill,
//   updateWarehouseReturnBill
// } from '@/api/workManage/warehouseReturnBill';

import CommHandleBtn from '@/components/comm-cpns/comm-handle-btn/comm-handle-btn.vue';

const { proxy } = getCurrentInstance();

const warehouseReturnBillList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref('');
const dateTimeRange = ref([]);

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10
  },
  rules: {}
});

const { queryParams, form, rules } = toRefs(data);

/** 查询列表 */
function getList() {
  loading.value = false;
  // listWarehouseReturnBill(proxy.addDateRange(queryParams.value, dateTimeRange.value)).then(response => {
  //   warehouseReturnBillList.value = response.data.records;
  //   total.value = response.data.total;
  //   loading.value = false;
  // });
}

// 取消按钮
function cancel() {
  open.value = false;
  reset();
}

// 表单重置
function reset() {
  form.value = {
    id: null
  };
  proxy.resetForm('warehouseReturnBillRef');
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  dateTimeRange.value = [];
  proxy.resetForm('queryRef');
  handleQuery();
}

// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = '添加';
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _id = row.id || ids.value;
  getWarehouseReturnBill(_id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = '修改';
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs['warehouseReturnBillRef'].validate(valid => {
    if (valid) {
      if (form.value.id != null) {
        updateWarehouseReturnBill(form.value).then(response => {
          proxy.$modal.msgSuccess('修改成功');
          open.value = false;
          getList();
        });
      } else {
        addWarehouseReturnBill(form.value).then(response => {
          proxy.$modal.msgSuccess('新增成功');
          open.value = false;
          getList();
        });
      }
    }
  });
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _ids = row.id || ids.value;
  proxy.$modal
    .confirm('是否确认删除编号为"' + _ids + '"的数据项？')
    .then(function () {
      return delWarehouseReturnBill(_ids);
    })
    .then(() => {
      getList();
      proxy.$modal.msgSuccess('删除成功');
    })
    .catch(() => { });
}

getList();
</script>
