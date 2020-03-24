'use strict';

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const OpenBrowserPlugin = require('open-browser-webpack-plugin');

const config = require('./webpack.config.js');

let dev = port => {
    // 启动项目后自动打开浏览器
    config.plugins.push(new OpenBrowserPlugin({ url: `http://localhost:${port}` }));
    // 创建一个小型服务器
    new _webpackDevServer2.default((0, _webpack2.default)(config), {
        contentBase: './public', // 配置http服务器的文件目录
        hot: true, // 开启模块热替换
        historyApiFallback: true // 开启html5 History API网页
    }).listen(port, 'localhost', function (err, result) {
        if (err) {
            console.log(err);
        }
    });
};

module.exports = dev;