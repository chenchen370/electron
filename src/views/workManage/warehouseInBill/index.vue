<template>
  <div class="app-container">
    <el-card shadow="never" class="mb-10px">
      <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="auto" size="large">
        <el-form-item label="入馆凭证号" prop="">
          <el-input size="large" placeholder="请输入入馆凭证号" clearable style="width: 200px" @keyup.enter="handleQuery" />
        </el-form-item>
        <el-form-item label="提交人" prop="">
          <el-input size="large" placeholder="请输入提交人" clearable style="width: 200px" @keyup.enter="handleQuery" />
        </el-form-item>
        <el-form-item label="提交时间">
          <el-date-picker size="large" v-model="dateTimeRange" value-format="YYYY-MM-DD HH:mm:ss" type="datetimerange"
            range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="审批状态" prop="">
          <el-select size="large" placeholder="请选择审批状态" clearable style="width: 200px">
            <!-- <el-option
              v-for="dict in artifact_level"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="button-c-primary" type="primary" icon="Search" @click="handleQuery">搜索</el-button>
          <el-button class="button-p-black" icon="Refresh" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <comm-handle-btn :per="['workManage:warehouseInBill:add']" title="新增" img-name="add"
            @handle-click="handleAdd" />
          <!--          <el-button-->
          <!--            type="primary"-->
          <!--            plain-->
          <!--            icon="Plus"-->
          <!--            @click="handleAdd"-->
          <!--            v-hasPermi="['workManage:warehouseInBill:add']"-->
          <!--            >新增</el-button-->
          <!--          >-->
        </el-col>
        <el-col :span="1.5">
          <comm-handle-btn :per="['workManage:warehouseInBill:edit']" title="修改" img-name="edit" :disabled="single"
            @handle-click="handleUpdate" />
          <!--          <el-button-->
          <!--            type="success"-->
          <!--            plain-->
          <!--            icon="Edit"-->
          <!--            :disabled="single"-->
          <!--            @click="handleUpdate"-->
          <!--            v-hasPermi="['workManage:warehouseInBill:edit']"-->
          <!--            >修改</el-button-->
          <!--          >-->
        </el-col>
        <el-col :span="1.5">
          <comm-handle-btn :per="['workManage:warehouseInBill:remove']" title="删除" img-name="remove"
            :disabled="multiple" @handle-click="handleDelete" />
          <!--          <el-button-->
          <!--            type="danger"-->
          <!--            plain-->
          <!--            icon="Delete"-->
          <!--            :disabled="multiple"-->
          <!--            @click="handleDelete"-->
          <!--            v-hasPermi="['workManage:warehouseInBill:remove']"-->
          <!--            >删除</el-button-->
          <!--          >-->
        </el-col>
        <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
      </el-row>

      <el-table style="width: 100%" v-loading="loading" :data="warehouseInBillList"
        @selection-change="handleSelectionChange" border>
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="入馆凭证号" align="center" prop="" />
        <el-table-column label="藏品数量" align="center" prop="" />
        <el-table-column label="提交人" align="center" prop="" />
        <el-table-column label="提交时间" align="center" prop="" />
        <el-table-column label="审批状态" align="center" prop="" />
        <el-table-column label="流程状态" align="center" prop="" />
        <el-table-column label="操作" fixed="right" align="center" width="200" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-button link type="primary" :size="22" icon="EditPen" title="编辑" @click="handleUpdate(scope.row)"
              v-hasPermi="['workManage:warehouseInBill:edit']"></el-button>
            <el-button link type="primary" :size="22" icon="Delete" title="删除" @click="handleDelete(scope.row)"
              v-hasPermi="['workManage:warehouseInBill:remove']"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total > 0" :total="total" v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>

    <!-- 添加或修改对话框 -->
    <el-dialog :title="title" v-model="open" width="1200px" append-to-body @close="cancel" align-center
      :show-close="false">
      <el-form ref="warehouseInBillRef" :model="form" :rules="rules" label-width="auto">
        <el-tabs class="el-tabs-wrap">
          <el-tab-pane label="基本入藏信息"></el-tab-pane>
          <el-tab-pane label="入藏藏品">
            <el-table style="width: 100%" :data="[]" border>
              <el-table-column type="selection" width="55" align="center" />
              <el-table-column label="序号" align="center" prop="" />
              <el-table-column label="藏品编号" align="center" prop="" />
              <el-table-column label="藏品名称" align="center" prop="" />
              <el-table-column label="图片" align="center" prop="" />
              <el-table-column label="数量" align="center" prop="" />
              <el-table-column label="单位" align="center" prop="" />
              <el-table-column label="时代" align="center" prop="" />
              <el-table-column label="质地" align="center" prop="" />
              <el-table-column label="备注" align="center" prop="" />
              <el-table-column label="操作" fixed="right" align="center" width="200"
                class-name="small-padding fixed-width">
                <template #default="scope"> </template>
              </el-table-column>
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

<script setup name="WarehouseInBill">
// import {
//   listWarehouseInBill,
//   getWarehouseInBill,
//   delWarehouseInBill,
//   addWarehouseInBill,
//   updateWarehouseInBill
// } from '@/api/workManage/warehouseInBill';

import CommHandleBtn from '@/components/comm-cpns/comm-handle-btn/comm-handle-btn.vue';

const { proxy } = getCurrentInstance();

const warehouseInBillList = ref([]);
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
  // listWarehouseInBill(proxy.addDateRange(queryParams.value, dateTimeRange.value)).then(response => {
  //   warehouseInBillList.value = response.data.records;
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
  proxy.resetForm('warehouseInBillRef');
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
  getWarehouseInBill(_id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = '修改';
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs['warehouseInBillRef'].validate(valid => {
    if (valid) {
      if (form.value.id != null) {
        updateWarehouseInBill(form.value).then(response => {
          proxy.$modal.msgSuccess('修改成功');
          open.value = false;
          getList();
        });
      } else {
        addWarehouseInBill(form.value).then(response => {
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
      return delWarehouseInBill(_ids);
    })
    .then(() => {
      getList();
      proxy.$modal.msgSuccess('删除成功');
    })
    .catch(() => { });
}

getList();


</script>
