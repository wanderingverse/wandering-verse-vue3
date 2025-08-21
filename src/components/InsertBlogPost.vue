<!--新增个人博客-->
<script setup>
import {ref} from "vue";
import {MdEditor} from "md-editor-v3";
import "md-editor-v3/lib/style.css"
import {insertBlogPost} from "@/api/BlogPost.js";
import {HTTP_STATUS} from "@/config/HttpConfig.js";

const form = ref({
    title: "文章标题",
    summary: "文章摘要",
    content: "文章内容"
})

const onSubmit = async () => {
    // 提交内容
    const res = await insertBlogPost(form.value)
    if (res.code === HTTP_STATUS.OK) {
        // 输出：提交成功
        console.log("提交成功：", form)
    }
}
</script>

<template>
    <el-form :model="form" label-width="auto">
        <el-form-item label="文章标题">
            <el-input v-model="form.title"/>
        </el-form-item>
        <el-form-item label="摘要">
            <el-input v-model="form.summary" type="textarea"/>
        </el-form-item>
        <el-form-item label="正文">
            <MdEditor v-model="form.content"/>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
    </el-form>
</template>

<style scoped>

</style>