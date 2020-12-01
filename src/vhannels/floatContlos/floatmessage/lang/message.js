/** 消息对象
 *
 * 用于显示多种状态的消息，每种状态都可以设定对应显示方式
 *
 * @extends vhannels.ViewGroup
 * @class vhannels.floatContlos.Message
 * @see vhannels.floatContlos.FloatMessage
 * @author fybug
 * @version 0.0.1
 */
class Message extends vhannels.ViewGroup {
    /** 默认处理 */
    static #nullfun = (message, v) => v.querySelector("p").getDom().innerText = message;
    /** 消息样式列表 */
    stylemap = {
        /** 表示正在加载中的样式
         *
         * @type function(string,vhannels.ViewGroup)
         */
        load: Message.#nullfun,
        /** 表示成功消息的样式
         *
         * @type function(string,vhannels.ViewGroup)
         */
        success: Message.#nullfun,
        /** 表示错误消息的样式
         *
         * @type function(string,vhannels.ViewGroup)
         */
        error: Message.#nullfun,
        /** 表示警告消息的样式
         *
         * @type function(string,vhannels.ViewGroup)
         */
        warning: Message.#nullfun,
        /** 指示消息如何销毁
         *
         * @type function(vhannels.ViewGroup)
         */
        destroy: v => setTimeout(() => v.remove(), 600)
    };

    /**
     * @param {{
     *    default:function(string,vhannels.ViewGroup)|undefined,
     *    load:function(string,vhannels.ViewGroup)|undefined,
     *    success:function(string,vhannels.ViewGroup)|undefined,
     *    error:function(string,vhannels.ViewGroup)|undefined,
     *    warning:function(string,vhannels.ViewGroup)|undefined,
     *    destroy:function(vhannels.ViewGroup)
     * }} styrun 每一个状态的显示处理，load/success/error 会额外传入当前请求的消息内容，在有消息的状态没有定义处理的时候会使用默认处理 default
     */
    constructor(styrun = {}) {
        super(document.createElement("message"));
        this.attrs({vhannels: "vhannels.floatContlos.FloatMessage.Message"});

        if (styrun.default) {
            let messagelist = ["load", "success", "error", "warning"];
            messagelist.forEach(v => this.stylemap[v] = styrun.default)
            delete styrun.default;
        }
        this.stylemap = Object.assign(this.stylemap, styrun);
    }

    /** 加载中的消息
     *
     * 追加 primary 类，并运行 load 显示处理
     *
     * @param {string} message 消息内容
     *
     * @return this
     */
    message_load(message) {
        this.__toclass("primary");
        this.stylemap.load(message, this);
        return this;
    }

    /** 成功的消息
     *
     * 追加 success 类，并运行 success 显示处理
     *
     * @param {string} message 消息内容
     *
     * @return this
     */
    message_success(message) {
        this.__toclass("success");
        this.stylemap.success(message, this);
        return this;
    }

    /** 错误的消息
     *
     * 追加 alert 类，并运行 error 显示处理
     *
     * @param {string} message 消息内容
     *
     * @return this
     */
    message_error(message) {
        this.__toclass("alert");
        this.stylemap.error(message, this);
        return this;
    }

    /** 警告的消息
     *
     * 追加 warning 类，并运行 warning 显示处理
     *
     * @param {string} message 消息内容
     *
     * @return this
     */
    message_warnning(message) {
        this.__toclass("warning");
        this.stylemap.warning(message, this);
        return this;
    }

    /** 销毁当前消息
     *
     * 追加 destroy 类，并运行 destroy 显示处理
     */
    message_destroy() {
        this.class(["destroy"]);
        this.stylemap.destroy(this);
    }

    /**
     * @param {"destroy"|"primary"|"secondary"|"success"|"alert"|"warning"} classna
     */
    __toclass(classna) {
        let a = {
            "primary": false,
            "secondary": false,
            "success": false,
            "alert": false,
            "warning": false
        };
        a[classna] = true;
        this.class({"toggle": a});
    }
}

/** @type Message */
vhannels.floatContlos.Message = Message;