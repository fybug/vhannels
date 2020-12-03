require("./vhannels/style/main.pcss");

require("./vhannels/main.js");
require("./vhannels/floatContlos/floatmessage/main.js");


// 全局 Body 对象
window.addEventListener("load", () => {
    var floatmess = new vhannels.floatContlos.FloatMessage();
    var mess = floatmess.createMessage();
    var mess2 = floatmess.createMessage();
    mess.message_load("qwewq");
    mess2.message_load("asdasdfasdasdfasdasdfasdasdfasdasdfasdasdfasdasdfasdasdfasdasdfasdasdfasdasdfasdasdfasdasdfasdasdfasdasdfasdasdfasdasdfasdasdfasdasdfasdasdfasdasdfasdasdf");
    floatmess.showMessage(mess, 2000);
    setTimeout(() => floatmess.showMessage(mess2), 1000);
});