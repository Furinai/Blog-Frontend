<template>
    <div id="register">
        <el-card>
            <div slot="header">
                <div class="title">用户注册</div>
            </div>
            <el-form :model="forms" :rules="rules" :ref="forms" :status-icon="true">
                <el-form-item prop="email">
                    <el-input type="email" v-model="forms.email" @keyup.enter.native="onSubmit(forms)" placeholder="邮箱"></el-input>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input type="text" v-model="forms.username" @keyup.enter.native="onSubmit(forms)" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="forms.password" @keyup.enter.native="onSubmit(forms)" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit(forms)" :loading="load" round>注册</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Register',
        data() {
            return {
                forms: {
                    email: '',
                    username: '',
                    password: ''
                },
                rules: {
                    email: [
                        {
                            type: 'email',
                            required: true,
                            message: '请输入正确的邮箱',
                            trigger: 'blur'
                        }
                    ],
                    username: [
                        {
                            required: true,
                            message: '请输入用户名',
                            trigger: 'blur'
                        },
                        {
                            min: 2,
                            max: 10,
                            message: '长度在2到10个字符',
                            trigger: 'blur'
                        }
                    ],
                    password: [
                        {
                            required: true,
                            message: '请输入密码',
                            trigger: 'blur'
                        },
                        {
                            min: 6,
                            max: 20,
                            message: '长度在6到20个字符',
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
                            url: '/api/register',
                            data: {
                                email: this.forms.email,
                                username: this.forms.username,
                                password: this.forms.password
                            }
                        }).then(response => {
                            this.load = false
                            if (response.status == 200) {
                                if (response.data.status == 'success') {
                                    this.$router.replace({path: '/'})
                                } else {
                                    this.$alert(response.data.message, '失败！');
                                }
                            } else {
                                this.$alert('注册失败，请重新注册！', '失败！');
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