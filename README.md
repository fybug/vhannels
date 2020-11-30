# vhannels
![](https://img.shields.io/badge/version-0.0.1-00b58a.svg "当前版本")
![](https://img.shields.io/badge/webpack-4.44.2+-2e93ff.svg "开发所使用等等 webpack 版本")
![](https://img.shields.io/badge/license-Apache%202.0-f27122.svg "使用的开源协议")

用于 web 项目的原生 js 开发的工具库 && 控件库。

包含 **用于 js 的小工具** 以及 **用于页面的控件** 和 **用于规范化初始属性的全局 css 样式**

> 可通过 **WIKI** 学习如何使用

## 使用方法
下载库的压缩文件，通过 **发行版** 下载。解压后引用需要的模块即可。

需要整个包时可以导入后缀带 `_all` 的模块，下列会标明那些部分包含哪些控件。

## 模块分布
### js 模块
- vhannels.tool.js 单独的 js 小工具，独立引入
- vhannels_publiclib.js 全局模块，包含基础控件库，使用以下控件均要引入该模块。
    - vhannels.floatContlos_all.js 浮动控件库，包含以下控件
        - vhannels.floatContlos.floatmessage.js 浮动消息控件

### css 模块
样式模块都在 `style` 文件夹中

- vhannels.style.css 全局样式，用于规范默认的样式属性，包含基于属性的样式框架。
- vhannels.floatContlos_all.css 浮动控件所有模块的样式，包含以下样式
    - vhannels.floatContlos.floatmessage.css 浮动消息控件样式

## 提供bug反馈或建议
- [码云Gitee](https://gitee.com/fybug/vhannels)
- [Github](https://github.com/fybug/vhannels)