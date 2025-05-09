<script setup>
import {ref} from "vue";
import axios from "axios";

const username = ref('')
const password = ref('')

const handleLoginSubmit = () => {
  if (!username.value || !password.value) {
    alert('请输入用户名或密码')
    return
  }
  axios.post('/api/system/login', {
    username: username.value,
    password: password.value
  }).then(response => {
    alert('登录成功')
  })
}
</script>

<template>
  <div class="login-container">
    <h2 class="login-title">登录</h2>
    <form class="login-form" @submit.prevent="handleLoginSubmit">
      <div class="inputBox"><input type="text" v-model="username" placeholder="用户名"></div>
      <div class="inputBox"><input type="password" v-model="password" placeholder="密码"></div>
      <div class="inputBox"><input type="submit" value="登录"></div>
      <div class="forget">
        <a href="#">忘记密码</a>
        <a href="#">注册</a>
      </div>
    </form>
  </div>
</template>

