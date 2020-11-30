/** 扫描文件夹
 *
 * @param {string} dir 扫描的初始路径
 * @param {function(string)} filecall 扫描处理方法，传入扫描到的文件的路径
 * @param {function(string)} dircall 扫描处理方法，传入扫描到的目录的路径
 */
module.exports = function scanner(dir, filecall, dircall) {
    global.fs.readdirSync(dir, {withFileTypes: true}).forEach((dirlib) => {
        if (dirlib.isDirectory())
            dircall(dir + '/' + dirlib.name);
        else
            filecall(dir + '/' + dirlib.name)
    });
}