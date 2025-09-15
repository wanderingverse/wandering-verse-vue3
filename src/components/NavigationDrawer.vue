<!--抽屉式导航菜单-->
<script setup>
import {NDivider, NDrawer} from "naive-ui";
import AppFooter from "@/components/AppFooter.vue";
import {ref} from "vue";
import {useEventListener} from "@/events/EventListener.js";

const showMenu = ref(false);

useEventListener("showMenu", (p) => {
    showMenu.value = true;
})
</script>

<template>
    <n-drawer v-model:show="showMenu" placement="right">
        <n-divider/>
        <AppFooter/>
    </n-drawer>
</template>

<style scoped>

</style>