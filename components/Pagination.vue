<template>
    <div v-if="pages > 1" class="pagination">
        <div class="el-pagination is-background">
            <ul class="el-pager">
                <li>
                    <i v-if="pageNum === 1" class="el-icon el-icon-arrow-left"></i>
                    <nuxt-link v-else :to="{...route, query: {page: prePage}}">
                        <i class="el-icon el-icon-arrow-left"></i>
                    </nuxt-link>
                </li>
                <li v-if="navigateFirstPage > 1">
                    <nuxt-link :to="{...route, query: {page: 1}}">1</nuxt-link>
                </li>
                <li v-if="navigateFirstPage > 2" class="el-icon el-icon-more"></li>
                <li v-for="currentPage in pageNums"
                    :class="{active: currentPage === pageNum}">
                    <nuxt-link :to="{...route, query: {page: currentPage}}">
                        {{ currentPage }}
                    </nuxt-link>
                </li>
                <li v-if="navigateLastPage < pages - 1" class="el-icon el-icon-more"></li>
                <li v-if="navigateLastPage < pages">
                    <nuxt-link :to="{...route, query: {page: pages}}">
                        {{ pages }}
                    </nuxt-link>
                </li>
                <li>
                    <i v-if="pageNum === pages" class="el-icon el-icon-arrow-right"></i>
                    <nuxt-link v-else :to="{...route, query: {page: nextPage}}">
                        <i class="el-icon el-icon-arrow-right"></i>
                    </nuxt-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    props: {
        navigateFirstPage: 0,
        navigateLastPage: 0,
        navigatepageNums: '',
        pageNum: 0,
        prePage: 0,
        nextPage: 0,
        pages: 0,
        route: {}
    },
    computed: {
        pageNums() {
            if (this.navigateFirstPage > 2) {
                if (this.navigateLastPage < this.pages - 1) {
                    return this.navigatepageNums.slice(1, 4)
                } else {
                    return this.navigatepageNums.slice(1)
                }
            } else {
                return this.navigatepageNums;
            }
        }
    }
}
</script>