<script setup>
import {NDialogProvider, NLoadingBarProvider, NScrollbar} from "naive-ui";
</script>

<template>
    <n-dialog-provider>
        <n-loading-bar-provider>
            <n-scrollbar trigger="hover">
                <router-view></router-view>
            </n-scrollbar>
        </n-loading-bar-provider>
    </n-dialog-provider>
</template>

<style scoped>

</style>