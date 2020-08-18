<template>
    <div>
        <el-row type="flex" justify="center" :gutter="20">
            <el-col :span="12">
                <el-card shadow="never">
                    <div slot="header">
                        <i class="el-icon-data-analysis"/>
                        <span>文章统计</span>
                    </div>
                    <div class="text-between">
                        <span><i class="el-icon-pie-chart"/>今日文章数</span>
                        <span>{{ count.today_article_count }}</span>
                    </div>
                    <div class="text-between">
                        <span><i class="el-icon-pie-chart"/>本月文章数</span>
                        <span>{{ count.month_article_count }}</span>
                    </div>
                    <div class="text-between">
                        <span><i class="el-icon-pie-chart"/>总计文章数</span>
                        <span>{{ count.total_article_count }}</span>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card shadow="never">
                    <div slot="header">
                        <i class="el-icon-data-analysis"/>
                        <span>评论统计</span>
                    </div>
                    <div class="text-between">
                        <span><i class="el-icon-pie-chart"/>今日评论数</span>
                        <span>{{ count.today_comment_count }}</span>
                    </div>
                    <div class="text-between">
                        <span><i class="el-icon-pie-chart"/>本月评论数</span>
                        <span>{{ count.month_comment_count }}</span>
                    </div>
                    <div class="text-between">
                        <span><i class="el-icon-pie-chart"/>总计评论数</span>
                        <span>{{ count.total_comment_count }}</span>
                    </div>
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
    },
    data() {
        return {
            count: {}
        }
    },
    created() {
        this.getCount();
    },
    methods: {
        getCount() {
            this.$axios.get('count').then(response => {
                if (response.status === 'success') {
                    this.count = response.data
                }
            })
        }
    }
}
</script>