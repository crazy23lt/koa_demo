# Koa -- 基于 Node.js 平台的下一代 web 开发框架

## 开启服务

```js
const Koa = require("koa");
const app = new Koa();
app.listen(3000, () => {
  console.info("Api 服务启动成功");
});
```

## app.listen() 语法糖

```js
const http = require("http");
const Koa = require("koa");
const app = new Koa();
http.createServer(app.callback()).listen(3000);
```

**这意味着您可以将同一个应用程序同时作为 HTTP 和 HTTPS 或多个地址**

```js
const http = require("http");
const https = require("https");
const Koa = require("koa");
const app = new Koa();
http.createServer(app.callback()).listen(3000);
https.createServer(app.callback()).listen(3001);
```