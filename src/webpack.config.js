const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    watch: true,
    watchOptions: {
        // 不监听node_modules目录文件
        ignored: /node_modules/,
        // 监听到变化后等300ms再去执行
        aggregateTimeout: 300,
        // 每秒询问1000次
        poll: 1000
    },
    entry: './src/index.ts',
    devtool: 'cheap-module-eval-source-map',
    module: {
        rules: [{
            test: /\.vue$/,
            use: 'vue-loader'
        },
        {
            test: /\.tsx?$/,
            loader: 'ts-loader',
            options: {
                transpileOnly: true,
                appendTsSuffixTo: [/.vue$/]
            }
        },
        {
            test: /\.(css|less)$/,
            loader: 'vue-style-loader!less-loader!css-loader'
        }
    
    ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            inject: true
        })
    ],
}