<script setup>
import {onMounted, reactive} from "vue";

const splashValue = reactive({
    visible: true
})


onMounted(() => {
    setTimeout(() => {
        splashValue.visible = false
    }, 1000);
})
</script>

<template>
    <div v-if=splashValue.visible class="fullScreen">
    </div>
    <slot v-else/>
</template>

<style scoped>
.fullScreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #1a1a1a;
}
</style>