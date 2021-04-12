const http = require("http");
const path = require("path");
const fs = require("fs");
const qs = require('querystring');
const events = require('events');
const ejs = require('ejs');

const user = require('./user');


const server = http.createServer((req, res) => {

  console.log(req.url);
  // Login and Register handling
  if (req.method === 'POST')
    POSTReqHandler(req, res);
  else if (req.method === 'GET')
    createResponse(req.url, res);

});


function POSTReqHandler(req, res) {
  
  let route = path.basename(req.url, '.html');
  var body = '';
  
  req.on('data', function (data) {
    body += data;
    // Too much POST data, kill the connection!
    // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
    if (body.length > 1e6)
      request.connection.destroy();
  });


  if (route === 'register')
    req.on('end', () => {

      user.save(qs.decode(body));
    });
  else if (route === 'login' || route === '')
    req.on('end', () => {

      var credentials = qs.decode(body);

      let authenticationResponse = user.authenticate(credentials);
      if (authenticationResponse)
        createResponse('/user', res, authenticationResponse);
    });
}


function createResponse(url, res, credentials) {

  // Build file path
  let filePath = path.join(
    __dirname,
    "public",
    url === "/" ? "login.html" : url
  );

  // Extension of file
  let extension = path.extname(filePath);
  // Content type for content-type header
  let contentType = returnContentType(extension);
  // Check if contentType is text/html but no .html file extension
  
  var firstName, secondName;

  if(typeof credentials !== "undefined"){
    firstName =  credentials.firstName;
    secondName = credentials.secondName;
  }


  if (extension === '.html' || extension === '') {
    //change extension in filePath to 'esj'
    filePath = path.join(__dirname, "public", path.basename(filePath, extension) + '.ejs');
    renderEjs(res, filePath, contentType, {firstName: firstName, secondName: secondName});
  } else {
    readFile(res, filePath, contentType);
  }
  
}

function renderEjs(res, filePath, contentType, data) {
  ejs.renderFile(filePath, data, null, function(err, str){
    if(err) {
      if (err.code == 'ENOENT') {
        // Page not found
        fs.readFile( path.join(__dirname, "public", "404.html"), (err, content) => {
            //throw err;
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end(content, "utf8");
          });
      } 
      else {
        //  Some server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    }
    else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(str, 'utf8');
    }
  });
}

function readFile(res, filePath, contentType) {
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
}

function returnContentType(extension) {
  var contentType;
  switch (extension) {
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
    case ".ejs":
      contentType = "text/html";
    default:
      contentType = "text/html";
      break;
  }
  return contentType;
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
