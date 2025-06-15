const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const { unescape } = require('querystring');
const hostname ='127.0.0.1';
const port = 5500;

const mimeTypes ={
    'html': 'text/html/',
    'css': 'text/css',
    'javascript': 'text/javascript',
    'png': 'image/png',
    'jpeg':'image/jpeg',
    'jpg': 'image/jpg',
};

http.createServer((req,res)=>{
    var myuri = url.parse(req.url).pathname
    var filename = path.join(process.cwd(),unescape(myuri));            //join pass two perameter     in documention -> process 
console.log('File you are looking for is:' + filename);
var loadfile;
try{
    loadfile = fs.lstatSync(filename);
}catch (error){
res.writeHead(404,{'Content-Type': 'text/plain'});
    res.write('404 page not found');
    res.end();
    return;
}
if(loadfile.isFile()){
    var mimeType = mimeTypes[path.extname(filename).split('.').reverse()[0]];
    res.writeHead(200, {'Content-Type':mimeType});
    var filestream = fs.createReadStream(filename);
    filestream.pipe(res)        //

}
else if(loadfile.isDirectory){
    res.writeHead(302, { 'Location':'index.html'});        //the requested resource has been temporarily moved to the URL in the Location header
   res.end();
}else{
    res.writeHead(500,{'Content-Type': 'text/plain'});
    res.write('500 Internal error');
    res.end();
}

}).listen(port,hostname,()=>{
    console.log(`server is running at port :${port}`);
    
});