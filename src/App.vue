<script setup>
import ResultPage from "@/components/ResultPage.vue";
import {NDialogProvider, NLoadingBarProvider} from "naive-ui";
</script>

<template>
    <n-dialog-provider>
        <n-loading-bar-provider>
            <router-view></router-view>
        </n-loading-bar-provider>
    </n-dialog-provider>
    <ResultPage/>
</template>

<style scoped></style>