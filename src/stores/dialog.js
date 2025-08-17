import {defineStore} from "pinia";

export const useDialogStore = defineStore("dialog", {
    state: () => ({
        visible: false,
        title: "",
        content: "",
        result: false,
    }),
    actions: {
        _resolve: null,

        /**
         * 初始化对话框
         * @param title 对话框标题
         * @param content 对话框内容
         */
        openDialog(title, content) {
            this.visible = true;
            this.title = title;
            this.content = content;
            this.result = false;

            return new Promise((resolve) => {
                this._resolve = resolve;
            });
        },
        setResult(result) {
            this.result = result;
            this.visible = false
            if (this._resolve) {
                this._resolve(result);
                this._resolve = null;
            }
        },
    },
});
