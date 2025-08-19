import axios from "axios"

const service = axios.create({
    baseURL: "/api", timeout: 60000
})

// 请求拦截器
service.interceptors.request.use(config => {
    return config
})

// 响应拦截器
service.interceptors.response.use(
    response => response.data,
    error => {
        console.error("API Error:", error)
        return Promise.reject(error)
    })

export default service
