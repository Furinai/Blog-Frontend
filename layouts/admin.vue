<template>
    <el-container>
        <el-aside width="200px">
            <Aside/>
        </el-aside>
        <el-container>
            <el-header height="50px">
                <Header/>
            </el-header>
            <el-main>
                <nuxt/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import Header from '~/components/admin/Header';
    import Aside from "../components/admin/Aside";

    export default {
        name: 'admin',
        components: {
            Header,
            Aside
        },
        middleware: 'auth'
    }
</script>

<style scoped>
    .el-header {
        box-shadow: 0 1px 3px rgba(26, 26, 26, .1);
        border-bottom: 1px solid #eee;
        line-height: 50px;
        width: 100%;
    }

    .el-container {
        height: 100%;
    }
</style>
