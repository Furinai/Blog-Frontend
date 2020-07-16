<template>
    <div class="comments">
        <div class="count">共 {{ total }} 条评论</div>
        <ul>
            <li class="comment" v-for="(comment) in comments" :key="comment.id">
                <div class="media">
                    <div class="username">{{ comment.user.username }}</div>
                    <div class="time">{{ comment.createdTime }}</div>
                </div>
                <div class="content" v-html="comment.content"></div>
            </li>
        </ul>


        <div v-if="auth" class="form">
            <el-form ref="form">
                <el-form-item>
                    <el-input type="textarea" v-model="content" :autosize="{ minRows: 2, maxRows: 10 }"
                              placeholder="请输入内容" minlength="5" maxlength="200" show-word-limit>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" :loading="load" @click="onSubmit()">提交
                    </el-button>
                </el-form-item>
            </el-form>
        </div>

        <div class="pagination">
            <el-pagination background layout="prev, pager, next" :pager-count="5" :total="total" :page-size="20"
                           :hide-on-single-page="true" @current-change="handleCurrentChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {addComment, getComments} from "../utils/api";
    import {mapState} from "vuex";

    export default {
        name: "Comments",
        data() {
            return {
                comments: {},
                content: "",
                total: 0,
                load: false,
                articleId: this.$route.params.id
            }
        },
        created() {
            this.getComments(this.articleId)
        },
        computed: mapState([
            "auth"
        ]),
        methods: {
            getComments(articleId, pageNumber) {
                getComments({articleId, pageNumber}).then(response => {
                    if (response && response.status == "success") {
                        this.total = response.total
                        this.comments = response.data
                    }
                })
            },
            addComment(articleId, content) {
                this.load = true
                addComment({articleId, content}).then(response => {
                    this.load = false
                    if (response && response.status == "success") {
                        this.content = null
                        this.getComments(this.articleId)
                        this.$message.success(response.message)
                    }
                })
            },
            onSubmit() {
                if (this.content === null || this.content.length < 5) {
                    this.$alert("评论至少5个字", "提交失败")
                } else {
                    this.addComment(this.articleId, this.content)
                }
            },
            handleCurrentChange(pageNumber) {
                this.getComments(this.articleId, pageNumber)
            }
        }
    }
</script>

<style scoped>
    .count {
        font-size: 20px;
        margin: 40px 0 20px;
    }

    .comment {
        padding-top: 20px;
        border-top: 1px solid #eee;
    }

    .username {
        color: #333;
    }

    .time {
        color: #888;
        font-size: 14px;
        line-height: 1.5;
        margin-left: 10px;
    }

    .content {
        color: #333;
        line-height: 2;
        margin: 5px 0 10px;
        word-break: break-word;
    }

    .form {
        margin-top: 25px;
    }

    .el-button {
        float: right;
    }
</style>