import {PublicStoreHandler} from 'hotballoon'

/**
 * @extends PublicStoreHandler
 */
export class StoreHandlerResult extends PublicStoreHandler {
  /**
   *
   * @returns {string}
   */
  display() {
    return this.data().lexp + ' ' + this.data().operator.symbol + ' ' + this.data().rexp
  }
}
