// 搭建一个服务器
const http = require('http');
const fs = require('fs');
const template = require('art-template');

// 创建一个服务器
const server = http.createServer();
// 启动服务器
server.listen(8080,()=>{
   console.log('server is running at http://127.0.0.1:8080');
});
// 监听服务器的请求数据事件
server.on('request',(req,res)=>{
   // 处理静态资源
   if(req.url.startsWith('/assets')){
      fs.readFile('.'+req.url,(err,data)=>{
         if(err) console.log(err);
         res.end(data);
      })
   }
})