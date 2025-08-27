<!--查询生活状态-->
<script setup>
import {onMounted, ref} from 'vue'
import {fetchLivingStateList} from "@/api/LivingState.js";
import {useLivingStateStore} from "@/stores/livingState.js";
import {useEventListener} from "@/events/EventListener.js";
import {Delete} from "@element-plus/icons-vue";
import {useDialogStore} from "@/stores/dialog.js";


const value = ref([])
const options = ref([])
const livingStateStore = useLivingStateStore();
const dialogStore = useDialogStore();
const transformToCascaderOptions = (data) => {
    if (!Array.isArray(data)) return [];
    return data.map(item => ({
        value: item.content.id,
        label: item.content.livingStateName,
        children: item.children ? transformToCascaderOptions(item.children) : []
    }))
}

// 获取列表项
const getLivingStateList = async () => {
    const res = await fetchLivingStateList();
    options.value = transformToCascaderOptions(res.data)
}

// 选中条目时回调，value为选中的条目列表数组
const handleChange = (value) => {
    livingStateStore.set(value[value.length - 1])
}
// 点击删除按钮后回调，删除指定的条目
const handleDelete = async (data) => {
    const title = "删除 " + data.label;
    const content = "确定要" + title + " 吗？";
    const result = await dialogStore.openDialog(title, content);
    if (result) {
        console.log("执行删除")
        // todo 删除 value=id
    }
    // 更新列表
    await getLivingStateList()
}

onMounted(() => {
    getLivingStateList()
})
useEventListener("updateLivingStateList", getLivingStateList)
</script>

<template>
    <el-cascader v-model="value"
                 :options="options"
                 :props="{expandTrigger:'hover',checkStrictly:true,checkOnClickNode:true,showPrefix:false}"
                 clearable
                 filterable
                 placeholder="请选择"
                 @change="handleChange">
        <template #empty>
            <div style="text-align: center;">无数据</div>
        </template>
        <template #default="{ node, data }">
            <div style="display: flex; align-items: center; width: 100%;">
                <el-icon color="red"
                         size="16"
                         style="cursor: pointer; margin-right: 5px;"
                         @click.stop="handleDelete(data)">
                    <Delete/>
                </el-icon>
                <span style="flex: 1;">{{ data.label }}</span>
            </div>
        </template>
    </el-cascader>
</template>

<style scoped>

</style>