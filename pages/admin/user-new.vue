<template>
    <el-form label-position="top" :model="user" :rules="rules" :ref="user">
        <el-form-item label="角色" prop="roles">
            <el-select v-model="user.roles" value-key="id" multiple placeholder="请选择角色">
                <el-option v-for="role in roles" :key="role.id" :label="role.name" :value="role"/>
            </el-select>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
            <el-input type="email" v-model="user.email" placeholder="邮箱"/>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="user.username" placeholder="用户名"/>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="user.password" placeholder="密码"
                      @keyup.enter.native="onSubmit(user)"/>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="small" @click="onSubmit(user)" :loading="load">提交</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: 'user-new',
    layout: 'admin',
    head() {
        return {
            title: '新增用户'
        }
    },
    data() {
        return {
            user: {
                email: '',
                username: '',
                password: '',
                roles: [],
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
                ],
                roles: [
                    {
                        required: true,
                        message: '请选择角色',
                        trigger: 'change'
                    }
                ]
            },
            roles: [],
            load: false
        }
    },
    created() {
        this.getRoles()
    },
    methods: {
        getRoles() {
            this.$axios.get('roles').then(response => {
                if (response.status === 'success') {
                    this.roles = response.data
                }
            })
        },
        onSubmit(user) {
            this.$refs[user].validate((valid) => {
                if (valid) {
                    this.load = true
                    this.$axios.post('user', user).then(response => {
                        if (response.status === 'success') {
                            this.$refs[user].resetFields()
                            this.$message.success(response.message)
                        }
                        this.load = false
                    });
                }
            });
        }
    }
}
</script>