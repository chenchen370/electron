<template>
    <el-dialog v-model="proFormVisible" width="60%" @close="close" append-to-body class="no-header-dialog" align-center
        :show-close="false">
        <div class="td-mb10">{{ modelValue.pointDesc || modelValue.monirorPointName }}</div>
        <img :src="url" alt="" class="full-width">
    </el-dialog>
    <el-link @click="openPic(modelValue)">{{ modelValue.pointDesc || modelValue.monirorPointName }}</el-link>
</template>

<script setup lang="jsx">
import { reactive } from 'vue';
import { getMonitorPoint } from '@/api/warning/monitorPoint';

const props = defineProps({
    modelValue: {
        type: Object,
        default: {}
    },
});
const url = ref('')
const proFormVisible = ref(false);

const close = () => {
    proFormVisible.value = false;
};

const getPic = v => {
    return import.meta.env.VITE_APP_FILES_API + v;
};
const openPic = async (v) => {
    let { data } = await getMonitorPoint(v.pointId || v.monirorPointId)
    url.value = getPic(data.houseGraph)
    proFormVisible.value = true;
}
</script>
<style lang="scss">
.no-header-dialog .el-dialog__header {
    height: 0;
}
</style>