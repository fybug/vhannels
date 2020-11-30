// 启动加载用模块
require('./PDWebpack/load/load');

/** 配置处理模块
 *
 * @type ConfigLoad
 */
global.confload = new ConfigLoad(WebpackConf());
// 用户运行模块
require('./PDWebpack/run');

module.exports = confload.__toConf();