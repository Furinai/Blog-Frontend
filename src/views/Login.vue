<template>
    <div id="login">
        <el-card>
            <div slot="header">
                <div class="title">用户登录</div>
            </div>
            <el-form :model="forms" :rules="rules" :ref="forms" :status-icon="true">
                <el-form-item prop="username">
                    <el-input type="text" v-model="forms.username" @keyup.enter.native="onSubmit(forms)" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="forms.password" @keyup.enter.native="onSubmit(forms)" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="forms.remember">保持登录</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit(forms)" :loading="load" round>登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import qs from 'qs'
    import axios from 'axios'

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
            onSubmit(forms) {
                this.$refs[forms].validate((valid) => {
                    if (valid) {
                        this.load = true
                        axios({
                            method: 'post',
                            url: '/api/login',
                            data: {
                                username: this.forms.username,
                                password: this.forms.password,
                                remember: this.forms.remember
                            },
                            transformRequest: [
                                function (data) {
                                    return qs.stringify(data);
                                }
                            ]
                        }).then(response => {
                            this.load = false
                            if (response.status == 200) {
                                if (response.data.status == 'success') {
                                    this.$store.dispatch("login")
                                    this.$router.replace({path: '/'})
                                } else {
                                    this.$alert(response.data.message, '登陆失败');
                                }
                            } else {
                                this.$alert('登陆失败，请重新登录！', '登陆失败');
                            }
                        });
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .el-card {
        max-width: 360px;
        border-radius: 20px;
        margin: 6.25rem auto auto;
        padding: 0.625rem 0.625rem 0;
    }

    .el-button {
        width: 100%;
    }

    .title {
        font-weight: 600;
        text-align: center;
        font-size: 1.125rem;
    }
</style>