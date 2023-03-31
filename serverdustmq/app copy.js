import http from 'http'
import url from 'url'
import fs from 'fs'
import path, { parse } from 'path';

class Server {
  constructor(port){
    this.port = port
  }

  set port(value){
    if(typeof(value)==='number'){
      this._port = value
    }
  }

  start(){
    http.createServer((req,res)=>{
      const serverUrl = req.url().lowerCase
    })
  }
}
