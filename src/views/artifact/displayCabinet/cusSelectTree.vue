<template>
  <div class="full-width">
    <el-tree-select v-model="values" :disabled="readOnly" :props="propsVol" :data="cacheData" :check-strictly="true"
      @node-click="updateParent" class="full-width" />
  </div>
</template>

<script setup>
import { getDicts, getCacheDicts } from '@/api/system/dict/data';
// const { proxy } = getCurrentInstance();
// const {
//   cp_texture_1,
//   cp_texture_1_1,
// } = proxy.useDict(
//   'cp_texture_1',
//   'cp_texture_1_1',
// );

const emits = defineEmits(['update']);
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
const cacheData = ref([]);
const propsVol = {
  label: 'label',
  children: 'children',
  isLeaf: 'isLeaf'
};

const funcIter = (arr) => {
  let res = arr.map(p => ({
    // parentId: p.dictCode,
    label: p.dictLabel,
    value: p.dictValue,
    // elTagType: p.listClass,
    // elTagClass: p.cssClass,
    children: p.subList.length > 0 ? funcIter(p.subList) : []
  }));
  return res
}
const getData = () => {
  getCacheDicts('cp_texture_1').then(resp => {
    let res = funcIter(resp.data)
    cacheData.value = res
  });
}
getData()
const load = async (node, resolve) => {
  if (node.isLeaf) return resolve([]);
    getCacheDicts('cp_texture_1').then(resp => {
      let res = funcIter(resp.data)
      resolve(res);
    });

  // if (node.level == 0) {
  //   getDicts('cp_texture_1/0').then(resp => {
  //     let res = resp.data.map(p => ({
  //       parentId: p.dictCode,
  //       label: p.dictLabel,
  //       value: p.dictValue,
  //       elTagType: p.listClass,
  //       elTagClass: p.cssClass
  //     }));
  //     resolve(res);
  //   });
  // } else {
  //   getDicts('cp_texture_1/' + node.data.parentId).then(resp => {
  //     let res = resp.data.map(p => ({
  //       parentId: p.dictCode,
  //       label: p.dictLabel,
  //       value: p.dictValue,
  //       elTagType: p.listClass,
  //       elTagClass: p.cssClass
  //     }));
  //     resolve(res);
  //   });
  // }

  // if (node.level == 1) {
  //   if (node.data.value == '1_2') {
  //     cp_texture_1_2.value.map(v => {
  //       v.isLeaf = true;
  //     });
  //     setTimeout(() => {
  //       resolve([...cp_texture_1_2.value]);
  //     });
  //   } else {
  //     setTimeout(() => {
  //       resolve([...cp_texture_1_1.value]);
  //     });
  //   }
  // } else if (node.level == 2) {
  //   if (node.data.value == '2_2') {
  //     cp_texture_1_1_2.value.map(v => {
  //       v.isLeaf = true;
  //     });
  //     setTimeout(() => {
  //       resolve([...cp_texture_1_1_2.value]);
  //     });
  //   } else {
  //     cp_texture_1_1_1.value.map(v => {
  //       v.isLeaf = true;
  //     });
  //     setTimeout(() => {
  //       resolve([...cp_texture_1_1_1.value]);
  //     });
  //   }
  // } else {
  //   setTimeout(() => {
  //     resolve(cp_texture_1.value);
  //   });
  // }
};

watch(
  () => props.modelValue,
  (newVal, oldVal) => {
    values.value = newVal;
  }
);

const updateParent = v => {
  emits('update', v);
  onUpdate(v)
};
const onUpdate = (v) => {
  emits('update:modelLabel', v.value);
  emits('update:modelValue', v.value);
};
</script>
