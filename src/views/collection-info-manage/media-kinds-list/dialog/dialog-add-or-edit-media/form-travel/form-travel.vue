<template>
  <el-form class="by-form-dialog" ref="thingRef" :model="form" :rules="rules" label-width="auto" label-position="top" size="large">
    <el-row :gutter="75">
      <el-col :span="8">
        <el-form-item label="著录出版时间" prop="relicName">
          <el-input v-model="form.aaa" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="出版机构及书名" prop="relicName">
          <el-input v-model="form.aaa" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="研究论著类型" prop="relicName">
          <el-input v-model="form.aaa" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="研究论著题名" prop="relicName">
          <el-input v-model="form.aaa" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="作者" prop="relicName">
          <el-input v-model="form.aaa" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="-" prop="relicName">
          <el-input v-model="form.aaa" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="研究论著情况" prop="relicName">
          <el-input v-model="form.aaa" />
        </el-form-item>
      </el-col>

      <el-col :span="8">
        <el-form-item label="研究论著主要内容" prop="relicName">
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
