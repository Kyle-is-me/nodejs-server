// 搭建一个服务器
const http = require('http');
const fs = require('fs');
const server = http.createServer();
const template = require('art-template');

// 启动服务器
server.listen(8080,()=>{
   console.log('server is running at http://127.0.0.1:8080')
})
// 监听请求事件
server.on('request',(req,res)=>{
   if(req.url.startsWith('/assets')){
      // 设置响应头
      if(req.url.endsWith('css')){
         res.setHeader('Content-Type','text/css');
      }
      fs.readFile('.'+req.url,(err,data)=>{
         if(err) console.log(err);
         res.end(data);
      })
   }else{
      // 处理动态页面的逻辑
      // 处理主页
      if(req.url === '/views/index.html'){
         //先读取json数据
         fs.readFile(__dirname+'/data/heros.json','utf-8',(err,data)=>{
            if(err) console.log(err);
            let arr = JSON.parse(data);
            console.log(arr);
            // 将数据导入到模板
            let html = template(__dirname+'/views/index.html',{abc:arr});
            // 将动态页面返回到浏览器
            res.end(html);
         });
      }
   }
})