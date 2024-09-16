<template>
  <div class="app-container">
    <div class="td-flex justify-between m-box_top">
      <div class="m-left td-flex ">
        <img :src="logo" class="m-logo" />
<!--        <div class="td-flex td-ml60 items-center">-->
<!--         <div class="i-btn">全省共享藏品库</div>-->
<!--         <div class="i-btn">我的网盘</div>-->
<!--         <div class="i-btn">综合管理</div>-->
<!--        </div>-->
      </div>
      <div class="m-right td-flex items-center">

        <el-button style="background: transparent" type="primary" @click="goCatalogue">

          <el-icon size="20"><HomeFilled/></el-icon>
          <!--          <el-image :src="back" mode="aspectFill" style="width:25px; height: 25px"/>-->

        </el-button>
        <div class="avatar-wrapper">
          <el-avatar :size="36" :src=" userStore.avatar.includes('http') ? userStore.avatar :  avat" />
        </div>
        <div class="name-role">
          <span class="name"> {{userStore.name}}</span>
          <span class="role">{{ userStore.roles[0]?.roleName }}</span>
        </div>

<!--        <div class="m-avatar td-flex center">-->
<!--          <img :src="userStore.avatar" class="user-avatar" />-->
<!--        </div>-->
<!--        <div class="td-ml10">-->
<!--          <div class="i-txt1 td-mb4">{{ state.user.userName }}</div>-->
<!--          <div class="i-txt2">{{ state.roleGroup }}</div>-->
<!--        </div>-->
      </div>
    </div>

    <tags-view v-if="needTagsView" />
  </div>
</template>

<script setup>
import { getUserProfile } from '@/api/system/user';
import logo from '@/assets/images/demo-logo.png';
import back from "@/assets/images/back.png"
import useUserStore from '@/store/modules/user';
import { TagsView } from '@/layout/components/index';
import useSettingsStore from '@/store/modules/settings';

const settingsStore = useSettingsStore()
const needTagsView = computed(() => settingsStore.tagsView);
const userStore = useUserStore();
const activeTab = ref('userinfo');
const state = reactive({
  user: {},
  roleGroup: {},
  postGroup: {}
});

function getUser() {
  getUserProfile().then(response => {
    state.user = response.data;
    state.roleGroup = response.roleGroup;
    state.postGroup = response.postGroup;
  });
}

getUser();

const router = useRouter()
function goCatalogue() {
  router.push("/index")
}

const avat = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
</script>
<style lang="scss" scoped>
.app-container {
  background: #39685d;
  .m-logo {
    width: 200px;
    height: 45px;
    transform: scale(.9);
  }
  .m-box_top {
    padding: 0 46px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    //padding: 15px 0;
    height: 58px;
  }
  .m-avatar {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: #fde8ce;
  }
  .i-txt1 {
    font-size: 16px;
    color: #fff;
  }
  .i-txt2 {
    font-size: 14px;
    color: #e5ce0c;
  }
  .i-btn{
   font-size: 16px;
   color: #fde8ce;
   margin: 0 20px;
   line-height: 45px;
   cursor: pointer;
   &.current{
      background: url('@/assets/images/btn-left_bg.png') left top no-repeat,url('@/assets/images/btn-right_bg.png') right top no-repeat;
      color: #fff;
      background-position:  1% 40%,  99% 40%;
      padding: 0 22px;
   }
  }
}

  .avatar-wrapper {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    //margin-top: 5px;
    position: relative;

    .user-avatar {
      cursor: pointer;
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }

    i {
      cursor: pointer;
      position: absolute;
      right: -20px;
      top: 25px;
      font-size: 12px;
    }
  }

  .name-role {
    height: 42px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    margin-left: 10px;
    .name {
      font-family: Source Han Serif CN, Source Han Serif CN;
      font-weight: 400;
      font-size: 12px;
      color: #FFFFFF;
      line-height: 14px;
      text-align: left;
      font-style: normal;
      text-transform: none;
      margin-bottom: 5px;
    }
    .role {
      font-family: Source Han Serif CN, Source Han Serif CN;
      font-weight: 400;
      font-size: 12px !important;
      color: #FFDE00;
      line-height: 12px;
      text-align: left;
      font-style: normal;
      text-transform: none;
    }
  }
</style>
