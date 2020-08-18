<template>
    <div id="article">
        <div class="article-title">{{ article.title }}</div>
        <ul class="article-info">
            <li><i class="el-icon-time"/>{{ article.createdTime }}</li>
            <el-divider direction="vertical"/>
            <li><i class="el-icon-view"/>{{ article.viewCount }}</li>
            <el-divider direction="vertical"/>
            <li><i class="el-icon-chat-square"/>{{ article.commentCount }}</li>
            <el-divider direction="vertical"/>
            <li><i class="el-icon-collection-tag"/>{{ article.category.name }}</li>
        </ul>
        <div class="article-content" v-html="article.content">
        </div>
        <div class="comment-count">共 {{ comments.total }} 条评论</div>
        <ul>
            <li class="comment" v-for="comment in comments.list" :key="comment.id">
                <div class="media">
                    <div class="comment-username">{{ comment.user.username }}</div>
                    <div class="comment-created-time">{{ comment.createdTime }}</div>
                </div>
                <div class="comment-content" v-html="comment.content"></div>
            </li>
        </ul>

        <div v-if="this.$auth.loggedIn" class="comment-form">
            <el-form ref="form">
                <el-form-item>
                    <el-input type="textarea" v-model.trim="content" :autosize="{minRows: 2, maxRows: 10}"
                              placeholder="请输入内容" minlength="5" maxlength="500" show-word-limit/>
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
    async asyncData({app, params, query, error}) {
        let articleId = params.id
        let pageNum = query.page
        let article = await app.$axios.get('article/' + params.id)
        let comments = await app.$axios.get('comments', {params: {articleId, pageNum}})
        if (article.status === 'error') {
            error({statusCode: 404})
        }
        return {
            article: article.data,
            comments: comments.data
        }
    },
    mounted() {
        Prism.highlightAll()
    },
    watchQuery: true,
    methods: {
        onSubmit() {
            if (this.content === null || this.content.length < 5) {
                this.$alert('评论至少5个字', '提交失败')
            } else {
                this.load = true
                let articleId = this.article.id
                let content = this.content
                this.$axios.post('comment', {articleId, content}).then(response => {
                    if (response.status === 'success') {
                        this.content = null
                        this.comments = response.data
                        this.$message.success(response.message)
                    }
                    this.load = false
                })
            }
        }
    }
}
</script>