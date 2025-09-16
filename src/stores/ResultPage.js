import {HTTP_STATUS} from "@/config/HttpConfig.js";
import {defineStore} from "pinia";


export const useResultPageStore = defineStore('resultPage', {
    state: () => ({
        visible: false,
        title: "",
        description: "",
        httpStatus: HTTP_STATUS.NOT_FOUND,
    }),
    actions: {
        
        /**
         * 显示结果页面
         * @param {string} title 标题
         * @param {string} description 内容描述
         * @param {number} httpStatus http 状态码
         */
        show(title, description, httpStatus) {
            this.visible = true;
            this.title = title;
            this.description = description;
            this.httpStatus = httpStatus;
        },
        hide() {
            this.visible = false;
            this.title = "";
            this.description = "";
            this.httpStatus = null;
        }
    }
})