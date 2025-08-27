import axios from "axios"
import {createDiscreteApi} from "naive-ui";


const discreteApi = createDiscreteApi(['message'])
const service = axios.create({
    baseURL: "/api", timeout: 10000
})

// 请求拦截器
service.interceptors.request.use(config => {
    return config
})

// 响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.code === 200) {
            return res;
        } else {
            discreteApi.message.warning(res.msg)
            return res.code;
        }
    },
    error => {
        discreteApi.message.error("请求失败")
        return Promise.reject(error)
    })
export default service
