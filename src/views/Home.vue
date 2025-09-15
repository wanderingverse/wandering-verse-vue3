<script setup>
import BlogPost from "@/components/BlogPost.vue";
import Carousel from "@/components/Carousel.vue";
import {ref} from "vue";
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import {MenuOutlined} from "@vicons/antd"
import emitter from "@/events/Emitter.js";
import {NButton, NIcon} from "naive-ui";


let showMenu = ref(false)
const switchMenuShowStatus = () => {
    showMenu = !showMenu
    emitter.emit("showMenu", showMenu)
}

</script>

<template>
    <div class="carousel-wrapper">
        <carousel/>
        <n-button class="drawer-button" @click="switchMenuShowStatus">
            <template #icon>
                <n-icon>
                    <MenuOutlined style="color: #ffffff;"/>
                </n-icon>
            </template>
        </n-button>
        <NavigationDrawer/>
    </div>
    <BlogPost/>
</template>

<style scoped>
.carousel-wrapper {
    position: relative;
}

.drawer-button {
    position: absolute;
    top: 24px;
    right: 24px;
    z-index: 1;
}
</style>