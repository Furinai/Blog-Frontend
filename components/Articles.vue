<template>
    <div id="articles">
        <ul>
            <li class="article" v-for="article in articles.list" :key="article.id">
                <nuxt-link :to="{name: 'article-id', params: {id: article.id}}">
                    <div class="article-title">{{ article.title }}</div>
                </nuxt-link>
                <div class="article-synopsis">{{ article.synopsis }}</div>
                <ul class="article-info">
                    <li><i class="el-icon-time"/>{{ article.createdTime }}</li>
                    <el-divider direction="vertical"/>
                    <li><i class="el-icon-view"/>{{ article.viewCount }}</li>
                    <el-divider direction="vertical"/>
                    <li><i class="el-icon-chat-square"/>{{ article.commentCount }}</li>
                    <el-divider direction="vertical"/>
                    <li><i class="el-icon-collection-tag"/>{{ article.category.name }}</li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'Articles',
    props: {
        articles: {}
    }
}
</script>