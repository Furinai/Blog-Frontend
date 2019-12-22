<template>
    <div class="header">
        <div class="hidden-xs-only">
            <router-link class="logo" :to="{ name: 'index' }">
                Linter
            </router-link>
            <ul class="nav-list-left">
                <li class="nav nav-xs">
                    <router-link :to="{ name: 'index' }">
                        <i class="el-icon-house"/>首页
                    </router-link>
                </li>
                <li class="nav nav-xs">
                    <router-link :to="{ name: 'catalog' }">
                        <i class="el-icon-collection-tag"/>分类
                    </router-link>
                </li>
            </ul>
            <ul class="nav-list-right">
                <li v-if="auth" class="nav nav-xs">
                    <a href="javascript:;" @click="logout">
                        <i class="el-icon-user"/>注销
                    </a>
                </li>
                <li v-else class="nav nav-xs">
                    <a href="javascript:;" @click="LoginDialog=true">
                        <i class="el-icon-user"/>登录
                    </a>
                </li>
                <li class="nav nav-xs">
                    <a href="javascript:;">
                        <i class="el-icon-search"/>搜索
                    </a>
                </li>
                <li class="nav nav-xs">
                    <router-link :to="{ name: 'about' }">
                        <i class="el-icon-reading"/>关于
                    </router-link>
                </li>
            </ul>
        </div>
        <div class="hidden-sm-only">
            <el-drawer :visible.sync="MenuDrawer" direction="ltr" size="60%"
                       :show-close=false :append-to-body=true>
                <div slot="title">
                    <router-link class="logo-side" :to="{ name: 'index' }">
                        Linter
                    </router-link>
                </div>
                <ul class="nav-list-side">
                    <li class="nav nav-sm">
                        <router-link :to="{ name: 'index' }">
                            <i class="el-icon-house"/>首页
                        </router-link>
                    </li>
                    <li class="nav nav-sm">
                        <router-link :to="{ name: 'catalog' }">
                            <i class="el-icon-collection-tag"/>分类
                        </router-link>
                    </li>
                    <li v-if="auth" class="nav nav-sm">
                        <a href="javascript:;" @click="logout">
                            <i class="el-icon-user"/>注销
                        </a>
                    </li>
                    <li v-else class="nav nav-sm">
                        <a href="javascript:;" @click="LoginDialog=true">
                            <i class="el-icon-user"/>登录
                        </a>
                    </li>
                    <li class="nav nav-sm">
                        <a href="javascript:;">
                            <i class="el-icon-search"/>搜索
                        </a>
                    </li>
                    <li class="nav nav-sm">
                        <router-link :to="{ name: 'about' }">
                            <i class="el-icon-reading"/>关于
                        </router-link>
                    </li>
                </ul>
            </el-drawer>
            <router-link class="logo" :to="{ name: 'index' }">
                Linter
            </router-link>
            <button class="switch" @click="MenuDrawer=true">
                <i class="el-icon-s-operation"/>
            </button>
        </div>
        <el-dialog title="登录" :visible.sync="LoginDialog" :show-close=false
                   width="95%" :center=true :append-to-body=true top="25vh">
            <Login v-bind:LoginDialog.sync="LoginDialog"/>
        </el-dialog>
    </div>
</template>

<script scoped>

    import Login from './Login';
    import {mapState} from 'vuex'
    import {logout} from '../utils/api';
    import {removeAuth} from '../utils/auth';

    export default {
        name: 'Header',
        components: {
            Login
        },
        data() {
            return {
                MenuDrawer: false,
                LoginDialog: false
            }
        },
        computed: mapState([
            'auth'
        ]),
        methods: {
            logout() {
                this.$confirm('确定注销？', '提示', {type: 'warning',})
                    .then(() => {
                        logout().then(response => {
                            if (response && response.status == 'success') {
                                removeAuth()
                                this.$message.success(response.message)
                            }
                        })
                    })
                    .catch(() => {
                        this.$message.warning('已取消！')
                    });
            }
        },
        watch: {
            "$route": function () {
                this.MenuDrawer = false
                this.LoginDialog = false
            }
        }
    }
</script>

<style scoped>
    .header .hidden-xs-only {
        display: flex;
        margin: auto;
        width: 75%;
    }

    .nav-list-left {
        display: flex;
    }

    .nav-list-right {
        margin-left: auto;
        display: flex;
    }

    .nav-list-side {
        margin: 0 40px 0;
    }

    .logo {
        font-weight: bold;
        font-size: 20px;
        color: #333;
    }

    .switch {
        position: absolute;
        background: none;
        font-size: 26px;
        right: 10px;
        top: 10px;
        outline: 0;
        border: 0;
    }

    .logo-side {
        margin-left: 20px;
        font-size: 40px;
        color: #333;
    }

    .nav-xs {
        margin-left: 20px;
    }

    .nav-sm {
        margin-bottom: 20px;
    }

    .nav-xs i {
        margin-right: 5px;
    }

    .nav-sm i {
        margin-right: 25px;
    }

    .nav a {
        color: #303133;
    }

    .nav a:hover {
        color: #409EFF;
    }

    .nav > .router-link-exact-active {
        color: #409EFF;
    }
</style>