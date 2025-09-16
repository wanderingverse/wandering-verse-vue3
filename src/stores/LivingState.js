import {defineStore} from "pinia";

export const useLivingStateStore = defineStore("livingState", {
    state: () => ({
        id: "",
    }),
    actions: {
        // 更新方法
        set(val) {
            this.id = val
        },
        // 清空方法
        clear() {
            this.id = ""
        }
    }
})