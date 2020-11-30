let scanner = require("../tool/scanner");
let CONF = require("../config");

// 不同的打包处理方法
let HASLIB = require("./haslib");
let NOLIB = require("./nolib");
let TOOL = require("./tool");

/** 扫描到文件的处理 */
function isFile(files) {

    // 忽略不打包的文件
    if (CONF.removeFiles.has(files)) return;
    // 忽略依赖包
    if (CONF.noliboutdir && !CONF.libRemoveFiles.has(files)) NOLIB.isFile(files);

    if (CONF.liboutdir) HASLIB.isFile(files);
}

/** 扫描到文件夹的处理 */
function isDir(dirs) {
    scanner(dirs, isFile, isDir);
}

// 扫描要打包的文件
scanner(CONF.indir, isFile, isDir);

/*--------------------------------------------------------------------------------*/

function wait(libs, f) {
    let a = setInterval(() => {
        if (libs["cons"] <= 0) {
            f();
            clearInterval(a);
        }
    }, 100);
}

if (CONF.liboutdir)
    wait(HASLIB, () => TOOL.tocompression(CONF.liboutdir, CONF.liboutdir, CONF.compression));

if (CONF.noliboutdir)
    wait(HASLIB, () => TOOL.tocompression(CONF.noliboutdir, CONF.noliboutdir, CONF.compression));
