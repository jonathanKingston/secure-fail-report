module.exports = {
  check: function hasXSSProtection(headers) {
    var xssHeader = 'x-xss-protection';
    if (xssHeader in headers) {
      return true;
    }
    return false;
  }
};
