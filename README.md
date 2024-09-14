# chat
online chat

#这个项目是基于 **Node.js** 开发的，主要使用了以下技术和库：

1. **Express**: 一个流行的 Node.js Web 应用框架，用于创建服务器和处理 HTTP 请求。它提供了许多便利的功能，使得构建 Web 应用变得更加简单。

2. **http**: Node.js 原生模块，用于创建 HTTP 服务器。在这个项目中，它被用来创建一个 HTTP 服务器实例，以与 Express 一起使用。

3. **express-ws**: 这是一个用于在 Express 应用中实现 WebSocket 支持的库。它使得可以通过 Express 处理 WebSocket 连接，适合需要实时通信的应用，比如聊天应用。

4. **静态文件服务**: 使用 `express.static` 中间件提供静态文件服务，例如 HTML、CSS 和 JavaScript 文件，这些文件位于 `public` 目录下。

5. **路由**: `app.get` 定义了一个路由，当用户访问根 URL (`/`) 时，服务器将返回 `index.html` 文件。

6. **聊天和 P2P 模块**: 通过 `require('./server/chatServer')(server)` 和 `require('./server/p2pServer')(app)` 导入并初始化聊天和 P2P（点对点）功能模块，具体实现可能会在 `chatServer.js` 和 `p2pServer.js` 文件中定义。

总体来说，该项目结合了 Web 开发、实时通信和模块化设计，适合构建实时聊天应用或其他需要实时数据交换的应用。

https://wxdwuxd.oss-cn-beijing.aliyuncs.com/07e38a30b30f41b40ea42478b4c0b95.png
