<template>
    <div id="article">
        <div v-if="article">
            <div class="article-title">{{ article.title }}</div>
            <div class="media">
                <el-avatar :src="article.user.avatar"></el-avatar>
                <div class="media-body">
                    <div class="flex content-between">
                        <router-link :to="{ name: 'user', params: { id: article.user.id}}">
                            <div class="text-small text-stressed">{{ article.user.username }}</div>
                        </router-link>
                        <div class="text-small">
                            楼主
                        </div>
                    </div>
                    <div class="text-small text-muted">{{ article.createTime }}</div>
                </div>
            </div>
            <div class="article-content" v-html="article.content">
            </div>
            <div class="flex content-between">
                <div class="comment-count">{{ total }} 条评论</div>
                <div class="comment-sort">最新发表</div>
            </div>
            <ul>
                <li class="comment" v-for="(comment, index) in comments" :key="comment.id">
                    <div class="media">
                        <el-avatar :src="comment.user.avatar"></el-avatar>
                        <div class="media-body">
                            <div class="flex content-between">
                                <router-link :to="{ name: 'user', params: { id: comment.user.id}}">
                                    <div class="text-small text-stressed">{{ comment.user.username }}</div>
                                </router-link>
                                <div class="text-small text-muted">
                                    {{ index+1 }} 楼
                                </div>
                            </div>
                            <div class="text-small text-muted">{{ comment.createTime }}</div>
                        </div>
                    </div>
                    <div class="comment-content" v-html="comment.content"></div>
                </li>
            </ul>
            <div v-if="user" class="media comment-form">
                <el-avatar :src="article.user.avatar"></el-avatar>
                <div class="media-body">
                    <el-form ref="form">
                        <el-form-item>
                            <el-input type="textarea" v-model="content" :autosize="{ minRows: 3, maxRows: 10 }"
                                      placeholder="请输入内容" minlength="5" maxlength="200" show-word-limit>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" size="small" :loading="load" @click="onSubmit()">提交
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="pagination">
                <el-pagination background layout="prev, pager, next" :pager-count="5" :total="total" :page-size="20"
                               :hide-on-single-page="true" @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import axios from "axios";
    import Prism from 'prismjs'

    export default {
        name: 'Article',
        data() {
            return {
                article: null,
                comments: null,
                content: null,
                total: null,
                load: false
            }
        },
        created() {
            this.getArticle();
            this.getComments();
        },
        updated() {
            Prism.highlightAll()
        },
        computed: mapState([
            'user'
        ]),
        watch: {
            "$route": function () {
                this.getArticle();
            }
        },
        methods: {
            getArticle() {
                axios.get('/api/article/' + this.$route.params.id).then(response => {
                    if (response.status == 200 && response.data.status == 'success') {
                        this.article = response.data.object
                    }
                });
            },
            getComments(pageNumber) {
                axios.get('/api/comments', {
                    params: {
                        pageNumber: pageNumber,
                        articleId: this.$route.params.id
                    }
                }).then(response => {
                    if (response.status == 200 && response.data.status == 'success') {
                        this.total = response.data.total
                        this.comments = response.data.object
                    }
                });
            },
            onSubmit() {
                if (this.content === null || this.content.length < 5) {
                    this.$alert("评论至少5个字", "提交失败")
                } else {
                    this.load = true
                    axios({
                        method: 'post',
                        url: '/api/comment',
                        data: {
                            articleId: this.$route.params.id,
                            content: this.content
                        }
                    }).then(response => {
                        this.load = false
                        if (response.status == 200) {
                            if (response.data.status == 'success') {
                                this.getComments()
                            } else {
                                this.$alert(response.data.message, '失败！');
                            }
                        } else {
                            this.$alert('提交失败，请重新提交！', '失败！');
                        }
                    });
                }
            },
            handleCurrentChange(pageNumber) {
                this.getComments(pageNumber);
            }
        }
    }
</script>

<style scoped>
    .article-title {
        color: #222;
        line-height: 2;
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }

    .article-content {
        color: #444;
        line-height: 2;
        margin: 1rem 0;
        word-break: break-word;
    }

    .comment {
        padding: 0.5rem 0;
    }

    .comment-count {
        font-size: 1.25rem;
        margin: 1rem 0;
    }

    .comment-sort {
        margin: 1.25rem 0;
    }

    .comment-content {
        color: #444;
        line-height: 2;
        margin: 0.25rem;
        word-break: break-word;
    }

    .comment-form {
        margin: 1rem 0 -1rem;
    }

    .article-content > p > a {
        color: darkcyan;
    }

    .el-button {
        float: right;
    }
</style>