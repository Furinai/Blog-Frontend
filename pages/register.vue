<template>
    <el-card>
        <div slot="header">
            <div class="title">注册</div>
        </div>
        <el-form :model="user" :rules="rules" :ref="user">
            <el-form-item prop="email">
                <el-input type="email" v-model="user.email" placeholder="邮箱"/>
            </el-form-item>
            <el-form-item prop="username">
                <el-input type="text" v-model="user.username" placeholder="用户名"/>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="user.password" placeholder="密码"
                          @keyup.enter.native="onSubmit(user)"/>
            </el-form-item>
            <el-form-item>
                <el-button class="button-long" type="primary"
                           @click="onSubmit(user)" :loading="load" round>
                    注册
                </el-button>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script>
export default {
    name: 'register',
    layout: 'blog',
    head() {
        return {
            title: '注册'
        }
    },
    data() {
        return {
            user: {
                email: '',
                username: '',
                password: ''
            },
            rules: {
                email: [
                    {
                        type: 'email',
                        required: true,
                        message: '请输入正确的邮箱'
                    }
                ],
                username: [
                    {
                        required: true,
                        message: '请输入用户名'
                    },
                    {
                        min: 2,
                        max: 10,
                        message: '长度在2到10个字符'
                    }
                ],
                password: [
                    {
                        required: true,
                        message: '请输入密码'
                    },
                    {
                        min: 6,
                        max: 20,
                        message: '长度在6到20个字符',
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
                    this.$axios.post('register', user).then(response => {
                        this.load = false
                        if (response && response.status === 'success') {
                            this.$router.push({name: 'index'})
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

.title {
    font-weight: 600;
    text-align: center;
    font-size: 1.125rem;
}
</style>
