<template>
  <div class="app-container td-px10 td-pt10">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch">
      <el-form-item label="部门名称" prop="deptName">
        <el-input v-model="queryParams.deptName" placeholder="请输入部门名称" clearable style="width: 200px"
          @keyup.enter="handleQuery" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="部门状态" clearable style="width: 200px">
          <el-option v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.label" :value="dict.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索 </el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>
    <el-row :gutter="10" class="mb-8px">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['system:dept:add']">新增 </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="info" plain icon="Sort" @click="toggleExpandAll">展开/折叠 </el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-if="refreshTable" v-loading="loading" :data="deptList" row-key="deptId"
      :default-expand-all="isExpandAll" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
      <el-table-column prop="deptName" width="200" label="部门名称"></el-table-column>
      <el-table-column prop="orderNum" label="排序"></el-table-column>
      <el-table-column prop="deptCode" label="部门编号"></el-table-column>
      <el-table-column prop="deptNature" width="140" label="部门性质"></el-table-column>
      <el-table-column prop="deptPhone" width="120" label="部门电话"></el-table-column>
      <el-table-column prop="deptFax" width="120" label="部门传真"></el-table-column>
      <el-table-column prop="deptAddress" width="200" label="部门地址"></el-table-column>
      <el-table-column prop="deptLeader" label="负责人"></el-table-column>
      <el-table-column prop="deptLeaderPhone" width="120" label="负责人电话"></el-table-column>
      <el-table-column prop="deptType" label="会员类型">
        <template #default="scope">
          <dict-tag :options="sys_dept_type" :value="scope.row.deptType" />
        </template>
      </el-table-column>

      <el-table-column prop="status" label="状态" width="100" align="center">
        <template #default="scope">
          <dict-tag :options="sys_normal_disable" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" align="center" width="200" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['system:dept:edit']">修改 </el-button>
          <el-button link type="primary" icon="Plus" @click="handleAdd(scope.row)" v-hasPermi="['system:dept:add']">新增
          </el-button>
          <el-button v-if="scope.row.parentId != 0" link type="primary" icon="Delete" @click="handleDelete(scope.row)"
            v-hasPermi="['system:dept:remove']">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 添加或修改部门对话框 -->
    <el-dialog :title="title" v-model="open" width="800px" append-to-body align-center :show-close="false">
      <el-form ref="deptRef" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="24" v-if="form.parentId !== 0">
            <el-form-item label="上级部门" prop="parentId">
              <el-tree-select v-model="form.parentId" :data="deptOptions" :props="{
                value: 'deptId',
                label: 'deptName',
                children: 'children'
              }" value-key="deptId" placeholder="选择上级部门" check-strictly />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门名称" prop="deptName">
              <el-input v-model="form.deptName" placeholder="请输入部门名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示排序" prop="orderNum">
              <el-input-number v-model="form.orderNum" controls-position="right" :min="0" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门编号" prop="deptCode">
              <el-input v-model="form.deptCode" placeholder="请输入部门编号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门性质" prop="deptNature">
              <el-input v-model="form.deptNature" placeholder="请输入部门性质" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门电话" prop="deptPhone">
              <el-input v-model="form.deptPhone" placeholder="请输入电话" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门传真" prop="deptFax">
              <el-input v-model="form.deptFax" placeholder="请输入传真" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="部门地址" prop="deptAddress">
              <el-input type="textarea" v-model="form.deptAddress" placeholder="请输入地址" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="负责人" prop="deptLeader">
              <el-input v-model="form.deptLeader" placeholder="请输入负责人" maxlength="20" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="负责人电话" prop="deptLeaderPhone">
              <el-input v-model="form.deptLeaderPhone" placeholder="请输入联系电话" maxlength="11" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" placeholder="请输入邮箱" maxlength="50" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="会员类型">
              <el-radio-group v-model="form.deptType">
                <el-radio v-for="dict in sys_dept_type" :key="dict.value" :label="dict.value">{{ dict.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门状态">
              <el-radio-group v-model="form.status">
                <el-radio v-for="dict in sys_normal_disable" :key="dict.value" :label="dict.value">{{ dict.label }}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <!--          <el-col :span="12">-->
          <!--            <el-table-column-->
          <!--              label="配置"-->
          <!--              prop="config"-->
          <!--            >-->
          <!--              <template #default="scope">-->
          <!--               -->
          <!--              </template>-->
          <!--            </el-table-column>-->
          <!--          </el-col>-->
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="jsx">
import { listDept, getDept, delDept, addDept, updateDept, listDeptExcludeChild } from '@/api/system/dept'
import CommHandleBtn from '@/components/comm-cpns/comm-handle-btn/comm-handle-btn.vue'
import { addShare, cancellationShare, getDeptList, indexQuery, relicsQuery, sharingCollectionEdit, sharingMultimediaEdit } from '@/api/sharing/manage'
import { navigationAdd, update } from '@/api/collection-info-query/navInfo'
import { ElMessage } from 'element-plus'

const { proxy } = getCurrentInstance()
const { sys_normal_disable, sys_dept_type, artifact_level } = proxy.useDict('sys_normal_disable', 'sys_dept_type', 'artifact_level')

const deptList = ref([])
const open = ref(false)
const loading = ref(true)
const showSearch = ref(true)
const title = ref('')
const deptOptions = ref([])
const isExpandAll = ref(true)
const refreshTable = ref(true)
const collectShareInfoVisable = ref(false)
const deptConfigInfoVisable = ref(false)
const data = reactive({
  queryParams: {
    deptName: undefined,
    status: undefined
  },
  rules: {
    parentId: [{ required: true, message: '上级部门不能为空', trigger: 'blur' }],
    deptName: [{ required: true, message: '部门名称不能为空', trigger: 'blur' }],
    orderNum: [{ required: true, message: '显示排序不能为空', trigger: 'blur' }],
    email: [
      {
        type: 'email',
        message: '请输入正确的邮箱地址',
        trigger: ['blur', 'change']
      }
    ],
    deptLeaderPhone: [
      {
        pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
        message: '请输入正确的手机号码',
        trigger: 'blur'
      }
    ]
  }
})
const indexData = ref([
  {
    desc: '保存位置（拒/架）状态',
    prop: 'indexPosition'
  },
  {
    desc: '存位置（拒/架）编号状态',
    prop: 'indexPositionNum'
  },
  {
    desc: '完残程度',
    prop: 'indexRelicCompleteness'
  },
  {
    desc: '藏品来源',
    prop: 'indexRelicFrom'
  },
  {
    desc: '藏品级别',
    prop: 'indexRelicLevel'
  },
  {
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
  }
])
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
    desc: 'indexResearch',
    prop: '研究论著状态'
  },
  {
    desc: '水印状态',
    prop: 'watermark'
  }
])
const proTableRef = ref(null)
const columns = ref([
  {
    type: 'selection'
  },

  {
    label: '部门ID',
    prop: 'deptId'
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
    search: { el: 'select', props: {} }
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
  { prop: 'operation', width: 180, label: '操作', fixed: 'right' }
])
const { queryParams, rules } = toRefs(data)

const form = reactive({
  id: undefined,
  deptId: undefined,
  parentId: undefined,
  deptName: undefined,
  orderNum: 0,
  deptCode: undefined,
  deptNature: undefined,
  deptPhone: undefined,
  deptFax: undefined,
  deptAddress: undefined,
  deptLeader: undefined,
  deptLeaderPhone: undefined,
  email: undefined,
  deptType: '0',
  status: '0'
})

/** 查询部门列表 */
function getList() {
  loading.value = true
  listDept(queryParams.value).then(response => {
    deptList.value = proxy.handleTree(response.data, 'deptId')
    loading.value = false
  })
}

/** 取消按钮 */
function cancel() {
  open.value = false
  reset()
}

/** 表单重置 */
function reset() {
  proxy.resetForm('deptRef')
  Object.keys(form).forEach(key => {
    form[key] = undefined
  })
}

/** 搜索按钮操作 */
function handleQuery() {
  getList()
}

/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm('queryRef')
  handleQuery()
}

