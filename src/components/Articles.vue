<template>
    <div class="articles">
        <ul>
            <li class="article" v-for="article in articles" :key="article.id">
                <router-link :to="{ name: 'article', params: { id: article.id}}">
                    <div class="title">{{ article.title }}</div>
                </router-link>
                <div class="synopsis">{{ article.synopsis }}</div>
                <ul class="info">
                    <li class="time"><i class="el-icon-time"/>{{ article.createTime }}</li>
                    <li class="view"><i class="el-icon-view"/>{{ article.viewCount }}</li>
                    <li class="comment"><i class="el-icon-chat-square"/>{{ article.commentCount }}</li>
                    <li class="category"><i class="el-icon-collection-tag"/>{{ article.category.name }}</li>
                </ul>
            </li>
        </ul>
        <div class="pagination">
            <el-pagination background layout="prev, pager, next" :pager-count="5" :total="total"
                           :hide-on-single-page="true" @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {getArticles} from "../utils/api";

    export default {
        name: "Articles",
        data() {
            return {
                total: 0,
                articles: {},
                categoryId: this.$route.params.id
            }
        },
        created() {
            this.getArticles(this.categoryId)
        },
        methods: {
            getArticles(categoryId, pageNumber) {
                getArticles({categoryId, pageNumber}).then(response => {
                    if (response && response.status == "success") {
                        this.total = response.total
                        this.articles = response.object
                    }
                });
            },
            handleCurrentChange(pageNumber) {
                this.getArticles(this.categoryId, pageNumber)
            }
        }
    }
</script>

<style scoped>
    .article {
        padding: 20px 0;
        border-bottom: 1px solid #eee;
    }

    .article:first-child {
        padding-top: 0;
    }

    .article:last-child {
        border-bottom: 0;
    }

    .title {
        line-height: 1.5;
        color: #333;
    }

    .title:hover {
        color: #409EFF;
    }

    .icon {
        width: 40px;
        height: 40px;
    }

    .name {
        margin-left: 10px;
        line-height: 25px;
    }

    .info {
        color: #666;
        display: flex;
        font-size: 12px;
        margin-right: 20px;
    }

    .info > li {
        margin-right: 20px;
    }

    .synopsis {
        color: #666;
        line-height: 2;
        overflow: hidden;
        font-size: 14px;
        margin: 15px 0 20px;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }
</style>