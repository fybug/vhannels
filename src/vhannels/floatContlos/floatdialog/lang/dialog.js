/** 子对话框对象
 *
 * 用于以控件的形式展示子窗口
 *
 * @extends vhannels.ViewGroup
 * @class vhannels.floatContlos.Dialog
 * @see vhannels.floatContlos.FloatDialog
 * @author fybug
 * @version 0.0.1
 */
class Dialog extends vhannels.ViewGroup {
    /** 当前所属的容器
     * @type vhannels.floatContlos.FloatDialog
     */
    #float = undefined;
    /** 展示监听
     * @type function(vhannels.floatContlos.Dialog)
     */
    #showlistern = d => void 0;
    /** 销毁监听
     * @type function(vhannels.floatContlos.Dialog)
     */
    #destroylistern = d => void 0;
    /** 内容初始化方法
     * @type function(vhannels.floatContlos.Dialog):(string|[Element|[vhannels.ViewGroup)
     */
    #showhtml = d => "";

    /*--------------------------------------------------------------------------------------------*/

    /**
     * 通过传入的对象来指定控件的属性
     *
     * @param {{}} attrs 属性映射，属性名: 属性值
     */
    constructor(attrs = {}) {
        super(document.createElement("dialog"));
        this.attrs({"vhannels": "vhannels.floatContlos.FloatDialog.Dialog"});
        this.attrs(attrs);
        this.getDom().addEventListener("click", e => e.stopPropagation())
    }

    /*--------------------------------------------------------------------------------------------*/

    /** 展示的 html
     *
     * 每次展示的时候使用该方法重新生成 html 内容或者 dom 对象
     *
     * @param {function(vhannels.floatContlos.Dialog):(string|[Element]|[vhannels.ViewGroup])} html 生成 html 内容的方法
     * @return this
     */
    show_Html(html) {
        this.#showhtml = html;
        return this;
    }

    /** 展示监听
     *
     * 控件展示时的监听，参数传入控件本身
     *
     * @param {function(vhannels.floatContlos.Dialog)} run 监听方法
     * @return this
     */
    showListern(run) {
        this.#showlistern = run;
        return this;
    }

    /** 销毁监听
     *
     * 控件销毁时的监听，参数传入控件本身
     *
     * @param {function(vhannels.floatContlos.Dialog)} run 监听方法
     * @return this
     */
    destroyListern(run) {
        this.#destroylistern = run;
        return this;
    }

    /*--------------------------------------------------------------------------------------------*/

    /** 绑定对话框容器
     *
     * @param {vhannels.floatContlos.FloatDialog} flo 对话框容器对象
     * @return this
     */
    __binFloatDialog(flo) {
        this.#float = flo;
        return this;
    }

    /** 展示对话框
     * @return this
     */
    __show() {
        let ht = this.#showhtml(this);
        if (typeof ht === "string") this.setHtml(ht);
        else this.append(...ht);

        this.#showlistern(this);
        setTimeout(() => this.class({toggle: {"show": true}}), 1);
        return this;
    }

    /** 销毁对话框 */
    __destroy() {
        this.class({toggle: {"show": false}});
        setTimeout(() => {
            this.#destroylistern(this);
            this.#float = undefined;
            this.setHtml("");
            this.remove();
        }, 300);
    }
}

/** @type Dialog */
vhannels.floatContlos.Dialog = Dialog;