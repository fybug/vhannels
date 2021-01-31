/** vhannels 视图对象
 *
 * 存放一个原始节点，并包含对应的操作封装
 *
 * @author fybug
 * @version 0.0.1
 * @class vhannels.View
 */
class View {
    /** 当前节点
     *
     *  @type HTMLElement
     */
    #dom;

    /** @param {HTMLElement|vhannels.View} dom 当前节点 */
    constructor(dom) {
        this.#dom = View.__toDom(dom);
    }

    /*--------------------------------------------------------------------------------------------*/

    /** 获取当前节点
     *
     * @return {HTMLElement}
     */
    getDom() {
        return this.#dom;
    }

    /** 刷新 html 内容
     *
     * @param {string} html 新的 html 内容
     * @return {vhannels.View} this
     */
    setHtml(html) {
        this.getDom().innerHTML = html;
        return this;
    }

    /** 获取 html 内容
     *
     * @return {string}
     */
    html() {
        return this.getDom().innerHTML;
    }

    /** 获取 innerText 的内容
     *
     * @return {string}
     */
    text() {
        return this.getDom().innerText;
    }

    /** 设置 innerText 的内容
     *
     * @param {string} t 文本内容
     *
     * @return {vhannels.View} this
     */
    settext(t) {
        this.getDom().innerText = t;
        return this;
    }

    /*--------------------------------------------------------------------------------------------*/

    /** 属性修改
     *
     * @param {Object} data { 属性名：属性值 }，属性值为 undefined 则是消除属性
     * @return {vhannels.View} this
     */
    attrs(data) {
        let d = this.getDom();
        let v;
        for (let key in data) {
            if (key === undefined) continue;
            v = data[key];

            // 检查是否删除
            v !== undefined ? d.setAttribute(key, v) : d.removeAttribute(key);
        }
        return this;
    }

    /** 获取属性
     *
     * @param {[string]} data 要获取的属性列表
     * @return {{"string":string}} 获取的属性映射
     */
    getattrs(data) {
        let d = this.getDom();
        let ats = {};

        for (let v of data) ats[v] = d.getAttribute(v);

        return ats;
    }

    /** 获取 value 的内容
     *
     * @return {string} 获取的属性值
     */
    value() {
        return this.getDom().value;
    }

    /** 设置 value 的内容
     *
     * @param {string} v 要设置的值
     *
     * @return {vhannels.View} this
     */
    setvalue(v) {
        this.getDom().value = v;
        return this;
    }

    /*------------------------*/

    /** 类操作
     *
     * 提供一体化类操作的接口
     *
     * - 追加类<br/>
     * class("a","s");
     *
     * - 移除类<br/>
     * class({"remove":["a","s"]});
     *
     * - 检查是否有对应的类<br/>
     * class({"check":["a","s"]});
     *
     * - 切换类操作<br/>
     * class({"toggle":["a","s"]});
     *
     * 在检查或者切换类的操作后会返回对应的结果，其他操作则是空对象
     *
     * @param {{
     *     check:undefined|[string],
     *     remove:undefined|[string],
     *     toggle:undefined|{
     *         classname:undefined|boolean
     *     }|[string]
     * }|[string]} clas
     * @return {{
     *     classname:boolean
     * }}
     */
    class(clas) {
        let d = this.getDom();
        let a = d.classList;
        let re = {};

        // 追加
        if (Array.isArray(clas)) a.add(...clas);
        else {
            // 检查
            if (clas.check)
                for (let v of clas.check) re[v] = a.contains(v);
            // 移除
            clas.remove && a.remove(...clas.remove);
            // 切换
            if (clas.toggle)
                if (Array.isArray(clas.toggle)) {
                    for (let cla of clas.toggle) re[cla] = a.toggle(cla);
                } else {
                    for (let cla in clas.toggle) re[cla] = a.toggle(cla, clas.toggle[cla]);
                }
        }

        return re;
    }

    /** css 样式操作
     *
     * 操作一体化样式操作
     *
     * 传入的对象示意需要进行的操作，
     * 含有 "remove" 字段将会对声明的样式进行移除，
     * 含有 "get" 字段将会获取声明的样式的值以及是否 !important，
     * 在对象中直接声明要修改的样式，可以和上面的两个字段混合使用
     *
     * - 移除样式<br/>
     * style({"remove":["color"]});
     *
     * - 获取样式内容<br/>
     * style({"get":["color"]});
     *
     * - 设置样式<br/>
     * style({"color":"red"});
     *
     * @param {{
     *     cssname:string|[string],
     *     "remove":[string],
     *     "get":[string]
     * }} sty
     *
     * @return {{
     *     cssname:{
     *         "val":string,
     *         "important":"important"|""
     *     }
     * }}
     */
    style(sty) {
        let d = this.getDom();
        let s = d.style;
        let re = {};

        for (let v in sty)
            if (v === "remove")
                // 移除
                for (let res of v) {
                    s.removeProperty(res);
                    re[res] && (re[res] = undefined)
                }
            else if (v === "get")
                for (let res of v)
                    re[res] = {
                        "val": s.getPropertyValue(res),
                        "important": s.getPropertyPriority(res)
                    };
            else {
                // 设置 important
                if (Array.isArray(sty[v])) s.setProperty(v, sty[v][0], sty[v][1]);
                else s.setProperty(v, sty[v]);
            }

        return re;
    }

    /*--------------------------------------------------------------------------------------------*/

    /** 移除此视图 */
    remove() {
        let d = this.getDom();
        d.parentNode.removeChild(d);
    }

    /** 确保为原始元素节点
     *
     * @param {HTMLElement|vhannels.View} view 要确保的对象
     * @return {HTMLElement} 元素节点
     */
    static __toDom(view) {
        if (view instanceof vhannels.View)
            return view.getDom();
        return view;
    }

    static creaView(dom) {
        if (typeof dom === 'string')
            return new View(document.createElement(dom));
        else
            return new View(dom);
    }
}

vhannels.View = View;