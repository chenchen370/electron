<template>
  <el-dialog :title="`${proFormProps.title}`" v-model="proFormVisible" width="1028px" @close="close" align-center
    :show-close="false">
    <div>
      <div class="mn-container">
        <el-table class="td-mt20" :data="additionalList" stripe>
          <el-table-column label="采集时间" prop="addDate" width="120" />
          <el-table-column label="温度" prop="temperatureAssess" show-overflow-tooltip />
          <el-table-column label="湿度" prop="humidityAssess" show-overflow-tooltip />
          <el-table-column label="co2" prop="co2Assess" show-overflow-tooltip />
          <el-table-column label="voc" prop="vocAssess" show-overflow-tooltip />
          <el-table-column label="光照" prop="illuminationAssess" show-overflow-tooltip />
          <el-table-column label="紫外线" prop="ultravioletAssess" show-overflow-tooltip />
        </el-table>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { reactive } from 'vue';
import { getAssessPointList } from '@/api/warning/virsualPlatform';
const { proxy } = getCurrentInstance();
const proFormVisible = ref(false);
const additionalList = ref([]);

const proFormProps = ref({
  isView: false,
  title: '',
  row: {}
});

const close = () => {
  proFormVisible.value = false;
};

const handleSubmit = async () => {
  const params = {
    houseId: proFormProps.value.row?.areaId
  };
  const { rows } = await getAssessPointList(params);
  additionalList.value = rows;
};

const acceptParams = params => {
  proFormProps.value = params;
  proFormVisible.value = true;
  handleSubmit();
};

defineExpose({
  acceptParams
});
</script>
