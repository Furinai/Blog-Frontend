<template>
    <editor v-model="content" :init="init"/>
</template>

<script>
    import editor from '@tinymce/tinymce-vue';

    let tinymce;
    if (process.client) {
        tinymce = require('tinymce/tinymce');
        require('tinymce/themes/silver/theme');
        require('tinymce/icons/default/icons');
        require('tinymce/plugins/codesample');
        require('tinymce/plugins/table');
        require('tinymce/plugins/image');
        require('tinymce/plugins/media');
        require('tinymce/plugins/code');
        require('tinymce/plugins/link');
    }

    export default {
        name: 'Editor',
        components: {
            editor
        },
        props: {
            value: ''
        },
        data() {
            return {
                content: '',
                init: {
                    height: 350,
                    branding: false,
                    language: 'zh_CN',
                    base_url: 'tinymce',
                    convert_urls: false,
                    images_upload_url: 'api/image',
                    link_assume_external_targets: 'http',
                    plugins: 'codesample table image media code link',
                    toolbar: 'undo redo | code codesample | forecolor backcolor | link image',
                    codesample_languages: [
                        {text: 'Java', value: 'java'},
                        {text: 'C', value: 'c'},
                        {text: 'C++', value: 'cpp'},
                        {text: 'Go', value: 'go'},
                        {text: 'Python', value: 'python'},
                        {text: 'SQL', value: 'sql'},
                        {text: 'CSS', value: 'css'},
                        {text: 'HTML/XML', value: 'markup'},
                        {text: 'JavaScript', value: 'javascript'},
                    ]
                }
            }
        },
        watch: {
            value(newValue) {
                this.content = newValue
            },
            content(newContent) {
                this.$emit('input', newContent)
            }
        }
    }
</script>
