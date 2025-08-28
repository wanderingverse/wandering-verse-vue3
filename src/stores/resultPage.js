import {defineStore} from "pinia";

export const useResultPageStore = defineStore('resultPage', {
    state: () => ({
        visible: false,
        description: "生活总归带点荒谬",
    }),
    actions: {
        show() {
            this.visible = true
        },
        hide() {
            this.visible = false
        }
    },
})