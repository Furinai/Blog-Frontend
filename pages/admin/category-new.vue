<template>
    <div class="media">
        <el-upload ref="upload" action="" :limit="1" :show-file-list="false" :auto-upload="false"
                   :on-change="handleIconChange" :http-request="uploadIcon" drag>
            <img v-if="icon" :src="icon" class="icon-preview">
            <i v-else class="el-icon-upload"></i>
        </el-upload>
        <div class="media-body">
            <el-form label-position="top" :model="category" :rules="rules" :ref="category">
                <el-form-item label="名称" prop="name">
                    <el-input type="text" v-model="category.name" maxlength="6" show-word-limit/>
                </el-form-item>
                <el-form-item label="次序" prop="sequence">
                    <el-input type="text" v-model.number="category.sequence" maxlength="4" show-word-limit/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="onSubmit(category)" :loading="load">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'category-new',
    layout: 'admin',
    head() {
        return {
            title: '新增分类'
        }
    },
    data() {
        return {
            icon: '',
            category: {
                icon: '',
                name: '',
                sequence: '',
            },
            rules: {
                name: [
                    {
                        required: true,
                        message: '请输入名称',
                        trigger: 'blur'
                    }
                ],
                sequence: [
                    {
                        required: true, message: '请输入次序', trigger: 'blur'
                    },

                    {
                        type: 'number', message: '次序必须为数字值', trigger: 'blur'
                    }
                ]
            },
            load: false
        }
    },
    methods: {
        onSubmit(category) {
            this.$refs[category].validate((valid) => {
                if (valid) {
                    if (this.icon === '') {
                        this.$message.error("请上传图标！")
                    } else {
                        this.$refs.upload.submit()
                    }
                }
            });
        },
        uploadIcon(params) {
            this.load = true
            let formData = new FormData();
            formData.append('file', params.file)
            let headers = {'Content-Type': 'multipart/form-data'}
            this.$axios.post('icon', formData, headers).then(response => {
                if (response.status === 'success') {
                    let category = this.category
                    category.icon = response.data
                    this.$axios.post('category', category).then(response => {
                        if (response.status === 'success') {
                            this.icon = ''
                            this.$refs[category].resetFields()
                            this.$message.success(response.message)
                        }
                        this.load = false
                    });
                }
            })
        },
        handleIconChange(file) {
            this.icon = URL.createObjectURL(file.raw);
        }
    }
}
</script>