<!--查询生活状态-->
<script setup>
import {h, onMounted, ref} from 'vue'
import {NButton, NCascader, useDialog} from "naive-ui";
import {fetchLivingStateList} from "@/api/LivingState.js";
import {useLivingStateStore} from "@/stores/livingState.js";
import {useEventListener} from "@/events/EventListener.js";
import {DeleteOutlined} from "@vicons/antd"

const options = ref([])
const livingStateStore = useLivingStateStore();
const dialog = useDialog();
const transformToCascaderOptions = (data) => {
    if (!Array.isArray(data)) return [];
    return data.map(item => {
        const children = item.children && item.children.length > 0 ? transformToCascaderOptions(item.children) : null;
        return {
            value: item.content.id,
            label: item.content.livingStateName,
            ...(children ? {children: children} : {}),
        }
    })
}

// 获取列表项
const getLivingStateList = async () => {
    const res = await fetchLivingStateList();
    options.value = transformToCascaderOptions(res.data)
}

// 选中条目时回调，value为选中的条目列表数组
const handleChange = (value) => {
    livingStateStore.set(value)
}

const renderPrefix = (props) => {
    const option = props.option;
    const checked = props.checked;
    if (checked) {
        return h(
                NButton,
                {circle: true, type: 'error', size: "tiny", onClick: () => handleDelete(option)},
                {
                    icon: () => h(DeleteOutlined)
                }
        );
    }
}
// 点击删除按钮后回调，删除指定的条目
const handleDelete = async (data) => {
    const title = "删除 " + data.label;
    const content = "确定要" + title + " 吗？";
    dialog.warning({
        draggable: true,
        title: title,
        content: content,
        positiveText: "确定",
        negativeText: "取消",
        onPositiveClick: async () => {
            // todo 删除 value=id
            // 更新列表
            await getLivingStateList()
        },
        onNegativeClick: () => {
        },
    })
}
onMounted(() => {
    getLivingStateList()
})
useEventListener("updateLivingStateList", getLivingStateList)
</script>

<template>
    <n-cascader :check-strategy="'child'"
                :expand-trigger="'hover'"
                :filterable="true"
                :options="options"
                :render-prefix="renderPrefix"
                :show-path="false"
                clearable
                placeholder="请选择"
                @update-value="handleChange">
        <template #empty>
            <p>空列表</p>
        </template>
        <template #not-found>
            <p>无匹配项</p>
        </template>
    </n-cascader>
</template>

<style scoped>

</style>