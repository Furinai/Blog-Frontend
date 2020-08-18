<template>
    <div id="header">
        <el-row type="flex" justify="space-between" class="hidden-xs-only">
            <el-col :span="12">
                <el-row type="flex">
                    <nuxt-link class="logo" :to="{name: 'index'}">
                        Linter
                    </nuxt-link>
                    <nuxt-link :to="{name: 'index'}">
                        <i class="el-icon-house"/>首页
                    </nuxt-link>
                    <nuxt-link :to="{name: 'catalog'}">
                        <i class="el-icon-collection-tag"/>分类
                    </nuxt-link>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row type="flex" justify="end">
                    <a v-if="this.$auth.loggedIn" href="javascript:" @click="logout">
                        <i class="el-icon-user"/>注销
                    </a>
                    <a v-else href="javascript:" @click="LoginDialog=true">
                        <i class="el-icon-user"/>登录
                    </a>
                    <nuxt-link :to="{name: 'search'}">
                        <i class="el-icon-search"/>搜索
                    </nuxt-link>
                    <nuxt-link :to="{name: 'about'}">
                        <i class="el-icon-reading"/>关于
                    </nuxt-link>
                </el-row>
            </el-col>
        </el-row>
        <el-col class="hidden-sm-only">
            <el-drawer :visible.sync="MenuDrawer" direction="ltr" size="60%"
                       :show-close=false :append-to-body=true>
                <ul>
                    <li class="nav">
                        <nuxt-link :to="{name: 'index'}">
                            <i class="el-icon-house"/>首页
                        </nuxt-link>
                    </li>
                    <li class="nav">
                        <nuxt-link :to="{name: 'catalog'}">
                            <i class="el-icon-collection-tag"/>分类
                        </nuxt-link>

                    </li>
                    <li v-if="this.$auth.loggedIn" class="nav">
                        <a href="javascript:" @click="logout">
                            <i class="el-icon-user"/>注销
                        </a>
                    </li>
                    <li v-else class="nav">
                        <a href="javascript:" @click="LoginDialog=true">
                            <i class="el-icon-user"/>登录
                        </a>
                    </li>
                    <li class="nav">
                        <nuxt-link :to="{name: 'search'}">
                            <i class="el-icon-search"/>搜索
                        </nuxt-link>
                    </li>
                    <li class="nav">
                        <nuxt-link :to="{name: 'about'}">
                            <i class="el-icon-reading"/>关于
                        </nuxt-link>
                    </li>
                </ul>
            </el-drawer>
            <nuxt-link class="logo" :to="{name: 'index'}">
                Linter
            </nuxt-link>
            <button class="drawer-switch" @click="MenuDrawer=true">
                <i class="el-icon-s-operation"/>
            </button>
        </el-col>
        <el-dialog title="登录" :visible.sync="LoginDialog" :show-close=false
                   width="95%" :center=true :append-to-body=true top="25vh">
            <Login v-bind:LoginDialog.sync="LoginDialog"/>
        </el-dialog>
    </div>
</template>

<script scoped>
import Login from './Login';

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
    methods: {
        async logout() {
            this.$confirm('确定注销？', '提示', {type: 'warning'}).then(() => {
                this.$auth.logout().then(response => {
                    if (response.status === 'success') {
                        this.$message.success(response.message)
                    }
                })
            })
        }
    },
    watch: {
        '$route': function () {
            this.MenuDrawer = false
            this.LoginDialog = false
        }
    }
}
</script>