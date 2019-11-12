<template>
    <div id="articles">
        <ul>
            <li class="article" v-for="article in articles" :key="article.id">
                <div class="media">
                    <el-avatar :src="article.user.avatar"></el-avatar>
                    <div class="media-body">
                        <div class="flex content-between">
                            <router-link :to="{ name: 'user', params: { id: article.user.id}}">
                                <div class="text-small text-stressed">{{ article.user.username }}</div>
                            </router-link>
                            <div class="text-small text-muted">
                                <i class="el-icon-chat-dot-square"></i> {{ article.commentCount }}
                            </div>
                        </div>
                        <div class="text-small text-muted">{{ article.createTime }}</div>
                    </div>
                </div>
                <router-link :to="{ name: 'article', params:{ id: article.id}}">
                    <div class="article-title">{{ article.title }}</div>
                    <div class="article-summary"> {{ article.summary }}</div>
                </router-link>
            </li>
        </ul>
        <div class="pagination">
            <el-pagination background layout="prev, pager, next" :pager-count="5"
                           :total="total" :hide-on-single-page="true"
                           @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Articles',
        data() {
            return {
                total: null,
                articles: null
            }
        },
        created() {
            this.getArticles();
        },
        methods: {
            getArticles(pageNumber) {
                axios.get('/api/articles', {
                    params: {
                        categoryId: this.$route.params.id,
                        pageNumber: pageNumber
                    }
                }).then(response => {
                    if (response.status == 200 && response.data.status == 'success') {
                        this.total = response.data.total
                        this.articles = response.data.object
                    }
                });
            },
            handleCurrentChange(pageNumber) {
                this.getArticles(pageNumber);
            }
        }
    }
</script>

<style scoped>
    .article {
        padding: 1rem 0;
    }

    .article:first-child {
        padding-top: 0.25rem;
    }

    .article-title {
        color: #222;
        line-height: 2.5;
        font-size: 1.125rem;
    }

    .article-summary {
        color: #888;
        line-height: 2;
        overflow: hidden;
        font-size: 0.875rem;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
</style>