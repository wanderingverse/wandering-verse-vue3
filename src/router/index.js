import {createRouter, createWebHistory} from 'vue-router'
import Login from '../components/system/login/Login.vue'
import BlogPost from "@/components/blog/blogpost/BlogPost.vue";
const routes = [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/blog-post',
        name: 'BlogPost',
        component: BlogPost
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
