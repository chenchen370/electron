<template>
  <el-dialog v-if="formType === 'dialog'" v-model="proFormVisible" :width="width" :title="`${proFormProps.title}`"
    append-to-body align-center :show-close="false">
    <el-form ref="ruleFormRef" class="pro-form" :model="proFormProps.row" :disabled="proFormProps.isView"
      label-width="auto" size="large" label-position="left">
      <Grid ref="gridRef" :collapsed="false" :collapsed-rows="1" :gap="[20, 20]" :cols="searchCol">
        <GridItem v-for="item in formColumns" :key="item.prop" v-bind="getResponsive(item)">
          <el-form-item :prop="item.prop" :rules="item.form.rules" :disabled="true" class="td-flex column">
            <template #label>
              <el-space :size="0">
                <span>{{ item.label }}</span>
                <el-tooltip v-if="item.form?.tip ?? item.tip">
                  <template #content>
                    <component :is="item.form?.tip ?? item.tip ?? ''"></component>
                  </template>
                  <el-button style="padding: 0" :icon="QuestionFilled" link></el-button>
                </el-tooltip>
                <span>:</span>
              </el-space>
            </template>
            <ProFormItem :column="item" :disabled="proFormProps.disabledAarr &&
              proFormProps.disabledAarr.indexOf(item.label) > -1
              " :title="proFormProps.title" :item-value="proFormProps.row" />
          </el-form-item>
        </GridItem>
      </Grid>
    </el-form>
    <template #footer>
      <div class="dialog-footer td-mt24">
        <!-- <el-button class="button-p-cancel" @click="proFormVisible = false">取消</el-button> -->
        <el-button class="button-c-sure" v-show="!proFormProps.isView" type="primary"
          @click="handleSubmit">确定</el-button>
      </div>
    </template>
  </el-dialog>
  <el-drawer v-if="formType === 'drawer'" v-model="proFormVisible" :size="width" :title="`${proFormProps.title}`"
    append-to-body>
    <el-form ref="ruleFormRef" class="pro-form" :model="proFormProps.row" :disabled="proFormProps.isView"
      label-width="auto" size="large">
      <Grid ref="gridRef" :collapsed="false" :collapsed-rows="1" :gap="[10, 10]" :cols="searchCol">
        <GridItem v-for="item in formColumns" :key="item.prop">
          <el-form-item :prop="item.prop" :rules="item.form.rules">
            <template #label>
              <el-space :size="0">
                <span>{{ item.label }}</span>
                <el-tooltip v-if="item.form?.tip ?? item.tip">
                  <template #content>
                    <component :is="item.form?.tip ?? item.tip ?? ''"></component>
                  </template>
                  <el-button style="padding: 0" :icon="QuestionFilled" link></el-button>
                </el-tooltip>
                <span>:</span>
              </el-space>
            </template>
            <ProFormItem :column="item" :item-value="proFormProps.row" />
          </el-form-item>
        </GridItem>
      </Grid>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button class="button-p-cancel" @click="proFormVisible = false">取消</el-button>
        <el-button class="button-c-sure" v-show="!proFormProps.isView" type="primary"
          @click="handleSubmit">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>
<script setup>
import { ref, provide, unref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import ProFormItem from './ProFormItem.vue';
import { Grid, GridItem } from '@/components/ProTable/components/Grid';
import { QuestionFilled } from '@element-plus/icons-vue';
import { handleProp } from './../../utils';
defineOptions({ name: 'ProForm' });

const proFormVisible = ref(false);

const proFormProps = ref({
  isView: false,
  title: '',
  disabledAarr: [],
  row: {}
});

const props = defineProps({
  width: {
    type: String,
    default: '40%'
  },
  formType: {
    type: String,
    default: 'dialog'
  },
  searchCol: {
    type: [Object, Number],
    default: 1
  },
  columns: {
    type: Array,
    default: () => []
  }
});

// 定义 enumMap 存储 enum 值（避免异步请求无法格式化单元格内容 || 无法填充搜索下拉选择）
const enumMap = ref(new Map());
provide('enumMap', enumMap);
const setEnumMap = async col => {
  if (!col.enum) return;
  // 如果当前enumMap存在相同的值就跳过
  if (
    enumMap.value.has(col.prop) &&
    (typeof col.enum === 'function' || enumMap.value.get(col.prop) === col.enum)
  )
    return;
  // 如果当前 enum 为后台数据需要请求数据，则调用该请求接口，并存储到 enumMap
  if (typeof col.enum !== 'function') {
    return enumMap.value.set(col.prop, unref(col.enum));
  }
  const { data } = await col.enum();
  enumMap.value.set(col.prop, data);
};

// 扁平化 columns
const flatColumnsFunc = (columns, flatArr = []) => {
  columns.forEach(async col => {
    if (col._children?.length) flatArr.push(...flatColumnsFunc(col._children));
    flatArr.push(col);

    // 给每一项 column 添加 isShow && isFilterEnum 默认属性
    col.isShow = col.isShow ?? true;
    col.isFilterEnum = col.isFilterEnum ?? true;

    // 设置 enumMap
    await setEnumMap(col);
  });
  return flatArr.filter(item => !item._children?.length);
};
// flatColumns 扁平结构的columns
const flatColumns = computed(() => flatColumnsFunc(props.columns));
const formColumns = computed(() => {
  return (
    flatColumns.value
      ?.filter(item => item.form?.el || item.form?.render)
      .sort((a, b) => a.form.order - b.form.order) ?? []
  );
});
sortDefaultFun();
function sortDefaultFun() {
  // 设置搜索表单排序默认值 && 设置搜索表单项的默认值
  formColumns.value.forEach((column, index) => {
    column.form.order = column.form.order ?? index + 2;
    if (
      column.form?.defaultValue !== undefined &&
      column.form?.defaultValue !== null
    ) {
      proFormProps.value.row[column.form.key ?? handleProp(column.prop)] =
        column.form?.defaultValue;
    } else {
      proFormProps.value.row[column.form.key ?? handleProp(column.prop)] = null;
    }
  });
}

// 获取响应式设置
const getResponsive = item => {
  return {
    span: item.form?.span ?? 1,
    offset: item.form?.offset ?? 0
  };
};

// 接收父组件传过来的参数
const acceptParams = params => {
  if (params.title === '新增') {
    proFormProps.value = params;
    sortDefaultFun();
  } else {
    proFormProps.value = params;
  }
  proFormVisible.value = true;
};

// 提交数据（新增/编辑）
const ruleFormRef = ref();
const handleSubmit = () => {
  ruleFormRef.value.validate(async valid => {
    if (!valid) return;
    try {
      await proFormProps.value.api(proFormProps.value.row);
      ElMessage.success({ message: `${proFormProps.value.title}成功` });
      proFormProps.value.getTableList();
      proFormProps.value = {
        isView: false,
        title: '',
        disabledAarr: [],
        row: {}
      };
      proFormVisible.value = false;
    } catch (error) {
      console.log(error);
    }
  });
};

defineExpose({
  proFormProps,
  acceptParams
});
</script>
<style lang="scss" scoped>
.pro-form {
  :deep(.el-form-item__content > *) {
    width: 100%;
  }

  :deep(.el-form-item) {
    margin: 0;
  }

  :deep(.el-range-editor.el-input__wrapper) {
    padding: 0 10px;
  }
}
</style>
