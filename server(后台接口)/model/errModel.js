class ErrModel {
  constructor(msg) {
    this.responseCode = '30001';
    this.responseMsg = msg;
  }
}

module.exports = ErrModel;
