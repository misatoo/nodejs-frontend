import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/index";
import "./router/routeGuards";
import vuex from "./store/index";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import components from "./components/index";

const app = createApp(App);
app.use(router);
app.use(vuex);
app.use(Antd);
app.use(components);
app.mount("#app");
