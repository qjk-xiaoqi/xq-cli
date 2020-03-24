import webpack from "webpack";
import WebpackDevServer from 'webpack-dev-server';
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const config = require('./webpack.config.js');

let dev = (prot) => {
    // 启动项目后自动打开浏览器
    config.plugins.push(new OpenBrowserPlugin({
        url: `http://localhost:${prot}`
    }))
    new WebpackDevServer(webpack(config), {
        contentBase: './public',
        hot: true,
        historyApiFallback: true
    }).listen(port, 'localhost', function(err, result) {
        if(err) {
            console.log(err);
        }
    });
}
module.exports = dev;