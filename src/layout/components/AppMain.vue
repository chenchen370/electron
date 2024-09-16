<template>
  <section class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="tagsViewStore.cachedViews">
          <div v-if="!route.meta.link" :key="route.path" class="mn-box_flow">
            <component :is="Component" />
          </div>
        </keep-alive>
      </transition>
    </router-view>
    <iframe-toggle />
  </section>
</template>

<script setup>
import iframeToggle from './IframeToggle/index';
import useTagsViewStore from '@/store/modules/tagsView';

const tagsViewStore = useTagsViewStore();
</script>

<style lang="scss" scoped>
.app-main {
  /* 50= navbar  50  */
  // min-height: calc(100vh - 50px);
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
  // background-color: var(--el-bg-color-page);
  padding: 12px 6px 26px 12px;
  display: flex;
  flex-direction: column;
  flex: 1;
  background: #f8f9f4 url('@/assets/images/icon-jiao-rb.png') right bottom no-repeat;
  background-size: 20px 20px;
  background-position: 99% 99%;
  .mn-box_flow{
    height: 100%;
    overflow: auto;
    padding-right: 6px;
  }
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    // min-height: calc(100vh - 84px);
  }

  .fixed-header + .app-main {
    padding-top: 84px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 6px;
  }
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background-color: #c0c0c0;
  border-radius: 3px;
}
</style>