/** 新增按钮操作 */
function handleAdd(row) {
  reset()
  listDept().then(response => {
    deptOptions.value = proxy.handleTree(response.data, 'deptId')
  })
  if (row != undefined) {
    form.parentId = row.deptId
  }
  open.value = true
  title.value = '添加部门'
}

/** 展开/折叠操作 */
function toggleExpandAll() {
  refreshTable.value = false
  isExpandAll.value = !isExpandAll.value
  nextTick(() => {
    refreshTable.value = true
  })
}

/** 修改按钮操作 */
async function handleUpdate(row) {
  reset()

  const res1 = await listDeptExcludeChild(row.deptId)
  deptOptions.value = proxy.handleTree(res1.data, 'deptId')

  // const res2 = await getDept(row.deptId)
  Object.keys(form).forEach(key => {
    form[key] = row?.[key]
  })

  open.value = true
  title.value = '修改部门'
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs['deptRef'].validate(valid => {
    if (valid) {
      if (form.deptId != undefined) {
        updateDept(form).then(response => {
          proxy.$modal.msgSuccess('修改成功')
          open.value = false
          getList()
        })
      } else {
        addDept(form).then(response => {
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
  proxy.$modal
    .confirm('是否确认删除名称为"' + row.deptName + '"的数据项?')
    .then(function () {
      return delDept(row.deptId)
    })
    .then(() => {
      getList()
      proxy.$modal.msgSuccess('删除成功')
    })
    .catch(() => { })
}

getList()
</script>
