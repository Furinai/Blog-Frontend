<template>
    <div class="login">
        <el-card>
            <div slot="header">
                <div class="card-title">登录</div>
            </div>
            <el-form :model="user" :rules="rules" :ref="user">
                <el-form-item prop="username">
                    <el-input type="text" v-model="user.username" placeholder="用户名"/>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="user.password" placeholder="密码"
                              @keyup.enter.native="onSubmit(user)"/>
                </el-form-item>
                <el-form-item>
                    <el-row type="flex" justify="space-between">
                        <el-checkbox v-model="user.remember">保持登录</el-checkbox>
                        <nuxt-link class="el-link el-link--primary" :to="{name: 'register'}">
                            注册账号
                        </nuxt-link>
                    </el-row>
                </el-form-item>
                <el-form-item>
                    <el-button class="button-long" type="primary"
                               @click="onSubmit(user)" :loading="load" round>
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>

export default {
    name: 'login',
    layout: 'blog',
    head() {
        return {
            title: '登录'
        }
    },
    data() {
        return {
            user: {
                username: '',
                password: '',
                remember: false
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }
                ]
            },
            load: false
        }
    },
    methods: {
        onSubmit(user) {
            this.$refs[user].validate((valid) => {
                if (valid) {
                    this.load = true
                    let params = new URLSearchParams()
                    params.append('username', this.user.username)
                    params.append('password', this.user.password)
                    this.$auth.login({params}).then(response => {
                        if (response.status === 'success') {
                            this.$message.success(response.message)
                        }
                        this.load = false
                    })
                }
            });
        }
    }
}
</script>