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
            <el-checkbox v-model="forms.remember">保持登录</el-checkbox>
            <el-form-item>
                <el-button type="primary" @click="onSubmit(forms)" :loading="load" round>登录</el-button>
            </el-form-item>
        </el-form>
        <span class="register">
            <nuxt-link class="el-link el-link--primary" :to="{name: 'register'}">
                注册账号
            </nuxt-link>
        </span>
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

<style scoped>
.el-button {
    width: 100%;
}

.el-checkbox {
    margin-bottom: 15px;
}

.reset-password {
    float: right;
}
</style>
