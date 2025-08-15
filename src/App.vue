<script setup>
</script>

<template>
  <div class="app-container">
    <router-view></router-view>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
  background-color: #f5f5f5;
}

.app-container > * {
  max-width: 1200px;
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
  box-sizing: border-box;
}

.app-container > *:last-child {
  margin-bottom: 0;
}

@media (max-width: 768px) {
  .app-container {
    padding: 10px;
  }

  .app-container > * {
    margin-bottom: 15px;
  }
}
</style>