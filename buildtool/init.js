let scanner = require("./tool/scanner");
let CONF = require("./config");

let dirremove = require("./tool/dirremove");
// 清空输出文件夹
scanner(CONF.outdir, dirremove.deleteFile, dirremove.deleteDir)

{
    // 转变成默认空数组
    CONF.compression || (CONF.compression = []);
    // 字符串填充为单个元素的数组
    (typeof CONF.compression === "string") && (CONF.compression = [CONF.compression]);

    // 非数组防错误处理
    if (Array.isArray(CONF.compression)) {
        // 抗重复
        let compressionSet = new Set();
        // 压缩功能数组
        let comS = [];
        // 压缩功能函数对象
        let compressionTool = require("./tool/compression");

        /* 检查所有参数 */
        for (let com of CONF.compression) {
            // 去重复
            if (compressionSet.has(com)) continue;
            // 追加功能函数
            switch (com) {
                case "zip":
                    comS.push(compressionTool.zip);
                    break;
                case "gtar":
                    comS.push(compressionTool.gtar);
                    break;
                case "tar":
                    comS.push(compressionTool.tar);
                    break;
            }
            // 去重复
            compressionSet.add(com);
        }

        CONF.compression = comS;
        // gc
        compressionSet.clear()
    } else CONF.compression = [];
}
