const fs = require('fs');
const path = require('path');
if (fs.existsSync(`${__dirname}/config.js`)) {
  const config = require('./config');
  config.loadConfig();
}

const http = require('http');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./router');
const hlpr = require('./lib/helpers');

const app = express();
const isSSL = fs.existsSync(`${__dirname}/../ssl/cert.pem`);
process.env.ROOT_PUBLIC = `${__dirname}/${process.env.SITE_PUBLIC}/`;
const port = process.env.PORT;
const portS = (port * 1) + 363;

let httpServer;

// hlpr.consLog(['process.env', process.env]);

isSSL ?
  console.log('**** Using local SSL certs') :
  console.log('**** No local SSL certs');
  console.log(`**** CERT = ${process.env.CERT}`);

// redirect if insecure and SSL
const secureHost = (req, res, next) => {
  if (!req.secure) {
    if (isSSL) {
      return res.redirect(`https://${req.hostname}:${portS}${req.url}`);
    } else if (process.env.CERT === 'true' && req.get('x-forwarded-proto') !== 'https') {
      return res.redirect(`https://${req.get('host')}${req.url}`);
    }
    return next();
  }
  return next();
};

mongoose.connect(process.env.MONGODB_URI, {
  useMongoClient: true,
  socketTimeoutMS: 300000,
});

// Express Middleware
app.use(secureHost);
// app.use(cors());
// parses everything that comes in as JSON
// app.use(bodyParser.json({ type: '*/*' }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(formidable({
//   encoding: 'utf-8',
//   uploadDir: '../images/',
//   keepExtensions: true,
// }));
app.use(express.static(process.env.ROOT_PUBLIC));

app.use('/', router);

// 404 catch-all handler (middleware)
app.use(
  (req, res) => {
    console.log(`>>>> 404 URL : ${req.url}`);
    console.log(`>>>> 404 IP  : ${req.ip}`);
    res.redirect('/');
  }
);

// 500 error handler (middleware)
app.use(
  (err, req, res) => {
    console.log('!!!! 500 ', err.stack);
    res.status(500)
       .render('500');
  }
);

// HTTPS
if (isSSL) {
  httpServer = https.createServer({
    key: fs.readFileSync(`${__dirname}/../ssl/cert.pem`),
    cert: fs.readFileSync(`${__dirname}/../ssl/cert.crt`),
  }, app).listen(portS, () => {
    console.log(`**** HTTPS ${app.get('env')} https://localhost:${portS}`);
  });
  const insecureServer = http.createServer(app).listen(port, () => {
    console.log(`**** HTTP ${app.get('env')} http://localhost:${port}`);
  });
} else {
  httpServer = http.createServer(app).listen(port, () => {
    console.log(`**** HTTP ${app.get('env')} http://localhost:${port}`);
  });
}
