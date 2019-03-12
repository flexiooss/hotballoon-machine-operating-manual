export class DataHandlerResult {
  /**
   *
   * @param data
   */
  constructor(data) {
    this.__data = data
  }
  /**
   *
   * @returns {string}
   */
  display() {
    return this.__data.lexp + ' ' + this.__data.operator.symbol + ' ' + this.__data.rexp
  }
}
