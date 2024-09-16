<template>
  <div class="sys-page">
    <div class="user-info">
      <span class="name"> 用户： {{ state.user.userName }}</span>
      <div class="login-out" @click="logout">
        <el-icon size="16"><SwitchButton /></el-icon>
        <!--      <el-image :src="back" mode="aspectFill" style="width:25px; height: 25px"/>-->
        <span class="back-text">退出</span>
        <div class="line"></div>
      </div>
    </div>
    <div class="con">
      <div
        class="card"
        @click="linkTo(item)"
        v-for="item in sys"
        :key="item.name"
        shadow="hover"
      >
        <span class="no-copy">
          {{ item.meta.title }}
        </span>
      </div>
    </div>
  </div>
</template>
<script setup>
import usePermissionStore from '@/store/modules/permission'
import useTagsViewStore from '@/store/modules/tagsView'
import useUserStore from '@/store/modules/user'
import cache from '@/plugins/cache'
import { getUserProfile } from '@/api/system/user'
import { ElMessageBox } from 'element-plus'
import back from '@/assets/images/back.png'
import { SwitchButton } from '@element-plus/icons-vue'
const permissionStore = usePermissionStore()
const tagsViewStore = useTagsViewStore()
const sys = computed(() => permissionStore.addRoutes)
const router = useRouter()
tagsViewStore.delAllViews()
const linkTo = item => {
  cache.session.set('sys', item.name)
  cache.session.set('sysName', item.meta.title)

  // console.log(item.children[0]);
  router.push(`${item.children[0].path}`)
}

const state = reactive({
  user: {}
})

function getUser() {
  getUserProfile().then(response => {
    state.user = response.data
  })
}
getUser()

const userStore = useUserStore()
function logout() {
  ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      userStore.logOut().then(() => {
        location.href = '/index'
      })
    })
    .catch(() => {})
}
</script>
<style lang="scss" scoped>
.sys-page {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  // background-image: url('../assets/images/login-background4.jpg');
  background-image: url('../assets/images/system-choose_bg.jpg');
  // background-size: cover;
  // opacity: 0.2;
  background-size: 100% 100%;
  .con {
    // width: 800px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    // margin-top: -120px;
    // border-radius: 6px;
    // background: #ffffff;
    // padding: 25px 25px 5px 25px;
    .card {
      //border: 1px solid red;
      cursor: pointer;
      margin: 0 49px;
      width: 126px;
      height: 339px;
      background: url('../assets/images/system-choose_item_2.png') no-repeat
        100% 100%;
      background-size: 100% 100%;
      writing-mode: tb;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      letter-spacing: 0.3em;
      transition: all linear 0.2s;
      //font-weight: bold;
      font-family: 'Baoli-3';
      text-shadow: 3px 3px 3px rgba(0, 0, 0, 0.6);
      color: #fff;
      font-size: 25px;

      span {
        margin-left: 40px;
      }

      &:hover {
        background: url('../assets/images/system-choose_item_2_hover.png')
          no-repeat 100% 100%;
        background-size: 100% 100%;
        //color: #39685d;
        transform: scale(1.1);
      }
    }
  }

  .user-info {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    color: #000;
    height: 36px;
    //border: 1px solid red;
    .name {
      margin-right: 5px;

      font-size: 14px !important;
      line-height: 14px !important;
    }
    .login-out {
      padding: 0 10px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;

      &:hover {
        background: #74958d;
        border-radius: 5px;
        color: #fff;
        .line {
          height: 0px;
        }
      }
      .back-text {
        font-size: 13px !important;
        line-height: 13px !important;
      }
      .el-icon {
        margin-right: 5px;
      }
      //border-bottom: 1px solid #39685d ;
      .line {
        position: absolute;
        bottom: 5px;
        height: 1px;
        width: calc(100% - 20px);
        background: #000;
      }
    }
  }
}
</style>
