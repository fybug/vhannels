let CONF = require("../config");
let TOOL = require("./tool");

module.exports = {
    /** 扫描到文件的处理 */
    isFile: function (files) {
        ++this.cons[0];
        this.putFile(files,
            CONF.noliboutdir + "/" + path.relative(CONF.indir, files).replace(/\\/g, '/'),
            CONF.libRemoveFilesLine.get(files));
    },

    /** 输出文件 */
    putFile: async function (files, outfiles, removeline = 0) {
        TOOL.lineto(files, outfiles, (d, write) => {
            // 库导入行不写入
            if (removeline-- > 0) return;

            write.write(d, "utf8");
            write.write("\n", "utf8");
        }, this.cons);
    },
    /** 输出完成计数器 */
    cons: [0]
}