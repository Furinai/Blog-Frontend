<template>
    <div v-if="article">
        <div class="title">{{ article.title }}</div>
        <ul class="info">
            <li><i class="el-icon-time"/>{{ article.createdTime }}</li>
            <li><i class="el-icon-view"/>{{ article.viewCount }}</li>
            <li><i class="el-icon-chat-square"/>{{ article.commentCount }}</li>
            <li><i class="el-icon-collection-tag"/>{{ article.category.name }}</li>
        </ul>
        <div class="content" v-html="article.content">
        </div>
        <Comments/>
    </div>
</template>

<script>
    import Comments from "../components/Comments";
    import {getArticle} from "../utils/api";
    import Prism from "prismjs";

    export default {
        name: "Article",
        data() {
            return {
                article: {category: {}},
                articleId: this.$route.params.id
            }
        },
        components: {
            Comments,
        },
        created() {
            this.getArticle(this.articleId)
        },
        updated() {
            Prism.highlightAll()
        },
        methods: {
            getArticle(articleId) {
                getArticle(articleId).then(response => {
                    if (response && response.status == "success") {
                        this.article = response.data
                        document.title = this.article.title + " | 文章 | Linter"
                    }
                });
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
</style>