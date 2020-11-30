let scanner = require("../tool/scanner");
let dirremove = require("../tool/dirremove");
let CONF = require("../config");

module.exports = {
    /** 逐行读取数据处理
     *
     * @param {string} files
     * @param {string} outfiles
     * @param {function(string,any)} r 处理接口，传入当前数据和输出流
     * @param {number[]} conts 输出完成计数器
     */
    lineto: function (files, outfiles, r, conts) {
        // 建立目录结构
        global.fs.mkdirSync(path.dirname(outfiles), {recursive: true});

        // 读取流
        let reads = fs.createReadStream(files);
        reads.setEncoding("utf8");
        // 输出流
        let write = fs.createWriteStream(outfiles);
        // 行读取工具
        let io = global.readline.createInterface({input: reads});

        io.on("line", d => r(d, write));
        io.on("close", () => {
            write.end();
            write.close();
            reads.close();
            --conts[0];
        });
    },
    tocompression: function (inpath, outpath, comS) {
        if (comS.length === 0) return;
        let len = comS.length;
        let i = 1;

        for (let comfun of comS) {
            let o = i;
            comfun(inpath, outpath, CONF.compressionEndClear ? () => {
                if (o < len) return;
                // 清除输出文件夹
                scanner(inpath, dirremove.deleteFile, dirremove.deleteDir)
                global.fs.rmdirSync(inpath);
            } : () => {
            });
            i++;
        }
    }
}