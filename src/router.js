import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index'
import Login from './views/Login'
import Register from './views/Register'
import User from './views/User';
import Article from './views/Article'
import Category from './views/Category'
import Categories from './views/Categories';
import NotFound from "./views/NotFound";

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            name: 'index',
            path: '/',
            component: Index
        },
        {
            name: 'login',
            path: '/login',
            component: Login
        },
        {
            name: 'register',
            path: '/register',
            component: Register
        },
        {
            name: 'user',
            path: '/user/:id',
            component: User
        },
        {
            name: 'article',
            path: '/article/:id',
            component: Article
        },
        {
            name: 'category',
            path: '/category/:id',
            component: Category
        },
        {
            name: 'categories',
            path: '/categories',
            component: Categories
        },
        {
            name: 'create',
            path: '/create',
            component: () => import('@/views/Create')
        },
        {
            path: '*',
            component: NotFound
        }
    ]
})