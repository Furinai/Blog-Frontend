<template>
    <div class="search">
        <el-input v-model="keyword" @keyup.enter.native="search()"
                  prefix-icon="el-icon-search" placeholder="请输入内容，按回车键搜索"/>
        <div class="message" v-show="empty">
            没有搜索到结果，试试其它关键词。
        </div>
        <ul class="articles">
            <li class="article" v-for="article in articles.content" :key="article.id">
                <nuxt-link :to="{name: 'article-id', params: {id: article.id}}">
                    <div class="title">{{ article.title }}</div>
                </nuxt-link>
                <div class="synopsis">{{ article.synopsis }}</div>
            </li>
        </ul>
        <div class="pagination">
            <el-pagination layout="prev, pager, next" :pager-count="15" :total="articles.totalElements"
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
            keyword: "",
            articles: {},
            empty: false,
        }
    },
    methods: {
        search(pageNum) {
            if (this.keyword.trim() === '') {
                return
            }
            let keyword = this.keyword
            this.$axios.get('search', {params: {keyword, pageNum}}).then(response => {
                if (response.status === "success") {
                    this.articles = response.data
                    this.empty = this.articles.content.length === 0;
                }
            })
        },
        handlePageChange(pageNum) {
            this.search(pageNum - 1)
        },
    }
}
</script>

<style scoped>
.articles {
    margin-top: 25px;
}

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

.synopsis {
    color: #666;
    line-height: 2;
    overflow: hidden;
    font-size: 14px;
    margin: 15px 0 0;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

.message {
    margin-top: 30px;
}

.pagination {
    text-align: center;
}
</style>
