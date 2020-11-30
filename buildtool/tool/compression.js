module.exports = {
    zip: function (inpath, outpath, end) {
        global.compressing.zip.compressDir(inpath, outpath + ".zip")
            .catch(err => console.error(err)).then(end);
    },
    gtar: function (inpath, outpath, end) {
        outpath += ".tar"
        global.compressing.tar.compressDir(inpath, outpath + ".tmp").catch(err => console.error(err))
            .then(() => {
                compressing.gzip.compressFile(outpath, outpath + ".gz")
                    .catch(err => console.error(err)).then(() => global.fs.unlinkSync(outpath + ".tmp")).then(end);
            })
    },
    tar: function (inpath, outpath, end) {
        global.compressing.tar.compressDir(inpath, outpath + ".tar")
            .catch(err => console.error(err)).then(end);
    }
}