<template>
    <div class="articles">
        <ul>
            <li class="article" v-for="article in articles.list" :key="article.id">
                <nuxt-link :to="{name: 'article-id', params: {id: article.id}}">
                    <div class="title">{{article.title}}</div>
                </nuxt-link>
                <div class="synopsis">{{article.synopsis}}</div>
                <ul class="info">
                    <li class="time"><i class="el-icon-time"/>{{article.createdTime}}</li>
                    <li class="view"><i class="el-icon-view"/>{{article.viewCount}}</li>
                    <li class="comment"><i class="el-icon-chat-square"/>{{article.commentCount}}</li>
                    <li class="category"><i class="el-icon-collection-tag"/>{{article.category.name}}</li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'Articles',
        props: {articles: {}}
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
