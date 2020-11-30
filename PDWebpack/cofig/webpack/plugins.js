/** 加载的插件
 *
 * @return {Object[]}
 */
module.exports = (confget, conf) => [
    // 清理输出
    new CleanWebpackPlugin({dry: false, protectWebpackAssets: true}),
    new webpack.ProvidePlugin({_: 'lodash'}),

    // css 文件抽离插件
    new MiniCssExtractPlugin({
        filename: confget.GetOutName('css', '[hash:12][name][id].css'),
    })
];