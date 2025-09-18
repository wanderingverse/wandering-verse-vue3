<script setup>
import BlogPost from "@/components/BlogPost.vue";
import Carousel from "@/components/Carousel.vue";
import {onMounted, ref} from "vue";
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import {MenuOutlined} from "@vicons/antd"
import emitter from "@/events/Emitter.js";
import {NButton, NIcon, NSpace} from "naive-ui";
import {SITE_NAME} from "../config/CommonConfig.js";
import {fetchRandomText} from "@/api/Resource.js";


let showMenu = ref(false)
const switchMenuShowStatus = () => {
    showMenu = !showMenu
    emitter.emit("showMenu", showMenu)
}
const carouselDescriptionText = ref("")
const getRandomText = async () => {
    const res = await fetchRandomText();
    carouselDescriptionText.value = res.data;
}


onMounted(() => {
    getRandomText();
})
</script>

<template>
    <div class="carousel-wrapper">
        <carousel/>
        <n-space class="carousel-text" size="small" vertical>
            <p id="carousel-text-title">{{ SITE_NAME }}</p>
            <p id="carousel-text-description">{{ carouselDescriptionText }}</p>
        </n-space>
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

.carousel-text {
    position: absolute;
    top: 39%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    color: #ffffff;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.6);
    z-index: 1;
}

#carousel-text-title {
    font-size: 3rem;
    font-weight: 400;
    margin: 0;
}

#carousel-text-description {
    font-size: 1.2rem;
    font-weight: 200;
    margin: 0;
}
</style>