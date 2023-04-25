import router, { publicRoutes } from "@/router/index";
import store from "@/store";

// 路由白名单（不需要鉴权就可以访问的页面）
const whiteList = publicRoutes.map(route => route.name);

// 前置路由守卫
router.beforeEach(async (to, from, next) => {
  console.log("1111111111111");
  const token = store.getters.token;
  if (token) {
    // 如果用户已登录
    to.name === "login" ? next("/") : next();
  } else {
    // 如果用户未登录
    if (whiteList.includes(to.name)) {
      next(); // 如果页面不需要登录或者页面在白名单中，放行
    } else {
      next("/login"); // 否则跳转到登录页
    }
  }
});

router.afterEach((to, from) => {
  console.log("afterEach");
});

router.onError(error => {
  console.log("router.onError", error);
});
