module.exports = {
  check: function hasNoSniff(headers) {
      var CTHeader = 'x-content-type-options';
      if (CTHeader in headers && /nosniff/i.test(headers[CTHeader])) {
        return true;
      }
      return false;
  }
};
