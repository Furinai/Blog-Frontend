<template>
    <div id="error">
        <div v-if="error.statusCode === 404">
            <el-row type="flex" justify="center">
                <el-col :xs="18" :sm=6>
                    <img class="notfound-image" src="/img/404.png">
                    <div class="notfound-text">
                        页面不存在。
                        <nuxt-link :to="{name: 'index'}">
                            返回首页
                        </nuxt-link>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    props: ['error'],
    head() {
        return {
            title: '页面未找到',
            meta: [
                {name: 'viewport', content: 'width=device-width, initial-scale=1'}
            ]
        }
    }
}
</script>