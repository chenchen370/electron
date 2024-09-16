<template>
  <el-form class="by-form-dialog" ref="thingRef" :model="form" :rules="rules" label-width="auto" label-position="top" size="large">
    <el-row :gutter="75">
      <el-col :span="8">
        <el-form-item label="文件名称" prop="relicName">
          <el-input v-model="form.aaa" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="类别" prop="relicName">
          <el-input v-model="form.aaa" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="备注" prop="relicName">
          <el-input v-model="form.aaa" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <FileUpload />
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup>
const form = reactive({
  aaa: undefined
})
const rules = {}
</script>

<style lang="scss" scoped></style>
