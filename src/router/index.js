import {createRouter, createWebHistory} from 'vue-router'
import Login from '../components/system/login/Login.vue'
import BlogPost from "@/components/blog/blogpost/BlogPost.vue";
import BlogPostDetail from "@/components/blog/blogpost/BlogPostDetail.vue";
import AddBlogPost from "@/components/blog/blogpost/AddBlogPost.vue";
import LivingState from "@/components/individual/livingstate/LivingState.vue";

const routes = [{
    path: '/login', name: 'Login', component: Login
}, {
    path: '/add-blog-post', name: 'AddBlogPost', component: AddBlogPost
}, {
    path: '/blog-post', name: 'BlogPost', component: BlogPost
}, {
    path: '/living-state', name: 'LivingState', component: LivingState
}, {
    path: '/blog-post/:id', name: 'BlogPostDetail', component: BlogPostDetail
}]

const router = createRouter({
    history: createWebHistory(), routes
})

export default router
