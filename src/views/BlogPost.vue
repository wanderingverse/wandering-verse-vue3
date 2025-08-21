<script setup>
import {ref} from 'vue';
import {MdPreview, MdCatalog} from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';

const id = 'preview-only';
const text = ref('## 测试markdown 内容和目录');
const scrollElement = document.documentElement;
</script>

<template>
    <div style="display: flex;width: 100%;height: 100vh;">
        <MdCatalog style="flex: 1;" :editorId="id" :scrollElement="scrollElement"/>
        <MdPreview style="flex: 3;" :id="id" :modelValue="text"/>
    </div>
</template>

<style scoped>

</style>