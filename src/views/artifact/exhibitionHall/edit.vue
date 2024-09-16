<template>
  <el-dialog :title="`${proFormProps.title}`" v-model="proFormVisible" width="1200px" @close="close" align-center
    :show-close="false">
    <div class="mn-container">
      <el-form ref="formRef" :model="form" :disabled="proFormProps.isView" :rules="rules" label-position="left"
        size="large">
        <el-row :gutter="49">
          <el-col :span="16">
            <el-form-item label="展厅编号" prop="houseId" style="margin-bottom: 0;">
              <div class="td-font_tip td-flex items-center">编号为数字或数字和字母的综合，不能重复。建议：如可命名为TCT01</div>
            </el-form-item>
            <el-input v-model="form.houseId" placeholder="" disabled>
              <!-- <template #prepend>ZT</template> -->
            </el-input>
          </el-col>
          <el-col :span="8">
            <el-form-item label="展厅名称" prop="houseName" class="td-flex column">
              <el-input v-model="form.houseName" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="展厅类型" prop="houseType" class="td-flex column">
              <el-select v-model="form.houseType" placeholder="请选择">
                <el-option v-for="item in exhibition_hall_type" :key="item.value" :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="展厅大小" prop="houseArea" class="td-flex column">
              <div class="td-flex">
                <el-input v-model="form.houseLength" placeholder="长" class="td-flex-item" />
                <div class="td-ml6 td-mr6">×</div>
                <el-input v-model="form.houseWidth" placeholder="宽" class="td-flex-item" />
                <el-input v-model="form.houseArea" placeholder="面积" class="td-ml14" style="width:170px">
                  <template #suffix>㎡（平方米）</template>
                </el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="监测状态" prop="monitingStatus" class="td-flex column">
              <el-select v-model="form.monitingStatus" placeholder="请选择"
                :disabled="proFormProps?.disabledAarr?.indexOf('监测状态') > -1">
                <el-option v-for="item in moniting_status" :key="item.value" :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="展厅负责人" prop="chargePerson" class="td-flex column">
              <el-input v-model="form.chargePerson" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="展厅所在位置" prop="houseAddr" class="td-flex column">
              <el-select v-model="form.houseAddr" placeholder="请选择" @change="selectChange">
                <el-option v-for="item in location_area_1" :key="item.value" :label="item.label"
                  :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="houseAddrDetail" label="具体位置" class="td-flex column">
              <el-input v-model="form.houseAddrDetail" placeholder="请输入" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="当前展厅" class="td-flex column">
              <div>
                <div class="m-btn_theme1 td-mb10 td-pointer" v-if="form.houseName">{{ form.houseName }}展览</div>
                <!-- <div>
                  您可以通过"<span class="i-link td-pointer">展览信息管理</span>"设置本展厅展览信息
                </div> -->
                <div>
                  您可以通过"<span class="i-link td-pointer"
                    @click="$router.push('/displayCabinet')">展柜信息管理</span>"设置此展厅所有的展柜
                </div>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="展厅平面图" prop="houseGraph">
              <div class="td-ml10 td-font_tip">
                您可以上传多张图片，若您开通了监测预警与评估子系统，请务必及时补充展品平面图
              </div>
            </el-form-item>
            <div class="td-flex">
              <div v-if="form.houseGraph" class="td-flex">
                <div v-for="(v, i) in form.houseGraph?.split(',')" :key="i" style="position: relative;">
                  <el-image :src="getPic(v)" fit="cover" :preview-src-list="[getPic(v)]"
                    style="width: 120px; height: 120px" class="td-mr10" />
                  <el-icon style="position: absolute;right: 0;" class="td-pointer" @click="onRemove(i)">
                    <Delete />
                  </el-icon>
                </div>
              </div>

              <div class="td-flex">
                <el-upload ref="uploadrefs" accept=".jpg, .png" :action="`${$url}/auth/help/file`" :headers="headers"
                  class="upload-demo" :limit="limit" :multiple="true" :on-preview="handlePreview"
                  :on-remove="handleRemove" :on-success="onSuccess" :before-upload="beforeUpload"
                  :show-file-list="false">
                  <div class="td-flex i-upload_box column center">
                    <div class="i-upload_add td-mb20"></div>
                    <div class="i-upload_txt">上传图片</div>
                  </div>
                </el-upload>
              </div>
            </div>
          </el-col>
          <el-col :span="24">
            <el-form-item label="展览藏品">
              <div class="i-link td-pointer" @click="onDownload" v-if="proFormProps.title === '编辑'">下载当前展厅藏品信息</div>
            </el-form-item>
            <el-table class="td-mt20" :data="additionalList" border>
              <el-table-column label="展柜编号" prop="cabinetId" show-overflow-tooltip />
              <el-table-column label="藏品编号名称" prop="relicId" show-overflow-tooltip />
              <el-table-column label="藏品编号" prop="relicNo" show-overflow-tooltip />
              <el-table-column label="藏品名称" prop="relicName" show-overflow-tooltip />
            </el-table>
          </el-col>
        </el-row>
      </el-form>
      <div class="td-flex center td-mt40">
        <el-button class="button-c-sure" v-show="!proFormProps.isView" type="primary"
          @click="handleSubmit">确定</el-button>
        <!-- <div class="i-button_cancel td-ml10" @click="close">取消</div> -->
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ElMessage } from 'element-plus';
import {
  createIdExhibitionHall,
  getExhibitionHallRelics
} from '@/api/artifact/exhibitionHall';
import {
  exhibitionHallRelicExport
} from '@/api/artifact/file';
import { reactive } from 'vue';
import { getToken } from '@/utils/auth';
const headers = ref({ Authorization: 'Bearer ' + getToken() });
const { proxy } = getCurrentInstance();
const { exhibition_hall_type, moniting_status, location_area_1 } =
  proxy.useDict('exhibition_hall_type', 'moniting_status', 'location_area_1');
