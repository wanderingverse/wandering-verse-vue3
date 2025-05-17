import axios from 'axios'

const request = axios.create({
    baseURL: '/api', timeout: 10000
})

// 请求拦截器：添加时间戳，防止缓存
request.interceptors.request.use(config => {
    const noCacheParam = `_t=${Date.now()}`
    if (config.method === 'get') {
        const hasParams = config.url.includes('?')
        config.url += hasParams ? `&${noCacheParam}` : `?${noCacheParam}`
    }
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截器：统一处理错误码
request.interceptors.response.use(response => {
    if (response.data.code !== 200) {
        console.warn('接口返回异常：', response.data.msg)
    }
    return response
}, error => {
    console.error('网络或服务器错误：', error)
    return Promise.reject(error)
})

export default request
