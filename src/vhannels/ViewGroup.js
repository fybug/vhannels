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

    /*--------------------------------------------------------------------------------------------*/

    /** 删除指定的视图
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
}

/** @type ViewGroup */
vhannels.ViewGroup = ViewGroup;