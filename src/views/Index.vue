<template>
    <div id="index">
        <el-alert type="info" center>
            <div class="welcome">
                <div class="welcome-title">
                    {{ sentence.note }}
                </div>
                <div class="welcome-content">
                    {{ sentence.content }}
                </div>
            </div>
        </el-alert>
        <Articles></Articles>
    </div>
</template>

<script>
    import axios from "axios"
    import Articles from "./Articles";

    export default {
        name: 'Index',
        components: {
            Articles,
        },
        data() {
            return {
                sentence: {
                    note: null,
                    content: null
                }
            }
        },
        created() {
            this.getSentence();
        },
        methods: {
            getSentence() {
                axios.get('/api/sentence').then(response => {
                    if (response.status == 200 && response.data.status == 'success') {
                        this.sentence = response.data.object
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .el-alert {
        padding: 1rem;
        margin-bottom: 1.25rem;
        background-color: #e8ecf3;
    }

    .welcome {
        color: #667c99;
        text-align: center;
    }

    .welcome-title {
        font-size: 1.25rem;
        margin-bottom: 1rem;
    }

    .welcome-content {
        line-height: 2;
        font-size: 1rem;
    }
</style>