const fileUrlList = reactive([]);
const limit = ref(8);
const houseTypeDic = ref([
  { label: '固定展厅', value: 1 },
  { label: '临时展厅', value: 0 }
]);
const proFormVisible = ref(false);
const formRef = ref(null);
const additionalList = reactive([]);
const additionaChooselList = reactive([]);
const form = ref({
  houseId: '',
  houseName: '',
  chargePerson: '',
  monitingStatus: '',
  houseType: '',
  houseArea: '',
  houseAddr: '',
  houseAddrDetail: '',
  houseWidth: '',
  houseLength: '',
  houseGraph: ''
});
const uploadFileUrl = ref(
  import.meta.env.VITE_APP_BASE_API + '/auth/help/file'
); // 上传文件服务器地址

const rules = reactive({
  houseId: [{ required: true, trigger: 'blur', message: '请输入' }],
  houseName: [{ required: true, trigger: 'change', message: '请输入' }],
  houseType: [{ required: true, trigger: 'blur', message: '请输入' }],
  houseArea: [{ required: true, trigger: 'blur', message: '请输入' }]
});
const fileAll = reactive([]);
const uploadrefs = ref();

const proFormProps = ref({
  isView: false,
  title: '',
  row: {}
});

const onDownload = v => {
  exhibitionHallRelicExport({ houseId: form.value.houseId })
};
const getPic = v => {
  return import.meta.env.VITE_APP_FILES_API + v;
};
const previewSrcList = (v) => {
  const arr = v?.split(',')?.map(item => {
    return getPic(item)
  })
  return arr
}
const close = () => {
  //   formRef.value?.resetFields();
  reset();
  proFormProps.value = {
    isView: false,
    title: '',
    row: {}
  };
  uploadrefs.value.clearFiles();
  fileUrlList.length = 0;
  proFormVisible.value = false;
};
const reset = () => {
  form.value = {
    houseId: '',
    houseName: '',
    chargePerson: '',
    monitingStatus: '',
    houseType: '',
    houseArea: '',
    houseAddr: '',
    houseAddrDetail: '',
    houseWidth: '',
    houseLength: '',
    houseGraph: ''
  };
};
const selectChange = (j, k) => {
  const index = location_area_1.value.findIndex(v => j == v.value);
  form.value.houseAddrDic = location_area_1.value[index].label;
};
const handleSubmit = () => {
  formRef.value.validate(async valid => {
    if (!valid) return;
    try {
      await proFormProps.value.api(form.value);
      ElMessage.success({ message: `${proFormProps.value.title}成功` });
      proFormProps.value.getTableList();
      proFormVisible.value = false;
    } catch (error) {
      console.log(error);
    }
  });
};
const createId = async () => {
  const { data } = await createIdExhibitionHall();
  form.value.houseId = data.houseId;
};

