import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";

// 有权限路由
const privateRoutes = [
  {
    path: "/",
    name: "layout",
    component: () => import("@/views/layout/index.vue"),
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import("@/views/pages/home/index.vue"),
      },
    ],
  },
];

// 无权限路由
export const publicRoutes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: "unknown",
    component: () => import("@/views/unknown/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...privateRoutes, ...publicRoutes],
});

export default router;
