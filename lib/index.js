#!/usr/bin/env node
var fr = require('follow-redirects');
var https = fr.https;
var http = fr.http;
var checks = require('./checks');


if (process.argv.length <= 2) {
  console.log('Please supply a hostname');
  process.exit();
}
var site = process.argv[2].replace(/^http[s]?:\/\//, '').replace(/\/+[^/]*$/, '');


function responseHandler(res, mode) {
  var report = {statusCode: res.statusCode, responseTime: Date.now()};

  report['HTTPSResolve'] = /^https[:]/.test(res.fetchedUrls[0]);
  
  Object.keys(checks).forEach(function (checkName) {
    report[checkName] = checks[checkName](res.headers);
  });

  return report;
}

function checkHTTPS(host) {
  var options = {
    host: host,
    port: 443,
    path: '/',
    maxRedirects: 4,
    method: 'GET'
  };
  
  var req = https.request(options, function(res) {
    res.setEncoding('utf8');
  
    var report = responseHandler(res, host);
    checkHTTP(site, report);
  });
  
  req.on('error', function(e) {
    checkHTTP(site, {fail: true});
  });
  req.end();
}
function checkHTTP(host, httpsReport) {
  var options = {
    host: host,
    port: 80,
    path: '/',
    maxRedirects: 5,
    method: 'GET'
  };
  
  var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    var httpReport = responseHandler(res, host);
    console.log({
      host: host,
      https: httpsReport,
      http: httpReport
    });
  });

  req.on('error', function(e) {
    console.error('You have http Fail!');
  });
  
  req.end();
}

checkHTTPS(site);

