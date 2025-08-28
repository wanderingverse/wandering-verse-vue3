<script setup>
import {NResult, NFlex} from "naive-ui";
import {useResultPageStore} from "@/stores/resultPage.js";
import {GOLDEN_RATIO} from "@/config/CommonConfig.js";


const resultPageStore = useResultPageStore();
</script>

<template>
    <n-flex justify="center" align="center" :style="`height: ${GOLDEN_RATIO}vh`">
        <n-result v-if="resultPageStore.visible" status="404" title="404 资源不存在" :description="resultPageStore.description"/>
    </n-flex>
</template>

<style scoped>

</style>