<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <span v-if="item.redirect === 'noRedirect' || index == levelList.length - 1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
const route = useRoute();
const router = useRouter();
const levelList = ref([])

function getBreadcrumb() {
  // only show routes with meta.title
  let matched = route.matched.filter(item => item.meta && item.meta.title);
  // const first = matched[0]
  // 判断是否为首页
  // if (!isDashboard(first)) {
  //   matched = [{ path: '/index', meta: { title: '首页' } }].concat(matched)
  // }

  levelList.value = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
}
function isDashboard(route) {
  const name = route && route.name
  if (!name) {
    return false
  }
  return name.trim() === 'Index'
}
function handleLink(item) {
  const { redirect, path } = item
  if (redirect) {
    router.push(redirect)
    return
  }
  router.push(path)
}

watchEffect(() => {
  // if you go to the redirect page, do not update the breadcrumbs
  if (route.path.startsWith('/redirect/')) {
    return
  }
  getBreadcrumb()
})
getBreadcrumb();
</script>

<style lang='scss' scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  margin-left: 8px;
  font-family: Source Han Serif CN, Source Han Serif CN;
  font-weight: 600;
  font-size: 16px;
  line-height: 50px;
  color: #064235;
  text-align: left;
  font-style: normal;
  text-transform: none;
  .el-breadcrumb__separator {
    --el-text-color-placeholder: #064235 !important;
    //color: #064235;
  }
  .no-redirect {
    color: #064235;
    cursor: text;
  }
}
</style>
