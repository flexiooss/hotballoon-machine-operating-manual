import {StoreBuilder, InMemoryStoreParams, StoreTypeParam} from 'hotballoon'
import '../../generated/io/package'
import {FLEXIO_IMPORT_OBJECT, isNull} from 'flexio-jshelpers'

const StoreTransaction = window[FLEXIO_IMPORT_OBJECT].io.flexio.component_transaction_store.stores.StoreTransaction
const StoreTransactionBuilder = window[FLEXIO_IMPORT_OBJECT].io.flexio.component_transaction_store.stores.StoreTransactionBuilder
const StoreTransactionRegisteredList = window[FLEXIO_IMPORT_OBJECT].io.flexio.component_transaction_store.stores.storetransaction.StoreTransactionRegisteredList

/**
 *
 * @param {ComponentContext} componentContext
 * @return {Store}
 */
export const initStoreTransaction = (componentContext) => {
  return componentContext.addStore(StoreBuilder.InMemory(
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
}
