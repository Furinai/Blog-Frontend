export default {
    mode: 'universal',
    target: 'server',
    head: {
        title: 'Linter',
        titleTemplate: '%s | Linter',
        htmlAttrs: {
            lang: 'zh-CN',
        },
        meta: [
            {charset: 'utf-8'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },
    css: [
        '~static/css/customize.css'
    ],
    plugins: [
        '~/plugins/element-ui',
        '~/plugins/axios',
    ],
    components: true,
    buildModules: [],
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth'
    ],
    build: {
        extractCSS: true,
        babel: {
            plugins: [
                [
                    'component',
                    {
                        'libraryName': 'element-ui',
                        'styleLibraryName': 'theme-chalk'
                    }
                ],
                [
                    'prismjs',
                    {
                        'languages': [
                            'java',
                            'c',
                            'cpp',
                            'go',
                            'python',
                            'sql',
                            'css',
                            'markup',
                            'javascript',
                        ],
                        'theme': 'coy',
                        'css': true
                    }
                ]
            ]
        }
    },
    axios: {
        prefix: '/api/',
        proxy: true
    },
    proxy: {
        '/api/': 'http://localhost:8080',
        '/upload/': 'http://localhost:8080'
    },
    auth: {
        strategies: {
            local: {
                endpoints: {
                    login: {url: 'login', method: 'post', propertyName: false},
                    user: {url: 'auth', method: 'get', propertyName: false},
                    logout: {url: 'logout', method: 'get'}
                },
                tokenRequired: false,
                tokenType: false
            }
        }
    },
    loading: {
        color: '#409EFF'
    }
}
