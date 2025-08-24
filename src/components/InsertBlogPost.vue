<!--新增个人博客-->
<script setup>
import {ref} from "vue";
import {MdEditor} from "md-editor-v3";
import "md-editor-v3/lib/style.css"
import {insertBlogPost} from "@/api/BlogPost.js";
import {HTTP_STATUS} from "@/config/HttpConfig.js";
import {uploadImage} from "@/api/Resource.js";

const toolbars = [
    'image',
    'table',
    'mermaid',
    'katex',
    '=',
    'pageFullscreen',
    'fullscreen',
    'preview',
    'previewOnly',
    'catalog',
];
const form = ref({
    title: "",
    summary: "",
    content: ""
})

const onSubmit = async () => {
    // 提交内容
    const res = await insertBlogPost(form.value)
    if (res.code === HTTP_STATUS.OK) {
        // 输出：提交成功
        console.log("提交成功：", form)
    }
}

const onUploadImage = async (file, callback) => {
    const urlList = [];
    for (let i = 0; i < file.length; i++) {
        const res = await uploadImage(file[i]);
        urlList.push(res.data);
    }
    callback(urlList)
};
</script>

<template>
    <el-form :model="form" label-width="auto">
        <el-form-item label="文章标题">
            <el-input v-model="form.title" autofocus clearable placeholder="请输入文章标题"/>
        </el-form-item>
        <el-form-item label="摘要">
            <el-input v-model="form.summary" placeholder="AI 生成" type="textarea"/>
        </el-form-item>
        <el-form-item label="正文">
            <MdEditor v-model="form.content" :toolbars="toolbars" @onUploadImg="onUploadImage"/>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
    </el-form>
</template>

<style scoped>

</style>