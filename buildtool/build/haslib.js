let CONF = require("../config");
let TOOL = require("./tool");

module.exports = {
    /** 扫描到文件的处理 */
    isFile: function (files) {
        ++this.cons[0];
        this.putFile(files,
            CONF.liboutdir + "/" + path.relative(CONF.indir, files).replace(/\\/g, '/'));
    },

    /** 输出文件 */
    putFile: async function (files, outfiles) {
        TOOL.lineto(files, outfiles, (d, write) => {
            // 逐行输出，避免内存中存放过大的数据
            write.write(d, "utf8");
            write.write("\n", "utf8");
        }, this.cons);
    },
    /** 输出完成计数器 */
    cons: [0]
}