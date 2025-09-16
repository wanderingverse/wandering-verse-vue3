<script setup>
import {NDialogProvider, NLoadingBarProvider, NScrollbar} from "naive-ui";
import ResultPage from "@/components/ResultPage.vue";
</script>

<template>
    <n-dialog-provider>
        <n-loading-bar-provider>
            <n-scrollbar trigger="hover">
                <ResultPage>
                    <router-view></router-view>
                </ResultPage>
            </n-scrollbar>
        </n-loading-bar-provider>
    </n-dialog-provider>
</template>

<style scoped>

</style>