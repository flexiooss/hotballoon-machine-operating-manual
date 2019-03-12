import {PublicStoreHandler} from 'hotballoon'

/**
 * @extends PublicStoreHandler
 */
export class StoreHandlerTransaction extends PublicStoreHandler {
  /**
   *
   * @returns {boolean}
   */
  get isRunning() {
    return this.data().inTransaction
  }
}
