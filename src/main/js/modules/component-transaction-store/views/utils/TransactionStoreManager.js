import {assert} from '@flexio-oss/assert'
import {TypeCheck} from '@flexio-oss/hotballoon'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'

export class TransactionStoreManager {
  /**
   *
   * @param {PublicStoreHandler<StoreTransaction>} publiStoreTransaction
   */
  constructor(publiStoreTransaction) {
    assert(
      publiStoreTransaction.isTypeOf(globalFlexioImport.io.flexio.component_transaction_store.stores.StoreTransaction),
      'NavbarStoreManager: `transactionStore ` should be a Store of StoreTransaction')

    this.__publiStoreTransaction = TypeCheck.assertStoreBase(publiStoreTransaction)
  }

  /**
   *
   * @return {PublicStoreHandler<StoreTransaction>}
   */
  transactionStore() {
    return this.__publiStoreTransaction
  }
}
