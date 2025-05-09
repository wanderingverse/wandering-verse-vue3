<script setup>
import {ref} from "vue";
import axios from "axios";

const title = ref('')
const authorName = ref('')
const summary = ref('')
const content = ref('')

const addBlogPost = () => {
  axios.post("/api/blog/post/add", {
    title: title.value,
    authorName: authorName.value,
    summary: summary.value,
    content: content.value
  }).then(response => {
    alert('添加成功')
  })
}

</script>

<template>
  <div class="blog-edit-container">
    <form class="blog-form" @submit.prevent="addBlogPost">
      <div class="form-group">
        <label for="title">标题</label>
        <input type="text" id="title" v-model="title" placeholder="标题"/>
      </div>

      <div class="form-group">
        <label for="author">作者</label>
        <input type="text" id="author" v-model="authorName" placeholder="作者"/>
      </div>

      <div class="form-group">
        <label for="summary">摘要</label>
        <textarea id="summary" v-model="summary" placeholder="摘要" rows="4"></textarea>
      </div>

      <div class="form-group">
        <label for="content">正文</label>
        <textarea id="content" v-model="content" placeholder="正文" rows="10"></textarea>
      </div>

      <div class="form-actions">
        <button type="submit">提交</button>
      </div>
    </form>
  </div>
</template>

<style scoped></style>