global.webpackmode = "prod"
const config = require('./webpack.conf.js');

module.exports = merge(config, {
    // 代码压缩
    optimization: {minimize: true},
    mode: "none",
    devtool: 'null',
    plugins: [new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')})]
});