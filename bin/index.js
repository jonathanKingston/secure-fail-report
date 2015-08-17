#!/usr/bin/env node
var check = require('../lib/index');
try {
  check(process.argv[2], function (report) {
    console.log(JSON.stringify(report, null, 2));
  });
} catch (e) {
  console.log(e);
  process.exit(1);
}
