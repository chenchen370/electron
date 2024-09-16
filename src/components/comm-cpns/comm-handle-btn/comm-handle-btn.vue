<template>
  <el-button v-hasPermi="per" class="handle-button" @click="handleClick" :border="false" type="primary" :style="{
    border: `${wrapBorder} !important`,
    backgroundColor: warpBackgroundColor,
    padding: warpPadding
  }" :disabled="disabled">
    <template v-if="iconName">
      <el-icon size="14" color="#38675C">
        <Component :is="iconName" />
      </el-icon>
    </template>

    <template v-if="imgName">
      <img :src="imgInfo[imgName]" alt="" />
    </template>
    <span :style="{
      color: contFontColor
    }">{{ title }}</span>
  </el-button>
</template>

<script setup>
import add from '@/assets/images/handle-btn-icon/add.png'
import edit from '@/assets/images/handle-btn-icon/edit.png'
import remove from '@/assets/images/handle-btn-icon/remove.png'
import imp from '@/assets/images/handle-btn-icon/import.png'
import exp from '@/assets/images/handle-btn-icon/export.png'

defineProps({
  wrapBorder: {
    type: String,
    default: '1px solid #AEC2BD'
  },
  warpBackgroundColor: {
    type: String,
    default: '#F8F9F4'
  },
  warpPadding: {
    type: String,
    default: ''
  },
  contFontColor: {
    type: String,
    default: '#064235'
  },

  title: {
    type: String,
    default: '新增'
  },
  imgName: {
    type: String,
    default: '' // add | edit | remove | imp | exp
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
  add,
  edit,
  remove,
  imp,
  exp
}

const emit = defineEmits(['handleClick'])

function handleClick() {
  emit('handleClick')
}
</script>

<style scoped lang="scss">
.handle-button {
  height: 32px;
  //background: #f8f9f4;
  border-radius: 2px;
  // padding: 5px 14px;
  //--el-button-disabled-text-color: #fff !important;
  //--el-button-disabled-bg-color: red !important;
  cursor: pointer !important;

  &.is-disabled {
    background: rgba(107, 102, 102, 0.1);
    border: none;
    // padding: 6px 14px;
  }

  img {
    width: 22px;
    height: 22px;
    margin-right: 12px;
  }

  span {
    font-family:
      Source Han Serif CN,
      Source Han Serif CN;
    font-weight: 400;
    font-size: 14px;
    // line-height: 24px;
    text-align: center;
    font-style: normal;
    text-transform: none;
  }
}
</style>
