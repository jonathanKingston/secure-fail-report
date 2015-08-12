module.exports = {
  hasCSP: function hasCSP(headers) {
    var headersToCheck = ['content-security-policy'];
    var hasAHeader = false;
    headersToCheck.forEach(function (header) {
      if (header in headers) {
        hasAHeader = true;
      }
    });
    return hasAHeader;
  },

  hasNoSniff: function hasNoSniff(headers) {
    var CTHeader = 'x-content-type-options';
    if (CTHeader in headers && /nosniff/i.test(headers[CTHeader])) {
      return true;
    }
    return false;
  },

  hasPKP: function hasPKP(headers) {
    var PKPHeader = 'public-key-pins';
    if (PKPHeader in headers) {
      return true;
    }
    return false;
  },

  hasSTS: function hasSTS(headers) {
    var STSHeader = 'strict-transport-security';
    if (STSHeader in headers) {
      return true;
    }
    return false;
  },

  hasFrameProtection: function hasFrameProtection(headers) {
    var framingHeader = 'x-frame-options';
    if (framingHeader in headers && /SAMEORIGIN|DENY|ALLOW-FROM/i.test(headers[framingHeader])) {
      return true;
    }
    return false;
  },

  hasXSSProtection: function hasXSSProtection(headers) {
    var xssHeader = 'x-xss-protection';
    if (xssHeader in headers) {
      return true;
    }
    return false;
  }
}
