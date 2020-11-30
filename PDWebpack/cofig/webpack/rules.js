/** 文件加载规则
 *
 * @return {{}[]}
 */
module.exports = (confget, conf) => [
    // css 和 postcss 的加载处理
    {
        test: /\.(c|pc)ss$/,
        use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: confget.GetUrlOf('css')
            }
        }, 'css-loader?sourceMap', 'postcss-loader?sourceMap']
    },
    // js 的加载处理
    {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [{
            loader: 'babel-loader',
            options: {
                presets: [
                    // 支持 es 2015
                    "@babel/preset-env",
                    // 支持 react
                    "@babel/preset-react",
                ],
                plugins: [
                    // 支持类属性
                    '@babel/plugin-proposal-class-properties'
                ]
            }
        }]
    },
    // 图片
    {
        test: /\.(gif|png|jpe?g|svg|webp)$/,
        use: [{
            loader: 'image-webpack-loader',
            options: {
                // jpeg / jpg
                mozjpoeg: {quality: 70, progressive: true,},
                // png
                pngquant: {optimizationLevel: 7, quality: "65-90", speed: 4},
                // gif
                gifsicle: {interlaced: false},
                // webp
                webp: {quality: 75}
            }
        }, {
            loader: 'url-loader',
            options: {
                // 小于 8k 全部压缩
                limit: 8192,
                esModule: false,
                name: confget.GetOutName('img', 'static/[id][name][hash:9].[ext]'),
                publicPath: confget.GetUrlOf('img')
            }
        }]
    },
    // 字体
    {
        test: /\.(ttf|eot|woff.?|otf)$/,
        use: {
            loader: 'url-loader',
            options: {
                limit: 8192,
                esModule: false,
                name: confget.GetOutName('font', 'static/[name].[ext]'),
                publicPath: confget.GetUrlOf('font')
            }
        }
    },
    // html
    {
        test: /\.(html)$/,
        use: {
            loader: 'html-withimg-loader',
            options: {
                attrs: ['img:src', 'img:data-src', 'audio:src', 'link:href'],
                minimize: true
            }
        }
    }
];