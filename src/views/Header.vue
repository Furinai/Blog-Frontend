<template>
    <div id="header">
        <div class="navigation">
            <router-link class="logo" :to="{ path: '/' }">
                Citru
            </router-link>
            <button class="switch" @click="active = !active">
                <i class="el-icon-s-operation"></i>
            </button>
            <div :class="{ mask: active }"></div>
            <div class="nav" :class="{ active: active }">
                <router-link :to="{ path: '/' }">首页</router-link>
                <router-link :to="{ name: 'categories' }">分类</router-link>
                <div v-if="!user" class="right">
                    <router-link :to="{ name: 'login' }">登录</router-link>
                    <router-link :to="{ name: 'register' }">注册</router-link>
                </div>
                <div v-else class="right">
                    <router-link :to="{ name: 'user', params: { id: user.id }}">主页</router-link>
                    <router-link :to="{ name: 'create' }">创作</router-link>
                    <a href="#" @click="logout">注销</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import {mapState} from 'vuex'

    export default {
        name: 'Header',
        data() {
            return {
                active: false
            }
        },
        created: function () {
            this.login()
        },
        watch: {
            "$route": function () {
                this.active = false
            }
        },
        computed: mapState([
            'user'
        ]),
        methods: {
            login() {
                this.$store.dispatch("login")
            },
            logout() {
                this.$store.dispatch("logout")
            }
        }
    }
</script>

<style scoped>
    .mask {
        position: fixed;
        background: #000;
        height: 100%;
        width: 100%;
        opacity: 0.5;
        top: 55px;
        left: 0;
    }

    .logo {
        color: #333;
        margin: 0 1.25rem;
        font-size: 1.25rem;
        text-decoration: none;
    }

    .switch {
        position: absolute;
        font-size: 1.75rem;
        background: none;
        right: 0.75rem;
        top: 0.75rem;
        outline: 0;
        border: 0;
    }

    .nav {
        width: 100%;
        display: flex;
        background-color: #fff;
        transition: max-height 0.4s;
    }

    .nav a {
        color: #666;
        padding: 0 0.5rem;
    }

    .nav.active {
        opacity: 0.99;
        overflow: auto;
        max-height: 250px;
        visibility: visible;
    }

    .nav .right {
        display: flex;
        margin-left: auto;
        margin-right: 1.25rem;
    }

    .nav .router-link-exact-active {
        color: #408eff;
    }

    @media (max-width: 600px) {
        .nav {
            float: none;
            max-height: 50px;
            text-align: center;
            visibility: hidden;
            flex-direction: column;
            border-top: 1px solid #eee;
        }

        .nav .right {
            margin: 0;
            flex-direction: column;
        }
    }

    @media (min-width: 600px) {
        .navigation {
            display: flex;
            margin: auto;
            width: 75%;
        }

        .switch {
            display: none;
        }
    }
</style>