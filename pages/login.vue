<template>
    <el-card>
        <div slot="header">
            <div class="title">登录</div>
        </div>
        <Login/>
    </el-card>
</template>

<script>
import Login from '~/components/Login';

export default {
    name: 'login',
    layout: 'blog',
    components: {
        Login
    }
}
</script>
<style scoped>
.el-card {
    max-width: 360px;
    border-radius: 10px;
    margin: 6.25rem auto auto;
    padding: 0.625rem 0.625rem 0;
}

.title {
    font-weight: 600;
    text-align: center;
    font-size: 1.125rem;
}
</style>
