const http = require("http");
const path = require("path");
const fs = require("fs");
const qs = require('querystring');

const server = http.createServer((req, res) => {


  console.log(req.url);

  if(req.method === 'POST') {

    var body = '';

    req.on('data', function (data) {
      body += data;
     // Too much POST data, kill the connection!
      // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
      if (body.length > 1e6)
          request.connection.destroy();
    });
    
    req.on('end', function () {
        
      let post = qs.decode(body);
      let data = JSON.stringify(post);
        
      fs.appendFile('users.json', data, err => {
          
        if (err) throw err;
        console.log('Data written to file');
      });
    });
    
  }

  // Build file path
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "login.html" : req.url
  );
   
  // Extension of file
  let extname = path.extname(filePath);
  // Initial content type
  let contentType = "text/html";
    
  
  // Check ext and set content type
  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
    case ".svg":
      contentType = "image/svg+xml";
      break;  
  }
  
  // Check if contentType is text/html but no .html file extension
  if (contentType == "text/html" && extname == "") filePath += ".html";
  
  // log the filePath
  console.log(filePath);
  
  // Read File
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        // Page not found
        fs.readFile(
          path.join(__dirname, "public", "404.html"),
          (err, content) => {
            throw err;

            res.writeHead(404, { "Content-Type": "text/html" });
            res.end(content, "utf8");
          }
        );
      } else {
        //  Some server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf8");
    }
  });

});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
