<!--添加生活状态-->

<script setup>
import GetLivingState from "@/components/GetLivingState.vue";
import {onMounted, ref} from "vue";
import {addLivingState, fetchLivingStateList} from "@/api/LivingState.js";
import {useLivingStateStore} from "@/stores/livingState.js";
import {HTTP_STATUS} from "@/config/HttpConfig.js";
import emitter from "@/events/Emitter.js";

const input = ref('');
const options = ref([])
const initOptions = (data) => {
    if (!Array.isArray(data)) return [];
    return data.map(item => ({
        value: item.content.livingStateName,
    }))
}
const getLivingStateList = async () => {
    const params = {
        id: livingStateStore.id,
        mode: 2
    }
    const res = await fetchLivingStateList(params);
    options.value = initOptions(res.data)
}
const livingStateStore = useLivingStateStore();
const addLivingStateParams = {
    livingStateName: "",
    parentId: "",
}
const querySearch = async (queryString, cb) => {
    // 获取搜索项列表
    await getLivingStateList()
    // 过滤模糊搜索项
    let results = options.value.filter((item) => {
        return item.value.toLowerCase().includes(queryString.toLowerCase())
    })
    // 判断输入项是否已存在
    const exists = options.value.some((o) => o.value.toLowerCase() === queryString.toLowerCase())
    if (results.length === 0 || !exists) {
        results.push({value: queryString})
    }
    cb(results)
}

const handleSelect = async (item) => {
    // 判断输入项是否已存在
    const exists = options.value.some((o) => o.value.toLowerCase() === item.value.toLowerCase())
    if (!exists) {
        // 没有匹配结果，调用插入接口
        addLivingStateParams.livingStateName = item.value
        addLivingStateParams.parentId = livingStateStore.id || 0;
        const res = await addLivingState(addLivingStateParams)
        if (res.code === HTTP_STATUS.OK) {
            options.value.push({value: item.value})
            livingStateStore.clear()
            // 触发更新列表事件
            emitter.emit("updateLivingStateList")
        }
    }
}
onMounted(() => {
})
</script>

<template>
    <div style="display: flex;align-items: center;gap: 20px;">
        <GetLivingState/>
        <el-autocomplete
                v-model="input"
                :fetch-suggestions=querySearch
                :trigger-on-focus="false"
                clearable
                placeholder="请输入内容"
                @select="handleSelect"
        />
    </div>
</template>

<style scoped>

</style>