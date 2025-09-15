<!--轮播图-->
<script setup>
import {NCarousel, NCarouselItem} from "naive-ui";
import {fetchRandomImage} from "@/api/Resource.js";
import {onMounted, ref} from "vue";


const randomImageList = ref([]);
const initRandomImage = async () => {
    for (let i = 0; i < 4; i++) {
        const randomImage = await fetchRandomImage();
        randomImageList.value.push(randomImage);
    }
}
onMounted(() => {
    initRandomImage();
})
</script>

<template>
    <n-carousel v-if="randomImageList.length" class="carousel">
        <n-carousel-item v-for="(randomImage,index) in randomImageList" :key="index">
            <img :src="randomImage"
                 alt=""
                 class="carousel-img"/>
        </n-carousel-item>
    </n-carousel>
</template>

<style scoped>
.carousel {
    width: 100%;
    height: 100%;
}

.carousel-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>