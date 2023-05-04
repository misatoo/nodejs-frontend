import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import defineOptions from "unplugin-vue-define-options/vite";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // 项目别名，可以挂多个（使用 vite-aliases 插件更方便）
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      // 字符串简写写法：http://localhost:5173/api -> http://localhost:8000/api
      "/api": "http://10.211.55.4:8080",
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import './src/styles/variables.scss';`,
      },
    },
  },
  plugins: [vue(), defineOptions()],
});
