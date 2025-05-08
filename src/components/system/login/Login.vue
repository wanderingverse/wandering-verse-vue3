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
  <section>
    <div class="color"></div>
    <div class="color"></div>
    <div class="color"></div>
    <div class="box">
      <div class="square" style="--i:0;"></div>
      <div class="square" style="--i:1;"></div>
      <div class="square" style="--i:2;"></div>
      <div class="square" style="--i:3;"></div>
      <div class="square" style="--i:4;"></div>
      <div class="container">
        <div class="form">
          <h2>登录</h2>
          <form @submit.prevent="handleLoginSubmit">
            <div class="inputBox"><input type="text" v-model="username" placeholder="用户名"></div>
            <div class="inputBox"><input type="password" v-model="password" placeholder="密码"></div>
            <div class="inputBox"><input type="submit" value="登录"></div>
            <div class="forget">
              <a href="#">忘记密码</a>
              <a href="#">注册</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
  background: linear-gradient(to bottom, #fefae0, #c7f9cc);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  position: relative;

}

section .color {
  position: absolute;
  filter: blur(120px);
  opacity: 0.5;
  animation: drift 30s infinite linear alternate;
}

.color:nth-child(1) {
  top: -300px;
  left: -200px;
  width: 500px;
  height: 500px;
  background: #fde2e4;
}

.color:nth-child(2) {
  bottom: -150px;
  left: 100px;
  width: 400px;
  height: 400px;
  background: #a0e7e5;
}

.color:nth-child(3) {
  top: 50px;
  right: -100px;
  width: 500px;
  height: 500px;
  background: #b9fbc0;
}

/* 方块漂浮动画 */
section .square {
  position: absolute;
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(2px);
  animation: float 12s infinite ease-in-out;
}

.square:nth-child(4) {
  top: 15%;
  left: 20%;
  animation-delay: 0s;
}

.square:nth-child(5) {
  top: 60%;
  left: 80%;
  animation-delay: 2s;
}

.square:nth-child(6) {
  top: 30%;
  left: 40%;
  animation-delay: 4s;
}

.square:nth-child(7) {
  top: 70%;
  left: 60%;
  animation-delay: 6s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

@keyframes drift {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(60px, -30px);
  }
}

/* 表单容器 */
.container {
  position: relative;
  z-index: 10;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.form {
  background: rgba(255, 255, 255, 0.25);
  border-radius: 28px;
  padding: 50px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(20px);
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

.form h2 {
  text-align: center;
  color: #2c3e50;
  font-size: 28px;
  letter-spacing: 1px;
  margin-bottom: 35px;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.inputBox {
  margin-bottom: 25px;
}

.inputBox input {
  padding: 14px;
  border-radius: 10px;
  font-size: 17px;
  background: rgba(255, 255, 255, 0.65);
  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.08);
}

.inputBox input:focus {
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0 0 10px #c3f0ca;
}

.inputBox input[type="submit"] {
  background: linear-gradient(to right, #a0e7e5, #b9fbc0);
  color: #2c3e50;
  font-weight: bold;
  cursor: pointer;
  padding: 14px;
  border-radius: 8px;
  transition: 0.3s ease;
  width: 100%;
  font-size: 16px;
  border: none;
}

.inputBox input[type="submit"]:hover {
  background: linear-gradient(to right, #fbc2eb, #a6c1ee);
  color: #fff;
  transform: scale(1.07);
  box-shadow: 0 6px 18px rgba(165, 190, 255, 0.5);
}

.forget {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 20px;
  font-size: 14px;
  font-weight: 400;
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInSoft 1.8s ease-in-out forwards;
}

@keyframes fadeInSoft {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.forget a {
  padding: 8px 16px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.4);
  color: #2c3e50;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(6px);
  font-size: 13px;
}

.forget a:hover {
  background: rgba(255, 255, 255, 0.65);
  color: #3d5a80;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}
</style>