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
                base_url: '/tinymce',
                convert_urls: false,
                image_description: false,
                link_assume_external_targets: 'http',
                images_upload_handler: this.uploadImage,
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
    },
    methods: {
        uploadImage(blobInfo, success, failure, progress) {
            let formData = new FormData();
            formData.append('file', blobInfo.blob(), blobInfo.filename());
            this.$axios.post('image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    onUploadProgress: event => {
                        progress(event.loaded / event.total * 100);
                    }
                }
            ).then(response => {
                if (response.status === 'success') {
                    success(response.data)
                } else {
                    failure(response.message)
                }
            })
        }
    }
}
</script>
