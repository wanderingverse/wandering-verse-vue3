import emitter from "@/events/Emitter.js";
import {onMounted, onUnmounted} from "vue";

/**
 * 通用事件监听方法
 * @param eventName 事件名
 * @param callback 回调方法
 */
export function useEventListener(eventName, callback) {
    onMounted(() => emitter.on(eventName, callback))
    onUnmounted(() => emitter.off(eventName, callback))
}