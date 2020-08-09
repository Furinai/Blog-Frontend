<template>
    <div class="index">
        <Articles :articles="articles"/>
        <Pagination :navigateFirstPage="articles.navigateFirstPage"
                    :navigateLastPage="articles.navigateLastPage"
                    :navigatepageNums="articles.navigatepageNums"
                    :pageNum="articles.pageNum" :pages="articles.pages"
                    :prePage="articles.prePage" :nextPage="articles.nextPage"
                    route="{name: 'index'}">
        </Pagination>
    </div>
</template>

<script>
import Articles from '~/components/Articles';
import Pagination from '~/components/Pagination';

export default {
    name: 'index',
    layout: 'blog',
    components: {
        Articles,
        Pagination
    },
    head() {
        return {
            title: '首页'
        }
    },
    data() {
        return {
            articles: {}
        }
    },
    watchQuery: true,
    async asyncData({app, query}) {
        let url = 'articles'
        if (query.page !== undefined)
            url = url + '?pageNum=' + query.page
        let response = await app.$axios.get(url)
        return {articles: response.data};
    }
}
</script>
