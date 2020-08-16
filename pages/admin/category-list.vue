<template>
    <div class="category-list">
        <div v-show="!formVisible">
            <el-table :data="categories" style="width: 100%" border>
                <el-table-column prop="id" label="ID" align="center" width="200"/>
                <el-table-column prop="icon" label="图标" align="center" width="200">
                    <template slot-scope="scope">
                        <img :src="scope.row.icon" class="icon"/>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="名称" align="center"/>
                <el-table-column prop="sequence" label="次序" align="center" width="200"/>
                <el-table-column label="操作" align="center" width="200px">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="editCategory(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button type="danger" size="mini" @click="deleteCategory(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div v-show="formVisible">
            <el-row type="flex" justify="center">
                <el-col :span="6">
                    <el-upload ref="upload" action="" :limit="1" :show-file-list="false" :auto-upload="false"
                               :on-change="handleIconChange" :http-request="uploadIcon" drag>
                        <img :src="icon" class="icon-preview">
                    </el-upload>
                </el-col>
                <el-col :span="12">
                    <el-form label-position="top" :model="category" :rules="rules" :ref="category">
                        <el-form-item label="名称" prop="name">
                            <el-input type="text" v-model="category.name" maxlength="20" show-word-limit/>
                        </el-form-item>
                        <el-form-item label="次序" prop="sequence">
                            <el-input type="text" v-model.number="category.sequence" maxlength="4" show-word-limit/>
                        </el-form-item>
                        <el-form-item>
                            <el-button size="small" @click="formVisible = false">取消</el-button>
                            <el-button type="primary" size="small" @click="onSubmit(category)" :loading="load">提交
                            </el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
export default {
    name: 'category-list',
    head() {
        return {
            title: '分类列表'
        }
    },
    data() {
        return {
            icon: "",
            category: {},
            categories: [],
            formVisible: false,
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
    created() {
        this.getCategories()
    },
    methods: {
        getCategories() {
            this.$axios.get('categories').then(response => {
                if (response.status === "success") {
                    this.categories = response.data
                }
            })
        },
        editCategory(index, row) {
            this.category = JSON.parse(JSON.stringify(row))
            this.icon = row.icon
            this.formVisible = true
        },
        deleteCategory(index, row) {
            this.$confirm("确定要删除这些分类及其所有文章？")
                .then(() => {
                    let id = row.id
                    this.$axios.delete('category/' + id).then(response => {
                        if (response.status === "success") {
                            this.$message.success(response.message)
                            this.categories.splice(index, 1)
                        }
                    })
                })
        },
        onSubmit(category) {
            this.$refs[category].validate((valid) => {
                if (valid) {
                    this.load = true
                    if (this.icon === this.category.icon) {
                        this.updateCategory()
                    } else {
                        this.$refs.upload.submit()
                    }
                }
            });
        },
        uploadIcon(params) {
            let formData = new FormData();
            formData.append('file', params.file)
            let headers = {'Content-Type': 'multipart/form-data'}
            this.$axios.post('icon', formData, headers).then(response => {
                if (response.status === 'success') {
                    this.category.icon = response.data
                    this.updateCategory()
                }
            })
        },
        updateCategory() {
            this.$axios.put('category', this.category).then(response => {
                if (response.status === 'success') {
                    this.getCategories()
                    this.formVisible = false
                    this.$message.success(response.message)
                }
                this.load = false
            });
        },
        handleIconChange(file) {
            this.icon = URL.createObjectURL(file.raw);
        }
    }
}
</script>