<template>
  <div
    :class="{ 'has-logo': showLogo }"
    :style="{
      backgroundColor:
        sideTheme === 'theme-dark'
          ? variables.menuBackground
          : variables.menuLightBackground
    }"
  >
    <logo v-if="showLogo" :collapse="isCollapse" />

    <div class="m-item_name">{{ cache.session.get('sysName') }}</div>
    <el-scrollbar :class="sideTheme" wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="
          sideTheme === 'theme-dark'
            ? variables.menuBackground
            : variables.menuLightBackground
        "
        :text-color="
          sideTheme === 'theme-dark'
            ? variables.menuColor
            : variables.menuLightColor
        "
        :unique-opened="true"
        :active-text-color="theme"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="(route, index) in sidebarRouters"
          :key="route.path + index"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
    <div
      class="td-flex center"
      v-if="cache.session.get('sysName') == '监测预警管理'"
    >
      <el-button type="primary" @click="goGh">概览</el-button>
    </div>
  </div>
</template>

<script setup name="Sidebar">
import Logo from './Logo';
import SidebarItem from './SidebarItem';
import variables from '@/assets/styles/variables.module.scss';
import useAppStore from '@/store/modules/app';
import useSettingsStore from '@/store/modules/settings';
import usePermissionStore from '@/store/modules/permission';
import cache from '@/plugins/cache';


const route = useRoute();
const appStore = useAppStore();
const settingsStore = useSettingsStore();
const permissionStore = usePermissionStore();
const router = useRouter();
const sidebarRouters = computed(() => {
  if (!cache.session.get('sys')) {
    router.push({ path: '/' });
  }
  const sysRouter = permissionStore.sidebarRouters.filter(item => {
    // console.log(item.name, cache.session.get('sys'));
    return item.name && item.name === cache.session.get('sys');
  });
  return sysRouter?.[0]?.children || [];
});
const showLogo = computed(() => settingsStore.sidebarLogo);
const sideTheme = computed(() => settingsStore.sideTheme);
const theme = computed(() => settingsStore.theme);
const isCollapse = computed(() => !appStore.sidebar.opened);

const activeMenu = computed(() => {
  const { meta, path } = route;
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});
const goGh = () => {
  const { href } = router.resolve({
    path: '/visualPlatform'
  });
  window.open(href, '_blank');
};
</script>
<style lang="scss" scoped>
.m-item_name {
  height: 51px;
  font-size: 16px;
  font-weight: 550;
  font-style: oblique;
  color: #38675C;
  // text-align: center;
  line-height: 51px;
  padding-left: 16px;
  font-family: YouSheBiaoTiHei, YouSheBiaoTiHei;
  letter-spacing: 1px;
}
:deep(.el-scrollbar) {
  height: calc(100% - 51px) !important;
}
</style>
