import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import createAutoImport from './auto-import'
import createSvgIcon from './svg-icon'
import createCompression from './compression'
import createSetupExtend from './setup-extend'
import { codeInspectorPlugin } from 'code-inspector-plugin'

export default function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins = [vue(), vueJsx(), UnoCSS()]
  vitePlugins.push(createAutoImport())
  vitePlugins.push(createSetupExtend())
  vitePlugins.push(createSvgIcon(isBuild))
  isBuild && vitePlugins.push(...createCompression(viteEnv))
  vitePlugins.push(
    codeInspectorPlugin({
      bundler: 'vite'
    })
  )
  return vitePlugins
}
