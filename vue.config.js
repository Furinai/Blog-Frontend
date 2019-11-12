module.exports = {
    outputDir: '../blog-springboot/src/main/resources/static',
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