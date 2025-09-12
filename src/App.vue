<script setup>
import {NDialogProvider, NLoadingBarProvider} from "naive-ui";
</script>

<template>
    <n-dialog-provider>
        <n-loading-bar-provider>
            <router-view></router-view>
        </n-loading-bar-provider>
    </n-dialog-provider>
</template>

<style scoped></style>