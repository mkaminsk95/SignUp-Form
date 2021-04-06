const http = require("http");
const path = require("path");
const fs = require("fs");
const qs = require('querystring');
const events = require('events');


const server = http.createServer((req, res) => {


  console.log(req.url);

  // Login and Register handling
  if (req.method === 'POST')
    POSTReqHandler(req);
  else if (req.method === 'GET')
    createResponse(req, res);

});




function POSTReqHandler(req) {

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
    req.on('end', () => saveUser(body));
  else if (route === 'login') 
    req.on('end', () => checkCredentials(body));

}

function createResponse(req, res) {

  // Build file path
  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "login.html" : req.url
  );

  // Extension of file
  let extension = path.extname(filePath);

  // Content type for content-type header
  let contentType = returnContentType(extension);

  // Check if contentType is text/html but no .html file extension
  if (contentType == "text/html" && extension == "") filePath += ".html";

  // log the filePath
  //console.log(filePath);

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
    default:
      contentType = "text/html";
      break;
  }

  return contentType;
}

function saveUser(body) {

  var usersDB;
  var newUser = qs.decode(body);
   
  fs.readFile('users.json', 'utf8', function readFileCallback(err, data) {
    if (err) {
      console.log(err);
    } else {
      
      usersDB = JSON.parse(data); //now it an object
      usersDB.users.push(newUser); //add some data
      
      json = JSON.stringify(usersDB, null, 2); //convert it back to json

      fs.writeFile('users.json', json, 'utf8', (err) => {
        if(err) {
          console.log(err);
        } else {
          console.log("Data written");
        }
      }); 
    }
  });

}

function checkCredentials(body) {

  var usersDB;
  var credentials = qs.decode(body);

  fs.readFile('users.json', 'utf8', (err, data) => {
    if(err) 
      console.log(err);
    else {

      usersDB = JSON.parse(data);

      for(let id = 0; id < usersDB.users.length; id++) {
        
        if (usersDB.users[id].email === credentials.email && usersDB.users[id].password === credentials.password) {
          console.log('logged in');
          //createResponse();
        } else {
          console.log('false credentials');
         
        }

      }
    }
  })
}

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
