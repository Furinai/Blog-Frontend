<template>
    <el-row type="flex">
        <el-col v-for="category in categories" :key="category.id" :xs="12" :sm="6">
            <el-card class="category" shadow="never">
                <div class="media">
                    <img :src="category.icon" class="icon"/>
                    <div class="media-body">
                        <router-link :to="{ name: 'category', params:{ id: category.id}}">
                            <div class="name">{{ category.name }}</div>
                        </router-link>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
    import {getCategories} from "../utils/api";

    export default {
        name: "Categories",
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
            getCategories() {
                getCategories().then(response => {
                    if (response && response.status == "success") {
                        this.total = response.total
                        this.categories = response.object
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .category {
        margin: 5px;
    }

    .icon {
        width: 32px;
        height: 32px;
    }

    .name {
        color: #222;
        line-height: 2;
    }

    .el-row {
        flex-wrap: wrap;
    }
</style>