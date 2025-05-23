import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";

// 全局样式
import "./styles/global.css"

const app = createApp(App)
app.use(router)
app.mount("#app")