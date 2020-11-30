window.vhannels || (window.vhannels = {});

/** 检查命名空间
 *
 * @param {[string]} names 命名空间
 */
vhannels.setName = (names) => {
    let last = window.vhannels;
    for (let name of names) {
        if (name === undefined) continue;

        // 命名空间未就绪
        if (last[name] === undefined) last[name] = {};
        // 记录当前命名空间
        last = last[name];
    }
    return last;
};

require("./View");
require("./ViewGroup");

// 全局 Body 对象
window.addEventListener("load", () =>
    vhannels.View.Body = new vhannels.ViewGroup(document.body));