<template>
    <div class="user-list">
        <div v-show="!formVisible">
            <el-table :data="users.list" ref="multipleTable" style="width: 100%"
                      @selection-change="handleSelectionChange" border>
                <el-table-column type="selection" align="center" width="50"/>
                <el-table-column prop="id" label="ID" align="center" width="150"/>
                <el-table-column prop="username" label="用户名" align="center" width="250"/>
                <el-table-column prop="email" label="邮箱" align="center" width="300"/>
                <el-table-column label="角色" align="center">
                    <template slot-scope="scope">
                        <div class="tag-group">
                            <el-tag v-for="role in scope.row.roles" :key="role.id" effect="plain">
                                {{ role.name }}
                            </el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center" width="100px">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="editUser(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="menu">
                <el-pagination background layout="prev, pager, next" :pager-count="15" :total="users.total"
                               @current-change="handlePageChange"/>
                <el-button type="danger" size="mini" @click="deleteUser" :disabled="disabled">删除</el-button>
            </div>
        </div>
        <div v-show="formVisible">
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
                    <el-input type="password" v-model="user.password" placeholder="密码"/>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" @click="formVisible = false">取消</el-button>
                    <el-button size="small" @click="onSubmit(user)" type="primary" :loading="load">确认</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name: 'user-list',
    head() {
        return {
            title: '用户列表'
        }
    },
    data() {
        return {
            user: {},
            users: {},
            roles: [],
            disabled: true,
            currentPage: 1,
            formVisible: false,
            rules: {
                roles: [
                    {
                        required: true,
                        message: '请选择角色'
                    }
                ],
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
    created() {
        this.getUsers()
    },
    methods: {
        getUsers(pageNum) {
            this.$axios.get('users', {params: {pageNum}}).then(response => {
                if (response.status === 'success') {
                    this.users = response.data
                }
            })
        },
        getRoles() {
            this.$axios.get('roles').then(response => {
                if (response.status === 'success') {
                    this.roles = response.data
                }
            })
        },
        editUser(row) {
            if (this.roles.length === 0) {
                this.getRoles()
            }
            this.user = JSON.parse(JSON.stringify(row))
            this.formVisible = true
        },
        deleteUser() {
            this.$confirm("确定要删除这些用户及其所有评论？").then(() => {
                let ids = [];
                this.$refs.multipleTable.selection.forEach(item => {
                    ids.push(item.id)
                })
                this.$axios.delete('user', {data: ids}).then(response => {
                    if (response.status === 'success') {
                        this.getUsers(this.currentPage)
                        this.$message.success(response.message)
                    }
                })
            })
        },
        onSubmit(user) {
            this.$refs[user].validate((valid) => {
                if (valid) {
                    this.load = true
                    this.$axios.put('user', user).then(response => {
                        if (response.status === 'success') {
                            this.getUsers(this.currentPage)
                            this.formVisible = false
                            this.$message.success(response.message)
                        }
                        this.load = false
                    });
                }
            });
        },
        handlePageChange(pageNum) {
            this.currentPage = pageNum
            this.getUsers(pageNum)
        },
        handleSelectionChange(selection) {
            this.disabled = (selection.length === 0)
        }
    }
}
</script>