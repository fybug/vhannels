vhannels.setName(['tool']);

/** 获取地址栏参数
 *
 * @param {string} key 获取的参数名称
 * @param {string} defaval 默认值
 *
 * @return {string} 获取的值
 */
vhannels.tool.getQueryString = function (key, defaval = undefined) {
    let str = location.href;
    let num = str.indexOf("?");
    // 截取参数数据
    str = str.substr(num + 1);

    // 无数据
    if (num === -1) return defaval;

    // 拆解参数列表
    for (str of str.split("&")) {
        num = str.indexOf("=");
        // 检查属性名称是否是请求的名称
        if (num > 0 && str.substring(0, num).trim() === key) {
            if (num === str.length - 1) return '';
            return str.substr(num + 1).trim();
        }
    }
    return defaval;
};

/** 分页辅助工具
 *
 * @param {number} nowpage 当前页码
 * @param {number} maxpage 最大页码
 * @param {number} pagnum 分页数量
 * @param {function(number,boolean,boolean,number,number)} edge 边缘导航生成，传入：当前页码，是否是后边缘，是否远离边缘，最大页码，分页数量
 * @param {function(number,boolean,number,number)} fun 分页生成，传入：当前分页位置，是否是当前页码，最大分页，分页数量
 */
vhannels.tool.Paging = function (nowpage, maxpage, pagnum, edge, fun) {
    // 向前快速索引
    if (nowpage > pagnum && maxpage > pagnum * 2 + 1) {
        edge(nowpage, false, nowpage > pagnum + 1, maxpage, pagnum);
    }

    for (let i =
        // 计算需要向前偏移的页数，以尾页为基数计算需要向前溢出的页数
        Math.max(0, nowpage - pagnum - Math.max(0, nowpage - maxpage + pagnum + 1)); i <= nowpage; ++i) {
        fun(i, nowpage === i, maxpage, pagnum);
    }
    for (let i = nowpage + 1, len =
        // 计算需要向后偏移的页数，以当前页数为基数计算向后溢出的页数
        Math.min(i + pagnum + Math.max(0, pagnum - nowpage), maxpage); i < len; ++i) {
        fun(i, nowpage === i, maxpage, pagnum);
    }

    // 向后快速索引
    if (nowpage < maxpage - pagnum - 1 && maxpage > pagnum * 2 + 1) {
        edge(nowpage, true, nowpage < maxpage - pagnum - 2, maxpage, pagnum);
    }
}