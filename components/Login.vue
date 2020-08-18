<template>
    <el-form :model="user" :rules="rules" :ref="user">
        <el-form-item prop="username">
            <el-input type="text" v-model="user.username" placeholder="用户名"/>
        </el-form-item>
        <el-form-item prop="password">
            <el-input type="password" v-model="user.password" placeholder="密码"
                      @keyup.enter.native="onSubmit(user)"/>
        </el-form-item>
        <div class="menu">
            <el-checkbox v-model="user.remember">保持登录</el-checkbox>
            <nuxt-link class="el-link el-link--primary" :to="{name: 'register'}">
                注册账号
            </nuxt-link>
        </div>
        <el-form-item>
            <el-button class="button-long" type="primary"
                       @click="onSubmit(user)" :loading="load" round>
                登录
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import qs from 'qs';

export default {
    name: 'Login',
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
    props: [
        'LoginDialog'
    ],
    methods: {
        onSubmit(user) {
            this.$refs[user].validate((valid) => {
                if (valid) {
                    this.load = true
                    this.$auth.login({data: qs.stringify(user)}).then(response => {
                        if (response.status === 'success') {
                            this.$emit('update:LoginDialog', false)
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