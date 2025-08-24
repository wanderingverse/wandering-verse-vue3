<script setup>
import {onMounted, ref} from 'vue'
import {fetchBlogPostList} from "@/api/BlogPost.js";
import {fetchRandomImage} from "@/api/Resource.js";
import {useRouter} from "vue-router";

const blogPostList = ref([])
const getBlogPostList = async () => {
    const res = await fetchBlogPostList();
    blogPostList.value = res.data.records.map(post => ({
        ...post,
        image: "",
        loading: true
    }))
    blogPostList.value.forEach((post) => {
        fetchRandomImage({width: 260, height: 160})
                .then(img => {
                    post.image = img
                    post.loading = false
                })
    })
}
const router = useRouter()

const goToPost = (id) => {
    const url = router.resolve({name: "BlogPost", params: {id}})
    window.open(url.href, '_blank')
}

onMounted(() => {
    getBlogPostList()
})
</script>

<template>
    <el-space :fill=true :fill-ratio="0" :size="'large'" :wrap=true direction="horizontal">
        <el-skeleton v-for="(post,index) in blogPostList" :key="index" :loading="post.loading" animated>
            <template #template>
                <div style="width: 260px">
                    <el-skeleton-item style="width: 260px; height: 160px" variant="image"/>
                    <el-skeleton-item style="margin-top: 12px; font-size: 16px" variant="text"/>
                    <el-skeleton-item style="margin-top: 7px; font-size: 12px;width: 61.8%" variant="text"/>
                </div>
            </template>
            <template #default>
                <div style="width: 260px;cursor: pointer" @click="goToPost(post.id)">
                    <img :src="post.image"
                         alt=""
                         style="width: 260px; height: 160px;"/>
                    <el-link style="margin-top: 12px; font-size: 16px" type="default">{{ post.title }}</el-link>
                    <p style="margin-top: 7px; font-size: 12px;width: 61.8%">2025/05/24 12:21:32</p>
                </div>
            </template>
        </el-skeleton>
    </el-space>
</template>

<style scoped>
</style>