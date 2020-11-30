module.exports = {
    /** 不包含依赖的打包去除的依赖代码行
     * @type Map<string,number>
     */
    libRemoveFilesLine: new Map(),
    /** 不打包的文件
     *  @type Set<string>
     */
    removeFiles: new Set(["build/vhannels.style.js"]),
    /** 不包含依赖的打包去除的依赖文件
     * @type Set<string>
     */
    libRemoveFiles: new Set(),

    /** 源码输入目录
     * @type string
     */
    indir: "build",
    /** 输出目录
     *
     * 用于每次打包开始的清理
     *
     * @type string
     */
    outdir: "out",
    /** 包含依赖的打包输出路径
     * @type string
     */
    liboutdir: "out/vhannels",
    /** 不包含依赖的打包输出路径
     * @type string
     */
    noliboutdir: undefined,
    /** 压缩模式
     * @type "none"|"zip"|"tar"|"gtar"|("none"|"zip"|"tar"|"gtar")[]
     */
    compression: ["zip", "tar", "gtar"],
    /** 压缩完成后是否清除临时文件
     *  @type boolean
     */
    compressionEndClear: false
};
