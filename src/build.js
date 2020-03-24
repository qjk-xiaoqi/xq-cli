import webpack from "webpack";
import symbol from 'log-symbols';
import chalk from 'chalk';
const config = require('./webpack.config.js');

let build = () => {
    webpack(config, (test1, test2) => {
        console.log(symbol.success, chalk.green('打包完成'));
        process.exit(1);
    });
}

module.exports = build;

