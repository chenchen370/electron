<template>
  <component
    :is="rendered_component"
    v-bind="{
      ...handleFormProps,
      ...placeholder,
      title: _title,
      itemValue: _itemValue,
      clearable
    }"
    v-model.trim="_itemValue[props.column.form?.key ?? handleProp(props.column.prop!)]"
    :data="props.column.form?.el === 'tree-select' ? columnEnum : []"
    :options="['cascader', 'select-v2'].includes(props.column.form?.el!) ? columnEnum : []"
  >
    <template v-if="props.column.form?.el === 'cascader'" #default="{ data }">
      <span>{{ data[fieldNames.label] }}</span>
    </template>
    <template v-if="props.column.form?.el === 'select'">
      <DynamicOption
        v-for="(col, index) in columnEnum"
        :key="index"
        :label="col[fieldNames.label]"
        :value="col[fieldNames.value]"
      ></DynamicOption>
    </template>
    <slot v-else></slot>
  </component>
</template>

<script setup lang="ts" name="ProFormItem">
import { computed, defineAsyncComponent, inject, ref } from 'vue';
import { ColumnProps } from '../../types';
import {
  ElDatePicker,
  ElTimePicker,
  ElInput,
  ElInputNumber,
  ElSelect,
  ElSelectV2,
  ElCascader,
  ElTreeSelect,
  ElSwitch,
  ElSlider,
  ElTimeSelect,
  ElOption
} from 'element-plus';
const DynamicOption = defineAsyncComponent(async () => {
  return ElOption;
});
defineOptions({
  name: 'ProFormItem'
});
const getElementComponent = async (component: string) => {
  switch (component) {
    case 'text':
      return ElInput;
    case 'number':
      return ElInputNumber;
    case 'select':
      return ElSelect;
    case 'select-v2':
      return ElSelectV2;
    case 'tree-select':
      return ElTreeSelect;
    case 'cascader':
      return ElCascader;
    case 'date-picker':
      return ElDatePicker;
    case 'time-picker':
      return ElTimePicker;
    case 'time-select':
      return ElTimeSelect;
    case 'switch':
      return ElSwitch;
    case 'slider':
      return ElSlider;
  }
};

const rendered_component = computed(() => {
  if (props.column.form?.render) return props.column.form?.render;
  // else return fields[`el-${props.column.form?.el}`];
  return defineAsyncComponent(
    // @ts-ignore
    () => getElementComponent(props.column.form.el)
  );
});

function handleProp(prop: string) {
  const propArr = prop.split('.');
  if (propArr.length == 1) return prop;
  return propArr[propArr.length - 1];
}

interface ProFormItem {
  column: ColumnProps;
  title: string;
  itemValue: { [key: string]: any };
}

const props = defineProps<ProFormItem>();

// Re receive defaultValue
const _itemValue = computed(() => props.itemValue);
const _title = computed(() => props.title);

// 判断 fieldNames 设置 label && value && children 的 key 值
const fieldNames = computed(() => {
  return {
    label: props.column.fieldNames?.label ?? 'label',
    value: props.column.fieldNames?.value ?? 'value',
    children: props.column.fieldNames?.children ?? 'children'
  };
});

// 接收 enumMap (el 为 select-v2 需单独处理 enumData)
const enumMap = inject('enumMap', ref(new Map()));
const columnEnum = computed(() => {
  let enumData = enumMap.value.get(props.column.prop);
  if (!enumData) return [];
  if (props.column.form?.el === 'select-v2' && props.column.fieldNames) {
    enumData = enumData.map((item: { [key: string]: any }) => {
      return {
        ...item,
        label: item[fieldNames.value.label],
        value: item[fieldNames.value.value]
      };
    });
  }
  return enumData;
});

// 处理透传的 formProps (el 为 tree-select、cascader 的时候需要给下默认 label && value && children)
const handleFormProps = computed(() => {
  const label = fieldNames.value.label;
  const value = fieldNames.value.value;
  const children = fieldNames.value.children;
  const formEl = props.column.form?.el;
  let formProps = props.column.form?.props ?? {};
  if (formEl === 'tree-select') {
    formProps = {
      ...formProps,
      props: { ...formProps.props, label, children },
      nodeKey: value
    };
  }
  if (formEl === 'cascader') {
    formProps = {
      ...formProps,
      props: { ...formProps.props, label, value, children }
    };
  }
  return formProps;
});

// 处理默认 placeholder
const placeholder = computed(() => {
  const form = props.column.form;
  if (
    ['datetimerange', 'daterange', 'monthrange'].includes(form?.props?.type) ||
    form?.props?.isRange
  ) {
    return {
      rangeSeparator: '至',
      startPlaceholder: '开始时间',
      endPlaceholder: '结束时间'
    };
  }
  const placeholder =
    form?.props?.placeholder ??
    (form?.el?.includes('text') ? '请输入' : '请选择');
  return { placeholder };
});

// 是否有清除按钮 (当搜索项有默认值时，清除按钮不显示)
const clearable = computed(() => {
  const form = props.column.form;
  return (
    form?.props?.clearable ??
    (form?.defaultValue == null || form.defaultValue == undefined)
  );
});
</script>
