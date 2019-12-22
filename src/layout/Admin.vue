<template>
    <el-container>
        <el-main>
            <el-row type="flex" justify="center">
                <el-col :xs="24" :sm="18">
                    <keep-alive>
                        <router-view :key="this.$route.path"/>
                    </keep-alive>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "Admin"
    }
</script>

<style scoped>

</style>