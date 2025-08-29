import axios from "axios"
import {createDiscreteApi} from "naive-ui";

const discreteApi = createDiscreteApi(['message', 'loadingBar'])
const service = axios.create({
    baseURL: "/api", timeout: 10000
})

// 请求拦截器
service.interceptors.request.use(config => {
    discreteApi.loadingBar.start()
    return config
})

// 响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.code === 200) {
            discreteApi.loadingBar.finish();
            return res;
        } else {
            discreteApi.loadingBar.error();
            if (res.code === 404) {
                // todo 展示 404
                return res.code;
            } else {
                discreteApi.message.warning(res.msg)
                return res.code;
            }
        }
    },
    error => {
        if (error.response != null && error.response.status === 404) {
            // todo 显示 404
        } else {
        }
        return Promise.reject(error)
    }
)
export default service
