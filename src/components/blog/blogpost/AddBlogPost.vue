<script setup>
import {ref, onMounted} from "vue"
import request from "@/utils/request.js"
import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.min.css"
import {Mandarin as zh} from "flatpickr/dist/l10n/zh.js"

const title = ref('')
const authorName = ref('')
const summary = ref('')
const content = ref('')
const createTime = ref('')
const dateInput = ref(null)

onMounted(() => {
  const now = new Date()
  createTime.value = now.toISOString().slice(0, 19)

  flatpickr(dateInput.value, {
    locale: zh,
    enableTime: true,
    time_24hr: true,
    dateFormat: "Y-m-d H:i:S",
    defaultDate: now,
    allowInput: true,
    onChange: (selectedDates) => {
      const date = selectedDates[0]
      createTime.value = date.toISOString().slice(0, 19)
    }
  })
})

const addBlogPost = () => {
  request.post("/blog/post/add", {
    title: title.value,
    authorName: authorName.value,
    summary: summary.value,
    content: content.value,
    createTime: createTime.value
  }).then(() => {
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
        <label for="createTime">创建时间</label>
        <input type="text" id="createTime" ref="dateInput" placeholder="选择日期时间"/>
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
        <button type="submit" class="submit-btn">提交</button>
      </div>
    </form>
  </div>
</template>


<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.blog-edit-container {
  max-width: 800px;
  margin: 50px auto;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
}

.blog-form {
  display: grid;
  grid-gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  color: #333;
}

label {
  font-weight: 600;
  margin-bottom: 8px;
  color: #444;
}

input,
textarea {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  transition: border 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
}

input:focus,
textarea:focus {
  border-color: #4CAF50;
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.2);
}

.submit-btn {
  padding: 12px 24px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-btn:hover {
  background-color: #45a049;
}

input:focus,
textarea:focus,
.submit-btn:focus {
  outline: none;
}

@media (max-width: 600px) {
  .blog-edit-container {
    margin: 20px;
    padding: 15px;
  }

  .form-group {
    font-size: 12px;
  }

  .submit-btn {
    width: 100%;
  }
}
</style>
