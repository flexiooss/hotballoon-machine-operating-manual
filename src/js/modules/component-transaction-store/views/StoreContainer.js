import {assert} from 'flexio-jshelpers'
import {TypeCheck} from 'hotballoon'
import {StoreTransaction} from '../stores/StoreTransaction/StoreTransaction'

export class StoreContainer {
  /**
   *
   * @param {PublicStoreHandler} transactionStore
   */
  constructor(transactionStore) {
    assert(
      transactionStore.isTypeOf(StoreTransaction),
      'StoreContainer: `transactionStore ` should be a Store of StoreTransaction')

    this.__transactionStore = TypeCheck.assertStoreBase(transactionStore)
  }

  /**
   *
   * @return {StoreHandlerTransaction}
   */
  get transactionStore() {
    return this.__transactionStore
  }
}
