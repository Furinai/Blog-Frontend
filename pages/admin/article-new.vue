<template>
    <el-form :model="forms" :rules="rules" :ref="forms">
        <el-form-item prop="category">
            <el-select v-model="forms.category" value-key="id" placeholder="请选择或搜索分类" filterable>
                <el-option v-for="category in categories" :key="category.id" :label="category.name" :value="category">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="title">
            <el-input type="text" v-model="forms.title" placeholder="标题" maxlength="60" show-word-limit>
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-input type="textarea" v-model="forms.synopsis" :autosize="{minRows: 3, maxRows: 6}"
                      placeholder="摘要" minlength="10" maxlength="300" show-word-limit>
            </el-input>
        </el-form-item>
        <el-form-item prop="content">
            <Editor v-model="forms.content"/>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" size="small" @click="onSubmit(forms)" :loading="load">提交</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import Editor from '~/components/Editor';

export default {
    name: 'article-new',
    components: {
        Editor
    },
    layout: 'admin',
    head() {
        return {
            title: '发布文章'
        }
    },
    data() {
        return {
            forms: {
                title: '',
                synopsis: '',
                content: '',
                category: '',
            },
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
            categories: [],
            load: false
        }
    },
    async asyncData({app}) {
        let response = await app.$axios.get('categories')
        return {categories: response.data};
    },
    methods: {
        onSubmit(forms) {
            this.$refs[forms].validate((valid) => {
                if (valid) {
                    this.load = true
                    this.$axios.post('article', forms).then(response => {
                        this.load = false
                        if (response && response.status === 'success') {
                            this.$message.success(response.message)
                        }
                    });
                }
            });
        }
    }
}
</script>

<style scoped>
.el-button {
    float: right;
}
</style>
