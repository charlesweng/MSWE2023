/**
 * Sample code from book
 */
// require('http').createServer((inRequest, inResponse) => {
//   const requestModule = require('request');
//   requestModule(
//     "http://worldtimeapi.org/api/timezone/America/New_York",
//     function (inErr, inResp, inBody) {
//       inResponse.end(`Hello from my first Node Webserver: ${inBody}`);
//     }
//   );
// }).listen(80);

/**
 * Using express to create a webserver
 */
const express = require('express');
const path = require('path');

const app = express();
const port = 80;

app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'build')))

app.get('/', (req, res) => {
  console.log("Visiting " + path.join(__dirname, 'build', 'index.html'));
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

/**
 * Using pure NodeJS to serve a static html file
 */
// const http = require('http');
// const path = require('path');
// const fs = require('fs');

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'content-type': 'text/html' });
//   fs.createReadStream(path.join(__dirname, 'build', 'index.html')).pipe(res);
// });

// server.listen(process.env.PORT || 3000);
