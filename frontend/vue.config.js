// vue-cli 3 白名单清单，仅能使用下列配置参数，其余的会被设置为默认值
module.exports = {
    publicPath: './', // 部署应用包时的基本 URL
    lintOnSave: false, // eslint-loader 是否在保存的时候检查
    runtimeCompiler: true, // 设置为 true 后你就可以在 Vue 组件中使用 template 选项
    css: {
        modules: false, // 默认情况下，只有 *.module.[ext] 结尾的文件才会被视作 CSS Modules 模块
        // extract:true,                        // 生产环境下是 true，开发环境下是 false，是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)
        sourceMap: false, // 是否为 CSS 开启 source map
        loaderOptions: { // 向 CSS 相关的 loader 传递选项
            css: {
                // 这里的选项会传递给 css-loader
            },
            postcss: {
                // 这里的选项会传递给 postcss-loader
            }
        }
    },
    devServer: { // 所有 webpack-dev-server 的选项都支持
        // hot: true,
        // open: true,
        // host: '0.0.0.0',
        // port: 10000,
        // https: false,
        // hotOnly: false,
        // proxy: {
        // }
    },
    pluginOptions: {} // 第三方插件配置
}