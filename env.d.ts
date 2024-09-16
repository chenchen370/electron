/// <reference types="vite/client" />

// 类型声明
export declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent;
  export default component;
}

declare module "*.mjs";

