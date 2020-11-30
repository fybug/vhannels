global.fs = require("fs");
global.path = require("path");
global.readline = require("readline");
global.compressing = require("compressing");

// 导入配置
require('./config');

// 初始化
require("./init");
// 打包
require("./build/build")

