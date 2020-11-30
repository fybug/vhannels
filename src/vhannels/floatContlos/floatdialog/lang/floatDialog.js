/** 悬浮对话框工具
 *
 * 用于容纳对话框对象，并且提供展示与销毁的方法维护
 *
 * @extends vhannels.ViewGroup
 * @class vhannels.floatContlos.FloatDialog
 * @see vhannels.floatContlos.Dialog
 * @author fybug
 * @version 0.0.1
 */
class FloatDialog extends vhannels.ViewGroup {
    /** 展示监听
     * @type function(vhannels.floatContlos.Dialog)
     */
    #showlistern = d => void 0;
    /** 销毁监听
     * @type function(vhannels.floatContlos.Dialog)
     */
    #destroylistern = d => void 0;
    /** 子控件
     * @type vhannels.floatContlos.Dialog
     */
    #nowdialog = undefined;
    /**
     * @type boolean
     */
    #canend = false;

    /*--------------------------------------------------------------------------------------------*/

    /**
     * @param {Element|vhannels.ViewGroup} dom
     */
    constructor(dom = vhannels.View.Body) {
        super(document.createElement("floatdialog"));
        FloatDialog.__toViewGroup(dom).append(this);

        this.attrs({"vhannels": "vhannels.floatContlos.FloatDialog"});
        // 关闭监听
        this.getDom().addEventListener("click", e => {
            if (this.#canend)
                this.destroy();
        });
    }

    /*--------------------------------------------------------------------------------------------*/

    /** 展示监听
     *
     * 控件展示时的监听，参数传入当前子控件
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
     * 控件销毁时的监听，参数传入当前子控件
     *
     * @param {function(vhannels.floatContlos.Dialog)} run 监听方法
     * @return this
     */
    destroyListern(run) {
        this.#destroylistern = run;
        return this;
    }

    /*--------------------------------------------------------------------------------------------*/

    /** 销毁对话框容器
     *
     * 使用 {@link vhannels.floatContlos.Dialog.destroy} 方法销毁对话框后隐藏容器
     */
    destroy() {
        this.#nowdialog.destroy();
        setTimeout(() => {
            this.class({toggle: {"show": false}});
            this.#destroylistern(this.#nowdialog);
            this.#nowdialog = undefined;
        }, 300);
    }

    /** 展示对话框和容器
     *
     * 展示容器后使用 {@link vhannels.floatContlos.Dialog.show} 方法展示对话框
     *
     * @param {vhannels.floatContlos.Dialog} dailog 对话框对象
     * @param {boolean} canhide 是否可以通过外部关闭
     *
     * @return boolean
     */
    show(dailog, canhide = false) {
        // 一次只能展示一个
        if (this.#nowdialog !== undefined) return false;

        this.#canend = canhide;

        // 展示容器
        this.class({toggle: {"show": true, "canend": canhide}});
        this.append(dailog);

        // 启动监听
        this.#nowdialog = dailog;
        this.#showlistern(dailog);

        dailog.binFloatDialog(this);
        dailog.show();
        return true;
    }
}

/** @type FloatDialog */
vhannels.floatContlos.FloatDialog = FloatDialog;