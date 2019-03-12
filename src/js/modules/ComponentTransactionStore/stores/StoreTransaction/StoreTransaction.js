export class StoreTransaction {
  /**
   *
   * @param {boolean} inTransaction
   */
  constructor(inTransaction = false) {
    this.inTransaction = inTransaction
  }
}
