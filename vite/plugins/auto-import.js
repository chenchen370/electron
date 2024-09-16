import autoImport from 'unplugin-auto-import/vite';

export default function createAutoImport() {
  return autoImport({
    imports: ['vue', 'vue-router', 'pinia', '@vueuse/head', '@vueuse/core'],
    dts: 'src/auto-imports.d.ts',
    vueTemplate: true,
  });
}
