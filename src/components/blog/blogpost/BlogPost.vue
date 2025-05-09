<script setup>
import {ref} from "vue";
import axios from "axios";

const title = ref('')
const authorName = ref('')
const createTime = ref('')
const updateTime = ref('')
const summary = ref('')
const content = ref('')

const addBlogPost = () => {
  axios.post("/api/blog/post/add", {
    title: title.value,
    authorName: authorName.value,
    createTime: createTime.value,
    updateTime: updateTime.value,
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
        <input type="text" id="title" v-model="title" placeholder="请输入博客标题"/>
      </div>

      <div class="form-group">
        <label for="author">作者</label>
        <input type="text" id="author" v-model="authorName" placeholder="请输入作者名称"/>
      </div>

      <div class="form-group">
        <label for="createTime">创建时间</label>
        <input type="datetime-local" v-model="createTime" id="createTime"/>
      </div>

      <div class="form-group">
        <label for="updateTime">最近一次更新时间</label>
        <input type="datetime-local" v-model="updateTime" id="updateTime"/>
      </div>

      <div class="form-group">
        <label for="summary">摘要</label>
        <textarea id="summary" v-model="summary" placeholder="请输入博客摘要" rows="4"></textarea>
      </div>

      <div class="form-group">
        <label for="content">正文</label>
        <textarea id="content" v-model="content" placeholder="请输入博客正文" rows="10"></textarea>
      </div>

      <div class="form-actions">
        <button type="submit">提交</button>
      </div>
    </form>
  </div>
</template>


<style scoped>
.blog-edit-container {
  width: 100%;
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(15px);
  animation: fadeIn 1.5s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}

@keyframes fadeIn {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.blog-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  font-size: 16px;
  color: #2c3e50;
}

.form-group label {
  margin-bottom: 8px;
  font-weight: bold;
}

.form-group input,
.form-group textarea {
  padding: 12px;
  border-radius: 10px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.65);
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.08);
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 0 10px #a0e7e5;
}

.form-group textarea {
  resize: vertical;
  min-height: 150px;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.form-actions button {
  background: linear-gradient(to right, #a0e7e5, #b9fbc0);
  color: #2c3e50;
  font-weight: bold;
  cursor: pointer;
  padding: 14px 30px;
  border-radius: 8px;
  transition: 0.3s ease;
  font-size: 16px;
  border: none;
}

.form-actions button:hover {
  background: linear-gradient(to right, #fbc2eb, #a6c1ee);
  color: #fff;
  transform: scale(1.07);
  box-shadow: 0 6px 18px rgba(165, 190, 255, 0.5);
}

.form-group input[type="datetime-local"],
.form-group textarea {
  background: rgba(255, 255, 255, 0.85);
}

.form-group textarea {
  resize: vertical;
  min-height: 150px;
}

/* 背景装饰 */
.blog-edit-container::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 300px;
  background: #fde2e4;
  filter: blur(120px);
  opacity: 0.6;
  transform: translate(-50%, -50%);
  animation: drift 30s infinite linear alternate;
}

.blog-edit-container::after {
  content: '';
  position: absolute;
  top: -200px;
  right: -150px;
  width: 500px;
  height: 500px;
  background: #a0e7e5;
  filter: blur(100px);
  opacity: 0.5;
  animation: drift 30s infinite linear alternate;
}

@keyframes drift {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(60px, -30px);
  }
}
</style>
