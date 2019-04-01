import {StoreBuilder, InMemoryStoreParams, StoreTypeParam, TypeCheck} from 'hotballoon'
import {assertType, FLEXIO_IMPORT_OBJECT, isNull} from 'flexio-jshelpers'
import {StoreHandlerTransaction} from './StoreHandlerTransaction'

const StoreTransaction = window[FLEXIO_IMPORT_OBJECT].io.flexio.component_transaction_store.stores.StoreTransaction
const StoreTransactionBuilder = window[FLEXIO_IMPORT_OBJECT].io.flexio.component_transaction_store.stores.StoreTransactionBuilder
const StoreTransactionRegisteredList = window[FLEXIO_IMPORT_OBJECT].io.flexio.component_transaction_store.stores.storetransaction.StoreTransactionRegisteredList

export class StoreTransactionUtils {
  constructor(componentContext) {
    assertType(TypeCheck.isComponentContext(componentContext),
      'StoreCounterUtils:constructor: `componentContext` should be a ComponentContext'
    )
    this.__componentContext = componentContext
    this.__store = null
    this.__storePublic = null
  }

  /**
   *
   * @returns {StoreNavbarUtils}
   */
  build() {
    this.__store = this.__componentContext.addStore(StoreBuilder.InMemory(
      new InMemoryStoreParams(
        new StoreTypeParam(
          StoreTransaction,
          /**
           *
           * @param {StoreTransaction} data
           * @return {StoreTransaction}
           */
          (data) => {
            if (isNull(data.registered())) {
              return data.withRegistered(new StoreTransactionRegisteredList())
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
          (obj) => StoreTransactionBuilder.fromObject(obj).build()
        ),
        new StoreTransactionBuilder().registered(new StoreTransactionRegisteredList())
          .build()
      )
    ))
    this.__storePublic = new StoreHandlerTransaction(this.__store)
    return this
  }

  store() {
    return this.__store
  }

  storePublic() {
    return this.__storePublic
  }
}
