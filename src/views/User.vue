<template>
    <div id="user">
        <el-row type="flex" class="row-bg" v-if="user">
            <el-col :xs="24" :sm="12">
                <div class="avatar">
                    <el-image :src="user.avatar"></el-image>
                </div>
                <div class="username">
                    {{ user.username }}
                </div>
            </el-col>
            <el-col :xs="24" :sm="12">
                <div class="profile">
                    <ul>
                        <li>ID：{{ user.id }}</li>
                        <li>邮箱：{{ user.email }}</li>
                    </ul>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        name: 'User',
        data() {
            return {
                user: null
            }
        },
        created() {
            this.getUser()
        },
        methods: {
            getUser() {
                axios.get('/api/user/' + this.$route.params.id).then(response => {
                    if (response.status == 200 && response.data.status == 'success') {
                        this.user = response.data.object
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .avatar {
        width: 200px;
        height: 200px;
        margin: 1rem auto;
    }

    .username {
        font-size: 2rem;
        text-align: center;
    }

    .profile {
        text-align: center;
        margin: 1rem auto;
    }

    .el-row {
        flex-wrap: wrap;
    }

    li {
        margin: 1rem 0;
    }
</style>