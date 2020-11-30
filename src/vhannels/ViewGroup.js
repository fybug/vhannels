/** vhannels 视图容器对象
 *
 * 存放一个原始节点，并支持子对象操作
 *
 * @author fybug
 * @version 0.0.1
 * @extends vhannels.View
 * @class vhannels.ViewGroup
 */
class ViewGroup extends vhannels.View {

    /** @param {HTMLElement|vhannels.View} dom 当前节点 */
    constructor(dom = document.body) {
        super(dom);
    }

    /*--------------------------------------------------------------------------------------------*/

    /** 获取子节点集合
     *
     * 与 {@link views} 的区别为直接返回原始数据
     *
     * @return HTMLCollection 节点集合
     */
    doms() {
        return this.getDom().children;
    }

    /** 获取子视图集合
     *
     * 于 {@link doms} 的区别为返回包装后的数据
     *
     * @return vhannels.View[] 视图集合
     */
    views() {
        let views = [];
        for (let v of this.doms())
            views.push(new vhannels.View(v));
        return views;
    }

    /** 查找子视图
     *
     * @param {string} select 查找规则
     * @return vhannels.ViewGroup[]
     */
    querySelectorAll(select) {
        let d = this.getDom();
        // 查询的数据
        let nods = d.querySelectorAll(select);

        /* 转化 */
        let re = [];
        nods.forEach(v => re.push(new vhannels.ViewGroup(v)));

        return re;
    }

    /** 查找子视图
     *
     * @param {string} select 查找规则
     * @return vhannels.ViewGroup
     */
    querySelector(select) {
        let d = this.getDom();
        // 查询的数据
        let node = d.querySelector(select);

        return new vhannels.ViewGroup(node);
    }

    /*--------------------------------------------------------------------------------------------*/

    /** 在容器前面插入视图
     *
     * @param {vhannels.View|HTMLElement} view
     * @return this
     */
    prepend(...view) {
        let d = this.getDom();
        for (let v of view)
            d.insertBefore(ViewGroup.__toDom(v), d.firstChild);
        return this;
    }

    /*-------------------------*/

    /** 在容器后面追加视图
     *
     * @param {vhannels.View|HTMLElement} view
     * @return this
     */
    append(...view) {
        let d = this.getDom();
        for (let v of view)
            d.appendChild(ViewGroup.__toDom(v));
        return this;
    }

    /** 追加 html 内容
     *
     * @param {string} html 追加的 html 内容
     * @return this
     */
    addHtml(html) {
        this.getDom().innerHTML += html;
        return this;
    }

    /*--------------------------------------------------------------------------------------------*/

    /** 删除容器内指定的视图
     *
     * @param {vhannels.View|HTMLElement} view 要删除的视图
     * @return this
     */
    delete(...view) {
        let d = this.getDom();
        for (let v of view)
            d.removeChild(ViewGroup.__toDom(v));
        return this;
    }

    /** 替换指定视图
     *
     * 通过替换映射进行，of 表示要替换的视图，to 标识替换成的视图
     *
     * @param {{
     *     of:HTMLElement|vhannels.View,
     *     to:HTMLElement|vhannels.View
     * }} viewto 替换列表
     * @return this
     */
    replace(...viewto) {
        let d = this.getDom();
        for (let vt of viewto)
            d.replaceChild(ViewGroup.__toDom(vt.to), ViewGroup.__toDom(vt.of));
        return this;
    }

    /** 清空内容
     *
     * 可通过查询表达式删除指定的所有内容
     *
     * @param {string|undefined} query 查询表达式
     * @return this
     */
    clean(query = undefined) {
        if (query === undefined)
            this.getDom().innerHTML = '';
        else
            this.querySelectorAll(query).forEach(v => v.remove());
        return this;
    }

    /*--------------------------------------------------------------------------------------------*/

    static creaViewGroup(dom) {
        if (typeof dom === 'string')
            return new ViewGroup(document.createElement(dom));
        else
            return new ViewGroup(dom);
    }

    /** 确保对象为 ViewGroup 对象
     *
     * @return vhannels.ViewGroup
     */
    static __toViewGroup(dom) {
        if (dom instanceof vhannels.ViewGroup) return dom;
        return this.creaViewGroup(dom);
    }
}

/** @type ViewGroup */
vhannels.ViewGroup = ViewGroup;