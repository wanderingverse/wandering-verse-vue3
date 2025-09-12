<script setup>
import {onMounted, ref} from 'vue'
import {fetchBlogPostList} from "@/api/BlogPost.js";
import {useRouter} from "vue-router";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime"
import {NCard, NFlex, NP} from "naive-ui";

const blogPostList = ref([])
const getBlogPostList = async () => {
    dayjs.extend(relativeTime);
    dayjs.locale('zh-cn');
    const res = await fetchBlogPostList();
    blogPostList.value = res.data.records.map(post => ({
        ...post,
        createTime: dayjs(post.createTime).format("YYYY-MM-DD HH:mm:ss"),
        relativeTime: dayjs(post.createTime).fromNow()
    }))
}
const router = useRouter()


/**
 * 跳转到内容详情
 * @param id
 */
const goToPost = (id) => {
    const url = router.resolve({name: "BlogPostDetail", params: {id}})
    window.open(url.href, '_blank')
}

onMounted(() => {
    getBlogPostList()
})
</script>

<template>
    <n-flex justify="center">
        <n-card v-for="(blog,index) in blogPostList" :key="index"
                hoverable
                style="cursor: pointer"
                @click="goToPost(blog.id)">
            <template #default>
                <n-p>{{ blog.title }}</n-p>
            </template>
            <template #footer>
                <n-p>{{ blog.createTime }}</n-p>
                <n-p>{{ blog.relativeTime }}</n-p>
            </template>
        </n-card>
    </n-flex>
</template>

<style scoped>
</style>