<script setup>
import {onMounted, ref} from 'vue'
import {fetchBlogPostList} from "@/api/BlogPost.js";
import {fetchRandomImage} from "@/api/Resource.js";
import {useRouter} from "vue-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import {NSkeleton, NImage, NCard, NH3, NP, NF, NFlex} from "naive-ui";


const blogPostList = ref([])
const getBlogPostList = async () => {
    dayjs.extend(relativeTime);
    dayjs.locale('zh-cn');
    const res = await fetchBlogPostList();
    blogPostList.value = res.data.records.map(post => ({
        ...post,
        createTime: dayjs(post.createTime).format("YYYY-MM-DD HH:mm:ss"),
        relativeTime: dayjs(post.createTime).fromNow(),
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


/**
 * 跳转到内容详情
 * @param id
 */
const goToPost = (id) => {
    const url = router.resolve({name: "BlogPost", params: {id}})
    window.open(url.href, '_blank')
}

onMounted(() => {
    getBlogPostList()
})
</script>

<template>
    <n-flex justify="space-around" wrap>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <div>1</div>
        <!--        <n-card hoverable v-for="(blog,index) in blogPostList" :key="index" style="max-width: 25%">-->
        <!--            <template #header>-->
        <!--                <n-skeleton v-if="blog.loading"/>-->
        <!--                <n-image v-else :src="blog.image" width="100%"/>-->
        <!--            </template>-->
        <!--            <template #default>-->
        <!--                <n-skeleton v-if="blog.loading"/>-->
        <!--                <n-h3 v-else>{{ blog.title }}</n-h3>-->
        <!--            </template>-->
        <!--            <template #footer>-->
        <!--                <n-skeleton v-if="blog.loading"/>-->
        <!--                <n-p v-else>{{ blog.createTime }}</n-p>-->
        <!--                <n-skeleton v-if="blog.loading"/>-->
        <!--                <n-p v-else>{{ blog.relativeTime }}</n-p>-->
        <!--            </template>-->
        <!--        </n-card>-->
    </n-flex>
</template>

<style scoped>
</style>