<script setup>

</script>

<template>
  <div class="living-state-container">
    <div class="add-node-form">
      <form @submit.prevent>
        <div>
          <label for="name">状态名称：</label>
          <input type="text" id="name"/>
        </div>
        <div>
          <label for="description">状态描述：</label>
          <input type="text" id="description"/>
        </div>
        <div>
          <!--          父节点 id-->
        </div>
        <button type="submit">添加</button>
      </form>
    </div>
  </div>
</template>

<style scoped>

</style>