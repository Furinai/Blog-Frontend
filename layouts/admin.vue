<template>
    <el-container>
        <el-aside width="200px">
            <Aside/>
        </el-aside>
        <el-container>
            <el-header height="50px">
                <ul class="nav-list">
                    <li class="nav">
                        欢迎，{{ this.$auth.user.username }}
                    </li>
                </ul>
            </el-header>
            <el-main>
                <nuxt/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import Aside from "~/components/Aside";

export default {
    name: 'admin',
    components: {
        Aside
    },
    middleware: 'auth'
}
</script>

<style scoped>
.nav {
    margin-left: 10px;
}

.nav-list {
    margin-left: auto;
    display: flex;
}

.el-header {
    box-shadow: 0 1px 3px rgba(26, 26, 26, .1);
    border-bottom: 1px solid #eee;
    line-height: 50px;
    display: flex;
    margin: auto;
    width: 100%;
}

.el-container {
    height: 100%;
}
</style>
