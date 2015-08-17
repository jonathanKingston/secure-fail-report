module.exports = {
  check: function hasPKP(headers) {
    var PKPHeader = 'public-key-pins';
    if (PKPHeader in headers) {
      return true;
    }
    return false;
  }
};
