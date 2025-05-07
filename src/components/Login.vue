<!--登录-->
<template>
  <h1>{{ title }}</h1>
  <button @click="fetchData">发送请求</button>
  <pre>{{ response }}<</pre>
</template>

<script setup>
import {ref} from 'vue'
import axios from 'axios'

const title = ref('登录')
const response = ref(null)
const fetchData = async () => {
  try {
    const res = await axios.get('https://localhost:3721/test')
    console.log(res)
    response.value = res.data
  } catch (error) {
    response.value = error
  }
}
</script>