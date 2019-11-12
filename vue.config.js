module.exports = {
    outputDir: '../blog-backend/src/main/resources/static',
    productionSourceMap: false,
    devServer: {
        proxy: 'http://localhost'
    },
    configureWebpack: {
        performance: {
            hints: false
        }
    }
}