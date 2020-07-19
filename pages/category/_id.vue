<template>
    <div id="category">
        <Articles :articles="articles"/>
        <Pagination :navigateFirstPage="articles.navigateFirstPage"
                    :navigateLastPage="articles.navigateLastPage"
                    :navigatepageNums="articles.navigatepageNums"
                    :pageNum="articles.pageNum" :pages="articles.pages"
                    :prePage="articles.prePage" :nextPage="articles.nextPage"
                    route="{name: 'category-id', params: {id: this.$router.params.id}">
        </Pagination>
    </div>
</template>

<script>
    import Articles from '~/components/Articles';
    import Pagination from '~/components/Pagination';

    export default {
        name: 'blog-category',
        layout: 'blog',
        components: {
            Articles,
            Pagination
        },
        data() {
            return {
                category: {},
                articles: {}
            }
        },
        head() {
            return {
                title: this.category.name + ' | 分类'
            }
        },
        async asyncData({app, params, query}) {
            let category = await app.$axios.get('category/' + params.id)
            let url = 'articles?categoryId=' + params.id
            if (query.page != undefined)
                url = url + '&pageNum=' + query.page
            let articles = await app.$axios.get(url)
            return {
                category: category.data,
                articles: articles.data
            };
        },
        watchQuery: true
    }
</script>

<style scoped>
</style>
