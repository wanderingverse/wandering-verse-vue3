import request from "@/utils/request.js";


/**
 * 获取随机图片
 */
export async function fetchRandomImage(params) {
    try {
        const res = await request({url: "/random/image", method: "get", params})
        return `data:image/jpeg;base64,${res.data.body}`
    } catch (error) {
        return ""
    }
}