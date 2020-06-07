<template>
    <el-card>
        <div slot="header">
            <div class="title">注册</div>
        </div>
        <el-form :model="forms" :rules="rules" :ref="forms">
            <el-form-item prop="email">
                <el-input type="email" v-model="forms.email" placeholder="邮箱"/>
            </el-form-item>
            <el-form-item prop="username">
                <el-input type="text" v-model="forms.username" placeholder="用户名"/>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="forms.password" placeholder="密码"
                          @keyup.enter.native="onSubmit(forms)"/>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit(forms)" :loading="load" round>注册</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
    import {register} from "../utils/api";

    export default {
        name: "Register",
        data() {
            return {
                forms: {
                    email: "",
                    username: "",
                    password: ""
                },
                rules: {
                    email: [
                        {
                            type: "email",
                            required: true,
                            message: "请输入正确的邮箱",
                            trigger: "blur"
                        }
                    ],
                    username: [
                        {
                            required: true,
                            message: "请输入用户名",
                            trigger: "blur"
                        },
                        {
                            min: 2,
                            max: 10,
                            message: "长度在2到10个字符",
                            trigger: "blur"
                        }
                    ],
                    password: [
                        {
                            required: true,
                            message: "请输入密码",
                            trigger: "blur"
                        },
                        {
                            min: 6,
                            max: 20,
                            message: "长度在6到20个字符",
                            trigger: "blur"
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
                        register(forms).then(response => {
                            this.load = false
                            if (response && response.status == "success") {
                                this.$router.replace({name: "index"})
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
    .el-card {
        max-width: 360px;
        border-radius: 10px;
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