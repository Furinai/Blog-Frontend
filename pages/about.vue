<template>
    <ul class="about">
        <li>
            基于SpringBoot和Nuxt的服务端渲染的博客系统。
        </li>
        <li>
            项目源代码：
            <el-link type="primary" target="_blank"
                     href="https://github.com/citrucn/Blog">
                Github仓库地址
            </el-link>
        </li>
        <li>
            项目技术栈：
            <el-tag>SpringBoot</el-tag>
            <el-tag>SpringMvc</el-tag>
            <el-tag>SpringSecurity</el-tag>
            <el-tag>Mybatis</el-tag>
            <el-tag>Druid</el-tag>
            <el-tag>Vue</el-tag>
            <el-tag>Nuxt</el-tag>
            <el-tag>ElementUI</el-tag>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'about',
    layout: 'blog',
    head() {
        return {
            title: '关于'
        }
    }
}
</script>

<style scoped>
.about > li {
    margin-bottom: 20px;
}

.el-tag {
    margin: 5px;
}
</style>
