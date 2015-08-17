var fs = require('fs');
var fr = require('follow-redirects');
var https = fr.https;
var http = fr.http;

function responseHandler(res, mode) {
  var report = {statusCode: res.statusCode, responseTime: Date.now()};
  var checks = fs.readdirSync(__dirname + '/checks');

  report['HTTPSResolve'] = /^https[:]/.test(res.fetchedUrls[0]);

  checks.forEach(function (checkFile) {
    var checkName = (checkFile).replace(/[.]js$/, '');
    var check = require(__dirname + '/checks/' + checkName);
    report[checkName] = check.check(res.headers);
  });

  return report;
}

function checkHTTPS(host, responseCallback) {
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
    checkHTTP(host, report, responseCallback);
  });
  
  req.on('error', function(e) {
    checkHTTP(host, reportFail(), responseCallback);
  });
  req.end();
}

function reportFail() {
  return {fail: true};
}

function checkHTTP(host, httpsReport, responseCallback) {
  var options = {
    host: host,
    port: 80,
    path: '/',
    maxRedirects: 5,
    method: 'GET'
  };

  var report = {
    host: host,
    https: httpsReport
  }
  
  var req = http.request(options, function(res) {
    res.setEncoding('utf8');
    var httpReport = responseHandler(res, host);
    report.http = httpReport;
    responseCallback(report);
  });

  req.on('error', function(e) {
    report.http = reportFail();
    responseCallback(report);
  });
  
  req.end();
}

module.exports = function (site, responseCallback) {
  responseHander = responseCallback || function () {};

  if (!site) {
    throw new Error('Please supply a hostname');
  }

  site = site.replace(/^http[s]?:\/\//, '').replace(/\/+[^/]*$/, '');

  checkHTTPS(site, responseCallback);
};

