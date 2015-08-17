module.exports = {
  check: function hasSTS(headers) {
    var output = {};
    var STSHeader = 'strict-transport-security';
    var STSValue;
    var maxAge;

    if (STSHeader in headers) {
      STSValue = headers[STSHeader];
      maxAge = STSValue.match(/max-age=([0-9]+)/i);

      if (/preload/i.test(STSValue)) {
        output.preload = true;
      }
      if (/includeSubdomains/i.test(STSValue)) {
        output.subdomains = true;
      }
      if (maxAge && maxAge[1] >= 10886400) {
        output.largeMaxAge = true;
      }
      return output;
    }
    return false;
  }
};
