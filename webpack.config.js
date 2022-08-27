const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development', // 打包模式 production 压缩  /  development 不压缩
    entry: './src/main.js', // js入口文件
    // js出口文件
    output: {
        path: path.resolve(__dirname, './dist'), // 利用path包获取绝对路径
        filename: 'static/js/[name].[hash:4].js', // 打包成功后的文件名
        clean: true // 清理上一次dist文件中旧的代码文件
    },
    //开发服务器配置
    devServer: {
        port: 8081, //端口号
        static: './public/dist', // 服务目标文件路径
        compress: true, //是否压缩
        open: true, // 启动后自动打开页面
        hot: true // 开启热更新
    },
    // 模块配置
    module: {},
    // 插件配置
    plugins: [
        new HtmlWebpackPlugin({
            title: 'ckplayer',
            template: './public/index.html',
            filename: 'index.html', // 输入文件名
            favicon: './public/favicon.ico',
            inject: 'body', // 把output的js文件注入到body
            hash: true,
            minify: {
                removeComments: true, // 去除HTML注释
                collapseWhitespace: true
            }
        })
    ],
    // 配置寻找规则
    resolve: {
        alias: {
            '@': path.resolve('src')
        }
    }
};
