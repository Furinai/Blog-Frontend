<template>
    <div class="comment-list">
        <el-table :data="comments.list" ref="multipleTable" tooltipEffect="light"
                  @selection-change="handleSelectionChange" style="width: 100%" border>
            <el-table-column type="selection" align="center" width="50"/>
            <el-table-column prop="id" label="ID" align="center" width="100"/>
            <el-table-column prop="user.username" label="作者" align="center" width="150"/>
            <el-table-column prop="content" label="内容" align="center" show-overflow-tooltip/>
            <el-table-column prop="articleId" label="文章ID" align="center" width="100"/>
            <el-table-column prop="createdTime" label="创建时间" align="center" width="200"/>
            <el-table-column label="操作" align="center" width="100px">
                <template slot-scope="scope">
                    <el-button size="mini" @click="editComment(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="menu">
            <el-pagination background layout="prev, pager, next" :pager-count="15" :total="comments.total"
                           @current-change="handlePageChange"/>
            <el-button type="danger" size="mini" @click="deleteComment" :disabled="disabled">删除</el-button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'comment-list',
    head() {
        return {
            title: '评论列表'
        }
    },
    data() {
        return {
            comment: {},
            comments: {},
            disabled: true,
            currentPage: 1
        }
    },
    created() {
        this.getComments()
    },
    methods: {
        getComments(pageNum) {
            this.$axios.get('comments', {params: {pageNum}}).then(response => {
                if (response.status === 'success') {
                    this.comments = response.data
                }
            })
        },
        editComment(row) {
            this.$prompt('请输入评论内容', '编辑评论', {
                inputValue: row.content,
                inputPattern: /^.{5,500}$/,
                inputErrorMessage: '评论内容应为5-500个字符'
            }).then(({value}) => {
                row.content = value
                this.$axios.put('comment', row).then(response => {
                    if (response.status === 'success') {
                        this.$message.success(response.message)
                    }
                });
            }).catch(() => {
            });
        },
        deleteComment() {
            this.$confirm("确定要删除这些评论？").then(() => {
                let ids = [];
                this.$refs.multipleTable.selection.forEach(item => {
                    ids.push(item.id)
                })
                this.$axios.delete('comment', {data: ids}).then(response => {
                    if (response.status === 'success') {
                        this.getComments(this.currentPage)
                        this.$message.success(response.message)
                    }
                })
            })
        },
        handlePageChange(pageNum) {
            this.currentPage = pageNum
            this.getComments(pageNum)
        },
        handleSelectionChange(selection) {
            this.disabled = (selection.length === 0)
        }
    }
}
</script>