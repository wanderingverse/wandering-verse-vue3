<!--添加生活状态-->

<script setup>
import GetLivingState from "@/components/GetLivingState.vue";
import {onMounted, ref} from "vue";
import {addLivingState, fetchLivingStateList} from "@/api/LivingState.js";
import {useLivingStateStore} from "@/stores/LivingState.js";
import {HTTP_STATUS} from "@/config/HttpConfig.js";
import emitter from "@/events/Emitter.js";
import {NSelect} from "naive-ui";


const options = ref([])
const initOptions = (data) => {
    if (!Array.isArray(data)) return [];
    return data.map(item => ({
        label: item.content.livingStateName,
        value: item.id
    }))
}
const getLivingStateList = async () => {
    const params = {
        id: livingStateStore.id,
        mode: 2
    }
    const res = await fetchLivingStateList(params);
    options.value = initOptions(res.data);
}
const livingStateStore = useLivingStateStore();
const addLivingStateParams = {
    livingStateName: "",
    parentId: "",
}
const handleSelect = async (id, item) => {
    // 判断输入项是否已存在
    const exists = options.value.some((o) => o.value.toLowerCase() === id.toLowerCase())
    if (!exists) {
        // 没有匹配结果，调用插入接口
        addLivingStateParams.livingStateName = item.label
        addLivingStateParams.parentId = livingStateStore.id || 0;
        const res = await addLivingState(addLivingStateParams)
        if (res.code === HTTP_STATUS.OK) {
            // 更新列表
            await getLivingStateList();
            emitter.emit("updateLivingStateList")
        }
    }
}
onMounted(() => {
    getLivingStateList();
})
</script>

<template>
    <div style="display: flex;align-items: center;gap: 20px;">
        <GetLivingState/>
        <n-select :options="options"
                  filterable
                  tag
                  @update-value="handleSelect"/>
    </div>
</template>

<style scoped>

</style>