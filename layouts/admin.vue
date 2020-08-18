<template>
    <div id="admin">
        <el-container>
            <el-aside width="200px">
                <Aside/>
            </el-aside>
            <el-container>
                <el-header height="50px">
                    <el-row type="flex" justify="end">
                        <div>
                            欢迎，{{ this.$auth.user.username }}，
                            <nuxt-link :to="{name: 'index'}">
                                退出
                            </nuxt-link>
                        </div>
                    </el-row>
                </el-header>
                <el-main>
                    <nuxt/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Aside from '~/components/Aside';

export default {
    name: 'admin',
    components: {
        Aside
    },
    middleware: 'auth'
}
</script>