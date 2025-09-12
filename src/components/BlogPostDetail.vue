<script setup>
import {onMounted, reactive} from 'vue';
import {MdCatalog, MdPreview} from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';
import {fetchBlogPostDetail} from "@/api/BlogPost.js";
import {useRoute} from "vue-router";

const route = useRoute();
const scrollElement = document.documentElement;
const blogPost = reactive({
    id: route.params.id,
    title: "",
    summary: "",
    content: "",
});

const getBlogPostDetail = async () => {
    const res = await fetchBlogPostDetail({id: blogPost.id});
    blogPost.title = res.data.title;
    blogPost.summary = res.data.summary;
    blogPost.content = res.data.content;
}
onMounted(() => {
    getBlogPostDetail();
})
</script>

<template>
    <div style="display: flex;width: 100%;height: 100vh;">
        <MdCatalog :editorId="'md-catalog'+blogPost.id" :scrollElement="scrollElement" style="flex: 1;"/>
        <MdPreview :id="'md-catalog'+blogPost.id" :modelValue="blogPost.content" style="flex: 3;"/>
    </div>
</template>

<style scoped>

</style>