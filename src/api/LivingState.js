import request from "@/utils/request"

/**
 * 获取生活状态列表
 * @param params
 * @returns {*}
 */
export function fetchLivingStateList(params) {
    return request({
        url: "/living-state/list", method: "get", params
    })
}


/**
 * 添加生活状态
 * @param params
 * @returns {*}
 */
export function addLivingState(params) {
    return request({
        url: "/living-state/add", method: "post", data: params
    })
}
