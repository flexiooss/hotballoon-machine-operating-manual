import {DataStoreInterface} from 'hotballoon'

export const RESULT_STORE = 'RESULT_STORE'

/**
 * @extends DataStoreInterface
 */
export class StoreDataTransaction extends DataStoreInterface {
  /**
   *
   * @param {boolean} inTransaction
   */
  constructor(inTransaction = false) {
    super()
    this.inTransaction = inTransaction
  }
}
