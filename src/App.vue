<template>
    <div id="app">
        <el-container>
            <el-header height="50px">
                <Header></Header>
            </el-header>
            <el-main>
                <el-row type="flex" justify="center">
                    <el-col :xs="24" :sm="18">
                        <router-view></router-view>
                    </el-col>
                </el-row>
            </el-main>
            <el-footer height="80px">
                <Footer></Footer>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
    import Header from './views/Header'
    import Footer from './views/Footer'

    export default {
        name: 'app',
        components: {
            Header,
            Footer
        }
    }
</script>

<style>
    html, body, #app {
        font-family: Arial, Helvetica, "Microsoft YaHei";
        -webkit-tap-highlight-color: transparent;
        -webkit-font-smoothing: antialiased;
        line-height: 1.6;
        font-weight: 400;
        font-size: 16px;
        height: 100%;
        width: 100%;
        padding: 0;
        margin: 0
    }

    #app > .el-container {
        min-height: 100%;
    }

    .el-header {
        box-shadow: 0 0 5px #cac6c6;
        background-color: #fff;
        line-height: 50px;
        position: fixed;
        z-index: 1050;
        width: 100%;
        padding: 0;
        top: 0;
    }

    .el-main {
        margin-top: 50px;
    }

    .el-footer {
        border-top: 1px solid #eee;
        line-height: 50px;
        width: 100%;
    }

    a {
        color: #409eff;
        text-decoration: none;
    }

    ul {
        margin: 0;
        padding: 0;
        list-style: none;
    }

    img {
        max-width: 100%;
    }

    .flex {
        display: flex;
    }

    .pagination {
        margin-top: 1rem;
        text-align: center;
    }

    .media {
        display: flex;
        align-items: flex-start;
    }

    .media-body {
        flex: 1;
        margin: 0 0.625rem;
    }

    .text-muted {
        color: #555;
    }

    .text-stressed {
        color: #222;
    }

    .text-small {
        font-size: 0.875rem;
    }

    .content-between {
        justify-content: space-between;
    }

    @media (max-width: 600px) {
        body, html {
            font-size: 14px;
        }

        .el-message-box {
            width: 360px;
        }
    }
</style>
