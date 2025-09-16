import {createRouter, createWebHistory} from "vue-router";
import Login from "@/components/Login.vue";
import BlogPostDetail from "@/components/BlogPostDetail.vue";
import InsertBlogPost from "@/components/InsertBlogPost.vue";
import ResultPage from "@/components/ResultPage.vue";
import Home from "@/views/Home.vue";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/blog-post/:id',
        name: 'BlogPostDetail',
        component: BlogPostDetail
    },
    {
        path: '/dev',
        name: 'dev',
        component: InsertBlogPost
    },
    {
        path: '/demo',
        name: 'demo',
        component: ResultPage
    }
]

const router = createRouter({
    history: createWebHistory(), routes
})

export default router