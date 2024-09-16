<template>
  <el-button link v-hasPermi="per" @click="handleTableBtn" type="primary" :disabled="disabled">
    <template v-if="iconName">
      <el-icon size="20px" color="#38675C">
        <Component :is="iconName" />
      </el-icon>
    </template>

    <template v-if="imgName">
      <el-image style="width: 20px; height: 20px" :src="imgInfo[imgName]" alt="" />
    </template>
  </el-button>
</template>

<script setup>
import editChild from '@/assets/images/handle-btn-icon/edit-child.png'
import goChild from '@/assets/images/handle-btn-icon/go-child.png'

defineProps({
  title: {
    type: String,
    default: '新增'
  },
  imgName: {
    type: String,
    default: '' // editChild goChild
  },
  iconName: {
    type: String,
    default: ''
  },
  per: {
    type: Array,
    default: ['1']
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const imgInfo = {
  editChild,
  goChild
}

const emit = defineEmits(['handleTableBtn'])

function handleTableBtn() {
  emit('handleTableBtn')
}
</script>

<style scoped lang="scss"></style>
