<template>
  <div>
    <el-tree-select v-model="values" :disabled="readOnly" size="large" :props="propsVol" :data="cacheData"
      :check-strictly="true" @node-click="onUpdate" class="full-width" />
  </div>
</template>

<script setup>
import { getWarehouseAllList, getWarehouseTree } from '@/api/artifact/warehouse';
import { getAllByHouseId } from '@/api/artifact/cabinet';
const emits = defineEmits(['update:showSearch', 'queryTable']);
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  modelLabel: {
    type: String,
    default: ''
  },
  readOnly: {
    type: Boolean,
    default: false
  },
  searchCol: {
    type: [Object, Number],
    default: 1
  },
  data: {
    type: Array,
    default: () => []
  }
});
const values = ref('');
const cabinet_addr = ref([]);
const nameArr = ref('');
const idArr = ref('');
const propsVol = {
  label: 'label',
  children: 'children',
  isLeaf: 'isLeaf'
};
const cacheData = ref([]);
// const getWarehouseAllLists = async () => {
//   const { rows } = await getWarehouseAllList();
//   cabinet_addr.value = [];
//   rows.map(v => {
//     cabinet_addr.value.push({
//       label: v.houseName,
//       key: v.houseId,
//       value: v.houseId
//     });
//   });
//   cacheData.value = cabinet_addr.value
// };
// getWarehouseAllLists();

// const getAllDataByHouseId = async id => {
//   const { rows } = await getAllByHouseId(id);
//   cabinet_addr_detail.value = [];
//   rows.map(v => {
//     cabinet_addr_detail.value.push({
//       label: v.cabinetName,
//       key: v.cabinetId,
//       value: v.cabinetName
//     });
//   });
// };
const getData = () => {
  getWarehouseTree().then(resp => {
    let res = funcIter(resp.rows)
    console.log(res)
    cacheData.value = res
  });
}
getData()
const funcIter = (arr) => {
  let res = arr.map(p => ({
    // parentId: p.dictCode,
    label: p.cabinetName || p.houseName,
    value: p.cabinetId || p.houseId,
    key: p.cabinetId || p.houseId,
    children: p?.cabinetList?.length > 0 ? funcIter(p.cabinetList) : []
  }));
  return res
}
const load = async (node, resolve) => {
  if (node.isLeaf) return resolve([]);

  if (node.level == 1) {
    nameArr.value = node.data.label;
    idArr.value = node.data.id;
    const { rows } = await getAllByHouseId(node.data.id);
    let arr = [];
    rows.map(v => {
      arr.push({
        label: v.cabinetName,
        key: v.cabinetId,
        id: v.cabinetId,
        value: v.cabinetId,
        // value: v.cabinetName,
        isLeaf: true
      });
    });
    setTimeout(() => {
      resolve(arr);
    });
  } else {
    const { rows } = await getWarehouseAllList();
    cabinet_addr.value = [];
    rows.map(v => {
      cabinet_addr.value.push({
        label: v.houseName,
        key: v.houseId,
        id: v.houseId,
        value: v.houseId
        // value: v.houseName
      });
    });
    setTimeout(() => {
      resolve(cabinet_addr.value);
    });
  }
};

watch(
  () => props.modelValue,
  (newVal, oldVal) => {
    values.value = newVal;
  }, {
  immediate: true,
  deep: true
})

// const onUpdate = (k, j) => {
//   emits('update:modelValue', k);
// emits('update:modelLabel', k.label);
// emits('update:modelValue', k.id);
// };
const onUpdate = (k, j) => {
  if (j.level == 2) {
    nameArr.value = j.parent.data.label + ',' + j.data.label;
    idArr.value = j.parent.data.value + ',' + j.data.value;
  } else {
    nameArr.value = j.data.label;
    idArr.value = j.data.value;
  }
  emits('update:modelLabel', nameArr.value);
  emits('update:modelValue', idArr.value);

};
onUnmounted(() => {
  nameArr.value = '';
  idArr.value = '';
});

</script>
