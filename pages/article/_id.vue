<template>
    <div id="article">
        <div class="title">{{article.title}}</div>
        <ul class="info">
            <li><i class="el-icon-time"/>{{article.createdTime}}</li>
            <li><i class="el-icon-view"/>{{article.viewCount}}</li>
            <li><i class="el-icon-chat-square"/>{{article.commentCount}}</li>
            <li><i class="el-icon-collection-tag"/>{{article.category.name}}</li>
        </ul>
        <div class="content" v-html="article.content">
        </div>
        <div class="count">共 {{comments.total}} 条评论</div>
        <ul>
            <li class="comment" v-for="comment in comments.list" :key="comment.id">
                <div class="media">
                    <div class="username">{{comment.user.username}}</div>
                    <div class="time">{{comment.createdTime}}</div>
                </div>
                <div class="content" v-html="comment.content"></div>
            </li>
        </ul>

        <div v-if="this.$auth.loggedIn" class="form">
            <el-form ref="form">
                <el-form-item>
                    <el-input type="textarea" v-model="content" :autosize="{minRows: 2, maxRows: 10}"
                              placeholder="请输入内容" minlength="5" maxlength="200" show-word-limit>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" :loading="load" @click="onSubmit()">提交
                    </el-button>
                </el-form-item>
            </el-form>
        </div>

        <Pagination :navigateFirstPage="comments.navigateFirstPage"
                    :navigateLastPage="comments.navigateLastPage"
                    :navigatepageNums="comments.navigatepageNums"
                    :pageNum="comments.pageNum" :pages="comments.pages"
                    :prePage="comments.prePage" :nextPage="comments.nextPage"
                    route="{name: 'article-id', query: {id: this.$router.params.id}">
        </Pagination>
    </div>
</template>

<script>
    import Prism from 'prismjs';
    import Pagination from '~/components/Pagination';

    export default {
        name: 'blog-article',
        layout: 'blog',
        components: {
            Pagination
        },
        head() {
            return {
                title: this.article.title + ' | 文章',
                meta: [
                    {
                        hid: 'description',
                        name: 'description',
                        content: this.article.synopsis
                    }
                ]
            }
        },
        data() {
            return {
                article: {},
                comments: [],
                content: '',
                load: false,
            }
        },
        async asyncData({app, params, query}) {
            let article = await app.$axios.get('article/' + params.id)
            let url = 'comments?articleId=' + params.id
            if (query.page !== undefined)
                url = url + '&pageNum=' + query.page
            let comments = await app.$axios.get(url)
            return {
                article: article.data,
                comments: comments.data
            };
        },
        mounted() {
            Prism.highlightAll()
        },
        watchQuery: true,
        methods: {
            onSubmit() {
                if (this.content === null || this.content.trim().length < 5) {
                    this.$alert('评论至少5个字', '提交失败')
                } else {
                    this.load = true
                    let articleId = this.article.id
                    let content = this.content
                    this.$axios.post('comment', {articleId, content}).then(response => {
                        this.load = false
                        if (response && response.status === "success") {
                            this.content = null
                            this.comments = response.data
                            this.$message.success(response.message)
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .title {
        color: #000;
        line-height: 2;
        font-size: 20px;
    }

    .info {
        color: #666;
        display: flex;
        font-size: 12px;
        margin: 10px 20px 0 0;
    }

    .info > li {
        margin-right: 20px;
    }

    .content {
        color: #333;
        line-height: 2;
        margin: 20px 0;
        word-break: break-word;
    }

    img {
        width: 100%;
        height: auto;
    }

    .count {
        font-size: 20px;
        margin: 40px 0 20px;
    }

    .comment {
        padding-top: 20px;
        border-top: 1px solid #eee;
    }

    .username {
        color: #333;
    }

    .time {
        color: #888;
        font-size: 14px;
        line-height: 1.5;
        margin-left: 10px;
    }

    .form {
        margin-top: 25px;
    }

    .el-button {
        float: right;
    }
</style>
