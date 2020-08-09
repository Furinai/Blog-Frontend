<template>
    <div class="login">
        <el-form :model="forms" :rules="rules" :ref="forms">
            <el-form-item prop="username">
                <el-input type="text" v-model="forms.username" placeholder="用户名"/>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="forms.password" placeholder="密码"
                          @keyup.enter.native="onSubmit(forms)"/>
            </el-form-item>
            <div class="menu">
                <el-checkbox v-model="forms.remember">保持登录</el-checkbox>
                <nuxt-link class="el-link el-link--primary" :to="{name: 'register'}">
                    注册账号
                </nuxt-link>
            </div>
            <el-form-item>
                <el-button class="button-long" type="primary"
                           @click="onSubmit(forms)" :loading="load" round>
                    登录
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import qs from 'qs';

export default {
    name: 'Login',
    data() {
        return {
            forms: {
                username: '',
                password: '',
                remember: false
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: '请输入用户名'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '请输入密码'
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
        onSubmit(forms) {
            this.$refs[forms].validate((valid) => {
                if (valid) {
                    this.load = true
                    this.$auth.login({data: qs.stringify(forms)}).then(response => {
                        this.load = false
                        if (response && response.status === 'success') {
                            this.$emit('update:LoginDialog', false)
                            this.$message.success(response.message)
                        }
                    })
                }
            });
        }
    }
}
</script>
