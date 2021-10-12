/** 悬浮消息工具
 *
 * 用于包装消息对象
 *
 * @extends vhannels.ViewGroup
 * @class vhannels.pageContlos.Tab
 * @author fybug
 * @version 0.0.1
 */
class Tab extends vhannels.ViewGroup {
    // 传入容器，容器中的标签用属性指定，标签对应的内容的节点也用属性指定，可以手动调用

    /**
     * @param {HTMLElement|vhannels.ViewGroup} dom 在该节点内扫码功能组件
     */
    constructor(dom) {
        super(dom);
    }

    // todo 事件
    // todo 并非插入而是设置为容器
}

vhannels.pageContlos.Tab = Tab;