const acceptParams = params => {
  proFormProps.value = params;
  if (params.title == '新增') {
    createId();
  } else {
    Object.keys(form.value).forEach(function (key) {
      form.value[key] = params.row[key];
    });
    getExhibitionHallRelics(form.value.houseId).then(res => {
      additionalList.length = 0;
      additionalList.push(...res.rows)
    })
  }
  proFormVisible.value = true;
};

const onSuccess = res => {
  // let file = {
  //   fileName: res,
  //   fileUrl: res
  // };
  fileUrlList.push(res.data.filePath);
  form.value.houseGraph = Object.values(fileUrlList).join(',') || '';
};

const onRemove = index => {
  const arr = form.value.houseGraph.split(',')
  arr.splice(index, 1)

  fileUrlList.length = 0;
  fileUrlList.push(...arr);
  form.value.houseGraph = Object.values(fileUrlList).join(',') || '';
};
const handleRemove = file => {
  let removeUrl = file.response;
  let arr = Object.values(fileUrlList);
  removeUrl &&
    arr?.forEach((m, ind, array) => {
      if (removeUrl == m) {
        array.splice(ind, 1);
      }
    });
  fileUrlList.length = 0;
  fileUrlList.push(...arr);
  form.value.houseGraph = Object.values(fileUrlList).join(',') || '';
};
const beforeUpload = file => {
  const fileSuffix = file.name.substring(file.name.lastIndexOf('.') + 1);
  const whiteList = ['jpg', 'png'];
  if (whiteList.indexOf(fileSuffix) === -1) {
    proxy.$modal.msgError('上传文件只能是 jpg、png格式');
    return false;
  }
  const isLtM = file.size / 1024 / 1024 < 5;
  if (!isLtM) {
    proxy.$modal.msgError('上传文件大小不能超过 5MB');
    return false;
  }
};
const handlePreview = file => {
  if (file.url) {
    window.open(file.url);
  }
};
defineExpose({
  acceptParams
});
</script>
<style lang="scss" scoped>
.i-link {
  color: #29d;
  text-decoration: underline;
}

.i-upload_box {
  width: 120px;
  height: 120px;
  background: #F8F9F4;
  border-radius: 2px;
  border: 1px dashed #5E9387;

  .i-upload_add {
    width: 20px;
    height: 20px;
    background: url('@/assets/images/icon/icon-add.png') no-repeat;
  }

  .i-upload_txt {
    font-family: Source Han Serif CN, Source Han Serif CN;
    font-weight: 400;
    font-size: 16px;
    color: #064235;
    line-height: 23px;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }
}

.m-btn_theme1 {
  // width: 152px;
  height: 40px;
  background: #38675C;
  border-radius: 2px 2px 2px 2px;

  font-family: Source Han Serif CN, Source Han Serif CN;
  font-weight: 400;
  font-size: 16px;
  color: #FFFFFF;
  line-height: 40px;
  text-align: center;
  font-style: normal;
  text-transform: none;
}

:deep(.el-input .el-input-group__prepend) {
  box-shadow: 1px 0 0 0 var(--el-input-border-color) inset, 0 1px 0 0 var(--el-input-border-color) inset, 0 -1px 0 0 var(--el-input-border-color) inset;
  background-color: transparent !important;
}
</style>
