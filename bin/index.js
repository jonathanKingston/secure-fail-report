#!/usr/bin/env node
var check = require('../lib/index');
try {
  check(process.argv[2], function (report) {
    console.log(report);
  });
} catch (e) {
  console.log(e);
  process.exit(1);
}
