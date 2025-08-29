<script setup>
import {NFlex, NResult} from "naive-ui";
import {GOLDEN_RATIO} from "@/config/CommonConfig.js";
import {reactive} from "vue";

const resultValue = reactive({
    visible: true,
    description: "页面不存在"
})
</script>

<template>
    <n-flex :style="`height: ${GOLDEN_RATIO}vh`" align="center" justify="center">
        <n-result v-if="resultValue.visible" :description="resultValue.description" status="404"
                  title="404 资源不存在"/>
    </n-flex>
</template>

<style scoped>

</style>