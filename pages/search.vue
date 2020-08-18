<template>
    <div id="search">
        <div class="el-form-item">
            <el-input v-model.trim="keyword" placeholder="输入关键词搜索文章标题或摘要">
                <el-button slot="append" icon="el-icon-search" @click="search()"/>
            </el-input>
        </div>
        <ul class="articles">
            <li class="article" v-for="article in articles.content" :key="article.id">
                <nuxt-link :to="{name: 'article-id', params: {id: article.id}}">
                    <div class="article-title">{{ article.title }}</div>
                </nuxt-link>
                <div class="article-synopsis">{{ article.synopsis }}</div>
            </li>
        </ul>
        <div v-show="empty">
            没有搜索到结果，试试其它关键词。
        </div>
        <div class="pagination">
            <el-pagination layout="prev, pager, next" :pager-count="5" :total="articles.totalElements"
                           @current-change="handlePageChange" background hide-on-single-page/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'search',
    layout: 'blog',
    head() {
        return {
            title: '搜索'
        }
    },
    data() {
        return {
            keyword: '',
            articles: {},
            empty: false,
        }
    },
    methods: {
        search(pageNum) {
            if (this.keyword === '') {
                return
            }
            let keyword = this.keyword
            this.$axios.get('search', {params: {keyword, pageNum}}).then(response => {
                if (response.status === 'success') {
                    this.articles = response.data
                    this.empty = this.articles.content.length === 0;
                }
            })
        },
        handlePageChange(pageNum) {
            this.search(pageNum - 1)
        }
    }
}
</script>