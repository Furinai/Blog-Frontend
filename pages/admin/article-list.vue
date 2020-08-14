<template>
    <div class="article-list">
        <div v-show="!formVisible">
            <el-table :data="articles.list" ref="multipleTable" style="width: 100%"
                      @selection-change="handleSelectionChange" border>
                <el-table-column type="selection" align="center" width="50"/>
                <el-table-column prop="id" label="ID" align="center" width="100"/>
                <el-table-column prop="title" label="标题" align="center"/>
                <el-table-column prop="createdTime" label="创建时间" align="center" width="200"/>
                <el-table-column prop="category.name" label="所属分类" align="center" width="150"/>
                <el-table-column prop="commentCount" label="评论数量" align="center" width="150"/>
                <el-table-column label="操作" align="center" width="100px">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="editArticle(scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="menu">
                <el-pagination background layout="prev, pager, next" :pager-count="15" :total="articles.total"
                               @current-change="handlePageChange"/>
                <el-button type="danger" size="mini" @click="deleteArticle" :disabled="disabled">删除</el-button>
            </div>
        </div>
        <div v-show="formVisible">
            <el-form :model="article" :rules="rules" :ref="article">
                <el-form-item prop="category">
                    <el-select v-model="article.category" value-key="id" placeholder="请选择或搜索分类" filterable>
                        <el-option v-for="category in categories" :key="category.id" :label="category.name" :value="category">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="title">
                    <el-input type="text" v-model="article.title" placeholder="标题" maxlength="60" show-word-limit/>
                </el-form-item>
                <el-form-item>
                    <el-input type="textarea" v-model="article.synopsis" :autosize="{minRows: 3, maxRows: 6}"
                              placeholder="摘要" minlength="10" maxlength="300" show-word-limit/>
                </el-form-item>
                <el-form-item prop="content">
                    <Editor v-model="article.content"/>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" @click="formVisible = false">取消</el-button>
                    <el-button size="small" @click="onSubmit(article)" type="primary" :loading="load">确认</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import Editor from '~/components/Editor';

export default {
    name: 'article-list',
    components: {
        Editor
    },
    head() {
        return {
            title: '文章列表'
        }
    },
    data() {
        return {
            article: {},
            articles: {},
            categories: [],
            disabled: true,
            currentPage: 0,
            formVisible: false,
            rules: {
                category: [
                    {
                        required: true,
                        message: '请选择分类'
                    }
                ],
                title: [
                    {
                        required: true,
                        message: '请输入标题'
                    }
                ],
                content: [
                    {
                        required: true,
                        message: '请输入内容'
                    }
                ]
            },
            load: false
        }
    },
    created() {
        this.getArticles()
    },
    methods: {
        getArticle(id) {
            this.$axios.get('article/' + id).then(response => {
                if (response && response.status === "success") {
                    this.article = response.data
                }
            })
        },
        getArticles(pageNum) {
            this.$axios.get('articles', {params: {pageNum}}).then(response => {
                if (response && response.status === "success") {
                    this.articles = response.data
                }
            })
        },
        getCategories() {
            this.$axios.get('categories').then(response => {
                if (response && response.status === "success") {
                    this.categories = response.data
                }
            })
        },
        editArticle(row) {
            if (this.categories.length === 0) {
                this.getCategories()
            }
            this.getArticle(row.id)
            this.formVisible = true
        },
        deleteArticle() {
            this.$confirm("此操作会永久删除这些文章及其所有评论, 是否继续?").then(() => {
                let ids = [];
                this.$refs.multipleTable.selection.forEach(item => {
                    ids.push(item.id)
                })
                this.$axios.delete('article', {data: ids}).then(response => {
                    if (response && response.status === "success") {
                        this.getArticles(this.currentPage)
                        this.$message.success(response.message)
                    }
                })
            })
        },
        onSubmit(article) {
            this.$refs[article].validate((valid) => {
                if (valid) {
                    this.load = true
                    this.$axios.put('article', article).then(response => {
                        this.load = false
                        if (response && response.status === 'success') {
                            this.getArticles(this.currentPage)
                            this.formVisible = false
                            this.$message.success(response.message)
                        }
                    });
                }
            });
        },
        handlePageChange(pageNum) {
            this.currentPage = pageNum
            this.getArticles(pageNum)
        },
        handleSelectionChange(selection) {
            this.disabled = (selection.length === 0)
        }
    }
}
</script>