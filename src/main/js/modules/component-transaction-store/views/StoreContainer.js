import {assert} from '@flexio-oss/assert'
import {TypeCheck} from '@flexio-oss/hotballoon'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'


const StoreTransaction = globalFlexioImport.io.flexio.component_transaction_store.stores.StoreTransaction

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
