confload.runOf('ModeLoad', /** @param {ModeLoad} modeload */(modeload) => {
    // modeload.addMode('app', SourcePath + 'main.js', "defer");

    modeload.addMode('vhannels_publiclib', SourcePath + 'vhannels/main.js');
    // 浮动控件包
    modeload.addMode('vhannels.floatContlos_all', SourcePath + 'vhannels/floatContlos/main.js');
    modeload.addMode('vhannels.floatContlos.floatmessage', SourcePath + 'vhannels/floatContlos/floatmessage/main.js');
    modeload.addMode('vhannels.floatContlos.floatdialog', SourcePath + 'vhannels/floatContlos/floatdialog/main.js');
    // 页面控件包
    modeload.addMode('vhannels.pageContlos_all', SourcePath + 'vhannels/pageContlos/main.js');
    modeload.addMode('vhannels.pageContlos.tab', SourcePath + 'vhannels/pageContlos/tab/main.js');
    // 工具包
    modeload.addMode('vhannels.tool', SourcePath + 'vhannels/tool/main.js');

    modeload.addMode("vhannels.style", SourcePath + "vhannels/style/main.js");
    return 'PageLoad';
}).then((pageLoad) => {
    // pageLoad.addPage('index', SourcePath + 'index.html', ['app']);
});