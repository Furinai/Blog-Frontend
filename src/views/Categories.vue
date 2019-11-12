<template>
    <div id="categories">
        <el-row type="flex">
            <el-col v-for="category in categories" :key="category.id" :xs="24" :sm="6">
                <el-card class="category" shadow="never">
                    <div class="media">
                        <img :src="category.icon" class="category-icon"/>
                        <div class="media-body">
                            <router-link :to="{ name: 'category', params:{ id: category.id}}">
                                <div class="category-name">{{ category.name }}</div>
                            </router-link>
                        </div>
                    </div>
                    <div class="category-synopsis">
                        {{ category.synopsis }}
                    </div>
                </el-card>
            </el-col>
        </el-row>
        <div class="pagination">
            <el-pagination background layout="prev, pager, next" :pager-count="5" :total="total" :page-size="20"
                           :hide-on-single-page="true" @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: 'Categories',
        data() {
            return {
                total: null,
                categories: null
            }
        },
        created() {
            this.getCategories();
        },
        methods: {
            getCategories(pageNumber) {
                axios.get('/api/categories', {
                    params: {
                        pageNumber: pageNumber
                    }
                }).then(response => {
                    if (response.status == 200 && response.data.status == "success") {
                        this.total = response.data.total
                        this.categories = response.data.object
                    }
                });
            },
            handleCurrentChange(pageNumber) {
                this.getCategories(pageNumber);
            }
        }
    }
</script>

<style scoped>
    .category {
        margin: 0.4rem;
    }

    .category-icon {
        width: 2rem;
        height: 2rem;
    }

    .category-name {
        color: #222;
        line-height: 2rem;
    }

    .category-synopsis {
        color: #555;
        line-height: 2;
        overflow: hidden;
        font-size: 0.8rem;
        margin-top: 0.5rem;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
    }

    .el-row {
        flex-wrap: wrap;
    }
</style>