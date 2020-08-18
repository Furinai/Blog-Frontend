<template>
    <div id="aside">
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
                <el-menu-item index="3-1" :route="{name: 'admin-category-new'}">
                    新增分类
                </el-menu-item>
                <el-menu-item index="3-2" :route="{name: 'admin-category-list'}">
                    分类管理
                </el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <i class="el-icon-chat-dot-square"></i>
                    <span>评论</span>
                </template>
                <el-menu-item index="4-1" :route="{name: 'admin-comment-list'}">
                    评论管理
                </el-menu-item>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title">
                    <i class="el-icon-user"></i>
                    <span>用户</span>
                </template>
                <el-menu-item index="5-1" :route="{name: 'admin-user-new'}">
                    新增用户
                </el-menu-item>
                <el-menu-item index="5-2" :route="{name: 'admin-user-list'}">
                    用户管理
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: 'Aside'
}
</script>