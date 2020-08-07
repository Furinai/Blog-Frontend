<template>
    <div class="aside">
        <el-menu background-color="#304156" text-color="#BFCBD9"
                 active-text-color="#409EFF" router unique-opened>
            <el-menu-item index="1" :route="{name: 'admin'}">
                <i class="el-icon-house"></i>
                <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-document"></i>
                    <span>文章</span>
                </template>
                <el-menu-item index="2-1" :route="{name: 'admin-article-new'}">
                    发表文章
                </el-menu-item>
                <el-menu-item index="2-2" :route="{name: 'admin-article-list'}">
                    文章管理
                </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-collection-tag"></i>
                    <span>分类</span>
                </template>
                <el-menu-item index="3-1" :route="{name: ''}">
                    新增分类
                </el-menu-item>
                <el-menu-item index="3-2" :route="{name: ''}">
                    分类管理
                </el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-chat-dot-square"></i>
                    <span>评论</span>
                </template>
                <el-menu-item index="4-1" :route="{name: ''}">
                    评论管理
                </el-menu-item>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title">
                    <i class="el-icon-user"></i>
                    <span>用户</span>
                </template>
                <el-menu-item index="5-1" :route="{name: ''}">
                    新增用户
                </el-menu-item>
                <el-menu-item index="5-2" :route="{name: ''}">
                    用户管理
                </el-menu-item>
            </el-submenu>
            <el-submenu index="6">
                <template slot="title">
                    <i class="el-icon-postcard"></i>
                    <span>角色</span>
                </template>
                <el-menu-item index="6-1" :route="{name: ''}">
                    新增角色
                </el-menu-item>
                <el-menu-item index="6-2" :route="{name: ''}">
                    角色管理
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: "Aside"
}
</script>

<style scoped>
.aside {
    height: 100%;
}

.el-menu {
    height: 100%;
}
</style>
