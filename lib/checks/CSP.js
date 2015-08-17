module.exports = {
  check: function hasCSP(headers) {
    var that = this;
    var headersToCheck = ['content-security-policy'];
    var hasAHeader = false;

    headersToCheck.forEach(function (header) {
      if (header in headers) {
        hasAHeader = {
          report: that.cspValue(headers[header])
        };
      }
    });
    return hasAHeader;
  },

  cspValue: function (value) {
    var that = this;
    var output = {};
    var directives = value.split(';');

    directives.forEach(function (directive) {
      var results = that.trim(directive).split(' ');
      var directiveName = that.trim(results.shift());

      output[directiveName] = results;
    });
    return output;
  },

  trim: function (string) {
    return string.replace(/\s*$/, '').replace(/^\s*/, '');
  }
};
