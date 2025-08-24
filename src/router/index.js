import {createRouter, createWebHistory} from "vue-router";
import Login from "@/views/Login.vue";
import BlogPost from "@/views/BlogPost.vue";
import Home from "@/views/Home.vue";
import InsertBlogPost from "@/components/InsertBlogPost.vue";
import Demo from "@/components/Demo.vue";

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
        name: 'BlogPost',
        component: BlogPost
    },
    {
        path: '/dev',
        name: 'dev',
        component: InsertBlogPost
    },
    {
        path: '/demo',
        name: 'demo',
        component: Demo
    },
]

const router = createRouter({
    history: createWebHistory(), routes
})

export default router