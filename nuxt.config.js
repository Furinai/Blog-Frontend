export default {
    mode: 'universal',
    target: 'server',
    head: {
        title: 'Linter',
        titleTemplate:'%s | Linter',
        htmlAttrs: {
            lang: 'zh-Hans-CN',
        },
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: ''}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },
    css: [
        '~static/css/customize.css',
        '~static/css/normalize.css',
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
        '/api/': 'http://localhost:8080'
    },
    auth: {
        strategies: {
            local: {
                endpoints: {
                    login: {url: 'login', method: 'post', propertyName: 'token'},
                    user: {url: 'auth', method: 'get', propertyName: 'user'},
                    logout: {url: 'logout', method: 'get'},
                },
            }
        }
    },
    loading: {
        color: '#409EFF'
    }
}
