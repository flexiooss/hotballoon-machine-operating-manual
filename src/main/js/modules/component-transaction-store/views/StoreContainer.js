import {assert, FLEXIO_IMPORT_OBJECT} from 'flexio-jshelpers'
import {TypeCheck} from 'hotballoon'
import '../generated/io/package'

const StoreTransaction = window[FLEXIO_IMPORT_OBJECT].io.flexio.component_transaction_store.stores.StoreTransaction

export class StoreContainer {
  /**
   *
   * @param {PublicStoreHandler} transactionStore
   */
  constructor(transactionStore) {
    assert(
      transactionStore.isTypeOf(StoreTransaction),
      'ContainerStore: `transactionStore ` should be a Store of StoreTransaction')

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
