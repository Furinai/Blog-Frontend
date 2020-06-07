import Vue from "vue";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import Blog from "../layout/Blog";
import Index from "../views/Index";

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        component: Blog,
        children: [
            {
                path: "",
                name: "index",
                component: Index,
                meta:{
                    title:"首页 | Linter"
                }
            },
            {
                name: "register",
                path: "register",
                component: () => import("../views/Register"),
                meta:{
                    title:"注册 | Linter"
                }
            },

            {
                name: "reset-password",
                path: "reset-password",
                component: () => import("../views/ResetPassword"),
                meta:{
                    title:"重置密码 | Linter"
                }
            },
            {
                name: "article",
                path: "article/:id",
                component: () => import("../views/Article"),
                meta:{
                    title:"文章 | Linter"
                }
            },
            {
                name: "category",
                path: "category/:id",
                component: () => import("../views/Category"),
                meta:{
                    title:"分类 | Linter"
                }
            },
            {
                name: "catalog",
                path: "catalog",
                component: () => import("../views/Catalog"),
                meta:{
                    title:"目录 | Linter"
                }
            },
            {
                path: "about",
                name: "about",
                component: () => import("../views/About"),
                meta:{
                    title:"关于 | Linter"
                }
            }
        ]
    },
    {
        path: "/admin",
        component: () => import("../layout/Admin"),
        children: [
            {
                path: "",
                name: "admin",
                component: () => import("../views/admin/Index")
            },
            {
                name: "create",
                path: "create",
                component: () => import("../views/admin/Create")
            }
        ]
    },
    {
        path: "*",
        component: () => import("../views/NotFound.vue")
    }
]

NProgress.configure({showSpinner: false});

const router = new VueRouter({
    mode: "history",
    routes
})

router.beforeEach((to, from, next) => {
    NProgress.start();
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next();
})

router.afterEach(() => {
    NProgress.done()
})

export default router
