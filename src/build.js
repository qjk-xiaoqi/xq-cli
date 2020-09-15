import webpack from "webpack";
import symbol from 'log-symbols';
import chalk from 'chalk';
const config = require('./webpack.build.js');

let build = () => {
    // 打包
    webpack(config, function(err, stats) {
         // 这个回调函数是webpack编译过程中执行
        // process.stdout用来控制标准输出，也就是在命令行窗口向用户显示内容。它的write方法等同于console.log
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }))
        console.log( symbol.success, chalk.green(' 打包完成'));
        process.exit(1);
    })
}

module.exports = build;

