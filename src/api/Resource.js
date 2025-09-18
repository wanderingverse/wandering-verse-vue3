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

/**
 * 上传图片文件
 */
export function uploadImage(file) {
    const form = new FormData();
    form.append("file", file);
    return request({
        url: "/upload-resource/image",
        method: "post",
        data: form
    })
}

/**
 * 获取随机一段文字
 */
export function fetchRandomText(params) {
    return request({url: "/random/text", method: "get", params})
}