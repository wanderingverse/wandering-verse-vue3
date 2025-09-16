<script setup>
import {NFlex, NResult} from "naive-ui";
import {GOLDEN_RATIO} from "@/config/CommonConfig.js";
import {useResultPageStore} from "@/stores/ResultPage.js";

const resultPageStore = useResultPageStore();

</script>

<template>
    <n-flex v-if="resultPageStore.visible" :style="`height: ${GOLDEN_RATIO}vh`" align="center" justify="center">
        <n-result :description="resultPageStore.description"
                  :status=resultPageStore.httpStatus.toString()
                  :title="resultPageStore.title"/>
    </n-flex>
    <slot v-else></slot>
</template>

<style scoped>
</style>