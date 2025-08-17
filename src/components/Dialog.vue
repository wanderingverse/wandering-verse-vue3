<script setup>
import {useDialogStore} from "@/stores/dialog.js";


const dialogStore = useDialogStore();
</script>

<template>
    <el-dialog v-model=dialogStore.visible
               :title=dialogStore.title
               width="500">
        <span>{{ dialogStore.content }}</span>
        <template #footer>
            <el-button @click=dialogStore.setResult(false)>取消</el-button>
            <el-button type="primary" @click=dialogStore.setResult(true)>确认</el-button>
        </template>
    </el-dialog>
</template>
<style scoped>

</style>