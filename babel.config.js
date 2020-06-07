module.exports = {
    presets: [
        "@vue/cli-plugin-babel/preset"
    ],
    plugins: [
        [
            "component",
            {
                "libraryName": "element-ui",
                "styleLibraryName": "theme-chalk"
            }
        ],
        [
            "prismjs",
            {
                "languages": [
                    "c",
                    "go",
                    "cpp",
                    "php",
                    "css",
                    "java",
                    "python",
                    "markup",
                    "javascript",
                ],
                "theme": "coy",
                "css": true
            }
        ]
    ]
}
