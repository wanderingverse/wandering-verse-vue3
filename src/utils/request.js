import axios from "axios"
import {createDiscreteApi} from "naive-ui";
import {HTTP_STATUS} from "@/config/HttpConfig.js";
import {useResultPageStore} from "@/stores/ResultPage.js";

const discreteApi = createDiscreteApi(['message', 'loadingBar']);
const service = axios.create({
    baseURL: "/api", timeout: 10000
});

// 请求拦截器
service.interceptors.request.use(config => {
    const resultPageStore = useResultPageStore();
    if (resultPageStore.visible === true) {
        // 拦截请求
        return Promise.reject(new Error());
    }
    discreteApi.loadingBar.start();
    return config;
})

// 响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.code === 200) {
            const resultPageStore = useResultPageStore();
            discreteApi.loadingBar.finish();
            // 隐藏结果页
            resultPageStore.hide();
            return res;
        } else {
            discreteApi.loadingBar.error();
            discreteApi.message.warning(res.msg);
            return res.code;
        }
    },
    error => {
        console.log(error)
        const resultPageStore = useResultPageStore();
        if (!error.response) {
            resultPageStore.show("服务器连接超时", "生活总归带点荒谬", HTTP_STATUS.INTERNAL_SERVER_ERROR);
        } else {
            if (error.response.status === HTTP_STATUS.NOT_FOUND) {
                resultPageStore.show("资源不存在", "生活总归带点荒谬", HTTP_STATUS.NOT_FOUND)
            } else if (error.response.status === HTTP_STATUS.INTERNAL_SERVER_ERROR) {
                if (resultPageStore.visible === false) {
                    discreteApi.message.error("连不到服务器");
                    resultPageStore.show("连不到服务器", "生活总归带点荒谬", HTTP_STATUS.INTERNAL_SERVER_ERROR);
                }
            }
        }
        discreteApi.loadingBar.error();
        return Promise.reject(error)
    }
)
export default service
