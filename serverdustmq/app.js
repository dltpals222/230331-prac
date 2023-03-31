import http from 'http'
import url from 'url'
import fs from 'fs'
import path from 'path';

class Server {
  constructor(port){
    this.port = port
  }

  start(){
    http.createServer((req, res)=>{
      const parsedUrl = url.parse(req.url, true);
      const pathName = parsedUrl.pathname;
      const method = req.method;

      if(method === 'get' && pathName === '/'){
        this.handleGetRequest(req, res);
        console.log(pathName);
      } else if (method === 'post' && pathName === '/') {
        this.handlePostRequest(req, res);
      }
    }).listen(this.port, ()=>{
      console.log(`${this.port} 서버가 작동합니다`)
    });
    }
  handleGetRequest(req, res) {
    fs.readFile('index.html',(err, data) => {
      if(err) {
        res.writeHead(500, {'content-type':'text/plain'});
        res.end('500 Error 서버에 문제가 있습니다.');
      } else {
        res.wirteHead(200, {'content-type':'text/html'})
        res.write(data)
        res.end();
      }
    })
  }

  handlePostRequest(req, res) {
    let body = '';
    req.on('data',chunk => {
      body += chunk.toString();
    });
    req.on('end',()=>{
      console.log(body);
      res.wirteHead(200, {'content-type':'text/html'});
      res.write(`<h1>${body}</h1>`);
      res.end()
    })
  }
  }

  const server = new Server(2828);
  server.start();
