import axios from "axios"
import {createDiscreteApi} from "naive-ui";
import {useResultPageStore} from "@/stores/resultPage.js";

const discreteApi = createDiscreteApi(['message'])


const service = axios.create({
    baseURL: "/api", timeout: 10000
})

// 请求拦截器
service.interceptors.request.use(config => {
    useResultPageStore().hide()
    return config
})

// 响应拦截器
service.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.code === 200) {
            return res;
        } else if (res.code === 404) {
            useResultPageStore().show()
        } else {
            discreteApi.message.warning(res.msg)
            return res.code;
        }
    },
    error => {
        if (error.response.status === 404) {
            useResultPageStore().show()
        } else {
            discreteApi.message.error("请求失败")
        }
        return Promise.reject(error)
    })
export default service
