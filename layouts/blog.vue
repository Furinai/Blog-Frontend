<template>
    <el-container>
        <el-header height="50px">
            <Header/>
        </el-header>
        <el-main>
            <el-row type="flex" justify="center">
                <el-col :xs="24" :sm="18">
                    <nuxt/>
                </el-col>
            </el-row>
        </el-main>
        <el-footer height="80px">
            <Footer/>
        </el-footer>
    </el-container>
</template>

<script>
    import Header from '~/components/Header';
    import Footer from '~/components/Footer';

    export default {
        name: 'Blog',
        components: {
            Header,
            Footer
        }
    }
</script>

<style scoped>
    .el-header {
        border-bottom: 1px solid #eee;
        background-color: #fff;
        line-height: 50px;
        position: fixed;
        z-index: 1020;
        width: 100%;
    }

    .el-main {
        margin-top: 50px;
    }

    .el-footer {
        border-top: 1px solid #eee;
    }

    .el-container {
        min-height: 100%;
    }
</style>
