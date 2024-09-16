import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import createVitePlugins from './vite/plugins'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_ENV } = env
  return {
    // 部署生产环境和开发环境下的URL。
    // 默认情况下，vite 会假设你的应用是被部署在一个域名的根路径上
    // 例如 https://www.zhebo/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.zhebo/admin/，则设置 baseUrl 为 /admin/。
    base: VITE_APP_ENV === 'production' ? '/' : '/',
    plugins: createVitePlugins(env, command === 'build'),
    resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: {
        // 设置路径
        '~': path.resolve(__dirname, './'),
        // 设置别名
        '@': path.resolve(__dirname, './src')
      },
      // https://cn.vitejs.dev/config/#resolve-extensions
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
    },
    // vite 相关配置
    server: {
      port: 8074,
      host: true,
      open: false,
      proxy: {
        // https://cn.vitejs.dev/config/#server-proxy
        '/dev-api': {
          target: 'http://8.136.101.72:8080',
          changeOrigin: true,
          rewrite: p => p.replace(/^\/dev-api/, '')
        },
        // 线上环境
        '/prod-api': {
          target: 'http://8.136.101.72:8090',
          changeOrigin: true
          // rewrite: p => p.replace(/^\/prod-api/, '')
        }
      }
    },
    //fix:error:stdin>:7356:1: warning: "@charset" must be the first rule in the file
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: atRule => {
                if (atRule.name === 'charset') {
                  atRule.remove()
                }
              }
            }
          }
        ]
      }
    },
    build: {
      cssCodeSplit: true,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          // 最小化拆分包
          manualChunks: id => {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          },
          // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
          entryFileNames: 'js/[name].[hash].js',
          // 用于命名代码拆分时创建的共享块的输出命名
          chunkFileNames: 'js/[name].[hash].js',
          // 用于输出静态资源的命名，[ext]表示文件扩展名
          assetFileNames: '[ext]/[name].[hash].[ext]'
        }
      },
      // terserOptions: {
      //   compress: {
      //     // drop_console: true, // 打包去除console
      //     // drop_debugger: true, // 打包去除 debugger
      //     // pure_funcs: ["console.log"] //移除console
      //   }
      // },
      reportCompressedSize: false, // 关闭文件计算
      sourcemap: false // 关闭生成map文件 可以达到缩小打包体积 这个生产环境一定要关闭，不然打包的产物会很大
    }
  }
})
