<template>
    <div class="login">
        <el-card>
            <div slot="header">
                <div class="card-title">登录</div>
            </div>
            <Login/>
        </el-card>
    </div>
</template>

<script>
import Login from '~/components/Login';

export default {
    name: 'login',
    layout: 'blog',
    components: {
        Login
    },
    head() {
        return {
            title: '登录'
        }
    }
}
</script>