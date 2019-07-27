// 搭建一个服务器
const http = require('http');
const fs = require('fs');
const server = http.createServer();

// 启动服务器
server.listen(8080,()=>{
   console.log('server is running at http://127.0.0.1:8080')
})
// 监听请求事件
server.on('request',(req,res)=>{
   if(req.url.startsWith('/assets')|| req.url.startsWith('/views')){
      // 设置响应头
      if(req.url.endsWith('css')){
         res.setHeader('Content-Type','text/css');
      }
      fs.readFile('.'+req.url,(err,data)=>{
         // if(err) console.log(err);
         res.end(data);
      })
   }else{
      // 处理ajax请求
      if(req.url === '/getAllHeros'){
         fs.readFile('./data/heros.json',(err,data)=>{
            res.end(data);
         });
      }
   }
})