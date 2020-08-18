<template>
    <el-container>
        <el-header height="50px">
            <Header/>
        </el-header>
        <el-main>
            <el-row type="flex" justify="center">
                <el-col :xs="24" :sm="18">
                    <nuxt/>
                </el-col>
            </el-row>
        </el-main>
        <el-footer height="80px">
            <Footer/>
        </el-footer>
    </el-container>
</template>

<script>
import Header from '~/components/Header';
import Footer from '~/components/Footer';

export default {
    name: 'blog',
    components: {
        Header,
        Footer
    },
    head() {
        return {
            meta: [
                {name: 'viewport', content: 'width=device-width, initial-scale=1'}
            ]
        }
    }
}
</script>
