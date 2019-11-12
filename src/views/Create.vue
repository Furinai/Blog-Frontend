<template>
    <div id="create">
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
            <el-form-item prop="content">
                <editor v-model="forms.content" :init="init">
                </editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="small" @click="onSubmit(forms)" :loading="load">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import 'tinymce'
    import axios from 'axios'
    import editor from '@tinymce/tinymce-vue'
    import 'tinymce/themes/silver/theme'
    import 'tinymce/plugins/codesample'
    import 'tinymce/plugins/table'
    import 'tinymce/plugins/image'
    import 'tinymce/plugins/media'
    import 'tinymce/plugins/code'
    import 'tinymce/plugins/link'

    export default {
        name: "Create",
        components: {
            editor
        },
        data() {
            return {
                forms: {
                    title: '',
                    content: '',
                    category: '',
                },
                rules: {
                    category: [
                        {
                            required: true,
                            message: '请选择分类',
                            trigger: 'change'
                        }
                    ],
                    title: [
                        {
                            required: true,
                            message: '请输入标题',
                            trigger: 'blur'
                        }
                    ],
                    content: [
                        {
                            required: true,
                            message: '请输入内容',
                            trigger: 'blur'
                        }
                    ]
                },
                categories: null,
                load: false,
                init: {
                    height: 300,
                    branding: false,
                    language: 'zh_CN',
                    convert_urls: false,
                    mobile: {theme: 'silver'},
                    images_upload_url: 'api/image',
                    link_assume_external_targets: 'http',
                    plugins: 'codesample table image media code link',
                    toolbar: 'undo redo | code codesample | forecolor backcolor | link image',
                    codesample_languages: [
                        {text: 'JavaScript', value: 'javascript'},
                        {text: 'HTML/XML', value: 'markup'},
                        {text: 'CSS', value: 'css'},
                        {text: 'Go', value: 'go'},
                        {text: 'C', value: 'c'},
                        {text: 'C++', value: 'cpp'},
                        {text: 'PHP', value: 'php'},
                        {text: 'Java', value: 'java'},
                        {text: 'Python', value: 'python'},
                    ],
                }
            }
        },
        created() {
            this.getCategories();
        },
        methods: {
            onSubmit(forms) {
                this.$refs[forms].validate((valid) => {
                    if (valid) {
                        this.load = true
                        this.forms.category.icon = null
                        this.forms.category.synopsis = null
                        axios({
                            method: 'post',
                            url: '/api/article',
                            data: {
                                title: this.forms.title,
                                content: this.forms.content,
                                category: this.forms.category
                            }
                        }).then(response => {
                            this.load = false
                            if (response.status == 200) {
                                if (response.data.status == 'success') {
                                    this.$router.replace({path: '/'})
                                } else {
                                    this.$alert(response.data.message, '失败！');
                                }
                            } else {
                                this.$alert('发表失败，请重新发表！', '失败！');
                            }
                        });
                    }
                });
            },
            getCategories() {
                axios.get('/api/categories', {params: {pageSize: 0}}).then(response => {
                    if (response.status == 200 && response.data.status == "success") {
                        this.total = response.data.total
                        this.categories = response.data.object
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