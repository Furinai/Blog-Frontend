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
            <el-input type="textarea" v-model="forms.synopsis" :autosize="{ minRows: 3, maxRows: 6 }"
                      placeholder="摘要" minlength="10" maxlength="300" show-word-limit>
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
</template>

<script>
    import "tinymce";
    import axios from "axios";
    import editor from "@tinymce/tinymce-vue";
    import "tinymce/themes/silver/theme";
    import "tinymce/plugins/codesample";
    import "tinymce/plugins/image";
    import "tinymce/plugins/media";
    import "tinymce/plugins/code";
    import "tinymce/plugins/link";
    import {addArticle} from "../../utils/api";

    export default {
        name: "Create",
        components: {
            editor
        },
        data() {
            return {
                forms: {
                    title: "",
                    synopsis:"",
                    content: "",
                    category: "",
                },
                rules: {
                    category: [
                        {
                            required: true,
                            message: "请选择分类",
                            trigger: "change"
                        }
                    ],
                    title: [
                        {
                            required: true,
                            message: "请输入标题",
                            trigger: "blur"
                        }
                    ],
                    content: [
                        {
                            required: true,
                            message: "请输入内容",
                            trigger: "blur"
                        }
                    ]
                },
                categories: null,
                load: false,
                init: {
                    height: 400,
                    branding: false,
                    language: "zh_CN",
                    convert_urls: false,
                    mobile: {theme: "silver"},
                    images_upload_url: "api/image",
                    link_assume_external_targets: "http",
                    plugins: "codesample image media code link",
                    toolbar: "undo redo | code codesample | forecolor backcolor | link image",
                    codesample_languages: [
                        {text: "C", value: "c"},
                        {text: "Go", value: "go"},
                        {text: "C++", value: "cpp"},
                        {text: "PHP", value: "php"},
                        {text: "CSS", value: "css"},
                        {text: "Java", value: "java"},
                        {text: "Python", value: "python"},
                        {text: "HTML/XML", value: "markup"},
                        {text: "JavaScript", value: "javascript"},
                    ],
                }
            }
        },
        created() {
            this.getCategories()
        },
        methods: {
            onSubmit(forms) {
                this.$refs[forms].validate((valid) => {
                    if (valid) {
                        this.load = true
                        addArticle(forms).then(response => {
                            this.load = false
                            if (response && response.status == "success") {
                                //this.$router.replace({path: "/"})
                            }
                        });
                    }
                });
            },
            getCategories() {
                axios.get("/api/categories", {params: {pageSize: 0}}).then(response => {
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
    .el-button {
        float: right;
    }
</style>