<template>
  <div class="login">
    <div class="login-con">
      <div class="tabs-wrap">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-change="handleTabChange">
          <el-tab-pane v-for="(item, index) in tabList" :label="item.label" :name="item.name" :key="index"> </el-tab-pane>
        </el-tabs>
      </div>
      <div class="cpn-wrap">
        <cAccount v-show="activeName === '1'" />
        <cDDCode v-show="activeName === '2'" />
      </div>
    </div>
    <!--  底部  -->
    <!-- <div class="el-login-footer">
      <span>Copyright © 2018-2023 zhebo All Rights Reserved.</span>
    </div> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import cAccount from './c-account.vue'
import cDDCode from './c-dd-code.vue'
import Cookies from 'js-cookie'

const activeName = ref(Cookies.get('activeName') ?? '1')

const tabList = [
  {
    label: '账号密码',
    name: '1'
  },
  {
    label: '钉钉扫码',
    name: '2'
  }
]

function handleTabChange(name) {
  Cookies.set('activeName', name)
  activeName.value = name
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url('../../assets/images/login-bg.webp');
  background-size: cover;
}

.login-con {
  margin-top: -120px;
  width: 800px;
  background-image: url('../../assets/images/form.webp');
  background-size: contain;
  background-repeat: no-repeat;
}

.tabs-wrap {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 180px;
  box-sizing: border-box;
}
.cpn-wrap {
  height: 355px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
