import webpack from "webpack";
import symbol from 'log-symbols';
import chalk from 'chalk';
const config = require('./webpack.config.js');

let build = () => {
    // 打包
    webpack(config, function(err, stats) {
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

