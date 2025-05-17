<script setup>
import {ref, onMounted, nextTick} from 'vue'
import {marked} from 'marked'
import Prism from 'prismjs'
import 'prismjs/themes/prism-okaidia.css'
import request from "@/utils/request.js"
import {useRoute} from 'vue-router'

const route = useRoute()
const postId = route.params.id


const formatDate = (dateStr) => {
  const options = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'}
  return new Date(dateStr).toLocaleDateString('zh-CN', options)
}


const post = ref({
  title: "",
  summary: "",
  createTime: "",
  updateTime: "",
  content: "",
  authorName: ""
})

const renderedContent = ref('')

// 获取博客文章详情
const fetchBlogPostDetail = async (id) => {
  try {
    const response = await request.get(`/blog/post/detail`, {params: {id}})
    if (response.data.code === 200) {
      post.value = response.data.data
      renderedContent.value = marked(post.value.content)
      await nextTick(() => {
        Prism.highlightAll()
      })
    } else {
      console.error('获取文章失败', response.data.msg)
    }
  } catch (error) {
    console.error('请求失败', error)
  }
}

// 在组件挂载时请求文章详情
onMounted(() => {
  if (postId) {
    fetchBlogPostDetail(postId)
  }
})
</script>

<template>
  <div class="post-container">
    <article class="post">
      <header class="post-header">
        <h1 class="post-title">{{ post.title }}</h1>
        <div class="post-meta">
          <span class="author">{{ post.authorName }}</span> •
          <span class="date">创建时间：{{ formatDate(post.createTime) }}</span> •
          <span class="update-date">更新于: {{ formatDate(post.updateTime) }}</span>
        </div>
        <p class="post-summary">{{ post.summary }}</p>
      </header>

      <section class="post-content" v-html="renderedContent"></section>
    </article>
  </div>
</template>

<style scoped>
.post-container {
  width: 80%;
  max-width: 1200px;
  margin: 40px auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.post {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

.post-header {
  margin-bottom: 25px;
}

.post-title {
  font-size: 2.8rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 15px;
  text-align: center;
}

.post-meta {
  font-size: 0.95rem;
  color: #888;
  text-align: center;
  margin-bottom: 18px;
}

.post-summary {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #555;
  text-align: center;
  margin-bottom: 30px;
}

.post-content {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #333;
  margin-top: 30px;
  word-wrap: break-word;
  max-width: 100%;
}

.post-content h1,
.post-content h2,
.post-content h3,
.post-content h4 {
  color: #2c3e50;
  font-weight: bold;
}

.post-content h1 {
  font-size: 2.6rem;
  margin-bottom: 20px;
}

.post-content h2 {
  font-size: 2.2rem;
  margin-bottom: 18px;
}

.post-content p {
  line-height: 1.7;
  font-size: 1.15rem;
  color: #333;
  margin-bottom: 20px;
}

.post-content strong {
  font-weight: bold;
}

.post-content em {
  font-style: italic;
}

.post-content code {
  background-color: #f4f4f4;
  padding: 4px 6px;
  border-radius: 4px;
  font-size: 1.1rem;
  color: #e67e22;
}

.post-content pre {
  background-color: #2d2d2d;
  color: #ecf0f1;
  padding: 20px;
  border-radius: 5px;
  overflow-x: auto;
  font-size: 1rem;
  white-space: pre-wrap;
}

.post-content ul,
.post-content ol {
  margin-left: 20px;
  margin-bottom: 18px;
}

.post-content li {
  font-size: 1.1rem;
  margin-bottom: 12px;
}

.post-content img {
  display: block;
  max-width: 80%;
  height: auto;
  margin: 20px auto;
  border-radius: 8px;
  text-align: center;
}

.post-content table {
  width: 100%;
  margin-top: 20px;
  border-collapse: collapse;
  border-spacing: 0;
  background-color: #f9f9f9;
}

.post-content table th,
.post-content table td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
  vertical-align: middle;
}

.post-content table th {
  background-color: #2c3e50;
  color: #fff;
  font-weight: bold;
}

.post-content table tr:nth-child(even) {
  background-color: #f1f1f1;
}

.post-content table tr:hover {
  background-color: #f0f0f0;
}
</style>

