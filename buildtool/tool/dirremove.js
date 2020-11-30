let scanner = require("../tool/scanner");

/** 移除输出文件夹中的残留文件 */
function deleteFile(files) {
    global.fs.unlinkSync(files);
}

/** 移除输出文件夹中的残留目录 */
function deleteDir(dirs) {
    scanner(dirs, deleteFile, deleteDir);
    global.fs.rmdirSync(dirs);
}

module.exports = {
    /** 移除输出文件夹中的残留文件 */
    deleteFile: deleteFile,

    /** 移除输出文件夹中的残留目录 */
    deleteDir: deleteDir
}