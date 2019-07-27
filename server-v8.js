// 搭建一个服务器
const http = require('http');
const fs = require('fs');
const template = require('art-template');
const url = require('url');

// 创建一个服务器
const server = http.createServer();
// 启动服务器
server.listen(8080, () => {
   console.log('server is running at http://127.0.0.1:8080');
});
// 监听服务器的请求数据事件
server.on('request', (req, res) => {
   // 处理静态资源
   if (req.url.startsWith('/assets')) {
      // 设置CSS的响应头
      if (req.url.endsWith('css')) {
         res.setHeader('Content-Type', 'text/css')
      };
      fs.readFile('.' + req.url, (err, data) => {
         if (err) console.log(err);
         res.end(data);
      })
   } else {
      // 处理动态的页面
      // 如果是get的请求方式，要使用url核心模块的方法处理url的数据
      let result = url.parse(req.url, true);
      // console.log(result);
      // console.log(result.query);
      // console.log(req.url);
      // 判断主页
      if (req.url === '/views/index-complex.html') {
         // 读取json数据
         fs.readFile(__dirname + '/data/heros.json', 'utf-8', (err, data) => {
            if (err) console.log(err);
            let arr = JSON.parse(data);
            // 将数据导入到模板结构中去
            let html = template(__dirname + '/views/index-complex.html', { abc: arr })
            // 将动态生成的页面返回到浏览器
            res.end(html);
         })
      }
      // 判断添加英雄页--只需返回一个静态页面html
      if (req.url === '/views/add.html') {
         fs.readFile('./views/add.html', (err, data) => {
            if (err) console.log(err);
            res.end(data);
         })
      }
      if (result.pathname === '/addHero' && req.method === 'GET') {
         // 先读取出json数据
         fs.readFile('./data/heros.json', 'utf-8', (err, data) => {
            if (err) console.log(err);
            let arr = JSON.parse(data);
            // 找出数组中最大的id,让新增的id数为id+1；
            let id = 0;
            arr.forEach(e => {
               if(e.id>id){
                  id=e.id
               }
            });
            result.query.id = id +1 ;
            arr.push(result.query);
            // console.log(arr)
            let str = JSON.stringify(arr);
            // console.log(str);
            fs.writeFile('./data/heros.json', str, (err) => {
               if (err) console.log(err);
            });
         })
      }
   }
})