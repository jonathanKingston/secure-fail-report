module.exports = {
  check: function hasFrameProtection(headers) {
    var framingHeader = 'x-frame-options';
    if (framingHeader in headers && /SAMEORIGIN|DENY|ALLOW-FROM/i.test(headers[framingHeader])) {
      return true;
    }
    return false;
  }
};
