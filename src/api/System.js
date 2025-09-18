import request from "@/utils/request.js";


/**
 * 获取当前登录系统的用户信息
 * @returns {*}
 */
export function fetchCurrentSystemUser() {
    return request({
        url: "/system/user", method: "get"
    })
}