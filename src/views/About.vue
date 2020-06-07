<template>
    <ul class="about">
        <li>
            这是一个不成熟的博客项目。
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
            <el-tag>ElementUI</el-tag>
        </li>
    </ul>
</template>
<script>
    export default {
        name: "About",
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