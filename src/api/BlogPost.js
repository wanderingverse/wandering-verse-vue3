import request from "@/utils/request"

/**
 * 获取博客文章列表
 * @param params
 * @returns {*}
 */
export function fetchBlogPostList(params) {
    return request({
        url: "/blog/post/list", method: "get", params
    })
}


/**
 * 添加博客文章
 * @param params
 * @returns {*}
 */
export function insertBlogPost(params) {
    return request({
        url: "/blog/post/add", method: "post", data: params
    })
}

/**
 * 获取博客详情
 */
export function fetchBlogPostDetail(params) {
    return request({
        url: "/blog/post/detail", method: "get", params
    })
}