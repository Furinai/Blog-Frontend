<template>
    <div>
        <el-row type="flex" justify="center" :gutter="20">
            <el-col :span="12">
                <el-card shadow="never">
                    <div slot="header">
                        <i class="el-icon-data-analysis"/>
                        <span>文章统计</span>
                    </div>
                    <i class="el-icon-pie-chart"/>
                    今日文章数<br><br>
                    <i class="el-icon-pie-chart"/>
                    本月文章数<br><br>
                    <i class="el-icon-pie-chart"/>
                    总计文章数
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="never">
                    <div slot="header">
                        <i class="el-icon-data-analysis"/>
                        <span>评论统计</span>
                    </div>
                    <i class="el-icon-pie-chart"/>
                    今日评论数<br><br>
                    <i class="el-icon-pie-chart"/>
                    本月评论数<br><br>
                    <i class="el-icon-pie-chart"/>
                    总计评论数
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'admin-index',
    head() {
        return {
            title: '后台首页'
        }
    }
}
</script>