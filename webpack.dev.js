global.webpackmode = "dev"
const config = require('./webpack.conf.js');

let devConf = Conf.devtool;
delete Conf.devtool;
Conf = merge(Conf, devConf);

module.exports = merge(config, {
    devtool: 'source-map', mode: "development",
    devServer: {
        contentBase: Conf.contentBase || './build',
        port: Conf.port || 3000,
        host: Conf.host || "localhost"
    }
});