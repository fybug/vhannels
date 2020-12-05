/** 悬浮消息工具
 *
 * 用于包装消息对象
 *
 * @extends vhannels.ViewGroup
 * @class vhannels.floatContlos.FloatMessage
 * @see vhannels.floatContlos.Message
 * @author fybug
 * @version 0.0.1
 */
class FloatMessage extends vhannels.ViewGroup {
    /**
     * @param {HTMLElement|vhannels.ViewGroup} dom 容器添加到该节点内
     */
    constructor(dom = vhannels.View.Body) {
        super(document.createElement("messagegroup"));
        // 插入消息容器
        dom.append(this.getDom());

        // 赋予消息组样式
        this.attrs({vhannels: "vhannels.floatContlos.FloatMessage"})
    }

    /** 展示消息对象
     *
     * @param {vhannels.floatContlos.Message} message 要展示的消息
     * @param {number|undefined} time 消息展示的时长，不传入则为无限
     *
     * @return {vhannels.floatContlos.Message} 消息对象
     */
    showMessage(message, time = undefined) {
        this.append(message);
        setTimeout(() => message.class({toggle: {"show": true, "destroy": false}}), 10);

        time !== undefined && setTimeout(() => message.message_destroy(), time + 9);
        return message;
    }

    /** 创建消息对象
     *
     * 创建消息对象并赋予状态处理
     *
     * @param {{
     *    default:function(string,vhannels.ViewGroup)|undefined,
     *    load:function(string,vhannels.ViewGroup)|undefined,
     *    success:function(string,vhannels.ViewGroup)|undefined,
     *    error:function(string,vhannels.ViewGroup)|undefined,
     *    warning:function(string,vhannels.ViewGroup)|undefined,
     *    destroy:function(vhannels.ViewGroup)
     * }} styrun 每一个状态的显示处理，load/success/error 会额外传入当前请求的消息内容，在有消息的状态没有定义处理的时候会使用默认处理 default
     * @param {function(vhannels.ViewGroup)} bestyle 前置渲染，初始化视图的内容，传入消息视图对象
     *
     * @return {vhannels.floatContlos.Message} 消息对象
     */
    createMessage(styrun = {}, bestyle = v =>
        v.append(new vhannels.View(document.createElement("p")))
    ) {
        let v = new vhannels.floatContlos.Message(styrun);
        bestyle(v);
        return v;
    }
}

vhannels.floatContlos.FloatMessage = FloatMessage;