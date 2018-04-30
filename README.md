# wechatAdmin



## 快速入门

<!-- 在此次添加使用文档 -->

如需进一步了解，参见 [egg 文档][egg]。

### 本地开发

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### 以上内容是Server端的应用。 这里是前端框架
本框架并没有使用egg的 服务端渲染，
原因是：
  1.方便大家开发的时候可以直接更换后台语言
  2.是可以使用egg 做 中间数据处理成
  两条路 可以自己选址
```
yarn webpack
#自动打包前端程序到 app/public目录下面
```
这个框架已经处理好了react 路由 和 egg 路由共存，egg 的路由为优先级
开发前端框架的文件在`app/src/`文件下

我这里使用的是page为分页 components为组件，至于是不是用`mock.js`在这里并没有多大的意义了，因为你可以直接去egg那边写一个真实的接口，调用一下mock提供的api

这里使用了 egg.js插件有
- egg-view-nunjucks
- egg-view-assets

程序的`index.nj`入口文件位于 `app/view` 下

### ui框架选址
- antd
- react-router-dom^4
- react@16

### 部署

```bash
$ npm start
$ npm stop
```

### 单元测试

- [egg-bin] 内置了 [mocha], [thunk-mocha], [power-assert], [istanbul] 等框架，让你可以专注于写单元测试，无需理会配套工具。
- 断言库非常推荐使用 [power-assert]。
- 具体参见 [egg 文档 - 单元测试](https://eggjs.org/zh-cn/core/unittest)。

### 内置指令

- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。
- 使用 `npm run autod` 来自动检测依赖更新，详细参见 [autod](https://www.npmjs.com/package/autod) 。


### 未来功能
- 添加 Electron 可以打桌面应用




[egg]: https://eggjs.org
