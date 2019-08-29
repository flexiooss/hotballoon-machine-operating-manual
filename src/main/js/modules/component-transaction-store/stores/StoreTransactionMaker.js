import {StoreBuilder, InMemoryStoreParams, StoreTypeParam, TypeCheck, PublicStoreHandler} from '@flexio-oss/hotballoon'
import {assertType, isNull} from '@flexio-oss/assert'
import {globalFlexioImport} from '@flexio-oss/global-import-registry'

export class StoreTransactionMaker {
  /**
   *
   * @private
   * @param {Store<StoreTransaction>} store
   * @param {PublicStoreHandler<StoreTransaction>} storePublic
   */
  constructor(store, storePublic) {
    this.__store = store
    this.__storePublic = storePublic
  }

  /**
   *
   * @param {ComponentContext} componentContext
   * @returns {StoreTransactionMaker}
   */
  static create(componentContext) {
    assertType(TypeCheck.isComponentContext(componentContext),
      'StoreLogsUtils:constructor: `componentContext` should be a ComponentContext'
    )
    let store = componentContext.addStore(StoreBuilder.InMemory(
      new InMemoryStoreParams(
        new StoreTypeParam(
          globalFlexioImport.io.flexio.component_transaction_store.stores.StoreTransaction,
          /**
           *
           * @param {StoreTransaction} data
           * @return {StoreTransaction}
           */
          (data) => {
            if (isNull(data.registered())) {
              return data
                .withRegistered(new globalFlexioImport.io.flexio.component_transaction_store.stores.storetransaction.StoreTransactionRegisteredList())
            }
            return data
          },
          /**
           *
           * @param {StoreTransaction} data
           * @return {boolean}
           */
          (data) => {
            return !isNull(data.registered())
          },
          /**
           *
           * @param {Object} obj
           * @return {StoreCounter}
           */
          (obj) => globalFlexioImport.io.flexio.component_transaction_store.stores.StoreTransactionBuilder().fromObject(obj).build()
        ),
        new globalFlexioImport.io.flexio.component_transaction_store.stores.StoreTransactionBuilder()
          .registered(new globalFlexioImport.io.flexio.component_transaction_store.stores.storetransaction.StoreTransactionRegisteredList())
          .build()
      )
    ))
    let storePublic = new PublicStoreHandler(store)
    return new StoreTransactionMaker(store, storePublic)
  }

  /**
   *
   * @returns {Store<StoreTransaction>}
   */
  store() {
    return this.__store
  }

  /**
   *
   * @returns {PublicStoreHandler<StoreTransaction>}
   */
  storePublic() {
    return this.__storePublic
  }
}
